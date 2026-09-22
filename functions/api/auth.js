// Cloudflare Pages Function — step 1 of the Decap CMS GitHub login.
// Decap opens /api/auth in a popup; we redirect to GitHub's authorize page.
export async function onRequestGet(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const clientId = env.GITHUB_OAUTH_CLIENT_ID;
  if (!clientId) {
    return new Response('Server is missing the GITHUB_OAUTH_CLIENT_ID environment variable.', { status: 500 });
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
      'Set-Cookie': `csrf_state=${state}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=600`,
    },
  });
}
