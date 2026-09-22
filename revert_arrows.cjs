const fs = require('fs');
const path = './frontend/src/components/Scanner.jsx';
let content = fs.readFileSync(path, 'utf8');

const targetStr = `                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => setWeightKg(Math.max(0.1, +(weightKg - 1).toFixed(1)))}
                        className="p-3 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg text-slate-700 font-black shadow-sm active:scale-95 transition-all flex items-center justify-center shrink-0"
                      >
                        <Minus className="w-6 h-6" />
                      </button>
                      <input 
                        type="number" 
                        value={weightKg} 
                        onChange={(e) => setWeightKg(Math.max(0.1, Number(e.target.value)))}
                        className="w-full border border-slate-300 rounded-lg p-3 text-xl font-black text-slate-800 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500 text-center shadow-inner [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        step="0.1"
                      />
                      <button 
                        onClick={() => setWeightKg(+(weightKg + 1).toFixed(1))}
                        className="p-3 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg text-slate-700 font-black shadow-sm active:scale-95 transition-all flex items-center justify-center shrink-0"
                      >
                        <Plus className="w-6 h-6" />
                      </button>
                    </div>
                    <div className="flex gap-1.5 w-full">`;

// Restore to just the input without the custom side buttons and WITHOUT the CSS that hides the native arrows
const replacementStr = `                  <div className="flex flex-col gap-2">
                    <input 
                      type="number" 
                      value={weightKg} 
                      onChange={(e) => setWeightKg(Math.max(0.1, Number(e.target.value)))}
                      className="w-full border border-slate-300 rounded-lg p-3 text-xl font-black text-slate-800 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500 text-center shadow-inner"
                      step="0.1"
                    />
                    <div className="flex gap-1.5 w-full">`;

if (content.includes(targetStr)) {
  content = content.replace(targetStr, replacementStr);
  fs.writeFileSync(path, content, 'utf8');
  console.log("Restored native browser arrows successfully!");
} else {
  console.log("Could not find input string to revert.");
}
