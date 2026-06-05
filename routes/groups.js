const { Router } = require('express');
const { getDb, MATCH_WITH_TEAMS } = require('../database/db');
const { cache } = require('../middleware/cache');

const router = Router();

// Build standings from flat team + match arrays (no DB coupling)
function buildStandings(teams, completedMatches) {
  const teamMap = {};
  const groups = {};

  for (const t of teams) {
    const entry = {
      id: t.id, name: t.name, code: t.code, flag: t.flag,
      played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts: 0,
    };
    teamMap[t.id] = entry;
    if (!groups[t.group_id]) groups[t.group_id] = [];
    groups[t.group_id].push(entry);
  }

  for (const m of completedMatches) {
    const home = teamMap[m.home_team_id];
    const away = teamMap[m.away_team_id];
    if (!home || !away || m.home_score === null) continue;

    home.played++; away.played++;
    home.gf += m.home_score; home.ga += m.away_score;
    away.gf += m.away_score; away.ga += m.home_score;

    if (m.home_score > m.away_score) {
      home.won++; home.pts += 3; away.lost++;
    } else if (m.home_score < m.away_score) {
      away.won++; away.pts += 3; home.lost++;
    } else {
      home.drawn++; home.pts++;
      away.drawn++; away.pts++;
    }
  }

  for (const standings of Object.values(groups)) {
    standings.forEach(s => { s.gd = s.gf - s.ga; });
    standings.sort((a, b) => b.pts - a.pts || b.gd - a.gd || b.gf - a.gf || a.name.localeCompare(b.name));
    standings.forEach((s, i) => { s.position = i + 1; });
  }

  return groups;
}

// GET /api/groups — 2 queries (was 25)
router.get('/', cache(30), (req, res) => {
  const db = getDb();
  const teams = db.prepare(
    'SELECT id, name, code, flag, group_id FROM teams WHERE group_id IS NOT NULL ORDER BY group_id, fifa_rank'
  ).all();
  const matches = db.prepare(
    "SELECT home_team_id, away_team_id, home_score, away_score FROM matches WHERE stage = 'group' AND status = 'completed'"
  ).all();
  res.json(buildStandings(teams, matches));
});

// GET /api/groups/:id — 3 queries for a single group (was 25)
router.get('/:id', cache(30), (req, res) => {
  const db = getDb();
  const groupId = req.params.id.toUpperCase();

  const teams = db.prepare(
    'SELECT id, name, code, flag, group_id FROM teams WHERE group_id = ?'
  ).all(groupId);
  if (!teams.length) return res.status(404).json({ error: 'Group not found' });

  const completedMatches = db.prepare(
    "SELECT home_team_id, away_team_id, home_score, away_score FROM matches WHERE group_id = ? AND status = 'completed'"
  ).all(groupId);

  const standings = buildStandings(teams, completedMatches)[groupId] ?? [];

  const allMatches = db.prepare(
    MATCH_WITH_TEAMS + ' WHERE m.group_id = ? ORDER BY m.match_date, m.match_time'
  ).all(groupId);

  res.json({ standings, matches: allMatches });
});

module.exports = router;
