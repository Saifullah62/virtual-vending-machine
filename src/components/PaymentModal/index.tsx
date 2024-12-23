import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { PaymentTabs } from './PaymentTabs';
import { StripeForm } from './StripeForm';
import { BSVPayment } from './BSVPayment';
import { PaymentMethod } from '../../services/payments/types';
import { useVendingStore } from '../../store/useVendingStore';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
}

export function PaymentModal({ isOpen, onClose, amount }: PaymentModalProps) {
  const [paymentMethod, setPaymentMethod] = React.useState<PaymentMethod>('stripe');
  const [error, setError] = React.useState<string | null>(null);
  const { addBalance } = useVendingStore();

  const handleSuccess = () => {
    addBalance(amount);
    onClose();
  };

  const handleError = (message: string) => {
    setError(message);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-gray-100 p-6 rounded-xl shadow-xl w-full max-w-md"
          >
            <h2 className="text-2xl font-bold mb-6">Add Funds</h2>

            <PaymentTabs
              selectedMethod={paymentMethod}
              onSelect={setPaymentMethod}
            />

            <div className="mt-6">
              {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {paymentMethod === 'stripe' ? (
                <Elements stripe={stripePromise}>
                  <StripeForm
                    amount={amount}
                    onSuccess={handleSuccess}
                    onError={handleError}
                  />
                </Elements>
              ) : (
                <BSVPayment
                  amount={amount}
                  onSuccess={handleSuccess}
                  onError={handleError}
                />
              )}
            </div>

            <div className="mt-6 flex justify-end">
              <motion.button
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Cancel
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}