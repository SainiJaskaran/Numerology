-- Make created_by nullable to work with hardcoded authentication
ALTER TABLE articles ALTER COLUMN created_by DROP NOT NULL;

-- Remove foreign key constraint since we're using hardcoded auth
ALTER TABLE articles DROP CONSTRAINT IF EXISTS articles_created_by_fkey;
