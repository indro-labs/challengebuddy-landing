ALTER TABLE waitlist_emails
    ADD COLUMN IF NOT EXISTS animal TEXT,
    ADD COLUMN IF NOT EXISTS color  TEXT;

ALTER TABLE waitlist_emails
    ADD CONSTRAINT waitlist_emails_animal_check CHECK (animal IS NULL OR animal IN ('cat', 'bear', 'dog'));
