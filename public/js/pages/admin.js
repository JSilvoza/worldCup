// Admin panel — accessible at #/admin
// ADMIN_PASSWORD is set via server env var (default: 'changeme')

export async function renderAdmin(el) {
  const password = prompt('Admin password:');
  if (!password) { location.hash = '#/'; return; }

  // Auth header lives in the JS closure — never written to the DOM
  const authHeader = 'Basic ' + btoa('admin:' + password);

  async function apiCall(url, method, body) {
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json', Authorization: authHeader },
      body: JSON.stringify(body),
    });
    return res.json();
  }

  const matches = await fetch('/api/matches?stage=group').then(r => r.json());
  const recent = matches
    .filter(m => m.match_date <= new Date().toISOString().split('T')[0])
    .slice(0, 20);

  el.innerHTML = `
    <div class="page-header">
      <div class="page-title">🔒 Admin Panel</div>
    </div>
    <p style="color:var(--text-muted);margin-bottom:1.5rem;font-size:.85rem">
      Update match scores and status. Changes invalidate the cache immediately.
    </p>
    <div style="display:flex;flex-direction:column;gap:.75rem">
      ${recent.map(m => `
      <div class="group-card" style="padding:1rem" data-match-id="${m.id}">
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:.75rem">
          <span style="font-size:.85rem;font-weight:600">
            ${m.home_flag ?? ''} ${m.home_name ?? 'TBD'} vs ${m.away_name ?? 'TBD'} ${m.away_flag ?? ''}
          </span>
          <div style="display:flex;gap:.5rem;flex-wrap:wrap;align-items:center">
            <input type="number" min="0" max="30" placeholder="H" value="${m.home_score ?? ''}"
              class="filter-input" style="width:50px;text-align:center" data-field="home" />
            <span style="color:var(--text-dim)">–</span>
            <input type="number" min="0" max="30" placeholder="A" value="${m.away_score ?? ''}"
              class="filter-input" style="width:50px;text-align:center" data-field="away" />
            <select class="filter-select" data-field="status">
              <option value="scheduled"${m.status === 'scheduled' ? ' selected' : ''}>Scheduled</option>
              <option value="live"${m.status === 'live'      ? ' selected' : ''}>Live</option>
              <option value="completed"${m.status === 'completed'  ? ' selected' : ''}>Completed</option>
            </select>
            <button class="save-btn" style="background:var(--primary);color:#fff;border:none;border-radius:6px;padding:.3rem .8rem;cursor:pointer;font-size:.8rem;font-weight:600">
              Save
            </button>
          </div>
        </div>
        <div class="save-status" style="font-size:.75rem;margin-top:.4rem;min-height:1rem"></div>
      </div>`).join('')}
    </div>
  `;

  // Single delegated handler — auth header stays in the closure
  el.addEventListener('click', async (e) => {
    const btn = e.target.closest('.save-btn');
    if (!btn) return;
    const card   = btn.closest('[data-match-id]');
    const id     = card.dataset.matchId;
    const home   = card.querySelector('[data-field="home"]').value;
    const away   = card.querySelector('[data-field="away"]').value;
    const status = card.querySelector('[data-field="status"]').value;
    const statusEl = card.querySelector('.save-status');

    btn.disabled = true;
    btn.textContent = '…';
    try {
      const result = await apiCall(`/api/matches/${id}`, 'PATCH', {
        home_score: home !== '' ? Number(home) : null,
        away_score: away !== '' ? Number(away) : null,
        status,
      });
      statusEl.textContent = result.ok ? '✓ Saved' : `Error: ${result.error}`;
      statusEl.style.color = result.ok ? 'var(--green)' : 'var(--live)';
    } catch (err) {
      statusEl.textContent = `Error: ${err.message}`;
      statusEl.style.color = 'var(--live)';
    } finally {
      btn.disabled = false;
      btn.textContent = 'Save';
    }
  });
}
