const { getStore } = require('@netlify/blobs');

const TOTAL_SPOTS = 15;
const KEY = 'golf-used';

exports.handler = async (event) => {
  const store = getStore({
    name: 'christmas-party-2026',
    siteID: process.env.BLOBS_SITE_ID,
    token: process.env.BLOBS_TOKEN
  });
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'GET') {
    const used = Number(await store.get(KEY)) || 0;
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        used: used,
        total: TOTAL_SPOTS,
        remaining: Math.max(TOTAL_SPOTS - used, 0)
      })
    };
  }

  if (event.httpMethod === 'POST') {
    let count = 0;
    try {
      count = Number(JSON.parse(event.body || '{}').count) || 0;
    } catch (e) {
      count = 0;
    }

    const current = Number(await store.get(KEY)) || 0;
    const updated = current + count;
    await store.set(KEY, String(updated));

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        used: updated,
        total: TOTAL_SPOTS,
        remaining: Math.max(TOTAL_SPOTS - updated, 0),
        full: updated >= TOTAL_SPOTS
      })
    };
  }

  return { statusCode: 405, headers, body: 'Method not allowed' };
};
