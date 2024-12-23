import React from 'react';
import { motion } from 'framer-motion';
import { useVendingStore } from '../../store/useVendingStore';
import { PackCard } from './PackCard';

const packs = [
  {
    id: 'standard',
    name: 'Standard Pack',
    price: 5.00,
    color: 'from-blue-500 to-blue-700',
    description: '3 Random Cards',
    image: 'https://images.unsplash.com/photo-1622037022824-0c71d511ef3c?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 'premium',
    name: 'Premium Pack',
    price: 10.00,
    color: 'from-purple-500 to-purple-700',
    description: '5 Random Cards',
    image: 'https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 'ultra',
    name: 'Ultra Pack',
    price: 20.00,
    color: 'from-amber-500 to-amber-700',
    description: '10 Random Cards',
    image: 'https://images.unsplash.com/photo-1607893378714-007fd47c8719?auto=format&fit=crop&q=80&w=400',
  },
];

export function PackGrid() {
  const { selectSharepack, selectedSharepack, balance } = useVendingStore();

  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-4">
      {packs.map((pack) => (
        <PackCard
          key={pack.id}
          pack={pack}
          isSelected={selectedSharepack?.id === pack.id}
          isDisabled={pack.price > balance}
          onSelect={() => selectSharepack({
            id: pack.id,
            price: pack.price,
            cards: [],
            revealed: false,
          })}
        />
      ))}
    </div>
  );
}