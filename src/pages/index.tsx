import React, { useState } from 'react';
import { useUser } from "@clerk/nextjs";
import { supabase } from '../lib/supabaseClient';
import FileUpload from '../components/FileUpload';
import AnalysisResult from '../components/AnalysisResult';
import PremiumSubscriptionButton from '../components/PremiumSubscriptionButton';
import { incrementUsage } from '../lib/usageTracker';
import { ResumePreview } from '../components/ResumePreview';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorAlert } from '../components/ErrorAlert';

const extractTextFromFile = async (file: File): Promise<string> => {
  if (file.type === 'application/pdf') {
    // Handle PDF files
    const pdf = await import('pdf-parse');
    const data = await pdf(file.arrayBuffer());
    return data.text;
  } else if (file.type === 'text/plain') {
    // Handle text files
    return await file.text();
  }
  throw new Error('Unsupported file type');
};

export default function Home() {
  const { user } = useUser();
  const [resumeText, setResumeText] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [usageCount, setUsageCount] = useState(0);
  const [resumeContent, setResumeContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (file: File) => {
    if (!user) return;
    
    // Check usage limits
    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (!subscription?.is_active && usageCount >= 5) {
      alert('Please upgrade to premium');
      return;
    }

    setError(null);
    setIsLoading(true);
    try {
      await incrementUsage(user.id);
      // Process file and extract text
      const text = await extractTextFromFile(file);
      setResumeContent(text);
      setResumeText(text);

      // Analyze with DeepSeek
      const response = await fetch('/api/analyze-resume', {
        method: 'POST',
        body: JSON.stringify({ text, userId: user.id })
      });
      
      const result = await response.json();
      setAnalysis(result.analysis);
      setUsageCount(prev => prev + 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {error && <ErrorAlert message={error} onClose={() => setError(null)} />}
      {isLoading ? <LoadingSpinner /> : (
        <>
          <FileUpload onUpload={handleFileUpload} />
          {resumeContent && <ResumePreview content={resumeContent} />}
          {analysis && <AnalysisResult analysis={analysis} />}
        </>
      )}
      <PremiumSubscriptionButton />
    </div>
  );
}