import { supabase } from '../lib/supabaseClient';

export const checkUsage = async (userId: string) => {
  const { data: user } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();

  if (!user.subscription_active && user.resume_count >= 5) {
    throw new Error('Usage limit exceeded');
  }
}; 