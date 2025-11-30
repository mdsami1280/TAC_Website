-- Database Migration Script for Aarya Club
-- Add new columns to Event table to support enhanced features

-- Add new columns to Event table
ALTER TABLE event ADD COLUMN registration_form_url VARCHAR(500);
ALTER TABLE event ADD COLUMN photo_gallery_url VARCHAR(500);
ALTER TABLE event ADD COLUMN category VARCHAR(50) DEFAULT 'cultural';
ALTER TABLE event ADD COLUMN location VARCHAR(200);
ALTER TABLE event ADD COLUMN max_participants INT;
ALTER TABLE event ADD COLUMN current_participants INT DEFAULT 0;

-- Update existing events to have default category
UPDATE event SET category = 'cultural' WHERE category IS NULL;

-- Add indexes for better performance
CREATE INDEX idx_event_category ON event(category);
CREATE INDEX idx_event_date ON event(date);
CREATE INDEX idx_member_active ON member(active);

-- Add constraints
ALTER TABLE event ADD CONSTRAINT chk_category CHECK (category IN ('cultural', 'sports', 'academic', 'social', 'other'));
ALTER TABLE event ADD CONSTRAINT chk_max_participants CHECK (max_participants IS NULL OR max_participants > 0);
ALTER TABLE event ADD CONSTRAINT chk_current_participants CHECK (current_participants >= 0);

-- Sample data for testing (optional)
-- INSERT INTO event (title, date, description, category, location, max_participants, registration_form_url) 
-- VALUES ('Cultural Festival 2024', '2024-03-15', 'Annual cultural festival showcasing diverse talents', 'cultural', 'Main Auditorium', 200, 'https://forms.gle/sample-form-id');

-- INSERT INTO event (title, date, description, category, location, max_participants, photo_gallery_url) 
-- VALUES ('Sports Day 2023', '2023-12-10', 'Annual sports competition', 'sports', 'Sports Complex', 150, 'https://drive.google.com/drive/folders/sample-folder-id');
