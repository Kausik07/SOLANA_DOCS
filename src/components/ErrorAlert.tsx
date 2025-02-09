interface ErrorAlertProps {
  message: string;
  onClose?: () => void;
}

export const ErrorAlert = ({ message, onClose }: ErrorAlertProps) => {
  return (
    <div className="error-alert">
      <span>{message}</span>
      {onClose && <button onClick={onClose}>×</button>}
      <style jsx>{`
        .error-alert {
          padding: 1rem;
          background: #ffe6e6;
          border: 1px solid #ffcccc;
          border-radius: 4px;
          color: #cc0000;
          margin: 1rem 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        button {
          background: none;
          border: none;
          color: inherit;
          cursor: pointer;
          font-size: 1.2rem;
        }
      `}</style>
    </div>
  );
}; 