import { formatRupiah } from '../lib/utils';
import { Transaction } from '../types';

interface DashboardCardsProps {
  transactions: Transaction[];
}

export function DashboardCards({ transactions }: DashboardCardsProps) {
  const income = transactions
    .filter((t) => t.type === 'income')
    .reduce((acc, curr) => acc + curr.amount, 0);
    
  const expense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const balance = income - expense;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Saldo Total */}
      <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-3xl flex flex-col">
        <span className="text-xs uppercase tracking-widest text-indigo-300 font-bold mb-2">Saldo Total</span>
        <span className="text-2xl font-bold font-mono">{formatRupiah(balance)}</span>
        <div className="mt-4 text-xs text-white/40 italic flex items-center gap-1">
           Saldo saat ini
        </div>
      </div>

      {/* Pemasukan */}
      <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-3xl flex flex-col">
        <span className="text-xs uppercase tracking-widest text-emerald-300 font-bold mb-2">Pemasukan</span>
        <span className="text-2xl font-bold font-mono text-emerald-50">{formatRupiah(income)}</span>
        <div className="mt-4 w-full bg-white/5 h-1.5 rounded-full">
           <div className="bg-emerald-500 h-full rounded-full" style={{ width: '100%' }}></div>
        </div>
      </div>

      {/* Pengeluaran */}
      <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-3xl flex flex-col">
        <span className="text-xs uppercase tracking-widest text-rose-300 font-bold mb-2">Pengeluaran</span>
        <span className="text-2xl font-bold font-mono text-rose-100">{formatRupiah(expense)}</span>
        <div className="mt-4 w-full bg-white/5 h-1.5 rounded-full flex overflow-hidden">
           {expense > 0 ? (
             <div className="bg-rose-500 h-full rounded-full" style={{ width: `${Math.min((expense / (income || 1)) * 100, 100)}%` }}></div>
           ) : null}
        </div>
      </div>
    </div>
  );
}
