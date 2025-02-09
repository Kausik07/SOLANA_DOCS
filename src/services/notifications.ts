import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY!);

export const sendUsageAlert = async (email: string, count: number) => {
  await resend.emails.send({
    from: 'noreply@resume-ai.com',
    to: email,
    subject: 'Usage Limit Alert',
    html: `
      <p>You've used ${count}/5 free analyses. 
      ${5 - count} remaining before requiring premium subscription.</p>
    `
  });
};

export const sendAnalysisReport = async (email: string, analysis: string) => {
  await resend.emails.send({
    from: 'noreply@resume-ai.com',
    to: email,
    subject: 'Your Resume Analysis Report',
    text: analysis
  });
}; 