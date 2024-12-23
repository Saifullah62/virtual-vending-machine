import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import * as db from '../../../services/database';

interface CardPack {
  id: string;
  name: string;
  price: number;
  cardUrls: string[];
  imageUrl: string;
  description?: string;
}

interface AdminState {
  cardPacks: CardPack[];
  unsavedChanges: boolean;
  addCardPack: () => void;
  updateCardPack: (id: string, updates: Partial<CardPack>) => void;
  removeCardPack: (id: string) => void;
  saveChanges: () => Promise<void>;
}

export const useAdminStore = create<AdminState>()(
  persist(
    (set, get) => ({
      cardPacks: [],
      unsavedChanges: false,
      
      addCardPack: () => set((state) => ({
        cardPacks: [
          ...state.cardPacks,
          {
            id: uuidv4(),
            name: 'New Pack',
            price: 5.00,
            cardUrls: [],
            imageUrl: '',
          },
        ],
        unsavedChanges: true,
      })),

      updateCardPack: (id, updates) => set((state) => ({
        cardPacks: state.cardPacks.map((pack) =>
          pack.id === id ? { ...pack, ...updates } : pack
        ),
        unsavedChanges: true,
      })),

      removeCardPack: (id) => set((state) => ({
        cardPacks: state.cardPacks.filter((pack) => pack.id !== id),
        unsavedChanges: true,
      })),

      saveChanges: async () => {
        const state = get();
        if (!state.unsavedChanges) return;

        try {
          // Convert cardPacks to the format expected by the database
          const dbPacks = state.cardPacks.map((pack) => ({
            name: pack.name,
            price: pack.price,
            description: pack.description,
            imageUrl: pack.imageUrl,
            cards: pack.cardUrls.map((url) => ({
              name: 'Card', // You might want to add name input fields
              imageUrl: url,
              rarity: 'common', // Add rarity selection
              dropRate: 100 / pack.cardUrls.length, // Equal distribution
            })),
          }));

          // Save to database
          await Promise.all(dbPacks.map(db.createCardPack));
          
          set({ unsavedChanges: false });
        } catch (error) {
          console.error('Failed to save changes:', error);
          throw error;
        }
      },
    }),
    {
      name: 'vending-admin-storage',
    }
  )
);