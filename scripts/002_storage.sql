-- Private bucket for meeting audio recordings
insert into storage.buckets (id, name, public)
values ('recordings', 'recordings', false)
on conflict (id) do nothing;

-- RLS policies: users can only access files under their own uid/ prefix
drop policy if exists "recordings_select_own" on storage.objects;
drop policy if exists "recordings_insert_own" on storage.objects;
drop policy if exists "recordings_update_own" on storage.objects;
drop policy if exists "recordings_delete_own" on storage.objects;

create policy "recordings_select_own" on storage.objects
  for select using (
    bucket_id = 'recordings' and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "recordings_insert_own" on storage.objects
  for insert with check (
    bucket_id = 'recordings' and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "recordings_update_own" on storage.objects
  for update using (
    bucket_id = 'recordings' and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "recordings_delete_own" on storage.objects
  for delete using (
    bucket_id = 'recordings' and (storage.foldername(name))[1] = auth.uid()::text
  );
