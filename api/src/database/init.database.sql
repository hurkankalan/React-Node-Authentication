GRANT ALL PRIVILEGES ON DATABASE auth_app TO postgres;

\c auth_app;

DROP DATABASE IF EXISTS auth_app;

CREATE DATABASE auth_app;

\c auth_app;

CREATE TYPE role AS ENUM ('admin', 'user');

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role role DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

