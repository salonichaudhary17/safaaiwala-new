import React, { useState, useEffect } from 'react';
import { Wallet, TrendingUp, History, Package, AlertCircle } from 'lucide-react';
import { translations } from '../i18n/translations';

export default function Passbook({ lang = 'hi' }) {
  const [transactions, setTransactions] = useState([]);
  const [stats, setStats] = useState({ totalEarned: 0, pendingDues: 0, totalWeight: 0 });
  const t = translations[lang] || translations.hi;

  const loadData = () => {
    try {
      const saved = JSON.parse(localStorage.getItem('safaaiwala_offline_lots') || '[]');
      setTransactions(saved);
      
      let earned = 0;
      let pending = 0;
      let weight = 0;

      saved.forEach(txn => {
        const amount = txn.totalAmount || 0;
        const w = txn.itemsList?.[0]?.weightKg || 1;
        
        weight += w;
        
        if (txn.status === 'verified_offline' || !txn.synced) {
          pending += amount;
        } else {
          earned += amount;
        }
      });

      setStats({ totalEarned: earned, pendingDues: pending, totalWeight: weight });
    } catch (e) {
      console.warn("Failed to load passbook", e);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSync = () => {
    const saved = JSON.parse(localStorage.getItem('safaaiwala_offline_lots') || '[]');
    const updated = saved.map(txn => ({ ...txn, synced: true, status: 'verified' }));
    localStorage.setItem('safaaiwala_offline_lots', JSON.stringify(updated));
    loadData();
  };

  return (
    <div className="space-y-6 fade-in">
      {/* Top Stats Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-emerald-600 text-white p-4 rounded-2xl shadow-lg border border-emerald-500 relative overflow-hidden">
          <div className="flex items-center justify-between gap-2 text-emerald-100 mb-1 relative z-10">
            <div className="flex items-center gap-2">
              <Wallet className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wide">
                {lang === 'hi' ? 'कुल कमाई' : lang === 'mr' ? 'एकूण कमाई' : 'Total Earned'}
              </span>
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black relative z-10">₹{stats.totalEarned}</div>
        </div>
        
        <div className="bg-amber-500 text-white p-4 rounded-2xl shadow-lg border border-amber-400 relative">
          <div className="flex items-center justify-between gap-2 text-amber-100 mb-1">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wide">
                {lang === 'hi' ? 'बकाया राशि' : lang === 'mr' ? 'बाकी रक्कम' : 'Pending Dues'}
              </span>
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black flex items-center justify-between">
            ₹{stats.pendingDues}
            {stats.pendingDues > 0 && (
              <button 
                onClick={handleSync}
                className="bg-white/20 hover:bg-white/30 px-2 py-1 rounded text-[10px] uppercase font-black tracking-wider transition shadow-sm border border-white/30"
              >
                Sync Now 🔄
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 shadow-sm flex items-center justify-between">
         <div className="flex items-center gap-3">
           <Package className="w-8 h-8 text-slate-400 p-1.5 bg-white rounded-xl shadow-sm border border-slate-100" />
           <div>
             <span className="block text-xs font-bold text-slate-500 uppercase">
               {lang === 'hi' ? 'कुल कबाड़ दिया' : lang === 'mr' ? 'एकूण भंगार दिले' : 'Total Scrap Handed Over'}
             </span>
             <span className="text-lg font-black text-slate-800">{stats.totalWeight} KG</span>
           </div>
         </div>
      </div>

      {/* Transaction History List */}
      <div>
        <h3 className="font-black text-lg text-slate-800 mb-3 flex items-center gap-2">
          <History className="w-5 h-5 text-slate-400" />
          {lang === 'hi' ? 'लेन-देन इतिहास' : lang === 'mr' ? 'व्यवहार इतिहास' : 'Transaction History'}
        </h3>
        
        {transactions.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center flex flex-col items-center justify-center shadow-sm">
            <AlertCircle className="w-12 h-12 text-slate-300 mb-3" />
            <p className="text-slate-500 font-medium text-sm">
              {lang === 'hi' ? 'अभी तक कोई लेन-देन नहीं हुआ' : lang === 'mr' ? 'अद्याप कोणताही व्यवहार नाही' : 'No transactions yet'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {transactions.map((txn, idx) => (
              <div key={txn._id || idx} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex justify-between items-center transition hover:shadow-md">
                <div className="flex items-start gap-3">
                  <div className={`p-2.5 rounded-xl ${txn.synced ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                    <Wallet className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">
                      {txn.itemsList?.[0]?.materialName || (lang === 'hi' ? 'ई-कचरा' : lang === 'mr' ? 'ई-कचरा' : 'E-Waste')} 
                      <span className="text-slate-500 ml-1 font-medium">({txn.itemsList?.[0]?.weightKg || 1}kg)</span>
                    </h4>
                    <span className="text-xs text-slate-500 font-mono mt-0.5 block">
                      {new Date(txn.createdAt).toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                    </span>
                    {!txn.synced && (
                      <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-bold mt-1 inline-block">
                        {lang === 'hi' ? 'ऑफ़लाइन (सिंक बाकी)' : lang === 'mr' ? 'ऑफलाइन (सिंक बाकी)' : 'Offline (Pending Sync)'}
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-black text-lg text-slate-900">₹{txn.totalAmount}</div>
                  <div className={`text-[10px] font-bold uppercase tracking-wider ${txn.status === 'verified_offline' || !txn.synced ? 'text-amber-500' : 'text-emerald-500'}`}>
                    {txn.status === 'verified_offline' || !txn.synced 
                      ? (lang === 'hi' ? 'बकाया' : lang === 'mr' ? 'बाकी' : 'PENDING')
                      : (lang === 'hi' ? 'प्राप्त' : lang === 'mr' ? 'मिळाले' : 'RECEIVED')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
