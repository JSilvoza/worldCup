const BASE = '/api';

async function apiFetch(path, opts = {}) {
  const res = await fetch(BASE + path, opts);
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || `HTTP ${res.status}`);
  }
  return res.json();
}

export const api = {
  teams:   {
    list:   (params = {}) => apiFetch('/teams?' + new URLSearchParams(params)),
    get:    (id)           => apiFetch(`/teams/${id}`),
  },
  matches: {
    list:   (params = {}) => apiFetch('/matches?' + new URLSearchParams(params)),
    get:    (id)           => apiFetch(`/matches/${id}`),
    live:   ()             => apiFetch('/matches/live'),
    today:  ()             => apiFetch('/matches/today'),
  },
  groups:  {
    all:    ()             => apiFetch('/groups'),
    get:    (id)           => apiFetch(`/groups/${id}`),
  },
  stats:   {
    scorers: ()            => apiFetch('/stats/scorers'),
    summary: ()            => apiFetch('/stats/summary'),
  },
};
