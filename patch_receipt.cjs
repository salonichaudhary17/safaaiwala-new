const fs = require('fs');
const path = './frontend/src/components/ReceiptModal.jsx';
let content = fs.readFileSync(path, 'utf8');

if (!content.includes('import { calculateMinerals }')) {
  content = content.replace(
    "import { X, Printer, Download, CheckCircle2, ShieldCheck, QrCode } from 'lucide-react';",
    "import { X, Printer, Download, CheckCircle2, ShieldCheck, QrCode, Pickaxe } from 'lucide-react';\nimport { calculateMinerals } from '../utils/mineralCalculator';"
  );
}

const mineralHtml = `
          {/* Strategic Mineral Yield */}
          {(() => {
            const materialName = Array.isArray(transaction.itemsList) && transaction.itemsList.length > 0 
              ? transaction.itemsList[0].materialName 
              : (transaction.itemType || transaction.category || 'e-waste');
            const totalWeight = transaction.weightKg || (transaction.itemsList && transaction.itemsList[0] ? transaction.itemsList[0].weightKg : 1);
            const minerals = calculateMinerals(materialName, totalWeight);
            if (!minerals) return null;
            return (
              <div className="bg-slate-900 rounded-xl p-4 border border-slate-700 shadow-inner">
                <h4 className="text-[9px] uppercase font-black text-slate-400 mb-2 tracking-wider flex items-center gap-1.5">
                  <Pickaxe className="w-3.5 h-3.5 text-amber-500" />
                  Strategic Mineral Yield (CPCB Critical Reserve)
                </h4>
                <div className="flex flex-wrap gap-2">
                  {minerals.map(m => (
                    <div key={m.name} className="bg-slate-800/80 px-2.5 py-1.5 rounded-lg border border-slate-700 flex flex-col items-center flex-1 min-w-[70px]">
                      <span className={\`text-[10px] font-black \${m.color}\`}>{m.name.split(' ')[0]}</span>
                      <span className="text-white text-xs font-mono">{m.amount} {m.unit}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
`;

// Insert it right after the Environmental Impact block
content = content.replace(
  /<div className="bg-emerald-50\/80 p-3 rounded-xl border border-emerald-200 flex justify-between items-center">[\s\S]*?<\/div>\n/,
  match => match + mineralHtml + "\n"
);

fs.writeFileSync(path, content, 'utf8');
console.log("Patched ReceiptModal successfully");
