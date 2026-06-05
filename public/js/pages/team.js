import { api } from '../api.js';
import { matchCard, flagImg } from './shared.js';

const posOrder = { GK: 0, DF: 1, MF: 2, FW: 3 };
const posLabel  = { GK: 'Goalkeepers', DF: 'Defenders', MF: 'Midfielders', FW: 'Forwards' };

export async function renderTeam(el, { id }) {
  const team = await api.teams.get(id);

  const byPos = {};
  for (const p of team.players) {
    if (!byPos[p.position]) byPos[p.position] = [];
    byPos[p.position].push(p);
  }

  const posGroups = Object.keys(byPos).sort((a, b) => posOrder[a] - posOrder[b]);

  const upcomingMatches = team.matches.filter(m => m.status !== 'completed').slice(0, 3);
  const recentMatches   = team.matches.filter(m => m.status === 'completed').slice(-3).reverse();

  el.innerHTML = `
    <div style="margin-bottom:1rem">
      <a href="#/teams" style="color:var(--text-muted);font-size:.85rem">← All Teams</a>
    </div>

    <div class="team-hero">
      <div class="team-hero-flag">${flagImg(team.iso2, team.name, 80)}</div>
      <div class="team-hero-info">
        <h1>${team.name} ${team.is_host ? '🏠' : ''}</h1>
        <div class="team-hero-meta">
          <span>Group ${team.group_id}</span>
          <span>${team.confederation}</span>
          <span>FIFA Rank #${team.fifa_rank}</span>
        </div>
      </div>
    </div>

    ${team.players.length > 0 ? `
    <div style="margin-bottom:2rem">
      <div class="section-header" style="margin-bottom:1rem">
        <div class="section-title">Squad</div>
      </div>
      ${posGroups.map(pos => `
      <div style="margin-bottom:1.25rem">
        <div style="font-size:.75rem;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--text-muted);margin-bottom:.6rem">${posLabel[pos]}</div>
        <div class="players-grid">
          ${byPos[pos].map(p => `
          <div class="player-card">
            <div class="player-card-number">${p.number ?? '—'}</div>
            <div class="player-card-name">${p.name}</div>
            <div class="player-card-meta">${p.position}</div>
            ${p.goals > 0 || p.assists > 0 ? `
            <div class="player-card-stats">
              ${p.goals > 0 ? `<div class="player-stat">⚽ <strong>${p.goals}</strong></div>` : ''}
              ${p.assists > 0 ? `<div class="player-stat">🅰️ <strong>${p.assists}</strong></div>` : ''}
            </div>` : ''}
          </div>`).join('')}
        </div>
      </div>`).join('')}
    </div>` : ''}

    ${recentMatches.length > 0 ? `
    <div style="margin-bottom:2rem">
      <div class="section-header" style="margin-bottom:1rem">
        <div class="section-title">Recent Results</div>
      </div>
      <div class="match-grid">
        ${recentMatches.map(m => matchCard(m)).join('')}
      </div>
    </div>` : ''}

    ${upcomingMatches.length > 0 ? `
    <div>
      <div class="section-header" style="margin-bottom:1rem">
        <div class="section-title">Upcoming Fixtures</div>
      </div>
      <div class="match-grid">
        ${upcomingMatches.map(m => matchCard(m)).join('')}
      </div>
    </div>` : ''}
  `;
}
