import { create } from 'zustand';
import { PaymentStatus } from '../services/payments/types';

interface PaymentState {
  lastTransaction: PaymentStatus | null;
  pendingPayments: string[];
  addPendingPayment: (id: string) => void;
  removePendingPayment: (id: string) => void;
  setLastTransaction: (status: PaymentStatus) => void;
  clearLastTransaction: () => void;
}

export const usePaymentStore = create<PaymentState>((set) => ({
  lastTransaction: null,
  pendingPayments: [],

  addPendingPayment: (id) =>
    set((state) => ({
      pendingPayments: [...state.pendingPayments, id],
    })),

  removePendingPayment: (id) =>
    set((state) => ({
      pendingPayments: state.pendingPayments.filter((paymentId) => paymentId !== id),
    })),

  setLastTransaction: (status) =>
    set({ lastTransaction: status }),

  clearLastTransaction: () =>
    set({ lastTransaction: null }),
}));