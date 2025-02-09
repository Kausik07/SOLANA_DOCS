create or replace function increment_resume_count(user_id uuid)
returns void as $$
begin
  update users 
  set resume_count = resume_count + 1 
  where id = user_id;
end;
$$ language plpgsql; 