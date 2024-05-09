-- create table
\c "Chat-App"

CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    message TEXT,
    users INT[],
    sender INT REFERENCES users(id),
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
