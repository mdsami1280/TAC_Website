-- Create admin user for Aarya Club
-- Password: admin123 (encrypted with BCrypt)

INSERT INTO admin (username, email, password, full_name) 
VALUES ('admin', 'admin@aaryaclub.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', 'Aarya Club Admin')
ON DUPLICATE KEY UPDATE 
    email = 'admin@aaryaclub.com',
    password = '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi',
    full_name = 'Aarya Club Admin';

-- Note: The password 'admin123' is encrypted using BCrypt
-- You can change the password by generating a new BCrypt hash
