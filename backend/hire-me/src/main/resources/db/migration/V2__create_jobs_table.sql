-- V2__create_jobs_table.sql

CREATE TABLE jobs (
    id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),

    title VARCHAR(255) NOT NULL,
    description VARCHAR(2000) NOT NULL,
    location VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    recruiter_id UUID NOT NULL,

    CONSTRAINT fk_jobs_recruiter
        FOREIGN KEY (recruiter_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);

CREATE INDEX idx_jobs_recruiter_id ON jobs(recruiter_id);
