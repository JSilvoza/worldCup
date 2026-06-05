require('dotenv').config();
const express   = require('express');
const helmet    = require('helmet');
const cors      = require('cors');
const path      = require('path');

const teamsRouter   = require('./routes/teams');
const matchesRouter = require('./routes/matches');
const groupsRouter  = require('./routes/groups');
const statsRouter   = require('./routes/stats');

const app  = express();
const PORT = process.env.PORT || 3000;

app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors());
app.use(express.json());

// API routes
app.use('/api/teams',   teamsRouter);
app.use('/api/matches', matchesRouter);
app.use('/api/groups',  groupsRouter);
app.use('/api/stats',   statsRouter);

// Health check
app.get('/api/health', (req, res) => res.json({ ok: true, ts: new Date().toISOString() }));

// Serve SPA for everything else
app.use(express.static(path.join(__dirname, 'public')));
app.get('*', (req, res) => {
  if (req.path.startsWith('/api')) return res.status(404).json({ error: 'Not found' });
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use((err, req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`World Cup 2026 server running at http://localhost:${PORT}`);
});
