const fs = require('fs');
const path = './frontend/src/components/ReceiptModal.jsx';
let content = fs.readFileSync(path, 'utf8');

const targetStr = `          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
            <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider block mb-2">
              Itemized Scrap Details
            </span>
            {Array.isArray(transaction.itemsList) && transaction.itemsList.length > 0 ? (
              transaction.itemsList.map((item, idx) => (
                <div key={idx} className="flex justify-between text-xs sm:text-sm py-1 border-b border-slate-200/50 last:border-0">
                  <span className="text-slate-800 font-bold">{item.materialName || 'Scrap Material'} ({item.weightKg || 1} kg)</span>
                  <span className="font-black text-slate-900">₹{item.subtotal || item.ratePerKg || totalVal}</span>
                </div>
              ))
            ) : (
              <div className="flex justify-between text-xs sm:text-sm py-1">
                <span className="text-slate-800 font-bold">{transaction.itemType || transaction.category || 'E-Waste Scrap'} ({transaction.weightKg || 1} kg)</span>
                <span className="font-black text-slate-900">₹{totalVal}</span>
              </div>
            )}
          </div>`;

const conditionLabel = (cond, lang) => {
  if (cond === 'working') return lang === 'hi' ? 'चालू स्थिति' : lang === 'mr' ? 'चालू स्थिती' : 'Working';
  if (cond === 'scrap') return lang === 'hi' ? 'टूटा-फूटा' : lang === 'mr' ? 'तुटलेले' : 'Broken Scrap';
  return lang === 'hi' ? 'मरम्मत योग्य' : lang === 'mr' ? 'दुरुस्तीयोग्य' : 'Repairable';
};

const replacementStr = `          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
            <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider block mb-2">
              {lang === 'hi' ? 'लॉट का विवरण' : lang === 'mr' ? 'लॉट तपशील' : 'Itemized Scrap Details'}
            </span>
            {Array.isArray(transaction.itemsList) && transaction.itemsList.length > 0 ? (
              transaction.itemsList.map((item, idx) => {
                const cond = item.condition || transaction.condition || 'semi-working';
                const condText = cond === 'working' ? (lang === 'hi' ? 'चालू स्थिति' : lang === 'mr' ? 'चालू स्थिती' : 'Working') : cond === 'scrap' ? (lang === 'hi' ? 'टूटा-फूटा' : lang === 'mr' ? 'तुटलेले' : 'Broken Scrap') : (lang === 'hi' ? 'मरम्मत योग्य' : lang === 'mr' ? 'दुरुस्तीयोग्य' : 'Repairable');
                const ageText = item.itemAge || transaction.itemAge || '2-5 Yrs';
                return (
                  <div key={idx} className="flex flex-col py-2 border-b border-slate-200/50 last:border-0">
                    <div className="flex justify-between text-xs sm:text-sm items-center mb-1">
                      <span className="text-slate-800 font-bold">{item.materialName || 'Scrap Material'} ({item.weightKg || 1} kg)</span>
                      <span className="font-black text-slate-900">₹{item.subtotal || item.ratePerKg || totalVal}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-[9px] bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded font-bold uppercase">{condText}</span>
                      <span className="text-[9px] bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded font-bold uppercase">{ageText}</span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="flex flex-col py-2 border-b border-slate-200/50 last:border-0">
                <div className="flex justify-between text-xs sm:text-sm items-center mb-1">
                  <span className="text-slate-800 font-bold">{transaction.itemType || transaction.category || 'E-Waste Scrap'} ({transaction.weightKg || 1} kg)</span>
                  <span className="font-black text-slate-900">₹{totalVal}</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-[9px] bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded font-bold uppercase">
                    {transaction.condition === 'working' ? (lang === 'hi' ? 'चालू स्थिति' : lang === 'mr' ? 'चालू स्थिती' : 'Working') : transaction.condition === 'scrap' ? (lang === 'hi' ? 'टूटा-फूटा' : lang === 'mr' ? 'तुटलेले' : 'Broken Scrap') : (lang === 'hi' ? 'मरम्मत योग्य' : lang === 'mr' ? 'दुरुस्तीयोग्य' : 'Repairable')}
                  </span>
                  <span className="text-[9px] bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded font-bold uppercase">{transaction.itemAge || '2-5 Yrs'}</span>
                </div>
              </div>
            )}
          </div>`;

if (content.includes(targetStr)) {
  content = content.replace(targetStr, replacementStr);
  fs.writeFileSync(path, content, 'utf8');
  console.log("ReceiptModal.jsx patched successfully.");
} else {
  console.log("Target string not found in ReceiptModal.jsx");
}
