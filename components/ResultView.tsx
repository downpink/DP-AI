
import React from 'react';
import { DownloadIcon } from './icons/DownloadIcon';
import { RefreshIcon } from './icons/RefreshIcon';

interface ResultViewProps {
  originalImage: string;
  processedImage: string;
  onReset: () => void;
  fileName: string;
}

const ImageCard: React.FC<{ src: string; label: string; isResult?: boolean }> = ({ src, label, isResult = false }) => (
  <div className="flex flex-col items-center">
    <h3 className="text-lg font-semibold text-gray-600 mb-3">{label}</h3>
    <div className={`rounded-xl shadow-lg overflow-hidden border border-gray-200 ${isResult ? 'bg-[url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAC1JREFUOE9jZGBgEGHAD97/D0AnioLzaJg5kKDBXwqC82iY0YAj2dCg7WGAAlUAY3s4Fz0AAAAASUVORK5CYII=)] bg-repeat' : 'bg-gray-100'}`}>
      <img src={src} alt={label} className="max-w-full max-h-80 object-contain" />
    </div>
  </div>
);

const ResultView: React.FC<ResultViewProps> = ({ originalImage, processedImage, onReset, fileName }) => {
  return (
    <div className="w-full max-w-5xl flex flex-col items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        <ImageCard src={originalImage} label="Original" />
        <ImageCard src={processedImage} label="Background Removed" isResult={true} />
      </div>
      <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <a
          href={processedImage}
          download={fileName}
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-brand-purple hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-transform transform hover:scale-105"
        >
          <DownloadIcon className="w-5 h-5 mr-2" />
          Download Image
        </a>
        <button
          onClick={onReset}
          className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-full shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform transform hover:scale-105"
        >
          <RefreshIcon className="w-5 h-5 mr-2" />
          Process Another
        </button>
      </div>
    </div>
  );
};

export default ResultView;
