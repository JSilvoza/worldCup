import { api } from '../api.js';
import { matchCard, formatDate, flagImg } from './shared.js';

const QUICK_LINKS = [
  { href: '#/groups',   icon: '📊', label: 'Group Standings',  sub: '12 groups · 48 teams'  },
  { href: '#/bracket',  icon: '🏆', label: 'Knockout Bracket', sub: 'R32 through Final'      },
  { href: '#/schedule', icon: '📅', label: 'Full Schedule',     sub: '104 matches total'     },
  { href: '#/teams',    icon: '🌍', label: 'All Teams',         sub: '6 confederations'      },
];

export async function renderHome(el) {
  const [summary, scorers, todayMatches, allMatches] = await Promise.all([
    api.stats.summary(),
    api.stats.scorers(),
    api.matches.today(),
    api.matches.list({ status: 'scheduled' }),
  ]);

  const topScorers = scorers.slice(0, 5);

  let featuredSection = null;
  if (todayMatches.length > 0) {
    featuredSection = { title: "Today's Matches", matches: todayMatches };
  } else if (summary.nextMatch) {
    const nextDate = summary.nextMatch.match_date;
    const nextDayMatches = allMatches.filter(m => m.match_date === nextDate);
    const d = new Date(nextDate + 'T12:00:00');
    const day  = d.toLocaleDateString('en-US', { weekday: 'long' });
    const mon  = d.toLocaleDateString('en-US', { month: 'long' });
    const num  = d.getDate();
    const ord  = num === 1 || num === 21 || num === 31 ? 'st' : num === 2 || num === 22 ? 'nd' : num === 3 || num === 23 ? 'rd' : 'th';
    featuredSection = { title: `First Match Begins ${day}, ${mon} ${num}${ord}`, matches: nextDayMatches };
  }

  el.innerHTML = `
    <div class="hero-banner">
      <h1>FIFA World Cup 2026</h1>
      <p>The greatest show on Earth — hosted across 16 cities in the USA, Canada & Mexico</p>
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
          <div class="empty-state-icon">
            <svg viewBox="0 0 80 80" width="44" height="44" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <radialGradient id="ballGrad" cx="38%" cy="32%" r="65%">
                  <stop offset="0%" stop-color="#1e3460"/>
                  <stop offset="100%" stop-color="#090f1e"/>
                </radialGradient>
              </defs>
              <circle cx="40" cy="40" r="37" fill="url(#ballGrad)" stroke="rgba(34,211,238,.25)" stroke-width="1.5"/>
              <polygon points="40,21 52,30 48,44 32,44 28,30" fill="rgba(255,255,255,.82)"/>
              <polygon points="52,30 65,25 68,39 56,46 48,44" fill="rgba(255,255,255,.82)"/>
              <polygon points="56,46 68,39 70,54 58,61 51,55" fill="rgba(255,255,255,.82)"/>
              <polygon points="46,59 51,55 58,61 53,71 40,69" fill="rgba(255,255,255,.82)"/>
              <polygon points="34,59 40,69 27,71 22,61 29,55" fill="rgba(255,255,255,.82)"/>
              <polygon points="24,46 29,55 22,61 12,54 12,39" fill="rgba(255,255,255,.82)"/>
              <polygon points="28,30 32,44 24,46 12,39 15,25" fill="rgba(255,255,255,.82)"/>
              <circle cx="40" cy="40" r="37" fill="none" stroke="rgba(255,255,255,.06)" stroke-width="1"/>
            </svg>
          </div>
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
