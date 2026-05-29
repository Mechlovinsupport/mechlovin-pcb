// Cloudflare Worker entry. Serves the static Astro site (via the ASSETS
// binding) and adds two routes that bridge the Decap CMS /admin login to
// GitHub OAuth:
//   GET /api/auth     → redirect the user to GitHub to authorize
//   GET /api/callback → exchange the code for a token, hand it to the CMS
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (request.method === 'GET' && url.pathname === '/api/auth') {
      return handleAuth(env, url);
    }
    if (request.method === 'GET' && url.pathname === '/api/callback') {
      return handleCallback(request, env, url);
    }
    // Everything else is a static file from the build.
    return env.ASSETS.fetch(request);
  },
};

function handleAuth(env, url) {
  const clientId = env.GITHUB_OAUTH_CLIENT_ID;
  if (!clientId) {
    return new Response('Server is missing the GITHUB_OAUTH_CLIENT_ID secret.', { status: 500 });
  }
  const redirectUri = `${url.origin}/api/callback`;
  const state = crypto.randomUUID();
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: 'repo,user',
    state,
    allow_signup: 'false',
  });
  return new Response(null, {
    status: 302,
    headers: {
      Location: `https://github.com/login/oauth/authorize?${params.toString()}`,
      // Short-lived cookie to guard against CSRF; verified in the callback.
      'Set-Cookie': `csrf_state=${state}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=600`,
    },
  });
}

async function handleCallback(request, env, url) {
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const cookie = request.headers.get('Cookie') || '';
  const savedState = /(?:^|;\s*)csrf_state=([^;]+)/.exec(cookie)?.[1];

  if (!code) return new Response('Missing ?code from GitHub.', { status: 400 });
  if (!savedState || savedState !== state) {
    return new Response('Invalid OAuth state. Please try logging in again.', { status: 400 });
  }

  const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'User-Agent': 'decap-cms-oauth',
    },
    body: JSON.stringify({
      client_id: env.GITHUB_OAUTH_CLIENT_ID,
      client_secret: env.GITHUB_OAUTH_CLIENT_SECRET,
      code,
      redirect_uri: `${url.origin}/api/callback`,
    }),
  });

  const data = await tokenRes.json();
  if (data.error || !data.access_token) {
    const msg = data.error_description || data.error || 'no access token returned';
    return new Response(`OAuth error: ${msg}`, { status: 401 });
  }

  const payload = JSON.stringify({ token: data.access_token, provider: 'github' });
  const html = `<!doctype html><html><head><meta charset="utf-8"></head><body>
<script>
(function () {
  function receiveMessage(e) {
    window.opener.postMessage('authorization:github:success:${payload}', e.origin);
    window.removeEventListener('message', receiveMessage, false);
  }
  window.addEventListener('message', receiveMessage, false);
  window.opener.postMessage('authorizing:github', '*');
})();
</script>
<p>Logging you in… you can close this window if it doesn't close itself.</p>
</body></html>`;

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Set-Cookie': 'csrf_state=; Path=/; Max-Age=0',
    },
  });
}
