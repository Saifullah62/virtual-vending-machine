export interface Card {
  id: string;
  name: string;
  image: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'ultra-rare';
  sharePrice: number;
  totalShares: number;
  availableShares: number;
}

export interface Sharepack {
  id: string;
  price: number;
  cards: Card[];
  revealed: boolean;
}