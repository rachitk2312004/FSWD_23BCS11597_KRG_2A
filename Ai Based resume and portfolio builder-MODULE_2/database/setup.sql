-- Database setup script for AI Resume & Portfolio Builder
-- Run this script to create the database and tables
-- Note: For Render PostgreSQL, the database is already created
-- Connect to the database: resume_portfolio_builder

-- Create users table
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    is_public_by_default BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create resumes table
CREATE TABLE resumes (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    template_id INTEGER,
    status VARCHAR(20) NOT NULL DEFAULT 'IN_PROGRESS',
    json_content TEXT,
    is_public BOOLEAN NOT NULL DEFAULT FALSE,
    public_link VARCHAR(255) UNIQUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create portfolios table
CREATE TABLE portfolios (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'IN_PROGRESS',
    json_content TEXT,
    is_public BOOLEAN NOT NULL DEFAULT FALSE,
    public_link VARCHAR(255) UNIQUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Resume versions table
CREATE TABLE resume_versions (
    id BIGSERIAL PRIMARY KEY,
    resume_id BIGINT NOT NULL REFERENCES resumes(id) ON DELETE CASCADE,
    json_content TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_resumes_user_id ON resumes(user_id);
CREATE INDEX idx_resumes_public_link ON resumes(public_link);
CREATE INDEX idx_resume_versions_resume_id ON resume_versions(resume_id);
CREATE INDEX idx_portfolios_user_id ON portfolios(user_id);
CREATE INDEX idx_portfolios_public_link ON portfolios(public_link);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_resumes_updated_at BEFORE UPDATE ON resumes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_portfolios_updated_at BEFORE UPDATE ON portfolios
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data (optional)
INSERT INTO users (name, email, password_hash, is_public_by_default) VALUES
('John Doe', 'john@example.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', false),
('Jane Smith', 'jane@example.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', true);

-- Insert sample resumes
INSERT INTO resumes (user_id, title, status, json_content, is_public, public_link) VALUES
(1, 'Software Engineer Resume', 'COMPLETED', '{"name": "John Doe", "title": "Software Engineer", "experience": []}', true, 'john-doe-software-engineer'),
(1, 'Senior Developer Resume', 'IN_PROGRESS', '{"name": "John Doe", "title": "Senior Developer", "experience": []}', false, NULL),
(2, 'UX Designer Portfolio', 'COMPLETED', '{"name": "Jane Smith", "title": "UX Designer", "projects": []}', true, 'jane-smith-ux-designer');

-- Insert sample portfolios
INSERT INTO portfolios (user_id, title, status, json_content, is_public, public_link) VALUES
(1, 'Developer Portfolio', 'COMPLETED', '{"name": "John Doe", "title": "Full Stack Developer", "projects": []}', true, 'john-doe-developer-portfolio'),
(2, 'Design Portfolio', 'COMPLETED', '{"name": "Jane Smith", "title": "UX/UI Designer", "projects": []}', true, 'jane-smith-design-portfolio');

-- Grant permissions (adjust as needed for your setup)
-- GRANT ALL PRIVILEGES ON DATABASE resume_builder TO your_app_user;
-- GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO your_app_user;
-- GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO your_app_user;
