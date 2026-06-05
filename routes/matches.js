const { Router } = require('express');
const { getDb, MATCH_WITH_TEAMS } = require('../database/db');
const { cache, bust } = require('../middleware/cache');
const { adminAuth } = require('../middleware/auth');

const router = Router();
const VALID_STATUSES = new Set(['scheduled', 'live', 'completed']);

router.get('/', cache(20), (req, res) => {
  const db = getDb();
  const { stage, group, status, date } = req.query;
  let sql = MATCH_WITH_TEAMS;
  const params = [];
  const conditions = [];
  if (stage === 'knockout') {
    conditions.push("m.stage != 'group'");
  } else if (stage) {
    conditions.push('m.stage = ?');
    params.push(stage);
  }
  if (group)  { conditions.push('m.group_id = ?');   params.push(group.toUpperCase()); }
  if (status) { conditions.push('m.status = ?');     params.push(status); }
  if (date)   { conditions.push('m.match_date = ?'); params.push(date); }
  if (conditions.length) sql += ' WHERE ' + conditions.join(' AND ');
  sql += ' ORDER BY m.match_date, m.match_time, m.match_number';
  res.json(db.prepare(sql).all(params));
});

router.get('/live', cache(10), (req, res) => {
  const db = getDb();
  res.json(db.prepare(
    MATCH_WITH_TEAMS + " WHERE m.status = 'live' ORDER BY m.match_date, m.match_time"
  ).all());
});

router.get('/today', cache(20), (req, res) => {
  const db = getDb();
  const today = new Date().toISOString().split('T')[0];
  res.json(db.prepare(
    MATCH_WITH_TEAMS + ' WHERE m.match_date = ? ORDER BY m.match_time'
  ).all(today));
});

router.get('/:id', cache(15), (req, res) => {
  const db = getDb();
  const match = db.prepare(MATCH_WITH_TEAMS + ' WHERE m.id = ?').get(req.params.id);
  if (!match) return res.status(404).json({ error: 'Match not found' });

  const goals = db.prepare(`
    SELECT g.*, p.name AS player_name, t.code AS team_code, t.flag AS team_flag
    FROM goals g
    LEFT JOIN players p ON p.id = g.player_id
    JOIN teams t ON t.id = g.team_id
    WHERE g.match_id = ?
    ORDER BY g.minute
  `).all(match.id);

  const cards = db.prepare(`
    SELECT c.*, p.name AS player_name, t.code AS team_code
    FROM cards c
    LEFT JOIN players p ON p.id = c.player_id
    JOIN teams t ON t.id = c.team_id
    WHERE c.match_id = ?
    ORDER BY c.minute
  `).all(match.id);

  res.json({ ...match, goals, cards });
});

// Admin: update score / status
router.patch('/:id', adminAuth, (req, res) => {
  const db = getDb();
  const { home_score, away_score, home_pens, away_pens, status, minute } = req.body;

  if (status !== undefined && !VALID_STATUSES.has(status)) {
    return res.status(400).json({ error: `Invalid status. Must be one of: ${[...VALID_STATUSES].join(', ')}` });
  }

  const match = db.prepare('SELECT id FROM matches WHERE id = ?').get(req.params.id);
  if (!match) return res.status(404).json({ error: 'Match not found' });

  db.prepare(`
    UPDATE matches SET
      home_score = COALESCE(?, home_score),
      away_score = COALESCE(?, away_score),
      home_pens  = COALESCE(?, home_pens),
      away_pens  = COALESCE(?, away_pens),
      status     = COALESCE(?, status),
      minute     = COALESCE(?, minute)
    WHERE id = ?
  `).run([
    home_score ?? null, away_score ?? null,
    home_pens  ?? null, away_pens  ?? null,
    status     ?? null, minute     ?? null,
    req.params.id,
  ]);

  bust('/api/matches');
  bust('/api/groups');
  bust('/api/stats');
  res.json({ ok: true });
});

// Admin: add goal event
router.post('/:id/goals', adminAuth, (req, res) => {
  const db = getDb();
  const { team_id, player_id, minute, is_penalty, is_own_goal } = req.body;
  if (!team_id || minute === undefined) {
    return res.status(400).json({ error: 'team_id and minute required' });
  }

  const result = db.prepare(`
    INSERT INTO goals (match_id, team_id, player_id, minute, is_penalty, is_own_goal)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run([req.params.id, team_id, player_id || null, minute, is_penalty ? 1 : 0, is_own_goal ? 1 : 0]);

  if (player_id && !is_own_goal) {
    db.prepare('UPDATE players SET goals = goals + 1 WHERE id = ?').run([player_id]);
  }

  bust('/api/matches');
  bust('/api/stats');
  res.json({ id: result.lastInsertRowid, ok: true });
});

module.exports = router;
