import React from "react";

const LoadingSpinner: React.FC = () => {
  return (
    <div
      data-testId="loading-spinner"
      className="flex justify-center items-center"
    >
      <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 border-solid" />
    </div>
  );
};

export default LoadingSpinner;
