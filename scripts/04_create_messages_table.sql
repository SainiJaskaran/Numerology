-- Create messages table to store contact form submissions
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create RLS policies
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert messages
CREATE POLICY "Anyone can send messages" ON messages
  FOR INSERT
  WITH CHECK (true);

-- Allow only admins to read messages (we'll handle this in the app)
CREATE POLICY "Public can send messages" ON messages
  FOR INSERT
  WITH CHECK (true);

-- Create index on created_at for faster queries
CREATE INDEX messages_created_at_idx ON messages(created_at DESC);
