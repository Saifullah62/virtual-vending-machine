import { loadStripe, Stripe } from '@stripe/stripe-js';
import { PaymentStatus } from './types';

export class StripeService {
  private stripe: Promise<Stripe | null>;

  constructor() {
    this.stripe = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
  }

  async createPaymentIntent(amount: number): Promise<string> {
    // In a real app, this would call your backend
    return 'mock_payment_intent_id';
  }

  async processPayment(amount: number): Promise<PaymentStatus> {
    try {
      const stripe = await this.stripe;
      if (!stripe) throw new Error('Stripe not initialized');

      const paymentIntentId = await this.createPaymentIntent(amount);
      
      const { error: stripeError } = await stripe.confirmCardPayment(paymentIntentId);

      if (stripeError) {
        return {
          success: false,
          error: stripeError.message,
        };
      }

      return {
        success: true,
        transactionId: paymentIntentId,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Payment failed',
      };
    }
  }
}