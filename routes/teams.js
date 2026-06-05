const { Router } = require('express');
const { getDb, MATCH_WITH_TEAMS } = require('../database/db');
const { cache } = require('../middleware/cache');

const router = Router();

router.get('/', cache(60), (req, res) => {
  const db = getDb();
  const { group, confederation } = req.query;
  let sql = 'SELECT * FROM teams';
  const params = [];
  const conditions = [];
  if (group)         { conditions.push('group_id = ?');    params.push(group.toUpperCase()); }
  if (confederation) { conditions.push('confederation = ?'); params.push(confederation.toUpperCase()); }
  if (conditions.length) sql += ' WHERE ' + conditions.join(' AND ');
  sql += ' ORDER BY group_id, fifa_rank';
  res.json(db.prepare(sql).all(params));
});

router.get('/:id', cache(60), (req, res) => {
  const db = getDb();
  const team = db.prepare('SELECT * FROM teams WHERE id = ?').get(req.params.id);
  if (!team) return res.status(404).json({ error: 'Team not found' });

  const players  = db.prepare(
    'SELECT * FROM players WHERE team_id = ? ORDER BY position, number'
  ).all(team.id);

  const matches = db.prepare(
    MATCH_WITH_TEAMS + ' WHERE m.home_team_id = ? OR m.away_team_id = ? ORDER BY m.match_date, m.match_time'
  ).all(team.id, team.id);

  res.json({ ...team, players, matches });
});

module.exports = router;
