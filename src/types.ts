export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  category: string;
  date: string; // ISO format: YYYY-MM-DD
  description: string;
}

export const CATEGORIES = {
  income: ['Gaji', 'Bonus', 'Investasi', 'Saldo', 'Lain-lain'],
  expense: ['Makanan', 'Transportasi', 'Tagihan', 'Hiburan', 'Belanja', 'Kesehatan', 'Lain-lain'],
};
