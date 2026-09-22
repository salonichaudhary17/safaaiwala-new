const fs = require('fs');
const path = './frontend/src/components/Scanner.jsx';
let content = fs.readFileSync(path, 'utf8');

const targetStr = `                  <div className="flex flex-col gap-2">
                    <input 
                      type="number" 
                      value={weightKg} 
                      onChange={(e) => setWeightKg(Math.max(0.1, Number(e.target.value)))}
                      className="w-full border border-slate-300 rounded-lg p-3 text-xl font-black text-slate-800 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500 text-center shadow-inner"
                      step="0.1"
                    />
                    <div className="flex gap-1.5 w-full">`;

const replacementStr = `                  <div className="flex flex-col gap-2">
                    <div className="flex items-stretch gap-2">
                      <input 
                        type="number" 
                        value={weightKg} 
                        onChange={(e) => setWeightKg(Math.max(0.1, Number(e.target.value)))}
                        className="w-full border border-slate-300 rounded-lg p-3 text-xl font-black text-slate-800 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500 text-center shadow-inner [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        step="0.1"
                      />
                      <div className="flex flex-col w-14 shrink-0 gap-1">
                        <button 
                          onClick={() => setWeightKg(+(weightKg + 1).toFixed(1))}
                          className="flex-1 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-md flex items-center justify-center active:bg-slate-300 transition-colors shadow-sm"
                        >
                          <ChevronUp className="w-6 h-6 text-slate-700 font-bold" />
                        </button>
                        <button 
                          onClick={() => setWeightKg(Math.max(0.1, +(weightKg - 1).toFixed(1)))}
                          className="flex-1 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-md flex items-center justify-center active:bg-slate-300 transition-colors shadow-sm"
                        >
                          <ChevronDown className="w-6 h-6 text-slate-700 font-bold" />
                        </button>
                      </div>
                    </div>
                    <div className="flex gap-1.5 w-full">`;

if (content.includes(targetStr)) {
  content = content.replace(targetStr, replacementStr);
  fs.writeFileSync(path, content, 'utf8');
  console.log("Custom up/down stepper added successfully!");
} else {
  console.log("Could not find input string for custom stepper.");
}
