import { supabase } from '../../lib/supabaseClient';
import type { NextApiRequest, NextApiResponse } from 'next';
import { validateUser } from '../../middleware/auth';
import { sendAnalysisReport } from '../../services/notifications';

export default validateUser(async (req, res, user) => {
  const { text, userId } = req.body;
  
  try {
    // Add rate limiting
    const { count } = await supabase
      .from('resume_analyses')
      .select('*', { count: 'exact' })
      .eq('user_id', user.id);

    if (count! >= 5 && !user.subscription_active) {
      return res.status(429).json({ error: 'Usage limit exceeded' });
    }

    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: 'resume-analyzer',
        messages: [{
          role: 'user',
          content: `Analyze this resume and provide recommendations: ${text}`
        }]
      })
    });

    const analysis = await response.json();

    // Store analysis in Supabase
    const { error } = await supabase
      .from('resume_analyses')
      .insert([{ user_id: userId, analysis }]);

    // Send email notification
    await sendAnalysisReport(user.email, analysis);

    res.status(200).json({ analysis });
  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({ error: 'Analysis failed' });
  }
}); 