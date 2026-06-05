import { api } from '../api.js';
import { flagImg } from './shared.js';

export async function renderGroups(el) {
  const groups = await api.groups.all();
  const groupIds = Object.keys(groups).sort();

  function standingsTable(standings) {
    return `
    <table class="standings-table">
      <thead><tr>
        <th colspan="2">Team</th>
        <th class="num">P</th>
        <th class="num mob-hide">W</th><th class="num mob-hide">D</th><th class="num mob-hide">L</th>
        <th class="num mob-hide">GF</th><th class="num mob-hide">GA</th>
        <th class="num">GD</th><th class="num">Pts</th>
      </tr></thead>
      <tbody>
        ${standings.map((t, i) => `
        <tr class="pos-${i + 1}" onclick="location.hash='#/teams/${t.id}'" style="cursor:pointer">
          <td class="num"><span class="pos-number">${i + 1}</span></td>
          <td>
            <div class="team-cell">
              ${flagImg(t.iso2, t.name, 15)}
              <span>${t.name}</span>
            </div>
          </td>
          <td class="num">${t.played}</td>
          <td class="num mob-hide">${t.won}</td>
          <td class="num mob-hide">${t.drawn}</td>
          <td class="num mob-hide">${t.lost}</td>
          <td class="num mob-hide">${t.gf}</td>
          <td class="num mob-hide">${t.ga}</td>
          <td class="num">${t.gd >= 0 ? '+' : ''}${t.gd}</td>
          <td class="num pts-cell">${t.pts}</td>
        </tr>`).join('')}
      </tbody>
    </table>`;
  }

  // Single source of truth for group card HTML
  function groupCard(gid) {
    const g = groups[gid];
    return `
    <div class="group-card">
      <div class="group-header">
        <div>
          <div class="group-title">Group ${gid}</div>
          <div class="group-subtitle">${g.teams.map(t => t.code).join(' · ')}</div>
        </div>
      </div>
      ${standingsTable(g.teams)}
    </div>`;
  }

  el.innerHTML = `
    <div class="page-header">
      <div>
        <div class="page-title">Group Stage</div>
        <div class="page-subtitle">12 groups · 48 teams · June 11 – June 27, 2026</div>
      </div>
    </div>

    <div class="tabs" id="group-tabs">
      <button class="tab-btn active" data-gid="all">All Groups</button>
      ${groupIds.map(g => `<button class="tab-btn" data-gid="${g}">Group ${g}</button>`).join('')}
    </div>

    <div id="groups-content">
      <div class="groups-grid">${groupIds.map(groupCard).join('')}</div>
    </div>

    <div style="margin-top:1.5rem;font-size:.72rem;color:var(--text-dim)">
      <span style="border-left:3px solid var(--green);padding-left:.5rem;margin-right:1rem">Advance to knockout</span>
      <span style="border-left:3px solid var(--gold);padding-left:.5rem">Best 3rd place</span>
    </div>
  `;

  el.querySelector('#group-tabs').addEventListener('click', (e) => {
    const btn = e.target.closest('.tab-btn');
    if (!btn) return;
    el.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const content = el.querySelector('#groups-content');
    const gid = btn.dataset.gid;
    content.innerHTML = gid === 'all'
      ? `<div class="groups-grid">${groupIds.map(groupCard).join('')}</div>`
      : groupCard(gid);
  });
}
