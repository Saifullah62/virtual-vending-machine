import React from 'react';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { Copy, Check } from 'lucide-react';
import { BSVService } from '../../services/payments/bsvService';

interface BSVPaymentProps {
  amount: number;
  onSuccess: () => void;
  onError: (error: string) => void;
}

export function BSVPayment({ amount, onSuccess, onError }: BSVPaymentProps) {
  const [address, setAddress] = React.useState('');
  const [copied, setCopied] = React.useState(false);
  const [isWaiting, setIsWaiting] = React.useState(false);
  const bsvService = new BSVService(import.meta.env.VITE_BSV_ADDRESS);

  React.useEffect(() => {
    const initPayment = async () => {
      try {
        const paymentAddress = await bsvService.generatePaymentAddress(amount);
        setAddress(paymentAddress);
        setIsWaiting(true);

        const status = await bsvService.waitForPayment(amount);
        if (status.success) {
          onSuccess();
        } else {
          onError(status.error || 'Payment failed');
        }
      } catch (error) {
        onError('Failed to initialize payment');
      } finally {
        setIsWaiting(false);
      }
    };

    initPayment();
  }, [amount, onSuccess, onError]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      onError('Failed to copy address');
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-inner flex flex-col items-center">
        <QRCodeSVG value={address} size={200} />
        
        <div className="mt-4 w-full">
          <div className="flex items-center gap-2 p-2 bg-gray-100 rounded-lg">
            <input
              type="text"
              value={address}
              readOnly
              className="flex-1 bg-transparent border-none focus:outline-none text-sm"
            />
            <motion.button
              onClick={handleCopy}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 text-gray-600 hover:text-gray-800"
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {isWaiting && (
        <div className="text-center text-sm text-gray-600">
          Waiting for payment confirmation...
          <div className="mt-2 flex justify-center">
            <motion.div
              className="w-2 h-2 bg-primary rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [1, 0.5, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}