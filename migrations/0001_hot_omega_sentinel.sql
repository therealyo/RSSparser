ALTER TABLE posts ADD COLUMN "title" varchar;
CREATE INDEX IF NOT EXISTS title_idx ON posts ("title");