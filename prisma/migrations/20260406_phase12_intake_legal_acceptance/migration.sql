ALTER TABLE intake_forms
  ADD COLUMN IF NOT EXISTS disclosure_accepted boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS assignment_accepted boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS assignment_accepted_at timestamptz NULL,
  ADD COLUMN IF NOT EXISTS assignment_percentage integer NOT NULL DEFAULT 50;

UPDATE intake_forms
SET disclosure_accepted = true
WHERE disclosures_accepted_at IS NOT NULL;
