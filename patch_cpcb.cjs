const fs = require('fs');
const path = './frontend/src/components/RecyclerDashboard.jsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Add Download to imports
content = content.replace("X, ShieldAlert } from 'lucide-react';", "X, ShieldAlert, Download } from 'lucide-react';");

// 2. Add State
content = content.replace(
  "const [resolvingBatch, setResolvingBatch] = useState(null);",
  "const [resolvingBatch, setResolvingBatch] = useState(null);\n  const [showDatasetsModal, setShowDatasetsModal] = useState(false);"
);

// 3. Inject Button right before {/* Action Bar */} or after the Sub Tabs.
// Let's find "<!-- Action Bar -->" or similar, or just after the closing div of Sub Tabs.
// Looking for: activeSubTab === 'directory' ... </div>
const insertBtnCode = `
      {/* NEW EXPORT BUTTON */}
      <div className="w-full px-4 mb-4 mt-2">
        <button
          onClick={() => setShowDatasetsModal(true)}
          className="w-full bg-slate-800/80 hover:bg-slate-700 text-emerald-400 border border-emerald-500/50 py-3 rounded-xl font-bold transition flex items-center justify-center gap-2 shadow-sm"
        >
          <Download className="w-5 h-5" /> View / Export 6 CPCB Compliance Datasets
        </button>
      </div>
`;
content = content.replace(
  /{t\.recyclerDirectory}\n\s*<\/button>\n\s*<\/div>/,
  `{t.recyclerDirectory}\n        </button>\n      </div>\n${insertBtnCode}`
);

// 4. Inject Modal at the end
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
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
`;

const lastDivRegex = /\s*<\/div>\n\s*\);\n\}\n*$/;
content = content.replace(lastDivRegex, cpcbModalCode);

fs.writeFileSync(path, content, 'utf8');
console.log("Patched successfully");
