-- Enable Row Level Security
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anonymous read access
CREATE POLICY "Allow anonymous read access"
ON questions
FOR SELECT
TO anon
USING (true);

-- Create policy to allow authenticated users full access
CREATE POLICY "Allow authenticated full access"
ON questions
TO authenticated
USING (true)
WITH CHECK (true);
