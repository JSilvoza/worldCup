require('dotenv').config();
const { getDb } = require('./db');

const teams = [
  // Group A
  { name: 'United States',   code: 'USA', group_id: 'A', flag: '🇺🇸', confederation: 'CONCACAF', fifa_rank: 11, is_host: 1 },
  { name: 'Panama',          code: 'PAN', group_id: 'A', flag: '🇵🇦', confederation: 'CONCACAF', fifa_rank: 42, is_host: 0 },
  { name: 'Serbia',          code: 'SRB', group_id: 'A', flag: '🇷🇸', confederation: 'UEFA',     fifa_rank: 33, is_host: 0 },
  { name: 'Algeria',         code: 'ALG', group_id: 'A', flag: '🇩🇿', confederation: 'CAF',      fifa_rank: 35, is_host: 0 },
  // Group B
  { name: 'Mexico',          code: 'MEX', group_id: 'B', flag: '🇲🇽', confederation: 'CONCACAF', fifa_rank: 15, is_host: 1 },
  { name: 'Jamaica',         code: 'JAM', group_id: 'B', flag: '🇯🇲', confederation: 'CONCACAF', fifa_rank: 55, is_host: 0 },
  { name: 'South Korea',     code: 'KOR', group_id: 'B', flag: '🇰🇷', confederation: 'AFC',      fifa_rank: 23, is_host: 0 },
  { name: 'Austria',         code: 'AUT', group_id: 'B', flag: '🇦🇹', confederation: 'UEFA',     fifa_rank: 25, is_host: 0 },
  // Group C
  { name: 'Canada',          code: 'CAN', group_id: 'C', flag: '🇨🇦', confederation: 'CONCACAF', fifa_rank: 39, is_host: 1 },
  { name: 'Ukraine',         code: 'UKR', group_id: 'C', flag: '🇺🇦', confederation: 'UEFA',     fifa_rank: 22, is_host: 0 },
  { name: 'Honduras',        code: 'HON', group_id: 'C', flag: '🇭🇳', confederation: 'CONCACAF', fifa_rank: 78, is_host: 0 },
  { name: 'Morocco',         code: 'MAR', group_id: 'C', flag: '🇲🇦', confederation: 'CAF',      fifa_rank: 14, is_host: 0 },
  // Group D
  { name: 'Argentina',       code: 'ARG', group_id: 'D', flag: '🇦🇷', confederation: 'CONMEBOL', fifa_rank: 1,  is_host: 0 },
  { name: 'Chile',           code: 'CHI', group_id: 'D', flag: '🇨🇱', confederation: 'CONMEBOL', fifa_rank: 31, is_host: 0 },
  { name: 'Peru',            code: 'PER', group_id: 'D', flag: '🇵🇪', confederation: 'CONMEBOL', fifa_rank: 58, is_host: 0 },
  { name: 'New Zealand',     code: 'NZL', group_id: 'D', flag: '🇳🇿', confederation: 'OFC',      fifa_rank: 95, is_host: 0 },
  // Group E
  { name: 'Spain',           code: 'ESP', group_id: 'E', flag: '🇪🇸', confederation: 'UEFA',     fifa_rank: 2,  is_host: 0 },
  { name: 'Japan',           code: 'JPN', group_id: 'E', flag: '🇯🇵', confederation: 'AFC',      fifa_rank: 18, is_host: 0 },
  { name: 'Senegal',         code: 'SEN', group_id: 'E', flag: '🇸🇳', confederation: 'CAF',      fifa_rank: 20, is_host: 0 },
  { name: 'Romania',         code: 'ROU', group_id: 'E', flag: '🇷🇴', confederation: 'UEFA',     fifa_rank: 46, is_host: 0 },
  // Group F
  { name: 'Brazil',          code: 'BRA', group_id: 'F', flag: '🇧🇷', confederation: 'CONMEBOL', fifa_rank: 5,  is_host: 0 },
  { name: 'Colombia',        code: 'COL', group_id: 'F', flag: '🇨🇴', confederation: 'CONMEBOL', fifa_rank: 9,  is_host: 0 },
  { name: 'Ivory Coast',     code: 'CIV', group_id: 'F', flag: '🇨🇮', confederation: 'CAF',      fifa_rank: 27, is_host: 0 },
  { name: 'Paraguay',        code: 'PAR', group_id: 'F', flag: '🇵🇾', confederation: 'CONMEBOL', fifa_rank: 61, is_host: 0 },
  // Group G
  { name: 'France',          code: 'FRA', group_id: 'G', flag: '🇫🇷', confederation: 'UEFA',     fifa_rank: 3,  is_host: 0 },
  { name: 'Ecuador',         code: 'ECU', group_id: 'G', flag: '🇪🇨', confederation: 'CONMEBOL', fifa_rank: 47, is_host: 0 },
  { name: 'Saudi Arabia',    code: 'KSA', group_id: 'G', flag: '🇸🇦', confederation: 'AFC',      fifa_rank: 56, is_host: 0 },
  { name: 'Nigeria',         code: 'NGA', group_id: 'G', flag: '🇳🇬', confederation: 'CAF',      fifa_rank: 37, is_host: 0 },
  // Group H
  { name: 'England',         code: 'ENG', group_id: 'H', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', confederation: 'UEFA',     fifa_rank: 4,  is_host: 0 },
  { name: 'Cameroon',        code: 'CMR', group_id: 'H', flag: '🇨🇲', confederation: 'CAF',      fifa_rank: 42, is_host: 0 },
  { name: 'Bolivia',         code: 'BOL', group_id: 'H', flag: '🇧🇴', confederation: 'CONMEBOL', fifa_rank: 83, is_host: 0 },
  { name: 'Czech Republic',  code: 'CZE', group_id: 'H', flag: '🇨🇿', confederation: 'UEFA',     fifa_rank: 40, is_host: 0 },
  // Group I
  { name: 'Germany',         code: 'GER', group_id: 'I', flag: '🇩🇪', confederation: 'UEFA',     fifa_rank: 12, is_host: 0 },
  { name: 'Croatia',         code: 'CRO', group_id: 'I', flag: '🇭🇷', confederation: 'UEFA',     fifa_rank: 10, is_host: 0 },
  { name: 'Egypt',           code: 'EGY', group_id: 'I', flag: '🇪🇬', confederation: 'CAF',      fifa_rank: 36, is_host: 0 },
  { name: 'Ghana',           code: 'GHA', group_id: 'I', flag: '🇬🇭', confederation: 'CAF',      fifa_rank: 59, is_host: 0 },
  // Group J
  { name: 'Portugal',        code: 'POR', group_id: 'J', flag: '🇵🇹', confederation: 'UEFA',     fifa_rank: 6,  is_host: 0 },
  { name: 'Uruguay',         code: 'URU', group_id: 'J', flag: '🇺🇾', confederation: 'CONMEBOL', fifa_rank: 16, is_host: 0 },
  { name: 'Iran',            code: 'IRN', group_id: 'J', flag: '🇮🇷', confederation: 'AFC',      fifa_rank: 24, is_host: 0 },
  { name: 'Costa Rica',      code: 'CRC', group_id: 'J', flag: '🇨🇷', confederation: 'CONCACAF', fifa_rank: 52, is_host: 0 },
  // Group K
  { name: 'Netherlands',     code: 'NED', group_id: 'K', flag: '🇳🇱', confederation: 'UEFA',     fifa_rank: 7,  is_host: 0 },
  { name: 'Belgium',         code: 'BEL', group_id: 'K', flag: '🇧🇪', confederation: 'UEFA',     fifa_rank: 8,  is_host: 0 },
  { name: 'Venezuela',       code: 'VEN', group_id: 'K', flag: '🇻🇪', confederation: 'CONMEBOL', fifa_rank: 67, is_host: 0 },
  { name: 'Tunisia',         code: 'TUN', group_id: 'K', flag: '🇹🇳', confederation: 'CAF',      fifa_rank: 30, is_host: 0 },
  // Group L
  { name: 'Italy',           code: 'ITA', group_id: 'L', flag: '🇮🇹', confederation: 'UEFA',     fifa_rank: 13, is_host: 0 },
  { name: 'Poland',          code: 'POL', group_id: 'L', flag: '🇵🇱', confederation: 'UEFA',     fifa_rank: 29, is_host: 0 },
  { name: 'Switzerland',     code: 'SUI', group_id: 'L', flag: '🇨🇭', confederation: 'UEFA',     fifa_rank: 19, is_host: 0 },
  { name: 'Indonesia',       code: 'IDN', group_id: 'L', flag: '🇮🇩', confederation: 'AFC',      fifa_rank: 130, is_host: 0 },
];

const venues = [
  { venue: 'MetLife Stadium',         city: 'New York/New Jersey', country: 'USA'    },
  { venue: 'SoFi Stadium',            city: 'Los Angeles',         country: 'USA'    },
  { venue: 'AT&T Stadium',            city: 'Dallas',              country: 'USA'    },
  { venue: "Levi's Stadium",          city: 'San Francisco',       country: 'USA'    },
  { venue: 'Hard Rock Stadium',       city: 'Miami',               country: 'USA'    },
  { venue: 'NRG Stadium',             city: 'Houston',             country: 'USA'    },
  { venue: 'Lincoln Financial Field', city: 'Philadelphia',        country: 'USA'    },
  { venue: 'Arrowhead Stadium',       city: 'Kansas City',         country: 'USA'    },
  { venue: 'Lumen Field',             city: 'Seattle',             country: 'USA'    },
  { venue: 'Estadio Azteca',          city: 'Mexico City',         country: 'Mexico' },
  { venue: 'Estadio Akron',           city: 'Guadalajara',         country: 'Mexico' },
  { venue: 'Estadio BBVA',            city: 'Monterrey',           country: 'Mexico' },
  { venue: 'BC Place',                city: 'Vancouver',           country: 'Canada' },
  { venue: 'BMO Field',               city: 'Toronto',             country: 'Canada' },
  { venue: 'Stade Saputo',            city: 'Montreal',            country: 'Canada' },
  { venue: 'Allegiant Stadium',       city: 'Las Vegas',           country: 'USA'    },
];

function getVenue(i) { return venues[i % venues.length]; }

function buildGroupMatches() {
  const groups = {};
  for (const t of teams) {
    if (!groups[t.group_id]) groups[t.group_id] = [];
    groups[t.group_id].push(t.code);
  }
  const groupOrder = 'ABCDEFGHIJKL'.split('');
  const start = new Date('2026-06-11');
  const matches = [];
  let num = 1, dayOff = 0;
  for (const g of groupOrder) {
    const [t1, t2, t3, t4] = groups[g];
    const rounds = [[t1,t4],[t2,t3],[t1,t3],[t2,t4],[t1,t2],[t3,t4]];
    let day = dayOff;
    for (let r = 0; r < 6; r++) {
      const d = new Date(start); d.setDate(d.getDate() + day);
      const v = getVenue(num);
      matches.push({ match_number: num++, stage: 'group', group_id: g,
        match_date: d.toISOString().split('T')[0], match_time: r%2===0 ? '15:00' : '19:00',
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
    const base = new Date(s.startDate);
    for (let i = 0; i < s.count; i++) {
      const d = new Date(base); d.setDate(d.getDate() + Math.floor(i/2));
      const v = getVenue(num);
      matches.push({ match_number: num++, stage: s.stage, group_id: null,
        match_date: d.toISOString().split('T')[0], match_time: i%2===0 ? '15:00' : '19:00',
        ...v, home: null, away: null, status: 'scheduled' });
    }
  }
  return matches;
}

function seed() {
  const db = getDb();

  db.exec(`DELETE FROM goals`);
  db.exec(`DELETE FROM cards`);
  db.exec(`DELETE FROM matches`);
  db.exec(`DELETE FROM players`);
  db.exec(`DELETE FROM teams`);
  // sqlite_sequence only exists after the first AUTOINCREMENT insert; ignore if absent
  try {
    db.exec(`DELETE FROM sqlite_sequence WHERE name IN ('teams','players','matches','goals','cards')`);
  } catch (_) {}

  const insertTeam = db.prepare(
    `INSERT INTO teams (name,code,group_id,flag,confederation,fifa_rank,is_host) VALUES (?,?,?,?,?,?,?)`
  );

  db.exec('BEGIN');
  try {
    for (const t of teams) {
      insertTeam.run([t.name, t.code, t.group_id, t.flag, t.confederation, t.fifa_rank, t.is_host]);
    }
    db.exec('COMMIT');
  } catch(e) { db.exec('ROLLBACK'); throw e; }

  const teamByCode = {};
  for (const t of db.prepare('SELECT id, code FROM teams').all()) teamByCode[t.code] = t.id;

  const allMatches = [...buildGroupMatches(), ...buildKnockoutShell()];
  const insertMatch = db.prepare(`
    INSERT INTO matches (match_number,stage,group_id,match_date,match_time,venue,city,country,home_team_id,away_team_id,status)
    VALUES (?,?,?,?,?,?,?,?,?,?,?)
  `);

  db.exec('BEGIN');
  try {
    for (const m of allMatches) {
      insertMatch.run([m.match_number, m.stage, m.group_id, m.match_date, m.match_time,
        m.venue, m.city, m.country, m.home ? teamByCode[m.home] : null, m.away ? teamByCode[m.away] : null, m.status]);
    }
    db.exec('COMMIT');
  } catch(e) { db.exec('ROLLBACK'); throw e; }

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

  const insertPlayer = db.prepare(
    `INSERT INTO players (team_id,name,position,number) VALUES (?,?,?,?)`
  );
  let playerCount = 0;
  db.exec('BEGIN');
  try {
    for (const { code, players } of starPlayers) {
      const tid = teamByCode[code];
      if (!tid) continue;
      for (const p of players) {
        insertPlayer.run([tid, p.name, p.pos, p.num]);
        playerCount++;
      }
    }
    db.exec('COMMIT');
  } catch(e) { db.exec('ROLLBACK'); throw e; }

  console.log(`✓ Seeded ${teams.length} teams, ${allMatches.length} matches, ${playerCount} players.`);
}

seed();
