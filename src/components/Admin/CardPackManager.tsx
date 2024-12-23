import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2 } from 'lucide-react';
import { useAdminStore } from './store/useAdminStore';
import { CardUpload } from '../CardUpload';

export function CardPackManager() {
  const { cardPacks, addCardPack, updateCardPack, removeCardPack } = useAdminStore();

  return (
    <div className="space-y-8">
      {/* Card Packs List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">Card Packs</h3>
          <motion.button
            onClick={() => addCardPack()}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus className="w-4 h-4" />
            <span>Add Pack</span>
          </motion.button>
        </div>

        <div className="grid gap-4">
          {cardPacks.map((pack) => (
            <motion.div
              key={pack.id}
              className="p-4 bg-gray-50 rounded-lg"
              layout
            >
              <div className="space-y-4">
                {/* Pack Details */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <input
                      type="text"
                      value={pack.name}
                      onChange={(e) => updateCardPack(pack.id, { name: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg"
                      placeholder="Pack Name"
                    />
                    <input
                      type="number"
                      value={pack.price}
                      onChange={(e) => updateCardPack(pack.id, { price: Number(e.target.value) })}
                      className="w-full px-3 py-2 border rounded-lg"
                      placeholder="Price"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <button
                    onClick={() => removeCardPack(pack.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                {/* Card URLs */}
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-700">Card URLs</h4>
                  {pack.cardUrls.map((url, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="url"
                        value={url}
                        onChange={(e) => {
                          const newUrls = [...pack.cardUrls];
                          newUrls[index] = e.target.value;
                          updateCardPack(pack.id, { cardUrls: newUrls });
                        }}
                        className="flex-1 px-3 py-2 border rounded-lg"
                        placeholder="Card URL"
                      />
                      <button
                        onClick={() => {
                          const newUrls = pack.cardUrls.filter((_, i) => i !== index);
                          updateCardPack(pack.id, { cardUrls: newUrls });
                        }}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <motion.button
                    onClick={() => {
                      const newUrls = [...pack.cardUrls, ''];
                      updateCardPack(pack.id, { cardUrls: newUrls });
                    }}
                    className="w-full px-4 py-2 text-sm text-primary border border-primary rounded-lg"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Add Card URL
                  </motion.button>
                </div>

                {/* Card Upload */}
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-700">Upload Cards</h4>
                  <CardUpload />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}