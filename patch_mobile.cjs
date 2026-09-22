const fs = require('fs');
const path = './frontend/src/components/Scanner.jsx';
let content = fs.readFileSync(path, 'utf8');

const targetStr = `                  <div className="flex items-center gap-2">
                    <input 
                      type="number" 
                      value={weightKg} 
                      onChange={(e) => setWeightKg(Math.max(0.1, Number(e.target.value)))}
                      className="flex-1 border border-slate-300 rounded-lg p-2 text-lg font-black text-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                      step="0.1"
                    />
                    <div className="flex gap-1">
                      {[0.5, 1, 5, 10].map(val => (
                        <button 
                          key={val} 
                          onClick={() => setWeightKg(+(weightKg + val).toFixed(1))}
                          className="bg-emerald-50 text-emerald-700 font-bold border border-emerald-200 rounded px-2 py-1 text-xs hover:bg-emerald-100"
                        >
                          +{val}kg
                        </button>
                      ))}
                    </div>
                  </div>`;

const replacementStr = `                  <div className="flex flex-col gap-2">
                    <input 
                      type="number" 
                      value={weightKg} 
                      onChange={(e) => setWeightKg(Math.max(0.1, Number(e.target.value)))}
                      className="w-full border border-slate-300 rounded-lg p-3 text-xl font-black text-slate-800 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500 text-center shadow-inner"
                      step="0.1"
                    />
                    <div className="flex gap-1.5 w-full">
                      {[0.5, 1, 5, 10].map(val => (
                        <button 
                          key={val} 
                          onClick={() => setWeightKg(+(weightKg + val).toFixed(1))}
                          className="flex-1 bg-emerald-50 text-emerald-800 font-black border border-emerald-300 rounded-lg py-2.5 text-xs sm:text-sm hover:bg-emerald-100 active:scale-95 transition-all shadow-sm"
                        >
                          +{val}kg
                        </button>
                      ))}
                    </div>
                  </div>`;

if (content.includes(targetStr)) {
  content = content.replace(targetStr, replacementStr);
  fs.writeFileSync(path, content, 'utf8');
  console.log("Mobile layout patched successfully!");
} else {
  console.log("Could not find layout string.");
}
