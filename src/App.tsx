import { useState, useEffect } from 'react';
import { Plus, Loader2, AlertCircle } from 'lucide-react';
import { Transaction } from './types';
import { DashboardCards } from './components/DashboardCards';
import { TransactionList } from './components/TransactionList';
import { ExpenseChart } from './components/ExpenseChart';
import { TransactionForm } from './components/TransactionForm';

import { db } from './lib/firebase';
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore';

export default function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'transactions'), orderBy('date', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Transaction[];
      
      // Mengurutkan dari yang terbaru, plus ada timestamp fallback handling
      setTransactions(data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
      setIsLoading(false);
      setErrorMsg(null);
    }, (error) => {
      console.error("Error fetching transactions: ", error);
      if (error.message.includes("Missing or insufficient permissions")) {
         setErrorMsg("Akses ditolak oleh Firebase Security Rules. Silakan update Rules di console Firebase Anda.");
      } else {
         setErrorMsg(error.message);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleAddTransaction = async (newTransaction: Omit<Transaction, 'id'>) => {
    try {
      await addDoc(collection(db, 'transactions'), {
        ...newTransaction,
        timestamp: serverTimestamp(),
      });
      setIsFormOpen(false);
    } catch (error: any) {
      console.error("Error adding document: ", error);
      if (error.message.includes("Missing or insufficient permissions")) {
         alert("Gagal menambahkan! Akses ditolak oleh Firebase Security Rules.");
      } else {
         alert(`Gagal: ${error.message}`);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-900 text-slate-100 font-sans">
      {/* Top Navbar */}
      <header className="sticky top-0 z-10 border-b border-white/10 bg-slate-900/50 backdrop-blur-xl">
        <div className="max-w-6xl w-full mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-indigo-500 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white">KeuanganHarian</h1>
            </div>
          </div>
          
          <button
            onClick={() => setIsFormOpen(true)}
            className="flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white px-4 py-2 rounded-2xl text-sm font-medium transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Tambah Transaksi</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl w-full mx-auto px-4 md:px-8 py-8 flex flex-col gap-6">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-64 text-indigo-300">
            <Loader2 className="w-8 h-8 animate-spin mb-4" />
            <p>Memuat data transaksi dari database...</p>
          </div>
        ) : errorMsg ? (
          <div className="bg-rose-500/20 border border-rose-500/30 backdrop-blur-md rounded-3xl p-8 flex flex-col items-center text-center max-w-2xl mx-auto mt-12">
            <AlertCircle className="w-12 h-12 text-rose-400 mb-4" />
            <h2 className="text-xl font-bold text-rose-100 mb-2">Akses ke Database Ditolak</h2>
            <p className="text-rose-200/80 mb-6">{errorMsg}</p>
            <div className="bg-slate-900/50 p-4 rounded-xl text-left w-full border border-rose-500/20">
              <p className="text-sm text-slate-300 font-semibold mb-2">Cara memperbaiki (Untuk Mode Testing):</p>
              <ol className="list-decimal pl-5 text-sm text-slate-400 space-y-2">
                <li>Buka <a href="https://console.firebase.google.com/" target="_blank" rel="noreferrer" className="text-indigo-400 hover:text-indigo-300 underline">Console Firebase</a> dan pilih project Anda.</li>
                <li>Buka menu <strong>Firestore Database</strong> &gt; tab <strong>Rules</strong>.</li>
                <li>Ubah kode aturan menjadi seperti berikut:<br/>
                <code className="block mt-2 bg-black/30 p-2 rounded text-emerald-400">
                  rules_version = '2';<br/>
                  service cloud.firestore {'{'}<br/>
                  &nbsp;&nbsp;match /databases/{"{"}database{"}"}/documents {'{'}<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;match /{"{"}document=**{"}"} {'{'}<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;allow read, write: if true;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;{'}'}<br/>
                  &nbsp;&nbsp;{'}'}<br/>
                  {'}'}
                </code>
                </li>
                <li>Klik tombol <strong>Publish</strong>.</li>
              </ol>
            </div>
          </div>
        ) : (
          <>
            <DashboardCards transactions={transactions} />
            
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              <div className="lg:col-span-3">
                <TransactionList transactions={transactions} />
              </div>
              <div className="lg:col-span-2">
                <ExpenseChart transactions={transactions} />
              </div>
            </div>
          </>
        )}
      </main>

      {/* Modal / Flow Tambah Transaksi */}
      {isFormOpen && (
        <TransactionForm 
          onClose={() => setIsFormOpen(false)} 
          onSubmit={handleAddTransaction} 
        />
      )}
    </div>
  );
}
