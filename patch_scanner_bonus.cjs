const fs = require('fs');
const path = './frontend/src/components/Scanner.jsx';
let content = fs.readFileSync(path, 'utf8');

const oldTotalCalc = `  const totalCalculatedValue = analysis
    ? Math.round(weightKg * (analysis.estimatedValuePerKg || analysis.rate || 100))
    : 0;`;

const newTotalCalc = `  const baseValue = analysis
    ? Math.round(weightKg * (analysis.estimatedValuePerKg || analysis.rate || 100))
    : 0;
  const eprBonus = weightKg * 15;
  const totalCalculatedValue = baseValue + eprBonus;`;

content = content.replace(oldTotalCalc, newTotalCalc);

const oldPriceUI = `            <div className="text-left sm:text-right">
              <span className="text-xs text-slate-500 block font-medium">{t.totalEstimate}</span>
              <span className="text-2xl sm:text-3xl font-black text-emerald-700">
                ₹{totalCalculatedValue}
              </span>
              <span className="text-[11px] text-slate-500 block">
                (₹{analysis.estimatedValuePerKg || analysis.rate}/kg × {weightKg}kg)
              </span>
            </div>`;

const newPriceUI = `            <div className="text-left sm:text-right flex flex-col justify-end h-full">
              <span className="text-xs text-slate-500 block font-medium">Net Payout</span>
              <span className="text-2xl sm:text-3xl font-black text-emerald-700 leading-none mb-1">
                ₹{totalCalculatedValue}
              </span>
              <div className="flex flex-col gap-0.5 text-[10px] text-slate-500 font-mono">
                <span>Base: ₹{analysis.estimatedValuePerKg || analysis.rate}/kg × {weightKg}kg = ₹{baseValue}</span>
                <span className="text-emerald-600 font-bold bg-emerald-50 px-1 rounded inline-block w-fit">CPCB Bonus: +₹15/kg = ₹{eprBonus}</span>
              </div>
            </div>`;

content = content.replace(oldPriceUI, newPriceUI);

fs.writeFileSync(path, content, 'utf8');
console.log("Patched Scanner successfully");
