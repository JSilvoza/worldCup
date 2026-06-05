import { api } from '../api.js';

export async function renderBracket(el) {
  // Only fetch knockout matches — 32 rows instead of 104
  const matches = await api.matches.list({ stage: 'knockout' });

  const byStage = { r32: [], r16: [], qf: [], sf: [], '3rd': [], final: [] };
  for (const m of matches) {
    if (byStage[m.stage]) byStage[m.stage].push(m);
  }

  function bracketTeam(name, flag, score, advancing) {
    return `<div class="bracket-team${advancing ? ' advancing' : ''}">
      <div class="bracket-team-left">
        <span>${name ? (flag || '🏳️') : '🏳️'}</span>
        ${name ? `<span>${name}</span>` : `<span class="bracket-tbd">TBD</span>`}
      </div>
      <span class="bracket-score">${score ?? ''}</span>
    </div>`;
  }

  function bracketMatch(m) {
    const completed = m.status === 'completed';
    const homeWins = completed && m.home_score !== null &&
      (m.home_score > m.away_score || (m.home_score === m.away_score && m.home_pens > m.away_pens));
    const awayWins = completed && m.away_score !== null &&
      (m.away_score > m.home_score || (m.home_score === m.away_score && m.away_pens > m.home_pens));
    return `<div class="bracket-match${completed ? ' winner' : ''}">
      ${bracketTeam(m.home_name, m.home_flag, m.home_score, homeWins)}
      ${bracketTeam(m.away_name, m.away_flag, m.away_score, awayWins)}
    </div>`;
  }

  function round(label, ms) {
    if (!ms.length) return '';
    return `
    <div class="bracket-round">
      <div class="bracket-round-header">${label}</div>
      <div class="bracket-slots">${ms.map(bracketMatch).join('')}</div>
    </div>`;
  }

  el.innerHTML = `
    <div class="page-header">
      <div>
        <div class="page-title">Knockout Bracket</div>
        <div class="page-subtitle">Round of 32 → Final · July 1 – July 19, 2026</div>
      </div>
    </div>

    <div class="bracket-wrapper">
      <div class="bracket">
        ${round('Round of 32',   byStage.r32.slice(0, 8))}
        ${round('Round of 16',   byStage.r16.slice(0, 4))}
        ${round('Quarter-Finals',byStage.qf.slice(0, 2))}
        ${round('Semi-Finals',   byStage.sf)}
        <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1rem">
          ${byStage.final[0] ? `
          <div>
            <div style="text-align:center;font-size:.7rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--gold);margin-bottom:.5rem">⚽ Final</div>
            ${bracketMatch(byStage.final[0])}
          </div>` : ''}
          ${byStage['3rd'][0] ? `
          <div>
            <div style="text-align:center;font-size:.7rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--text-muted);margin-bottom:.5rem">3rd Place</div>
            ${bracketMatch(byStage['3rd'][0])}
          </div>` : ''}
        </div>
      </div>
    </div>

    ${byStage.r32.length > 8 ? `
    <div style="margin-top:2rem">
      <div class="section-title" style="margin-bottom:1rem">Full Round of 32</div>
      <div class="bracket-wrapper">
        <div class="bracket">
          ${round('Bracket B',    byStage.r32.slice(8, 16))}
          ${round('Round of 16',  byStage.r16.slice(4, 8))}
          ${round('Quarter-Finals', byStage.qf.slice(2, 4))}
        </div>
      </div>
    </div>` : ''}

    <div style="margin-top:1.5rem;font-size:.75rem;color:var(--text-muted)">
      Teams TBD — bracket fills in as group stage concludes.
      <span style="border:1px solid var(--gold);border-radius:4px;padding:.1rem .4rem;font-size:.7rem;color:var(--gold)">Gold border</span> = match completed.
    </div>
  `;
}
