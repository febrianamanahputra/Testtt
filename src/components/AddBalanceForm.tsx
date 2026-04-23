import { useState } from 'react';
import { Transaction } from '../types';
import { X, Wallet } from 'lucide-react';

interface AddBalanceFormProps {
  onClose: () => void;
  onSubmit: (transaction: Omit<Transaction, 'id'>) => void;
}

export function AddBalanceForm({ onClose, onSubmit }: AddBalanceFormProps) {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('Isi Saldo');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || Number(amount) <= 0) return;

    onSubmit({
      type: 'income',
      amount: Number(amount),
      category: 'Saldo',
      date: new Date().toISOString().split('T')[0],
      description,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md">
      <div className="bg-slate-900/90 border border-white/20 backdrop-blur-xl rounded-3xl w-full max-w-md shadow-2xl overflow-hidden text-slate-100">
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
             <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">
               <Wallet className="w-4 h-4" />
             </div>
             <h2 className="text-xl font-semibold text-white">Tambah Saldo</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Nominal Saldo (Rp)
            </label>
            <input
              type="number"
              required
              min="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow text-white placeholder-slate-500 text-lg font-mono"
              placeholder="0"
              autoFocus
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Keterangan (Opsional)
            </label>
            <input
              type="text"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow text-white placeholder-slate-500"
              placeholder="Contoh: Saldo Awal / Top up Bank"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900 border border-indigo-400/30 mt-4"
          >
            Tambahkan Saldo
          </button>
        </form>
      </div>
    </div>
  );
}
