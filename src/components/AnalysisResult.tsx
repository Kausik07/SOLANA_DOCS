interface AnalysisResultProps {
  analysis: string;
}

export const AnalysisResult = ({ analysis }: AnalysisResultProps) => {
  return (
    <div className="analysis-container">
      <h3>AI Recommendations</h3>
      <div className="recommendations">
        {analysis.split('\n').map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>
      <style jsx>{`
        .analysis-container {
          padding: 1rem;
          background: #f5f5f5;
          border-radius: 8px;
          margin-top: 2rem;
        }
        .recommendations p {
          margin: 0.5rem 0;
          padding: 0.5rem;
          background: white;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
}; 