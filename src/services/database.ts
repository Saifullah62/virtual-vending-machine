import mongoose from 'mongoose';
import { CardPack } from '../models/CardPack';
import { Transaction } from '../models/Transaction';

// Initialize mongoose connection
let isInitialized = false;

export async function initializeDatabase() {
  if (isInitialized) return;

  try {
    // Only add event listeners once
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('MongoDB reconnected');
    });

    isInitialized = true;
  } catch (error) {
    console.error('Failed to initialize database:', error);
    throw error;
  }
}

export async function connectDatabase() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  await initializeDatabase();

  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/sharepack', {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      retryWrites: true,
      retryReads: true,
    });

    console.log('Connected to MongoDB');
    return mongoose.connection;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

// Rest of the database functions
export async function getCardPacks() {
  try {
    await connectDatabase();
    return await CardPack.find({ active: true }).sort('-createdAt');
  } catch (error) {
    console.error('Error fetching card packs:', error);
    throw error;
  }
}

export async function createCardPack(data: {
  name: string;
  price: number;
  description?: string;
  imageUrl: string;
  cards: Array<{
    name: string;
    imageUrl: string;
    rarity: 'common' | 'uncommon' | 'rare' | 'legendary';
    dropRate: number;
  }>;
}) {
  try {
    await connectDatabase();
    return await CardPack.create(data);
  } catch (error) {
    console.error('Error creating card pack:', error);
    throw error;
  }
}

export async function updateCardPack(id: string, data: Partial<{
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  cards: Array<{
    name: string;
    imageUrl: string;
    rarity: 'common' | 'uncommon' | 'rare' | 'legendary';
    dropRate: number;
  }>;
  active: boolean;
}>) {
  try {
    await connectDatabase();
    return await CardPack.findByIdAndUpdate(id, data, { new: true });
  } catch (error) {
    console.error('Error updating card pack:', error);
    throw error;
  }
}

export async function createTransaction(data: {
  userId: string;
  packId: string;
  amount: number;
  paymentIntentId: string;
}) {
  try {
    await connectDatabase();
    return await Transaction.create(data);
  } catch (error) {
    console.error('Error creating transaction:', error);
    throw error;
  }
}

export async function updateTransactionStatus(
  paymentIntentId: string,
  status: 'completed' | 'failed'
) {
  try {
    await connectDatabase();
    return await Transaction.findOneAndUpdate(
      { paymentIntentId },
      { status },
      { new: true }
    );
  } catch (error) {
    console.error('Error updating transaction:', error);
    throw error;
  }
}

export async function getTransactionHistory(userId: string) {
  try {
    await connectDatabase();
    return await Transaction.find({ userId })
      .populate('packId')
      .sort('-createdAt');
  } catch (error) {
    console.error('Error fetching transaction history:', error);
    throw error;
  }
}