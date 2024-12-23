import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface UploadedCard {
  id: string;
  name: string;
  imageUrl: string;
}

export function useCardUpload() {
  const [uploadedCards, setUploadedCards] = useState<UploadedCard[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    setIsUploading(true);
    const newCards: UploadedCard[] = [];

    for (const file of Array.from(files)) {
      // In a real app, you'd upload to a server here
      const imageUrl = URL.createObjectURL(file);
      newCards.push({
        id: uuidv4(),
        name: file.name.replace(/\.[^/.]+$/, ""),
        imageUrl,
      });
    }

    setUploadedCards((prev) => [...prev, ...newCards]);
    setIsUploading(false);
  }, []);

  const removeCard = useCallback((id: string) => {
    setUploadedCards((prev) => prev.filter((card) => card.id !== id));
  }, []);

  return {
    uploadedCards,
    handleFileChange,
    removeCard,
    isUploading,
  };
}