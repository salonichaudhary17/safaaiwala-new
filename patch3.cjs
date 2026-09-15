const fs = require('fs');
const path = './frontend/src/components/RecyclerDashboard.jsx';
let content = fs.readFileSync(path, 'utf8');

const insertBtnCode = `
        {/* NEW EXPORT BUTTON */}
        <button
          onClick={() => setShowDatasetsModal(true)}
          className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-emerald-500/50 px-4 py-2.5 rounded-xl font-black text-sm flex items-center justify-center gap-2 shadow-lg transition active:scale-95 mt-3 sm:mt-0"
        >
          <Download className="w-5 h-5" /> Export CPCB Datasets
        </button>
`;

// Find the Scan Handover Receipt button and put the Export button next to it.
const scanBtnRegex = /<button\s+onClick=\{\(\) => setShowQrScanner\(true\)\}[\s\S]*?Scan Handover Receipt\s+<\/button>/;

content = content.replace(scanBtnRegex, (match) => {
  return match + "\\n" + insertBtnCode;
});

// Double check the modal is there, if not inject it again.
if (!content.includes('CPCB Compliance Export')) {
  const cpcbModalCode = `
      {/* CPCB Datasets Export Modal */}
      {showDatasetsModal && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-sm flex items-center justify-center p-4 z-[60]">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl p-6 shadow-2xl overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-black text-white flex items-center gap-2">
                  <Download className="w-6 h-6 text-emerald-500" /> CPCB Compliance Export
                </h3>
                <p className="text-slate-400 text-sm mt-1">Generate official CSV logs for regulatory auditing.</p>
              </div>
              <button onClick={() => setShowDatasetsModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="grid gap-3">
              {[
                { title: 'Material Classification Dataset', desc: 'AI confidence logs, weight averages, images' },
                { title: 'Price & Trend History Dataset', desc: 'Daily local and national rate fluctuations' },
                { title: 'Authorized Recycler Registry', desc: 'CPCB status, capacities, matched logs' },
                { title: 'Transaction & Payout Log', desc: 'Financial transfers, weight anomalies, overrides' },
                { title: 'End-to-End Traceability Ledger', desc: 'SHA-256 hashes, GPS nodes, timestamps' },
                { title: 'Collector Profile & Micro-Passbook Dataset', desc: 'Anonymized earning histories, device IDs' }
              ].map((ds, idx) => (
                <div key={idx} className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 flex justify-between items-center group hover:border-emerald-500/50 transition">
                  <div>
                    <h4 className="font-bold text-slate-200">{ds.title}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">{ds.desc}</p>
                  </div>
                  <button onClick={() => alert('Downloading ' + ds.title + '...')} className="bg-slate-700 group-hover:bg-emerald-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer">
                    <Download className="w-3.5 h-3.5" /> .CSV
                  </button>
                </div>
              ))}
            </div>
            
            <button
              onClick={() => setShowDatasetsModal(false)}
              className="w-full mt-6 bg-slate-800 hover:bg-slate-700 text-white py-3 rounded-xl font-bold transition"
            >
              Close Downloader
            </button>
          </div>
        </div>
      )}
`;
  const lastDivRegex = /\\s*<\\/div>\\n\\s*\\);\\n\\}\\n*$/;
  content = content.replace(lastDivRegex, cpcbModalCode + "\\n    </div>\\n  );\\n}\\n");
}

fs.writeFileSync(path, content, 'utf8');
console.log("Patched successfully");
