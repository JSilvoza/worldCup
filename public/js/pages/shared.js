export function formatDate(iso) {
  if (!iso) return '';
  const d = new Date(iso + 'T12:00:00');
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

export function stageName(stage) {
  const map = { group: 'Group Stage', r32: 'Round of 32', r16: 'Round of 16', qf: 'Quarter-Finals', sf: 'Semi-Finals', '3rd': 'Third Place', final: 'Final' };
  return map[stage] || stage;
}

export function statusBadge(m) {
  if (m.status === 'live') return `<span class="badge badge-live">🔴 LIVE${m.minute ? ' ' + m.minute + '′' : ''}</span>`;
  if (m.status === 'completed') return `<span class="badge badge-completed">FT</span>`;
  return `<span class="badge badge-scheduled">${m.match_time}</span>`;
}

export function matchCard(m) {
  const hasScore = m.status !== 'scheduled';
  const home_score = hasScore ? m.home_score : null;
  const away_score = hasScore ? m.away_score : null;
  const pens = m.home_pens != null ? `<div class="match-pens">Pens: ${m.home_pens} – ${m.away_pens}</div>` : '';

  return `
  <div class="match-card${m.status === 'live' ? ' is-live' : ''}" onclick="location.hash='#/schedule'">
    <div class="match-meta">
      <div class="match-meta-left">
        ${m.group_id ? `<span class="badge badge-group">Group ${m.group_id}</span>` : `<span class="badge badge-group">${stageName(m.stage)}</span>`}
        ${statusBadge(m)}
      </div>
      <div style="text-align:right">
        <div>${formatDate(m.match_date)}</div>
        <div class="match-venue">${m.venue ?? ''}</div>
      </div>
    </div>
    <div class="match-body">
      <div class="match-team home">
        <span class="team-flag">${m.home_flag ?? '🏳️'}</span>
        <span class="team-name">${m.home_name ?? 'TBD'}</span>
        <span class="team-code">${m.home_code ?? '—'}</span>
      </div>
      <div class="match-score">
        ${hasScore
          ? `<div class="score-display">
              <span>${home_score ?? 0}</span>
              <span class="score-sep">–</span>
              <span>${away_score ?? 0}</span>
             </div>`
          : `<div class="score-tbd">vs</div>`}
        ${pens}
        ${m.status === 'live' ? `<div class="minute-live">${m.minute ?? ''}′</div>` : ''}
        ${m.status === 'scheduled' ? `<div class="match-time-display">${m.match_time}</div>` : ''}
      </div>
      <div class="match-team away">
        <span class="team-flag">${m.away_flag ?? '🏳️'}</span>
        <span class="team-name">${m.away_name ?? 'TBD'}</span>
        <span class="team-code">${m.away_code ?? '—'}</span>
      </div>
    </div>
  </div>`;
}
