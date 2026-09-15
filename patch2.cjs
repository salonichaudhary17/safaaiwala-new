const fs = require('fs');
const path = './frontend/src/components/RecyclerDashboard.jsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Add States
content = content.replace(
  "const [scannedHash, setScannedHash] = useState(null);",
  "const [scannedHash, setScannedHash] = useState(null);\n  const [resolvingBatch, setResolvingBatch] = useState(null);\n  const [actualWeight, setActualWeight] = useState('');"
);

// 2. Replace verifyBatch
const newVerifyBatch = `
  const verifyBatch = (id) => {
    const batch = incomingBatches.find(b => b.id === id);
    if (batch && batch.isFlaggedForFraud) {
      setResolvingBatch(batch);
      setActualWeight('');
    } else {
      setIncomingBatches(batches =>
        batches.map(b => b.id === id ? { ...b, status: 'Verified & Logged' } : b)
      );
    }
  };

  const handleResolveAndVerify = () => {
    if (!resolvingBatch || !actualWeight) return;
    setIncomingBatches(batches =>
      batches.map(b => b.id === resolvingBatch.id ? {
        ...b,
        status: 'Verified & Logged',
        weightKg: parseFloat(actualWeight),
        isFlaggedForFraud: false,
        batchHash: \`sha256_resolved_\${Date.now().toString(16)}\`
      } : b)
    );
    setResolvingBatch(null);
  };
`;
// find the existing verifyBatch and replace it.
const verifyRegex = /const verifyBatch = \(id\) => \{[\s\S]*?\};\n/m;
content = content.replace(verifyRegex, newVerifyBatch);

// 3. Inject Modal at the end, just before the last </div>
const modalCode = `

      {/* Discrepancy Resolution Dialog */}
      {resolvingBatch && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-black text-white flex items-center gap-2">
                <ShieldAlert className="w-6 h-6 text-red-500" /> Discrepancy Resolution
              </h3>
              <button onClick={() => setResolvingBatch(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="bg-red-950/50 border border-red-900/50 p-4 rounded-xl mb-4">
              <p className="text-sm text-slate-300">
                <span className="text-slate-500">Declared Weight:</span> <strong className="text-red-400">{resolvingBatch.weightKg} KG</strong>
              </p>
              <p className="text-[11px] text-red-400 mt-1 font-medium italic">
                (Flagged: Outlier for {resolvingBatch.material})
              </p>
            </div>

            <div className="mb-4">
              <label className="block text-xs uppercase font-bold text-slate-400 mb-2 tracking-wider">
                Weighbridge/Scale Input (Actual)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={actualWeight}
                  onChange={(e) => setActualWeight(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 text-white px-4 py-3 rounded-xl text-lg font-bold focus:border-emerald-500 outline-none"
                  placeholder="e.g. 14.2"
                />
                <span className="text-slate-400 font-bold bg-slate-800 px-4 py-3 rounded-xl border border-slate-700">KG</span>
              </div>
            </div>
            
            {actualWeight && parseFloat(actualWeight) > 0 && (
               <div className="bg-emerald-950/30 border border-emerald-900/50 p-4 rounded-xl mb-6 flex justify-between items-center">
                  <span className="text-sm text-slate-400">Recalculated Fair Value:</span>
                  <span className="text-xl font-black text-emerald-400">
                    ₹{Math.round(parseFloat(actualWeight) * 85)}
                  </span>
               </div>
            )}

            <button
              onClick={handleResolveAndVerify}
              disabled={!actualWeight || parseFloat(actualWeight) <= 0}
              className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-bold transition flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-5 h-5" /> Gen Reconciliation Hash & Pay
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
`;

const lastDivRegex = /\s*<\/div>\n\s*\);\n\}\n*$/;
content = content.replace(lastDivRegex, modalCode);

fs.writeFileSync(path, content, 'utf8');
console.log("Patched successfully");
