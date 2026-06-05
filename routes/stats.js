const { Router } = require('express');
const { getDb, MATCH_WITH_TEAMS } = require('../database/db');
const { cache } = require('../middleware/cache');

const router = Router();

router.get('/scorers', cache(30), (req, res) => {
  const db = getDb();
  res.json(db.prepare(`
    SELECT p.id, p.name, p.number, p.goals, p.assists,
           t.name AS team_name, t.code AS team_code, t.flag AS team_flag
    FROM players p
    JOIN teams t ON t.id = p.team_id
    WHERE p.goals > 0
    ORDER BY p.goals DESC, p.assists DESC
    LIMIT 20
  `).all());
});

// Was 4 queries — now 2
router.get('/summary', cache(30), (req, res) => {
  const db = getDb();

  const counts = db.prepare(`
    SELECT
      COALESCE(SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END), 0)                         AS totalMatches,
      COALESCE(SUM(CASE WHEN status = 'live'      THEN 1 ELSE 0 END), 0)                         AS liveMatches,
      COALESCE(SUM(CASE WHEN status = 'completed' THEN home_score + away_score ELSE 0 END), 0)   AS totalGoals
    FROM matches
  `).get();

  const { totalMatches, liveMatches, totalGoals } = counts;
  const avgGoals = totalMatches > 0 ? (totalGoals / totalMatches).toFixed(2) : '0.00';

  const nextMatch = db.prepare(
    MATCH_WITH_TEAMS + " WHERE m.status = 'scheduled' ORDER BY m.match_date, m.match_time LIMIT 1"
  ).get();

  res.json({ totalMatches, liveMatches, totalGoals, avgGoals, nextMatch });
});

module.exports = router;
