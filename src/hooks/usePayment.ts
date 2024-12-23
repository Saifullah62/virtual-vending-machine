import { useState, useCallback } from 'react';
import { StripeService } from '../services/payments/stripeService';
import { BSVService } from '../services/payments/bsvService';
import { PaymentMethod, PaymentStatus } from '../services/payments/types';

export function usePayment() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const stripeService = new StripeService();
  const bsvService = new BSVService(import.meta.env.VITE_BSV_ADDRESS);

  const processPayment = useCallback(async (
    method: PaymentMethod,
    amount: number
  ): Promise<PaymentStatus> => {
    setIsProcessing(true);
    setError(null);

    try {
      let status: PaymentStatus;

      switch (method) {
        case 'stripe':
          status = await stripeService.processPayment(amount);
          break;
        case 'bsv':
          status = await bsvService.waitForPayment(amount);
          break;
        default:
          throw new Error('Invalid payment method');
      }

      if (!status.success) {
        setError(status.error || 'Payment failed');
      }

      return status;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Payment failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsProcessing(false);
    }
  }, []);

  return {
    isProcessing,
    error,
    processPayment,
  };
}