import { getAuth } from '@clerk/nextjs/server';
import { NextApiRequest, NextApiResponse } from 'next';

export const validateUser = (handler: Function) => async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { userId } = getAuth(req);
  
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Verify user exists in our database
  const { data: user } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();

  if (!user) {
    return res.status(403).json({ error: 'User not registered' });
  }

  return handler(req, res, user);
}; 