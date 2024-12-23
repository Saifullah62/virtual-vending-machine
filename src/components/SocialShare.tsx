import React from 'react';
import { motion } from 'framer-motion';
import { Share2, Twitter, Facebook, Link } from 'lucide-react';
import { useVendingStore } from '../store/useVendingStore';

interface SocialShareProps {
  cardId: string;
}

export function SocialShare({ cardId }: SocialShareProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const shareUrl = `${window.location.origin}/card/${cardId}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareToTwitter = () => {
    const text = "Check out my new SharePack card! 🎉";
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank');
  };

  const shareToFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 bg-white/10 rounded-full backdrop-blur-sm"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Share2 className="w-5 h-5 text-white" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="absolute top-full right-0 mt-2 p-2 bg-white rounded-lg shadow-xl flex gap-2"
          >
            <motion.button
              onClick={shareToTwitter}
              className="p-2 text-blue-400 hover:bg-blue-50 rounded-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Twitter className="w-5 h-5" />
            </motion.button>

            <motion.button
              onClick={shareToFacebook}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Facebook className="w-5 h-5" />
            </motion.button>

            <motion.button
              onClick={handleCopyLink}
              className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link className="w-5 h-5" />
              {copied && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-white bg-black/75 px-2 py-1 rounded"
                >
                  Copied!
                </motion.div>
              )}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}