import { Transaction } from '../types';
import { subDays, format } from 'date-fns';

const today = new Date();

export const initialTransactions: Transaction[] = [
  {
    id: '1',
    type: 'income',
    amount: 15000000,
    category: 'Gaji',
    date: format(subDays(today, 5), 'yyyy-MM-dd'),
    description: 'Gaji Bulan Ini',
  },
  {
    id: '2',
    type: 'expense',
    amount: 350000,
    category: 'Belanja',
    date: format(subDays(today, 4), 'yyyy-MM-dd'),
    description: 'Belanja Bulanan',
  },
  {
    id: '3',
    type: 'expense',
    amount: 50000,
    category: 'Makanan',
    date: format(subDays(today, 3), 'yyyy-MM-dd'),
    description: 'Makan Siang',
  },
  {
    id: '4',
    type: 'expense',
    amount: 150000,
    category: 'Transportasi',
    date: format(subDays(today, 3), 'yyyy-MM-dd'),
    description: 'Isi Bensin',
  },
  {
    id: '5',
    type: 'income',
    amount: 500000,
    category: 'Bonus',
    date: format(subDays(today, 2), 'yyyy-MM-dd'),
    description: 'Bonus Proyek',
  },
  {
    id: '6',
    type: 'expense',
    amount: 200000,
    category: 'Hiburan',
    date: format(subDays(today, 1), 'yyyy-MM-dd'),
    description: 'Nonton Bioskop',
  },
  {
    id: '7',
    type: 'expense',
    amount: 60000,
    category: 'Makanan',
    date: format(today, 'yyyy-MM-dd'),
    description: 'Kopi & Snack',
  },
];
