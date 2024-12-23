import { create } from 'zustand';
import type { Card, Sharepack } from '../types/sharepack';
import * as db from '../services/database';
import { usePaymentStore } from './usePaymentStore';

interface VendingState {
  balance: number;
  sharepacks: Sharepack[];
  selectedSharepack: Sharepack | null;
  isVending: boolean;
  error: string | null;
  isLoading: boolean;
  addBalance: (amount: number) => void;
  purchaseSharepack: () => Promise<void>;
  selectSharepack: (sharepack: Sharepack) => void;
  revealSharepack: (sharepackId: string) => Promise<void>;
  resetPurchase: () => void;
  clearError: () => void;
  startDemoPurchase: () => void;
}

export const useVendingStore = create<VendingState>((set, get) => ({
  balance: 0,
  sharepacks: [],
  selectedSharepack: null,
  isVending: false,
  error: null,
  isLoading: false,
  
  addBalance: (amount) => {
    if (amount <= 0) {
      set({ error: 'Invalid amount' });
      return;
    }
    set((state) => ({ balance: state.balance + amount, error: null }));
  },

  startDemoPurchase: () => {
    const demoSharepack: Sharepack = {
      id: 'demo-pack',
      price: 5,
      cards: [
        {
          id: 'demo-card-1',
          name: 'Demo Card 1',
          image: 'https://images.unsplash.com/photo-1607893378714-007fd47c8719',
          rarity: 'rare',
          sharePrice: 2,
          totalShares: 100,
          availableShares: 50,
        },
      ],
      revealed: false,
    };
    
    set({ 
      selectedSharepack: demoSharepack,
      isVending: true,
      error: null 
    });
  },
  
  purchaseSharepack: async () => {
    const state = get();
    
    if (state.isVending) {
      set({ error: 'Transaction in progress' });
      return;
    }
    
    if (!state.selectedSharepack) {
      set({ error: 'No pack selected' });
      return;
    }
    
    if (state.balance < state.selectedSharepack.price) {
      set({ error: 'Insufficient balance' });
      return;
    }
    
    set({ isLoading: true, error: null });
    
    try {
      await db.createTransaction({
        packId: state.selectedSharepack.id,
        amount: state.selectedSharepack.price,
        userId: 'demo-user',
        paymentIntentId: 'demo-payment',
      });
      
      set({
        balance: state.balance - state.selectedSharepack.price,
        isVending: true,
        isLoading: false,
      });
    } catch (err) {
      set({ 
        error: 'Transaction failed. Please try again.',
        isLoading: false 
      });
    }
  },
  
  selectSharepack: (sharepack) =>
    set({ selectedSharepack: sharepack, error: null }),
    
  revealSharepack: async (sharepackId) => {
    try {
      await db.revealSharepack(sharepackId);
      set((state) => ({
        sharepacks: state.sharepacks.map((pack) =>
          pack.id === sharepackId ? { ...pack, revealed: true } : pack
        ),
        isVending: false,
        error: null,
      }));
    } catch (err) {
      set({ error: 'Failed to reveal sharepack' });
    }
  },

  resetPurchase: () => set({ 
    isVending: false, 
    selectedSharepack: null,
    error: null 
  }),
    
  clearError: () => set({ error: null }),
}));