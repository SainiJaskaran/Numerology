-- Create the articles storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('articles', 'articles', true)
ON CONFLICT (id) DO NOTHING;

-- Set up RLS policies for the articles bucket
CREATE POLICY "Public Read Access" ON storage.objects
  FOR SELECT
  USING (bucket_id = 'articles');

CREATE POLICY "Admin Upload Access" ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'articles');

CREATE POLICY "Admin Delete Access" ON storage.objects
  FOR DELETE
  USING (bucket_id = 'articles');
