export const LoadingSpinner = () => (
  <div className="spinner-container">
    <div className="spinner"></div>
    <style jsx>{`
      .spinner-container {
        display: grid;
        place-items: center;
        height: 200px;
      }
      .spinner {
        width: 40px;
        height: 40px;
        border: 3px solid #f3f3f3;
        border-top: 3px solid #3498db;
        border-radius: 50%;
        animation: spin 1s linear infinite;
      }
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
); 