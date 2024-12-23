import { useState, useCallback } from 'react';
import * as db from '../services/database';

export function useDatabase() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const connect = useCallback(async () => {
    if (isConnected) return;

    try {
      setIsLoading(true);
      await db.connectDatabase();
      setIsConnected(true);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to connect to database'));
      setIsConnected(false);
    } finally {
      setIsLoading(false);
    }
  }, [isConnected]);

  const getCardPacks = useCallback(async () => {
    try {
      setIsLoading(true);
      const packs = await db.getCardPacks();
      setError(null);
      return packs;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch card packs'));
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createCardPack = useCallback(async (data: Parameters<typeof db.createCardPack>[0]) => {
    try {
      setIsLoading(true);
      const pack = await db.createCardPack(data);
      setError(null);
      return pack;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to create card pack'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateCardPack = useCallback(async (
    id: string,
    data: Parameters<typeof db.updateCardPack>[1]
  ) => {
    try {
      setIsLoading(true);
      const pack = await db.updateCardPack(id, data);
      setError(null);
      return pack;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update card pack'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createTransaction = useCallback(async (
    data: Parameters<typeof db.createTransaction>[0]
  ) => {
    try {
      setIsLoading(true);
      const transaction = await db.createTransaction(data);
      setError(null);
      return transaction;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to create transaction'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getTransactionHistory = useCallback(async (userId: string) => {
    try {
      setIsLoading(true);
      const history = await db.getTransactionHistory(userId);
      setError(null);
      return history;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch transaction history'));
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    isConnected,
    connect,
    getCardPacks,
    createCardPack,
    updateCardPack,
    createTransaction,
    getTransactionHistory,
  };
}