CREATE TABLE color_blocks_users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(20) UNIQUE
);

CREATE TABLE color_blocks_settings(
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES color_blocks_users (id) UNIQUE,
    colors VARCHAR(30)[]
);

CREATE TABLE color_blocks_win_streaks(
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES color_blocks_users (id),
    win_streak INTEGER
);

