import type { Stripe } from '@stripe/stripe-js';

export type PaymentMethod = 'stripe' | 'bsv' | 'demo';

export interface PaymentStatus {
  success: boolean;
  error?: string;
  transactionId?: string;
}

export interface PaymentConfig {
  stripePublicKey: string;
  bsvAddress: string;
}

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
}