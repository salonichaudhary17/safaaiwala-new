const fs = require('fs');
const path = './frontend/src/components/LivePrices.jsx';
let content = fs.readFileSync(path, 'utf8');

// Replace the simple price view with the breakdown view
const oldPriceHtml = `                  <div className="text-right">
                    <div className="text-xs text-slate-500 font-semibold mb-0.5">{t.currentRate}</div>
                    <div className="text-xl sm:text-2xl font-black text-emerald-600 flex items-center justify-end gap-1">
                      <span className="text-sm sm:text-base">₹</span>{item.price}
                    </div>
                  </div>`;

const newPriceHtml = `                  <div className="text-right">
                    <div className="text-xs text-slate-500 font-semibold mb-0.5">Net Payout</div>
                    <div className="text-xl sm:text-2xl font-black text-emerald-600 flex items-center justify-end gap-1">
                      <span className="text-sm sm:text-base">₹</span>{item.price + 15}
                    </div>
                  </div>`;

const oldFooterHtml = `                <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center">
                  <span className="text-[10px] text-slate-400 font-medium">Valid for 24h</span>
                  <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-emerald-500" />
                    Demand High
                  </span>
                </div>`;

const newFooterHtml = `                <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col gap-1.5">
                  <div className="flex justify-between text-xs text-slate-600 font-medium">
                    <span>Base Market Rate:</span>
                    <span>₹{item.price}/kg</span>
                  </div>
                  <div className="flex justify-between text-xs text-emerald-700 font-bold bg-emerald-50 px-2 py-1 rounded border border-emerald-100">
                    <span>CPCB Handover Bonus:</span>
                    <span>+₹15/kg</span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-[9px] text-slate-400 italic">Guaranteed via CPCB formal facility</span>
                    <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                      <TrendingUp className="w-3 h-3 text-emerald-500" />
                      Demand High
                    </span>
                  </div>
                </div>`;

content = content.replace(oldPriceHtml, newPriceHtml);
content = content.replace(oldFooterHtml, newFooterHtml);

fs.writeFileSync(path, content, 'utf8');
console.log("Patched LivePrices successfully");
