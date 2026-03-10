-- Create appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  birth_date TEXT NOT NULL,
  service TEXT NOT NULL,
  consultation_date DATE NOT NULL,
  consultation_time TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can insert appointments
CREATE POLICY "Anyone can book appointments"
ON appointments FOR INSERT
WITH CHECK (true);

-- Policy: Anyone can view appointments (for email verification, etc)
CREATE POLICY "Anyone can view appointments"
ON appointments FOR SELECT
USING (true);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_appointments_email ON appointments(email);
CREATE INDEX IF NOT EXISTS idx_appointments_created_at ON appointments(created_at);
CREATE INDEX IF NOT EXISTS idx_appointments_consultation_date ON appointments(consultation_date);
