PRAGMA foreign_keys = ON;
PRAGMA journal_mode = WAL;

CREATE TABLE IF NOT EXISTS teams (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  name          TEXT    NOT NULL,
  code          TEXT    NOT NULL UNIQUE,
  group_id      TEXT,
  flag          TEXT    NOT NULL,
  confederation TEXT    NOT NULL,
  fifa_rank     INTEGER DEFAULT 0,
  is_host       INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS players (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  team_id       INTEGER NOT NULL REFERENCES teams(id),
  name          TEXT    NOT NULL,
  position      TEXT    NOT NULL CHECK(position IN ('GK','DF','MF','FW')),
  number        INTEGER,
  goals         INTEGER DEFAULT 0,
  assists       INTEGER DEFAULT 0,
  yellow_cards  INTEGER DEFAULT 0,
  red_cards     INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS matches (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  match_number  INTEGER NOT NULL,
  stage         TEXT    NOT NULL CHECK(stage IN ('group','r32','r16','qf','sf','3rd','final')),
  group_id      TEXT,
  match_date    TEXT    NOT NULL,
  match_time    TEXT    NOT NULL,
  venue         TEXT    NOT NULL,
  city          TEXT    NOT NULL,
  country       TEXT    NOT NULL,
  home_team_id  INTEGER REFERENCES teams(id),
  away_team_id  INTEGER REFERENCES teams(id),
  home_score    INTEGER,
  away_score    INTEGER,
  home_pens     INTEGER,
  away_pens     INTEGER,
  status        TEXT    NOT NULL DEFAULT 'scheduled'
                CHECK(status IN ('scheduled','live','completed')),
  minute        INTEGER
);

CREATE TABLE IF NOT EXISTS goals (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  match_id    INTEGER NOT NULL REFERENCES matches(id) ON DELETE CASCADE,
  team_id     INTEGER NOT NULL REFERENCES teams(id),
  player_id   INTEGER REFERENCES players(id),
  minute      INTEGER NOT NULL,
  is_penalty  INTEGER DEFAULT 0,
  is_own_goal INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS cards (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  match_id    INTEGER NOT NULL REFERENCES matches(id) ON DELETE CASCADE,
  team_id     INTEGER NOT NULL REFERENCES teams(id),
  player_id   INTEGER REFERENCES players(id),
  minute      INTEGER NOT NULL,
  card_type   TEXT    NOT NULL CHECK(card_type IN ('yellow','red','second_yellow'))
);

-- Indexes for the query patterns used in every route
CREATE INDEX IF NOT EXISTS idx_matches_status   ON matches(status);
CREATE INDEX IF NOT EXISTS idx_matches_group    ON matches(group_id);
CREATE INDEX IF NOT EXISTS idx_matches_date     ON matches(match_date);
CREATE INDEX IF NOT EXISTS idx_matches_stage    ON matches(stage);
CREATE INDEX IF NOT EXISTS idx_matches_home     ON matches(home_team_id);
CREATE INDEX IF NOT EXISTS idx_matches_away     ON matches(away_team_id);
CREATE INDEX IF NOT EXISTS idx_players_team     ON players(team_id);
CREATE INDEX IF NOT EXISTS idx_goals_match      ON goals(match_id);
CREATE INDEX IF NOT EXISTS idx_cards_match      ON cards(match_id);
