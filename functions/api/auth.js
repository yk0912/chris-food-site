// Decap CMS 用 GitHub OAuth（Cloudflare Pages Functions）
// 環境変数: GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET を Cloudflare Pages に設定してください。
export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const state = crypto.randomUUID();
  const redirect = `${url.origin}/api/callback`;
  const authUrl = new URL('https://github.com/login/oauth/authorize');
  authUrl.searchParams.set('client_id', env.GITHUB_CLIENT_ID);
  authUrl.searchParams.set('redirect_uri', redirect);
  authUrl.searchParams.set('scope', 'repo,user');
  authUrl.searchParams.set('state', state);
  return new Response(null, {
    status: 302,
    headers: {
      Location: authUrl.href,
      'Set-Cookie': `oauth_state=${state}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=600`,
    },
  });
}
