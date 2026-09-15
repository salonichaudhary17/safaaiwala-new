const fs = require('fs');
const path = './frontend/src/components/RecyclerDashboard.jsx';
let content = fs.readFileSync(path, 'utf8');

if (!content.includes('import { calculateMinerals }')) {
  content = content.replace(
    "import { Package, MapPin, Hash, Search, ShieldCheck, QrCode, ArrowRightLeft, X, ShieldAlert, Download, Lock } from 'lucide-react';",
    "import { Package, MapPin, Hash, Search, ShieldCheck, QrCode, ArrowRightLeft, X, ShieldAlert, Download, Lock, Pickaxe } from 'lucide-react';\nimport { calculateMinerals } from '../utils/mineralCalculator';"
  );
}

const targetStr = '<span className="text-slate-500 italic">Awaiting verification to seal SHA-256 hash...</span>\n                  </p>\n                )}';

const replacement = `<span className="text-slate-500 italic">Awaiting verification to seal SHA-256 hash...</span>
                  </p>
                )}
                
                {/* Strategic Mineral Yield for Recycler */}
                {batch.status === 'Verified & Logged' && (() => {
                  const minerals = calculateMinerals(batch.material, batch.weightKg);
                  if (!minerals) return null;
                  return (
                    <div className="mt-2 bg-slate-900 rounded-xl p-2.5 border border-slate-700 w-full md:max-w-md shadow-inner">
                      <span className="text-[9px] uppercase font-bold text-slate-400 mb-1.5 tracking-wider flex items-center gap-1.5">
                        <Pickaxe className="w-3 h-3 text-amber-500" />
                        CPCB Critical Mineral Target
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {minerals.map(m => (
                          <div key={m.name} className="bg-slate-800 px-2 py-1 rounded border border-slate-700 flex items-center gap-1.5 shadow-sm">
                            <span className={\`text-[9px] font-black \${m.color}\`}>{m.name.split(' ')[0]}</span>
                            <span className="text-white text-[9px] font-mono">{m.amount}{m.unit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })()}`;

if (content.includes(targetStr)) {
  content = content.replace(targetStr, replacement);
  fs.writeFileSync(path, content, 'utf8');
  console.log("Patched RecyclerDashboard successfully");
} else {
  console.log("Target string not found in RecyclerDashboard.jsx");
}
