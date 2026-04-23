import { Utensils, Car, Lightbulb, Film, ShoppingBag, HeartPulse, MoreHorizontal, Briefcase, Plus, ArrowUpCircle, Wallet } from 'lucide-react';
import { Transaction } from '../types';
import { formatRupiah } from '../lib/utils';
import { format, parseISO } from 'date-fns';
import { id } from 'date-fns/locale';

interface TransactionListProps {
  transactions: Transaction[];
}

const CategoryIcon = ({ category, type }: { category: string; type: string }) => {
  if (type === 'income') {
    if (category === 'Gaji') return <Briefcase className="w-5 h-5" />;
    if (category === 'Bonus') return <ArrowUpCircle className="w-5 h-5" />;
    if (category === 'Investasi') return <ArrowUpCircle className="w-5 h-5" />;
    if (category === 'Saldo') return <Wallet className="w-5 h-5" />;
    return <Plus className="w-5 h-5" />;
  }

  switch (category) {
    case 'Makanan': return <Utensils className="w-5 h-5" />;
    case 'Transportasi': return <Car className="w-5 h-5" />;
    case 'Tagihan': return <Lightbulb className="w-5 h-5" />;
    case 'Hiburan': return <Film className="w-5 h-5" />;
    case 'Belanja': return <ShoppingBag className="w-5 h-5" />;
    case 'Kesehatan': return <HeartPulse className="w-5 h-5" />;
    default: return <MoreHorizontal className="w-5 h-5" />;
  }
};

export function TransactionList({ transactions }: TransactionListProps) {
  // Urutkan transaksi dari yang terbaru
  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl flex flex-col overflow-hidden">
      <div className="p-6 flex justify-between items-center border-b border-white/10">
        <h3 className="font-bold">Transaksi Terakhir</h3>
      </div>
      
      <div className="p-2 flex flex-col gap-1">
        {sortedTransactions.length === 0 ? (
          <p className="text-center text-slate-400 py-4">Belum ada transaksi</p>
        ) : (
          sortedTransactions.map((transaction) => {
            const isIncome = transaction.type === 'income';
            
            return (
              <div key={transaction.id} className="flex items-center p-4 hover:bg-white/5 rounded-2xl transition-colors">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 mr-4 ${
                  isIncome ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                }`}>
                  <CategoryIcon category={transaction.category} type={transaction.type} />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-slate-100">{transaction.description}</p>
                  <p className="text-xs text-slate-400 flex gap-2">
                     <span>{transaction.category}</span>
                     <span>•</span>
                     <span>{format(parseISO(transaction.date), 'dd MMM yyyy', { locale: id })}</span>
                  </p>
                </div>
                <div className={`font-bold ${isIncome ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {isIncome ? '+' : '-'}{formatRupiah(transaction.amount)}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
