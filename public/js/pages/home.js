import { api } from '../api.js';
import { matchCard, formatDate, flagImg } from './shared.js';

const QUICK_LINKS = [
  { href: '#/groups',   icon: '📊', label: 'Group Standings',  sub: '12 groups · 48 teams'  },
  { href: '#/bracket',  icon: '🏆', label: 'Knockout Bracket', sub: 'R32 through Final'      },
  { href: '#/schedule', icon: '📅', label: 'Full Schedule',     sub: '104 matches total'     },
  { href: '#/teams',    icon: '🌍', label: 'All Teams',         sub: '6 confederations'      },
];

export async function renderHome(el) {
  const [summary, scorers, todayMatches] = await Promise.all([
    api.stats.summary(),
    api.stats.scorers(),
    api.matches.today(),
  ]);

  const topScorers = scorers.slice(0, 5);
  const featuredSection = todayMatches.length > 0
    ? { title: "Today's Matches", matches: todayMatches }
    : summary.nextMatch
      ? { title: 'Next Match', matches: [summary.nextMatch] }
      : null;

  el.innerHTML = `
    <div class="hero-banner">
      <h1>FIFA World Cup 2026</h1>
      <p>The greatest show on earth — hosted across 16 cities in the USA, Canada & Mexico</p>
      <div class="hero-dates">📅 June 11 – July 19, 2026</div>
      <div id="hero-countdown" class="hero-countdown"></div>
    </div>

    <div class="stats-row">
      <div class="stat-card">
        <div class="stat-card-label">Matches Played</div>
        <div class="stat-card-value">${summary.totalMatches}</div>
        <div class="stat-card-sub">of 104 total</div>
      </div>
      <div class="stat-card">
        <div class="stat-card-label">Goals Scored</div>
        <div class="stat-card-value">${summary.totalGoals}</div>
        <div class="stat-card-sub">${summary.avgGoals} per match</div>
      </div>
      <div class="stat-card">
        <div class="stat-card-label">Live Now</div>
        <div class="stat-card-value" style="color:var(--live)">${summary.liveMatches}</div>
        <div class="stat-card-sub">${summary.liveMatches > 0 ? 'Matches in progress' : 'No live matches'}</div>
      </div>
      <div class="stat-card">
        <div class="stat-card-label">Teams</div>
        <div class="stat-card-value">48</div>
        <div class="stat-card-sub">from 6 confederations</div>
      </div>
    </div>

    ${featuredSection ? `
    <div class="section-header">
      <div class="section-title">${featuredSection.title}</div>
      <a href="#/schedule" class="section-link">Full schedule →</a>
    </div>
    <div class="match-grid" style="margin-bottom:2rem">
      ${featuredSection.matches.map(m => matchCard(m)).join('')}
    </div>` : ''}

    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:1.25rem">
      <div>
        <div class="section-header">
          <div class="section-title">🥇 Top Scorers</div>
          <a href="#/teams" class="section-link">All teams →</a>
        </div>
        ${topScorers.length > 0 ? `
        <div class="group-card">
          <table class="scorers-table">
            <thead><tr>
              <th>#</th><th>Player</th><th>Team</th><th>G</th><th>A</th>
            </tr></thead>
            <tbody>
              ${topScorers.map((s, i) => `
              <tr>
                <td class="rank-cell">${i + 1}</td>
                <td><strong>${s.name}</strong></td>
                <td>${flagImg(s.team_iso2, s.team_name, 18)} ${s.team_code}</td>
                <td><strong>${s.goals}</strong></td>
                <td>${s.assists}</td>
              </tr>`).join('')}
            </tbody>
          </table>
        </div>` : `
        <div class="empty-state">
          <div class="empty-state-icon">⚽</div>
          <div class="empty-state-title">No goals yet</div>
          <div class="empty-state-sub">Check back when the tournament begins</div>
        </div>`}
      </div>

      <div>
        <div class="section-header">
          <div class="section-title">🏆 Quick Links</div>
        </div>
        <div style="display:flex;flex-direction:column;gap:.75rem">
          ${QUICK_LINKS.map(l => `
          <a href="${l.href}" class="quick-link">
            <span style="font-size:1.5rem">${l.icon}</span>
            <div>
              <div class="quick-link-label">${l.label}</div>
              <div class="quick-link-sub">${l.sub}</div>
            </div>
          </a>`).join('')}
        </div>
      </div>
    </div>
  `;

  // Countdown to kickoff: June 11 2026 19:00 UTC (Mexico City opener)
  const KICKOFF = new Date('2026-06-11T19:00:00Z');
  const countdownEl = el.querySelector('#hero-countdown');

  function renderCountdown() {
    const diff = KICKOFF - Date.now();
    if (diff <= 0) {
      countdownEl.innerHTML = `<span class="countdown-live">🔴 Tournament is live!</span>`;
      return;
    }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    countdownEl.innerHTML = `
      <div class="countdown-label">Kickoff in</div>
      <div class="countdown-units">
        <div class="countdown-unit"><span class="countdown-val">${d}</span><span class="countdown-name">days</span></div>
        <div class="countdown-sep">:</div>
        <div class="countdown-unit"><span class="countdown-val">${String(h).padStart(2,'0')}</span><span class="countdown-name">hrs</span></div>
        <div class="countdown-sep">:</div>
        <div class="countdown-unit"><span class="countdown-val">${String(m).padStart(2,'0')}</span><span class="countdown-name">min</span></div>
        <div class="countdown-sep">:</div>
        <div class="countdown-unit"><span class="countdown-val">${String(s).padStart(2,'0')}</span><span class="countdown-name">sec</span></div>
      </div>`;
  }

  renderCountdown();
  const _timer = setInterval(() => {
    if (!document.contains(countdownEl)) { clearInterval(_timer); return; }
    renderCountdown();
  }, 1000);
}
