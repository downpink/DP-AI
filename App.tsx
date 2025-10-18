
import React, { useState, useCallback } from 'react';
import { AppState } from './types';
import { fileToBase64 } from './utils/fileUtils';
import { removeBackground } from './services/geminiService';
import Header from './components/Header';
import Footer from './components/Footer';
import ImageUploader from './components/ImageUploader';
import ProcessingView from './components/ProcessingView';
import ResultView from './components/ResultView';
import ErrorView from './components/ErrorView';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [originalFileName, setOriginalFileName] = useState<string>('');

  const handleImageUpload = useCallback(async (file: File) => {
    setAppState(AppState.PROCESSING);
    setOriginalImage(null);
    setProcessedImage(null);
    setErrorMessage('');
    setOriginalFileName(file.name.replace(/\.[^/.]+$/, "") + "_no_bg.png");

    try {
      const base64Image = await fileToBase64(file);
      setOriginalImage(base64Image);
      
      const resultBase64 = await removeBackground(base64Image, file.type);
      setProcessedImage(`data:image/png;base64,${resultBase64}`);
      setAppState(AppState.SUCCESS);
    } catch (error) {
      console.error('Processing failed:', error);
      const message = error instanceof Error ? error.message : 'An unknown error occurred.';
      setErrorMessage(message);
      setAppState(AppState.ERROR);
    }
  }, []);

  const handleReset = useCallback(() => {
    setAppState(AppState.IDLE);
    setOriginalImage(null);
    setProcessedImage(null);
    setErrorMessage('');
    setOriginalFileName('');
  }, []);

  const renderContent = () => {
    switch (appState) {
      case AppState.IDLE:
        return <ImageUploader onImageUpload={handleImageUpload} isProcessing={false} />;
      case AppState.PROCESSING:
        return <ProcessingView originalImage={originalImage} />;
      case AppState.SUCCESS:
        return (
          <ResultView
            originalImage={originalImage!}
            processedImage={processedImage!}
            onReset={handleReset}
            fileName={originalFileName}
          />
        );
      case AppState.ERROR:
        return <ErrorView message={errorMessage} onRetry={handleReset} />;
      default:
        return <ImageUploader onImageUpload={handleImageUpload} isProcessing={false} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
};

export default App;
