
import React from 'react';
import { AlertTriangleIcon } from './icons/AlertTriangleIcon';
import { RefreshIcon } from './icons/RefreshIcon';

interface ErrorViewProps {
  message: string;
  onRetry: () => void;
}

const ErrorView: React.FC<ErrorViewProps> = ({ message, onRetry }) => {
  return (
    <div className="w-full max-w-lg p-8 text-center bg-white rounded-xl shadow-lg border border-red-200">
      <div className="flex justify-center mb-4">
        <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full">
          <AlertTriangleIcon className="w-8 h-8 text-red-600" />
        </div>
      </div>
      <h2 className="text-xl font-bold text-red-700">An Error Occurred</h2>
      <p className="mt-2 text-gray-600">{message}</p>
      <button
        onClick={onRetry}
        className="mt-6 inline-flex items-center justify-center px-5 py-2.5 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-brand-purple hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
      >
        <RefreshIcon className="w-5 h-5 mr-2" />
        Try Again
      </button>
    </div>
  );
};

export default ErrorView;
