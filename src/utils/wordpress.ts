import { PaymentStatus } from '../services/payments/types';

interface WPData {
  apiUrl: string;
  nonce: string;
  userId: number;
}

declare global {
  interface Window {
    wpData: WPData;
  }
}

export async function wpFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const { apiUrl, nonce } = window.wpData;
  
  const response = await fetch(`${apiUrl}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'X-WP-Nonce': nonce,
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error('WordPress API request failed');
  }

  return response.json();
}

export async function verifyPayment(status: PaymentStatus) {
  return wpFetch('/vending-machine/v1/verify-payment', {
    method: 'POST',
    body: JSON.stringify(status),
  });
}