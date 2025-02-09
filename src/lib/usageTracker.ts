export const incrementUsage = async (userId: string) => {
  const { data, error } = await supabase.rpc('increment_resume_count', {
    user_id: userId
  });

  if (error) throw new Error('Usage tracking failed');
  return data;
}; 