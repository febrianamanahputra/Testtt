import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Transaction } from '../types';
import { format, parseISO, subDays, eachDayOfInterval } from 'date-fns';
import { id } from 'date-fns/locale';

interface ExpenseChartProps {
  transactions: Transaction[];
}

export function ExpenseChart({ transactions }: ExpenseChartProps) {
  // Ambil data untuk 7 hari terakhir
  const hariIni = new Date();
  const tujuhHariLalu = subDays(hariIni, 6); // 6 hari ke belakang + hari ini = 7 hari

  const daysLabels = eachDayOfInterval({
    start: tujuhHariLalu,
    end: hariIni
  });

  const rawData = daysLabels.map(day => {
    const dayStr = format(day, 'yyyy-MM-dd');
    const dayName = format(day, 'EEE', { locale: id });
    
    // Total Pemasukan per hari
    const income = transactions
      .filter(t => t.date === dayStr && t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    // Total Pengeluaran per hari
    const expense = transactions
      .filter(t => t.date === dayStr && t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      name: dayName,
      Pemasukan: income,
      Pengeluaran: expense,
      date: dayStr
    };
  });

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl flex flex-col h-full min-h-[400px]">
      <h3 className="font-bold mb-4">Ringkasan 7 Hari Terakhir</h3>
      
      <div className="flex-1 w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={rawData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 12 }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 12 }}
              tickFormatter={(value) => `Rp${value / 1000}rb`}
            />
            <Tooltip 
              cursor={{ fill: 'rgba(255,255,255,0.05)' }}
              contentStyle={{ 
                borderRadius: '12px', 
                border: '1px solid rgba(255,255,255,0.2)', 
                background: 'rgba(15, 23, 42, 0.8)', 
                color: '#fff', 
                backdropFilter: 'blur(8px)' 
              }}
              formatter={(value: number) => [`Rp${value.toLocaleString('id-ID')}`, undefined]}
              labelFormatter={(label, payload) => {
                const item = payload[0]?.payload;
                return item ? format(parseISO(item.date), 'dd MMMM yyyy', { locale: id }) : label;
              }}
            />
            <Bar dataKey="Pemasukan" fill="#34d399" radius={[4, 4, 0, 0]} maxBarSize={40} />
            <Bar dataKey="Pengeluaran" fill="#fb7185" radius={[4, 4, 0, 0]} maxBarSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
