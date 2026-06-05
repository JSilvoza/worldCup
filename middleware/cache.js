const store = new Map();

function cache(ttlSeconds = 30) {
  return (req, res, next) => {
    const key = req.originalUrl;
    const entry = store.get(key);
    if (entry && Date.now() - entry.ts < ttlSeconds * 1000) {
      res.set('X-Cache', 'HIT');
      return res.json(entry.data);
    }
    const originalJson = res.json.bind(res);
    res.json = (data) => {
      store.set(key, { data, ts: Date.now() });
      res.set('X-Cache', 'MISS');
      return originalJson(data);
    };
    next();
  };
}

function bust(prefix) {
  for (const key of store.keys()) {
    if (key.startsWith(prefix)) store.delete(key);
  }
}

module.exports = { cache, bust };
