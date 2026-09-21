// Cloudflare Pages Function：高德「Web服务」API 代理
// 端点：/api/geocode  /api/regeo  /api/search
// 高德 Key 从 Pages 项目环境变量 AMAP_KEY 读取，只存在服务端，绝不返回给前端。

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
};

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', ...CORS },
  });
}

export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);

  if (request.method === 'OPTIONS') return new Response(null, { headers: CORS });

  const key = env.AMAP_KEY;
  if (!key) return json({ status: '0', info: 'AMAP_KEY 未配置（请在 Pages 环境变量里设置）' }, 500);

  let target = null;
  if (url.pathname.endsWith('/geocode')) {
    target = `https://restapi.amap.com/v3/geocode/geo?key=${key}&address=${encodeURIComponent(url.searchParams.get('address') || '')}`;
  } else if (url.pathname.endsWith('/regeo')) {
    target = `https://restapi.amap.com/v3/geocode/regeo?key=${key}&location=${url.searchParams.get('location')}&extensions=base`;
  } else if (url.pathname.endsWith('/search')) {
    const p = new URLSearchParams({
      key,
      location: url.searchParams.get('location') || '',
      radius: url.searchParams.get('radius') || '5000',
      types: url.searchParams.get('types') || '050000',
      offset: url.searchParams.get('offset') || '50',
      page: url.searchParams.get('page') || '1',
      sortrule: 'distance',
      extensions: 'all',
    });
    target = `https://restapi.amap.com/v3/place/around?${p.toString()}`;
  }

  if (!target) return json({ status: '0', info: '未知接口' }, 404);

  try {
    const r = await fetch(target, { headers: { 'User-Agent': 'food-roulette-proxy' } });
    const data = await r.json();
    return json(data, r.status);
  } catch (e) {
    return json({ status: '0', info: '代理请求失败：' + e.message }, 502);
  }
}
