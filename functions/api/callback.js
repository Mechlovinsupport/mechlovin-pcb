// Cloudflare Pages Function — step 2 of the Decap CMS GitHub login.
// GitHub redirects here with a code; we trade it for an access token and
// hand that token back to the CMS window via postMessage.
export async function onRequestGet(context) {
  const { request, env } = context;
  const url = new URL(request.url);
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
