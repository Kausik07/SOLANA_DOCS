import type { NextApiRequest, NextApiResponse } from 'next';
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { payment_id } = req.body;
  
  try {
    const payment = await razorpay.payments.fetch(payment_id);
    
    if (payment.status === 'captured') {
      await supabase
        .from('subscriptions')
        .upsert({ 
          user_id: req.body.user_id,
          is_active: true,
          expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
        });

      return res.status(200).json({ success: true });
    }
    
    res.status(400).json({ error: 'Payment verification failed' });
  } catch (error) {
    res.status(500).json({ error: 'Payment processing error' });
  }
}