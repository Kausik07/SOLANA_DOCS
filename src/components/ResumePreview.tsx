interface ResumePreviewProps {
  content: string;
}

export const ResumePreview = ({ content }: ResumePreviewProps) => {
  return (
    <div className="preview-container">
      <h3>Resume Preview</h3>
      <div className="preview-content">
        {content.split('\n').map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>
      <style jsx>{`
        .preview-container {
          margin: 2rem 0;
          padding: 1rem;
          background: #f8f9fa;
          border-radius: 8px;
        }
        .preview-content {
          max-height: 400px;
          overflow-y: auto;
          background: white;
          padding: 1rem;
          border-radius: 4px;
          border: 1px solid #e9ecef;
        }
        .preview-content p {
          margin: 0.25rem 0;
          white-space: pre-wrap;
        }
      `}</style>
    </div>
  );
}; 