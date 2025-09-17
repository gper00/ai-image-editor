
import React, { useState, useCallback } from 'react';
import { editImageWithBanana } from './services/geminiService';
import { EditResult, OriginalImage } from './types';
import Header from './components/Header';
import ImageUpload from './components/ImageUpload';
import PromptInput from './components/PromptInput';
import LoadingSpinner from './components/LoadingSpinner';
import { ImageCompare } from './components/ImageCompare';

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<OriginalImage | null>(null);
  const [editResult, setEditResult] = useState<EditResult | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (base64: string, mimeType: string) => {
    setOriginalImage({ base64, mimeType });
    setEditResult(null); // Clear previous results
    setError(null);
  };

  const handleSubmit = useCallback(async () => {
    if (!originalImage || !prompt.trim()) {
      setError('Please upload an image and provide an editing prompt.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setEditResult(null);

    try {
      const result = await editImageWithBanana(originalImage.base64, originalImage.mimeType, prompt);
      setEditResult(result);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred. Please check the console.');
    } finally {
      setIsLoading(false);
    }
  }, [originalImage, prompt]);
  
  const canSubmit = prompt.trim().length > 0 && originalImage !== null && !isLoading;

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans antialiased">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Controls Column */}
          <div className="lg:col-span-4 bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 h-fit shadow-lg">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-3 text-banana-light">1. Upload Your Image</h2>
                <ImageUpload onImageUpload={handleImageUpload} />
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-3 text-banana-light">2. Describe Your Edit</h2>
                <PromptInput value={prompt} onChange={(e) => setPrompt(e.target.value)} />
              </div>
              <button
                onClick={handleSubmit}
                disabled={!canSubmit}
                className="w-full bg-banana hover:bg-banana-dark disabled:bg-gray-600 disabled:cursor-not-allowed text-gray-900 font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-banana focus:ring-opacity-50"
              >
                {isLoading ? <LoadingSpinner /> : 'Go Bananas!'}
              </button>
            </div>
          </div>

          {/* Results Column */}
          <div className="lg:col-span-8">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 min-h-[60vh] flex flex-col justify-center items-center shadow-lg">
              {error && (
                <div className="text-center text-red-400 bg-red-900/50 p-4 rounded-lg">
                  <p className="font-bold">Oops! Something went wrong.</p>
                  <p className="text-sm">{error}</p>
                </div>
              )}

              {!error && !originalImage && (
                <div className="text-center text-gray-400">
                  <p className="text-2xl font-semibold">Your Edited Image Will Appear Here</p>
                  <p>Start by uploading an image and giving instructions.</p>
                </div>
              )}

              {originalImage && (
                <div className="w-full">
                  <ImageCompare
                    original={originalImage.base64}
                    edited={editResult?.imageUrl ?? null}
                    isLoading={isLoading}
                  />
                  {editResult?.text && (
                     <div className="mt-4 p-4 bg-gray-900 rounded-lg border border-gray-700">
                        <p className="text-sm text-gray-300 italic">{editResult.text}</p>
                     </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
