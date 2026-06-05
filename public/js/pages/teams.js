import { api } from '../api.js';
import { flagImg } from './shared.js';

export async function renderTeams(el) {
  const teams = (await api.teams.list()).sort((a, b) => a.name.localeCompare(b.name));
  const groups = [...new Set(teams.map(t => t.group_id).filter(Boolean))].sort();
  const confs  = [...new Set(teams.map(t => t.confederation))].sort();

  function filtered(gf, cf, qf) {
    return teams.filter(t => {
      if (gf && t.group_id !== gf) return false;
      if (cf && t.confederation !== cf) return false;
      if (qf) {
        const q = qf.toLowerCase();
        if (!t.name.toLowerCase().includes(q) && !t.code.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }

  function renderGrid(ts) {
    if (ts.length === 0) return `<div class="empty-state"><div class="empty-state-icon">🌍</div><div class="empty-state-title">No teams found</div></div>`;
    return `<div class="teams-grid">
      ${ts.map(t => `
      <div class="team-card" onclick="location.hash='#/teams/${t.id}'">
        <div class="team-card-flag">${flagImg(t.iso2, t.name, 52)}</div>
        <div class="team-card-name">${t.name}</div>
        <div class="team-card-group">Group ${t.group_id}${t.is_host ? ' 🏠' : ''}</div>
        <div class="team-card-rank">#${t.fifa_rank} FIFA</div>
      </div>`).join('')}
    </div>`;
  }

  el.innerHTML = `
    <div class="page-header">
      <div>
        <div class="page-title">Teams</div>
        <div class="page-subtitle">48 nations from 6 confederations</div>
      </div>
    </div>

    <div class="filter-bar">
      <input class="filter-input" id="fSearch" placeholder="Search team…" style="min-width:160px" />
      <select class="filter-select" id="fGroup">
        <option value="">All Groups</option>
        ${groups.map(g => `<option value="${g}">Group ${g}</option>`).join('')}
      </select>
      <select class="filter-select" id="fConf">
        <option value="">All Confederations</option>
        ${confs.map(c => `<option value="${c}">${c}</option>`).join('')}
      </select>
    </div>

    <div id="teams-grid-container">
      ${renderGrid(teams)}
    </div>
  `;

  function update() {
    const g = el.querySelector('#fGroup').value;
    const c = el.querySelector('#fConf').value;
    const q = el.querySelector('#fSearch').value;
    el.querySelector('#teams-grid-container').innerHTML = renderGrid(filtered(g, c, q));
  }

  el.querySelectorAll('.filter-select, .filter-input').forEach(i => i.addEventListener('input', update));
}
