// Static data layer — data is embedded in data.js, no fetch calls required.

import { TEAMS, MATCHES, PLAYERS } from './data.js';

// ── Standings computation (ported from routes/groups.js) ──────────────────────
function buildStandings(teams, completedMatches) {
  const teamMap = {}, groups = {};
  for (const t of teams) {
    const e = { id:t.id, name:t.name, code:t.code, flag:t.flag, iso2:t.iso2,
      played:0, won:0, drawn:0, lost:0, gf:0, ga:0, gd:0, pts:0 };
    teamMap[t.id] = e;
    if (!groups[t.group_id]) groups[t.group_id] = [];
    groups[t.group_id].push(e);
  }
  for (const m of completedMatches) {
    const h = teamMap[m.home_team_id], a = teamMap[m.away_team_id];
    if (!h || !a) continue;
    h.played++; a.played++;
    h.gf += m.home_score; h.ga += m.away_score;
    a.gf += m.away_score; a.ga += m.home_score;
    if (m.home_score > m.away_score)      { h.won++; h.pts += 3; a.lost++; }
    else if (m.home_score < m.away_score) { a.won++; a.pts += 3; h.lost++; }
    else                                  { h.drawn++; h.pts++; a.drawn++; a.pts++; }
  }
  for (const gid of Object.keys(groups)) {
    groups[gid].sort((a, b) => b.pts - a.pts || (b.gd - a.gd) || (b.gf - a.gf) || a.name.localeCompare(b.name));
    groups[gid].forEach((t, i) => { t.gd = t.gf - t.ga; t.position = i + 1; });
  }
  return groups;
}

function todayISO() {
  return new Date().toISOString().split('T')[0];
}

// ── Public API (same shape as the Express backend) ───────────────────────────
export const api = {
  teams: {
    async list(params = {}) {
      if (params.group) return TEAMS.filter(t => t.group_id === params.group);
      return TEAMS;
    },
    async get(id) {
      const team = TEAMS.find(t => t.id === Number(id));
      if (!team) throw new Error('Team not found');
      return {
        ...team,
        players: PLAYERS.filter(p => p.team_id === team.id),
        matches: MATCHES.filter(m => m.home_team_id === team.id || m.away_team_id === team.id),
      };
    },
  },

  matches: {
    async list(params = {}) {
      let ms = MATCHES;
      if (params.status)             ms = ms.filter(m => m.status === params.status);
      if (params.group)              ms = ms.filter(m => m.group_id === params.group);
      if (params.stage === 'knockout') ms = ms.filter(m => m.stage !== 'group');
      else if (params.stage)         ms = ms.filter(m => m.stage === params.stage);
      if (params.date)               ms = ms.filter(m => m.match_date === params.date);
      return ms;
    },
    async get(id) {
      const m = MATCHES.find(m => m.id === Number(id));
      if (!m) throw new Error('Match not found');
      return m;
    },
    async live()  { return MATCHES.filter(m => m.status === 'live');  },
    async today() { return MATCHES.filter(m => m.match_date === todayISO()); },
  },

  groups: {
    async all() {
      const groupTeams   = TEAMS.filter(t => t.group_id);
      const completed    = MATCHES.filter(m => m.stage === 'group' && m.status === 'completed');
      const standings    = buildStandings(groupTeams, completed);
      const groupMatches = MATCHES.filter(m => m.stage === 'group');
      const result = {};
      for (const gid of Object.keys(standings)) {
        result[gid] = { teams: standings[gid], matches: groupMatches.filter(m => m.group_id === gid) };
      }
      return result;
    },
    async get(id) {
      const gid        = String(id).toUpperCase();
      const groupTeams = TEAMS.filter(t => t.group_id === gid);
      const completed  = MATCHES.filter(m => m.group_id === gid && m.status === 'completed');
      const standings  = buildStandings(groupTeams, completed);
      return { teams: standings[gid] || [], matches: MATCHES.filter(m => m.group_id === gid) };
    },
  },

  stats: {
    async summary() {
      const completed  = MATCHES.filter(m => m.status === 'completed');
      const live       = MATCHES.filter(m => m.status === 'live');
      const totalGoals = completed.reduce((s, m) => s + (m.home_score ?? 0) + (m.away_score ?? 0), 0);
      const today      = todayISO();
      const nextMatch  = MATCHES.find(m => m.status === 'scheduled' && m.match_date >= today) || null;
      return {
        totalMatches: completed.length,
        liveMatches:  live.length,
        totalGoals,
        avgGoals: completed.length ? (totalGoals / completed.length).toFixed(2) : '0.00',
        nextMatch,
      };
    },
    async scorers() {
      return [...PLAYERS]
        .filter(p => p.goals > 0 || p.assists > 0)
        .sort((a, b) => b.goals - a.goals || b.assists - a.assists);
    },
  },
};
