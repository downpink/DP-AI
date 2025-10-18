
import React from 'react';
import Spinner from './Spinner';

interface ProcessingViewProps {
  originalImage: string | null;
}

const ProcessingView: React.FC<ProcessingViewProps> = ({ originalImage }) => {
  return (
    <div className="w-full max-w-md flex flex-col items-center p-8 bg-white rounded-xl shadow-lg border border-gray-200">
      {originalImage && (
        <div className="mb-6">
          <img
            src={`data:image/jpeg;base64,${originalImage.split(',')[1] || originalImage}`}
            alt="Original"
            className="rounded-lg max-h-64 object-contain shadow-md"
          />
        </div>
      )}
      <Spinner />
      <h2 className="mt-4 text-xl font-semibold text-gray-700">Processing your image...</h2>
      <p className="text-gray-500 mt-1">AI is doing its magic, please wait.</p>
    </div>
  );
};

export default ProcessingView;
