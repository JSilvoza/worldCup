// Generates public/data/*.json from seed data — NO database dependency.
// Run: node scripts/generate-static.js
// Used by GitHub Actions before deploying to GitHub Pages.

const fs   = require('fs');
const path = require('path');

// ── Teams (48) ──────────────────────────────────────────────────────────────
const teams = [
  { name:'United States',  code:'USA', group_id:'A', flag:'🇺🇸', confederation:'CONCACAF', fifa_rank:11,  is_host:1 },
  { name:'Panama',         code:'PAN', group_id:'A', flag:'🇵🇦', confederation:'CONCACAF', fifa_rank:42,  is_host:0 },
  { name:'Serbia',         code:'SRB', group_id:'A', flag:'🇷🇸', confederation:'UEFA',     fifa_rank:33,  is_host:0 },
  { name:'Algeria',        code:'ALG', group_id:'A', flag:'🇩🇿', confederation:'CAF',      fifa_rank:35,  is_host:0 },
  { name:'Mexico',         code:'MEX', group_id:'B', flag:'🇲🇽', confederation:'CONCACAF', fifa_rank:15,  is_host:1 },
  { name:'Jamaica',        code:'JAM', group_id:'B', flag:'🇯🇲', confederation:'CONCACAF', fifa_rank:55,  is_host:0 },
  { name:'South Korea',    code:'KOR', group_id:'B', flag:'🇰🇷', confederation:'AFC',      fifa_rank:23,  is_host:0 },
  { name:'Austria',        code:'AUT', group_id:'B', flag:'🇦🇹', confederation:'UEFA',     fifa_rank:25,  is_host:0 },
  { name:'Canada',         code:'CAN', group_id:'C', flag:'🇨🇦', confederation:'CONCACAF', fifa_rank:39,  is_host:1 },
  { name:'Ukraine',        code:'UKR', group_id:'C', flag:'🇺🇦', confederation:'UEFA',     fifa_rank:22,  is_host:0 },
  { name:'Honduras',       code:'HON', group_id:'C', flag:'🇭🇳', confederation:'CONCACAF', fifa_rank:78,  is_host:0 },
  { name:'Morocco',        code:'MAR', group_id:'C', flag:'🇲🇦', confederation:'CAF',      fifa_rank:14,  is_host:0 },
  { name:'Argentina',      code:'ARG', group_id:'D', flag:'🇦🇷', confederation:'CONMEBOL', fifa_rank:1,   is_host:0 },
  { name:'Chile',          code:'CHI', group_id:'D', flag:'🇨🇱', confederation:'CONMEBOL', fifa_rank:31,  is_host:0 },
  { name:'Peru',           code:'PER', group_id:'D', flag:'🇵🇪', confederation:'CONMEBOL', fifa_rank:58,  is_host:0 },
  { name:'New Zealand',    code:'NZL', group_id:'D', flag:'🇳🇿', confederation:'OFC',      fifa_rank:95,  is_host:0 },
  { name:'Spain',          code:'ESP', group_id:'E', flag:'🇪🇸', confederation:'UEFA',     fifa_rank:2,   is_host:0 },
  { name:'Japan',          code:'JPN', group_id:'E', flag:'🇯🇵', confederation:'AFC',      fifa_rank:18,  is_host:0 },
  { name:'Senegal',        code:'SEN', group_id:'E', flag:'🇸🇳', confederation:'CAF',      fifa_rank:20,  is_host:0 },
  { name:'Romania',        code:'ROU', group_id:'E', flag:'🇷🇴', confederation:'UEFA',     fifa_rank:46,  is_host:0 },
  { name:'Brazil',         code:'BRA', group_id:'F', flag:'🇧🇷', confederation:'CONMEBOL', fifa_rank:5,   is_host:0 },
  { name:'Colombia',       code:'COL', group_id:'F', flag:'🇨🇴', confederation:'CONMEBOL', fifa_rank:9,   is_host:0 },
  { name:'Ivory Coast',    code:'CIV', group_id:'F', flag:'🇨🇮', confederation:'CAF',      fifa_rank:27,  is_host:0 },
  { name:'Paraguay',       code:'PAR', group_id:'F', flag:'🇵🇾', confederation:'CONMEBOL', fifa_rank:61,  is_host:0 },
  { name:'France',         code:'FRA', group_id:'G', flag:'🇫🇷', confederation:'UEFA',     fifa_rank:3,   is_host:0 },
  { name:'Ecuador',        code:'ECU', group_id:'G', flag:'🇪🇨', confederation:'CONMEBOL', fifa_rank:47,  is_host:0 },
  { name:'Saudi Arabia',   code:'KSA', group_id:'G', flag:'🇸🇦', confederation:'AFC',      fifa_rank:56,  is_host:0 },
  { name:'Nigeria',        code:'NGA', group_id:'G', flag:'🇳🇬', confederation:'CAF',      fifa_rank:37,  is_host:0 },
  { name:'England',        code:'ENG', group_id:'H', flag:'🏴󠁧󠁢󠁥󠁮󠁧󠁿', confederation:'UEFA',     fifa_rank:4,   is_host:0 },
  { name:'Cameroon',       code:'CMR', group_id:'H', flag:'🇨🇲', confederation:'CAF',      fifa_rank:42,  is_host:0 },
  { name:'Bolivia',        code:'BOL', group_id:'H', flag:'🇧🇴', confederation:'CONMEBOL', fifa_rank:83,  is_host:0 },
  { name:'Czech Republic', code:'CZE', group_id:'H', flag:'🇨🇿', confederation:'UEFA',     fifa_rank:40,  is_host:0 },
  { name:'Germany',        code:'GER', group_id:'I', flag:'🇩🇪', confederation:'UEFA',     fifa_rank:12,  is_host:0 },
  { name:'Croatia',        code:'CRO', group_id:'I', flag:'🇭🇷', confederation:'UEFA',     fifa_rank:10,  is_host:0 },
  { name:'Egypt',          code:'EGY', group_id:'I', flag:'🇪🇬', confederation:'CAF',      fifa_rank:36,  is_host:0 },
  { name:'Ghana',          code:'GHA', group_id:'I', flag:'🇬🇭', confederation:'CAF',      fifa_rank:59,  is_host:0 },
  { name:'Portugal',       code:'POR', group_id:'J', flag:'🇵🇹', confederation:'UEFA',     fifa_rank:6,   is_host:0 },
  { name:'Uruguay',        code:'URU', group_id:'J', flag:'🇺🇾', confederation:'CONMEBOL', fifa_rank:16,  is_host:0 },
  { name:'Iran',           code:'IRN', group_id:'J', flag:'🇮🇷', confederation:'AFC',      fifa_rank:24,  is_host:0 },
  { name:'Costa Rica',     code:'CRC', group_id:'J', flag:'🇨🇷', confederation:'CONCACAF', fifa_rank:52,  is_host:0 },
  { name:'Netherlands',    code:'NED', group_id:'K', flag:'🇳🇱', confederation:'UEFA',     fifa_rank:7,   is_host:0 },
  { name:'Belgium',        code:'BEL', group_id:'K', flag:'🇧🇪', confederation:'UEFA',     fifa_rank:8,   is_host:0 },
  { name:'Venezuela',      code:'VEN', group_id:'K', flag:'🇻🇪', confederation:'CONMEBOL', fifa_rank:67,  is_host:0 },
  { name:'Tunisia',        code:'TUN', group_id:'K', flag:'🇹🇳', confederation:'CAF',      fifa_rank:30,  is_host:0 },
  { name:'Italy',          code:'ITA', group_id:'L', flag:'🇮🇹', confederation:'UEFA',     fifa_rank:13,  is_host:0 },
  { name:'Poland',         code:'POL', group_id:'L', flag:'🇵🇱', confederation:'UEFA',     fifa_rank:29,  is_host:0 },
  { name:'Switzerland',    code:'SUI', group_id:'L', flag:'🇨🇭', confederation:'UEFA',     fifa_rank:19,  is_host:0 },
  { name:'Indonesia',      code:'IDN', group_id:'L', flag:'🇮🇩', confederation:'AFC',      fifa_rank:130, is_host:0 },
];

// ── Star players (18 teams × 3) ──────────────────────────────────────────────
const starPlayers = [
  { code:'ARG', players:[{name:'Lionel Messi',pos:'FW',num:10},{name:'Julián Álvarez',pos:'FW',num:9},{name:'Rodrigo De Paul',pos:'MF',num:7}] },
  { code:'BRA', players:[{name:'Vinicius Jr.',pos:'FW',num:7},{name:'Rodrygo',pos:'FW',num:11},{name:'Lucas Paquetá',pos:'MF',num:10}] },
  { code:'FRA', players:[{name:'Kylian Mbappé',pos:'FW',num:10},{name:'Antoine Griezmann',pos:'MF',num:7},{name:'Aurélien Tchouaméni',pos:'MF',num:8}] },
  { code:'ESP', players:[{name:'Pedri',pos:'MF',num:8},{name:'Lamine Yamal',pos:'FW',num:19},{name:'Álvaro Morata',pos:'FW',num:7}] },
  { code:'ENG', players:[{name:'Jude Bellingham',pos:'MF',num:10},{name:'Harry Kane',pos:'FW',num:9},{name:'Phil Foden',pos:'MF',num:47}] },
  { code:'POR', players:[{name:'Cristiano Ronaldo',pos:'FW',num:7},{name:'Bruno Fernandes',pos:'MF',num:8},{name:'Bernardo Silva',pos:'MF',num:10}] },
  { code:'GER', players:[{name:'Florian Wirtz',pos:'MF',num:10},{name:'Jamal Musiala',pos:'MF',num:14},{name:'Kai Havertz',pos:'FW',num:7}] },
  { code:'NED', players:[{name:'Virgil van Dijk',pos:'DF',num:4},{name:'Cody Gakpo',pos:'FW',num:11},{name:'Memphis Depay',pos:'FW',num:10}] },
  { code:'USA', players:[{name:'Christian Pulisic',pos:'FW',num:10},{name:'Gio Reyna',pos:'MF',num:7},{name:'Tyler Adams',pos:'MF',num:4}] },
  { code:'MEX', players:[{name:'Hirving Lozano',pos:'FW',num:22},{name:'Santiago Giménez',pos:'FW',num:9},{name:'Edson Álvarez',pos:'MF',num:6}] },
  { code:'CAN', players:[{name:'Alphonso Davies',pos:'DF',num:19},{name:'Jonathan David',pos:'FW',num:9},{name:'Tajon Buchanan',pos:'MF',num:11}] },
  { code:'MAR', players:[{name:'Hakim Ziyech',pos:'MF',num:7},{name:'Achraf Hakimi',pos:'DF',num:2},{name:'Youssef En-Nesyri',pos:'FW',num:19}] },
  { code:'JPN', players:[{name:'Takumi Minamino',pos:'FW',num:10},{name:'Takefusa Kubo',pos:'FW',num:11},{name:'Wataru Endo',pos:'MF',num:3}] },
  { code:'SEN', players:[{name:'Sadio Mané',pos:'FW',num:10},{name:'Kalidou Koulibaly',pos:'DF',num:3},{name:'Ismaila Sarr',pos:'FW',num:23}] },
  { code:'COL', players:[{name:'James Rodríguez',pos:'MF',num:10},{name:'Luis Díaz',pos:'FW',num:7},{name:'Falcao',pos:'FW',num:9}] },
  { code:'URU', players:[{name:'Darwin Núñez',pos:'FW',num:11},{name:'Federico Valverde',pos:'MF',num:8},{name:'Luis Suárez',pos:'FW',num:9}] },
  { code:'CRO', players:[{name:'Luka Modrić',pos:'MF',num:10},{name:'Mateo Kovačić',pos:'MF',num:8},{name:'Marcelo Brozović',pos:'MF',num:11}] },
  { code:'BEL', players:[{name:'Kevin De Bruyne',pos:'MF',num:7},{name:'Romelu Lukaku',pos:'FW',num:9},{name:'Axel Witsel',pos:'MF',num:6}] },
];

// ── Venues ───────────────────────────────────────────────────────────────────
const venues = [
  { venue:'MetLife Stadium',         city:'New York/New Jersey', country:'USA'    },
  { venue:'SoFi Stadium',            city:'Los Angeles',         country:'USA'    },
  { venue:'AT&T Stadium',            city:'Dallas',              country:'USA'    },
  { venue:"Levi's Stadium",          city:'San Francisco',       country:'USA'    },
  { venue:'Hard Rock Stadium',       city:'Miami',               country:'USA'    },
  { venue:'NRG Stadium',             city:'Houston',             country:'USA'    },
  { venue:'Lincoln Financial Field', city:'Philadelphia',        country:'USA'    },
  { venue:'Arrowhead Stadium',       city:'Kansas City',         country:'USA'    },
  { venue:'Lumen Field',             city:'Seattle',             country:'USA'    },
  { venue:'Estadio Azteca',          city:'Mexico City',         country:'Mexico' },
  { venue:'Estadio Akron',           city:'Guadalajara',         country:'Mexico' },
  { venue:'Estadio BBVA',            city:'Monterrey',           country:'Mexico' },
  { venue:'BC Place',                city:'Vancouver',           country:'Canada' },
  { venue:'BMO Field',               city:'Toronto',             country:'Canada' },
  { venue:'Stade Saputo',            city:'Montreal',            country:'Canada' },
  { venue:'Allegiant Stadium',       city:'Las Vegas',           country:'USA'    },
];

function getVenue(i) { return venues[i % venues.length]; }

function addDays(base, n) {
  const d = new Date(base);
  d.setDate(d.getDate() + n);
  return d.toISOString().split('T')[0];
}

function buildGroupMatches() {
  const groupTeams = {};
  for (const t of teams) {
    if (!groupTeams[t.group_id]) groupTeams[t.group_id] = [];
    groupTeams[t.group_id].push(t.code);
  }
  const groupOrder = 'ABCDEFGHIJKL'.split('');
  const start = '2026-06-11';
  const matches = [];
  let num = 1, dayOff = 0;
  for (const g of groupOrder) {
    const [t1, t2, t3, t4] = groupTeams[g];
    const rounds = [[t1,t4],[t2,t3],[t1,t3],[t2,t4],[t1,t2],[t3,t4]];
    let day = dayOff;
    for (let r = 0; r < 6; r++) {
      const v = getVenue(num);
      matches.push({ match_number: num++, stage: 'group', group_id: g,
        match_date: addDays(start, day), match_time: r%2===0 ? '15:00' : '19:00',
        ...v, home: rounds[r][0], away: rounds[r][1], status: 'scheduled' });
      if (r % 2 === 1) day += 2;
    }
    dayOff += 1;
  }
  return matches;
}

function buildKnockoutShell() {
  const stages = [
    { stage:'r32',   count:16, startDate:'2026-07-01' },
    { stage:'r16',   count:8,  startDate:'2026-07-07' },
    { stage:'qf',    count:4,  startDate:'2026-07-11' },
    { stage:'sf',    count:2,  startDate:'2026-07-14' },
    { stage:'3rd',   count:1,  startDate:'2026-07-18' },
    { stage:'final', count:1,  startDate:'2026-07-19' },
  ];
  const matches = [];
  let num = 73;
  for (const s of stages) {
    for (let i = 0; i < s.count; i++) {
      const v = getVenue(num);
      matches.push({ match_number: num++, stage: s.stage, group_id: null,
        match_date: addDays(s.startDate, Math.floor(i/2)), match_time: i%2===0 ? '15:00' : '19:00',
        ...v, home: null, away: null, status: 'scheduled' });
    }
  }
  return matches;
}

// ── Build IDs ─────────────────────────────────────────────────────────────────
const teamsOut = teams.map((t, i) => ({ id: i + 1, ...t }));
const teamByCode = {};
teamsOut.forEach(t => { teamByCode[t.code] = t; });

// Players
let pid = 1;
const playersOut = [];
for (const { code, players } of starPlayers) {
  const team = teamByCode[code];
  if (!team) continue;
  for (const p of players) {
    playersOut.push({ id: pid++, team_id: team.id, name: p.name, position: p.pos,
      number: p.num, goals: 0, assists: 0,
      team_name: team.name, team_code: team.code, team_flag: team.flag });
  }
}

// Matches — join team names/flags
const allMatches = [...buildGroupMatches(), ...buildKnockoutShell()];
const matchesOut = allMatches.map((m, i) => {
  const ht = m.home ? teamByCode[m.home] : null;
  const at = m.away ? teamByCode[m.away] : null;
  return {
    id: i + 1,
    match_number: m.match_number,
    stage: m.stage,
    group_id: m.group_id,
    match_date: m.match_date,
    match_time: m.match_time,
    venue: m.venue,
    city: m.city,
    country: m.country,
    home_team_id: ht ? ht.id : null,
    away_team_id: at ? at.id : null,
    home_score: null,
    away_score: null,
    status: m.status,
    home_name: ht ? ht.name : null,
    home_code: ht ? ht.code : null,
    home_flag: ht ? ht.flag : null,
    away_name: at ? at.name : null,
    away_code: at ? at.code : null,
    away_flag: at ? at.flag : null,
  };
});

// ── Write files ───────────────────────────────────────────────────────────────
const outDir = path.join(__dirname, '..', 'public', 'data');
fs.mkdirSync(outDir, { recursive: true });

fs.writeFileSync(path.join(outDir, 'teams.json'),   JSON.stringify(teamsOut,   null, 2), 'utf8');
fs.writeFileSync(path.join(outDir, 'matches.json'), JSON.stringify(matchesOut, null, 2), 'utf8');
fs.writeFileSync(path.join(outDir, 'players.json'), JSON.stringify(playersOut, null, 2), 'utf8');

console.log(`Generated: ${teamsOut.length} teams · ${matchesOut.length} matches · ${playersOut.length} players`);
