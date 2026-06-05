const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'changeme';

function adminAuth(req, res, next) {
  const auth = req.headers['authorization'];
  if (!auth || !auth.startsWith('Basic ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const [, encoded] = auth.split(' ');
  const decoded = Buffer.from(encoded, 'base64').toString('utf8');
  const [, password] = decoded.split(':');
  if (password !== ADMIN_PASSWORD) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  next();
}

module.exports = { adminAuth };
