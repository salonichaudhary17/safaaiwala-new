const fs = require('fs');
const path = './frontend/src/components/RecyclerDashboard.jsx';
let content = fs.readFileSync(path, 'utf8');

if (!content.includes('import { calculateMinerals }')) {
  content = content.replace(
    "import { Package, MapPin, Hash, Search, ShieldCheck, QrCode, ArrowRightLeft, X, ShieldAlert, Download, Lock } from 'lucide-react';",
    "import { Package, MapPin, Hash, Search, ShieldCheck, QrCode, ArrowRightLeft, X, ShieldAlert, Download, Lock, Pickaxe } from 'lucide-react';\nimport { calculateMinerals } from '../utils/mineralCalculator';"
  );
}

const recyclerMineralHtml = `
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
                })()}
`;

// Insert it right after the SHA-256 block inside the batch rendering.
// We look for: <span className="text-slate-500 italic">Awaiting verification to seal SHA-256 hash...</span>\n                  </p>\n                )}
content = content.replace(
  /<span className="text-slate-500 italic">Awaiting verification to seal SHA-256 hash\.\.\.<\/span>\n\s*<\/p>\n\s*<\/div>\)}/, // wait, the structure is slightly different.
  "not-found"
);

// Actually let's just find `</p>\n                )}` which ends the hash block.
const hashEndRegex = /<\/p>\n\s*\}\)/; // Wait, it's `)}`
// Let's use Python to replace safely.
fs.writeFileSync('patch_temp.js', content);
