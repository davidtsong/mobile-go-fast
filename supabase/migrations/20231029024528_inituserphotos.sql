INSERT INTO storage.buckets (id, name) VALUES ('userphotos', 'userphotos');

CREATE POLICY "Give users access to own folder 2487m_0" ON storage.objects FOR SELECT TO public USING (bucket_id = 'userphotos' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Give users access to own folder 2487m_2" ON storage.objects FOR DELETE TO public USING (bucket_id = 'userphotos' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Give users access to own folder 2487m_1" ON storage.objects FOR INSERT TO public WITH CHECK (bucket_id = 'userphotos' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Give users access to own folder 2487m_3" ON storage.objects FOR UPDATE TO public USING (bucket_id = 'userphotos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE TABLE user_photo_uploads (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES profiles(id),
    storage_path VARCHAR(255) NOT NULL,
    uploaded_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    description TEXT
);

alter table user_photo_uploads enable row level security;

create policy "User can see their own uploads only."
on user_photo_uploads
for select using ( auth.uid() = user_id );


create policy "User can update their own uploads only."
on user_photo_uploads
for update using ( auth.uid() = user_id );

create policy "User can delete their own uploads only."
on user_photo_uploads
for delete using ( auth.uid() = user_id );

create policy "User can insert their own uploads only."
on user_photo_uploads
for insert with check ( auth.uid() = user_id );