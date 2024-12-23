import React from 'react';
import { motion } from 'framer-motion';
import { Upload, X } from 'lucide-react';
import { useCardUpload } from './useCardUpload';

export function CardUpload() {
  const {
    uploadedCards,
    handleFileChange,
    removeCard,
    isUploading,
  } = useCardUpload();

  return (
    <div className="space-y-4">
      <div className="relative">
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="hidden"
          id="card-upload"
          disabled={isUploading}
        />
        
        <motion.label
          htmlFor="card-upload"
          className={`
            relative block w-full p-4 border-2 border-dashed
            rounded-lg cursor-pointer transition-colors
            ${isUploading ? 'border-gray-400 bg-gray-50' : 'border-primary hover:border-primary/80'}
          `}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <div className="flex flex-col items-center gap-2">
            <Upload className={isUploading ? 'text-gray-400' : 'text-primary'} />
            <span className={isUploading ? 'text-gray-400' : 'text-primary'}>
              {isUploading ? 'Uploading...' : 'Upload Card Images'}
            </span>
          </div>
        </motion.label>
      </div>

      {/* Preview Grid */}
      <div className="grid grid-cols-2 gap-4">
        {uploadedCards.map((card) => (
          <motion.div
            key={card.id}
            className="relative aspect-[3/4] rounded-lg overflow-hidden"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <img
              src={card.imageUrl}
              alt={card.name}
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => removeCard(card.id)}
              className="absolute top-2 right-2 p-1 bg-black/50 rounded-full"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}