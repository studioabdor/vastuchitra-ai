import React, { useState, ChangeEvent } from 'react';
import { httpsCallable } from 'firebase/functions';
import { functions } from '../config/firebase';


interface GenerateImageResponse {
  imageUrl: string;
}

const GenerateImage: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const generateImageFunction = httpsCallable<
    { prompt: string }, GenerateImageResponse>(functions, 'generateImage');

  const handlePromptChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPrompt(event.target.value);
  };

  const handleGenerateImage = async () => {
    setIsLoading(true);

    if (prompt === '') return setError("The prompt cannot be empty")

    setError(null);
    setImageUrl(null);
    try {
      const result = await generateImageFunction({ prompt });
      setImageUrl(result.data.imageUrl);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      if(err.code) {
        setError(err.message)
      }
    }
      finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Generate Image</h1>
      <div className="mb-4">
        <input
          type="text"
          value={prompt}
          onChange={handlePromptChange}
          placeholder="Enter your prompt"
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
      </div>
      <button
        onClick={handleGenerateImage}
        disabled={isLoading}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {isLoading ? 'Generating...' : 'Generate Image'}
      </button>
      {error && <div className="text-red-500 mt-4">{error}</div>}
      {imageUrl && (
        <div className="mt-4">
          <img src={imageUrl} alt="Generated" className="max-w-full" />
        </div>
      )}
    </div>
  );
};

export default GenerateImage;