import { api } from './api.js';
import { renderHome }     from './pages/home.js';
import { renderSchedule } from './pages/schedule.js';
import { renderGroups }   from './pages/groups.js';
import { renderBracket }  from './pages/bracket.js';
import { renderTeams }    from './pages/teams.js';
import { renderTeam }     from './pages/team.js';
import { renderAdmin }    from './pages/admin.js';

const appEl       = document.getElementById('app');
const ticker      = document.getElementById('live-ticker');
const tickerTrack = document.getElementById('ticker-track');

// ── Router ─────────────────────────────────────────────────────────────────
const routes = {
  '/':         renderHome,
  '/schedule': renderSchedule,
  '/groups':   renderGroups,
  '/bracket':  renderBracket,
  '/teams':    renderTeams,
  '/admin':    renderAdmin,
};

function getRoute() {
  const hash = location.hash.replace('#', '') || '/';
  const teamMatch = hash.match(/^\/teams\/(\d+)$/);
  if (teamMatch) return { render: renderTeam, params: { id: teamMatch[1] } };
  return { render: routes[hash] || renderHome, params: {} };
}

async function navigate() {
  const { render, params } = getRoute();
  setActive();
  appEl.innerHTML = '<div class="loading-state"><div class="spinner"></div><p>Loading…</p></div>';
  try {
    await render(appEl, params);
  } catch (e) {
    appEl.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">⚠️</div>
        <div class="empty-state-title">Failed to load</div>
        <div class="empty-state-sub">${e.message}</div>
      </div>`;
  }
}

function setActive() {
  const hash = location.hash.replace('#', '') || '/';
  document.querySelectorAll('.main-nav a').forEach(a => {
    const href = a.getAttribute('href').replace('#', '');
    a.classList.toggle('active',
      href === hash || (hash.startsWith('/teams') && a.dataset.page === 'teams')
    );
  });
}

// ── Live ticker ────────────────────────────────────────────────────────────
async function updateTicker() {
  try {
    const live = await api.matches.live();
    if (!live.length) { ticker.style.display = 'none'; return; }
    ticker.style.display = 'flex';
    const items = live.map(m =>
      `🔴 LIVE · ${m.home_flag} ${m.home_code} ${m.home_score ?? 0} – ${m.away_score ?? 0} ${m.away_code} ${m.away_flag} · ${m.minute ?? ''}′`
    );
    tickerTrack.innerHTML = [...items, ...items].map(t => `<span>${t}</span>`).join('');
  } catch (_) {}
}

// ── Nav toggle (mobile) ────────────────────────────────────────────────────
document.getElementById('nav-toggle').addEventListener('click', () => {
  document.getElementById('main-nav').classList.toggle('open');
});
document.querySelectorAll('.main-nav a').forEach(a => {
  a.addEventListener('click', () => document.getElementById('main-nav').classList.remove('open'));
});

// ── Boot ───────────────────────────────────────────────────────────────────
window.addEventListener('hashchange', navigate);
navigate();
updateTicker();
setInterval(updateTicker, 30_000);
