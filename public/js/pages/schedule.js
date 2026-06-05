import { api } from '../api.js';
import { matchCard, formatDate, stageName } from './shared.js';

export async function renderSchedule(el) {
  const matches = await api.matches.list();

  const groups = [...new Set(matches.filter(m => m.group_id).map(m => m.group_id))].sort();
  const stages = [...new Set(matches.map(m => m.stage))];

  function filteredMatches(groupFilter, stageFilter, statusFilter) {
    return matches.filter(m => {
      if (groupFilter  && m.group_id !== groupFilter)  return false;
      if (stageFilter  && m.stage    !== stageFilter)  return false;
      if (statusFilter && m.status   !== statusFilter) return false;
      return true;
    });
  }

  function groupByDate(ms) {
    const byDate = {};
    for (const m of ms) {
      if (!byDate[m.match_date]) byDate[m.match_date] = [];
      byDate[m.match_date].push(m);
    }
    return byDate;
  }

  function renderMatches(ms) {
    if (ms.length === 0) return `
      <div class="empty-state">
        <div class="empty-state-icon">📅</div>
        <div class="empty-state-title">No matches found</div>
        <div class="empty-state-sub">Try a different filter</div>
      </div>`;
    return Object.entries(groupByDate(ms)).map(([date, dayMatches]) => `
      <div class="match-day">
        <div class="match-day-header">${formatDate(date)}</div>
        <div class="match-grid">${dayMatches.map(m => matchCard(m)).join('')}</div>
      </div>`).join('');
  }

  el.innerHTML = `
    <div class="page-header">
      <div>
        <div class="page-title">Match Schedule</div>
        <div class="page-subtitle">${matches.length} matches · June 11 – July 19, 2026</div>
      </div>
    </div>

    <div class="filter-bar">
      <select class="filter-select" id="fGroup">
        <option value="">All Groups</option>
        ${groups.map(g => `<option value="${g}">Group ${g}</option>`).join('')}
      </select>
      <select class="filter-select" id="fStage">
        <option value="">All Stages</option>
        ${stages.map(s => `<option value="${s}">${stageName(s)}</option>`).join('')}
      </select>
      <select class="filter-select" id="fStatus">
        <option value="">All Status</option>
        <option value="scheduled">Scheduled</option>
        <option value="live">Live</option>
        <option value="completed">Completed</option>
      </select>
    </div>

    <div id="matches-container">${renderMatches(matches)}</div>
  `;

  function applyFilters() {
    const g  = el.querySelector('#fGroup').value;
    const s  = el.querySelector('#fStage').value;
    const st = el.querySelector('#fStatus').value;
    el.querySelector('#matches-container').innerHTML = renderMatches(filteredMatches(g, s, st));
  }

  el.querySelectorAll('.filter-select').forEach(s => s.addEventListener('change', applyFilters));
}
