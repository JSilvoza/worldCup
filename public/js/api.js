// Static data layer — fetches pre-generated JSON files, no backend required.
// All filtering and standings computation happens client-side.

const cache = {};
async function load(file) {
  if (cache[file]) return cache[file];
  const res = await fetch(new URL(`../data/${file}`, import.meta.url));
  if (!res.ok) throw new Error(`Failed to load ${file}`);
  cache[file] = await res.json();
  return cache[file];
}

async function getTeams()   { return load('teams.json');   }
async function getMatches() { return load('matches.json'); }
async function getPlayers() { return load('players.json'); }

// ── Standings (ported from routes/groups.js) ─────────────────────────────────
function buildStandings(teams, completedMatches) {
  const teamMap = {}, groups = {};
  for (const t of teams) {
    const e = { id:t.id, name:t.name, code:t.code, flag:t.flag,
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
    if (m.home_score > m.away_score) { h.won++; h.pts+=3; a.lost++; }
    else if (m.home_score < m.away_score) { a.won++; a.pts+=3; h.lost++; }
    else { h.drawn++; h.pts++; a.drawn++; a.pts++; }
  }
  for (const gid of Object.keys(groups)) {
    groups[gid].sort((a, b) => b.pts - a.pts || (b.gd - a.gd) || (b.gf - a.gf) || a.name.localeCompare(b.name));
    groups[gid].forEach((t, i) => { t.gd = t.gf - t.ga; t.position = i + 1; });
  }
  return groups;
}

// ── Today's date ──────────────────────────────────────────────────────────────
function todayISO() {
  return new Date().toISOString().split('T')[0];
}

// ── Public API (same shape as the Express backend) ───────────────────────────
export const api = {
  teams: {
    async list(params = {}) {
      const teams = await getTeams();
      if (params.group) return teams.filter(t => t.group_id === params.group);
      return teams;
    },
    async get(id) {
      const [teams, matches, players] = await Promise.all([getTeams(), getMatches(), getPlayers()]);
      const team = teams.find(t => t.id === Number(id));
      if (!team) throw new Error('Team not found');
      const teamPlayers = players.filter(p => p.team_id === team.id);
      const teamMatches = matches.filter(m =>
        m.home_team_id === team.id || m.away_team_id === team.id
      );
      return { ...team, players: teamPlayers, matches: teamMatches };
    },
  },

  matches: {
    async list(params = {}) {
      let matches = await getMatches();
      if (params.status)     matches = matches.filter(m => m.status === params.status);
      if (params.group)      matches = matches.filter(m => m.group_id === params.group);
      if (params.stage === 'knockout') matches = matches.filter(m => m.stage !== 'group');
      else if (params.stage) matches = matches.filter(m => m.stage === params.stage);
      if (params.date)       matches = matches.filter(m => m.match_date === params.date);
      return matches;
    },
    async get(id) {
      const matches = await getMatches();
      const m = matches.find(m => m.id === Number(id));
      if (!m) throw new Error('Match not found');
      return m;
    },
    async live() {
      const matches = await getMatches();
      return matches.filter(m => m.status === 'live');
    },
    async today() {
      const matches = await getMatches();
      return matches.filter(m => m.match_date === todayISO());
    },
  },

  groups: {
    async all() {
      const [teams, matches] = await Promise.all([getTeams(), getMatches()]);
      const groupTeams   = teams.filter(t => t.group_id);
      const completed    = matches.filter(m => m.stage === 'group' && m.status === 'completed');
      const standings    = buildStandings(groupTeams, completed);
      const groupMatches = matches.filter(m => m.stage === 'group');
      const result = {};
      for (const gid of Object.keys(standings)) {
        result[gid] = {
          teams: standings[gid],
          matches: groupMatches.filter(m => m.group_id === gid),
        };
      }
      return result;
    },
    async get(id) {
      const [teams, matches] = await Promise.all([getTeams(), getMatches()]);
      const gid          = String(id).toUpperCase();
      const groupTeams   = teams.filter(t => t.group_id === gid);
      const completed    = matches.filter(m => m.group_id === gid && m.status === 'completed');
      const standings    = buildStandings(groupTeams, completed);
      const groupMatches = matches.filter(m => m.group_id === gid);
      return { teams: standings[gid] || [], matches: groupMatches };
    },
  },

  stats: {
    async summary() {
      const matches = await getMatches();
      const completed  = matches.filter(m => m.status === 'completed');
      const live       = matches.filter(m => m.status === 'live');
      const totalGoals = completed.reduce((s, m) => s + (m.home_score ?? 0) + (m.away_score ?? 0), 0);
      const avgGoals   = completed.length ? (totalGoals / completed.length).toFixed(2) : '0.00';
      const today      = todayISO();
      const nextMatch  = matches.find(m => m.status === 'scheduled' && m.match_date >= today) || null;
      return {
        totalMatches: completed.length,
        liveMatches:  live.length,
        totalGoals,
        avgGoals,
        nextMatch,
      };
    },
    async scorers() {
      const players = await getPlayers();
      return [...players]
        .filter(p => p.goals > 0 || p.assists > 0)
        .sort((a, b) => b.goals - a.goals || b.assists - a.assists);
    },
  },
};
