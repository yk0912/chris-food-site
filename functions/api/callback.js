// Decap CMS 用 GitHub OAuth コールバック
export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const cookie = request.headers.get('Cookie') || '';
  const saved = (cookie.match(/oauth_state=([^;]+)/) || [])[1];

  if (!code || !state || state !== saved) {
    return new Response('認証に失敗しました（state 不一致）', { status: 400 });
  }

  const res = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      client_id: env.GITHUB_CLIENT_ID,
      client_secret: env.GITHUB_CLIENT_SECRET,
      code,
    }),
  });
  const data = await res.json();

  const ok = !!data.access_token;
  const message = ok
    ? `authorization:github:success:${JSON.stringify({ token: data.access_token, provider: 'github' })}`
    : `authorization:github:error:${JSON.stringify(data)}`;

  const html = `<!doctype html><html><body><script>
    (function () {
      function receive(e) {
        window.opener.postMessage(${JSON.stringify(message)}, e.origin);
        window.removeEventListener('message', receive, false);
      }
      window.addEventListener('message', receive, false);
      window.opener.postMessage('authorizing:github', '*');
    })();
  </script></body></html>`;

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Set-Cookie': 'oauth_state=; Max-Age=0; Path=/',
    },
  });
}
