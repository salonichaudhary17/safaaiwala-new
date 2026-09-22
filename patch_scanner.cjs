const fs = require('fs');
const path = './frontend/src/components/Scanner.jsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Add states
const stateTarget = `const [anomalyWarning, setAnomalyWarning] = useState("");`;
const stateReplacement = `const [anomalyWarning, setAnomalyWarning] = useState("");
  const [isEditingLot, setIsEditingLot] = useState(false);
  const [condition, setCondition] = useState('semi-working');
  const [itemAge, setItemAge] = useState('2-5');`;
if (content.includes(stateTarget)) {
  content = content.replace(stateTarget, stateReplacement);
}

// 2. Add lucide icons: ChevronDown, ChevronUp, Edit3
if (!content.includes('Edit3')) {
  content = content.replace('import { WifiOff, AlertTriangle, ShieldAlert, Package, Camera, Sparkles } from \'lucide-react\';', 
    'import { WifiOff, AlertTriangle, ShieldAlert, Package, Camera, Sparkles, Edit3, ChevronDown, ChevronUp } from \'lucide-react\';');
}

// 3. Update value computation
const calcTarget = `  const baseValue = analysis
    ? Math.round(weightKg * (analysis.estimatedValuePerKg || analysis.rate || 100))
    : 0;
  const eprBonus = weightKg * 15;
  const totalCalculatedValue = baseValue + eprBonus;`;

const calcReplacement = `  const conditionMultiplier = condition === 'working' ? 1.20 : condition === 'scrap' ? 0.85 : 1.00;
  const effectiveBaseRate = (analysis?.estimatedValuePerKg || analysis?.rate || 100) * conditionMultiplier;
  
  const baseValue = analysis
    ? Math.round(weightKg * effectiveBaseRate)
    : 0;
  const eprBonus = weightKg * 15;
  const totalCalculatedValue = baseValue + eprBonus;`;

if (content.includes(calcTarget)) {
  content = content.replace(calcTarget, calcReplacement);
}

// 4. Update the onAnalysisComplete payloads
content = content.replace(
  /onAnalysisComplete\(\{\s*\.\.\.analysis,\s*weightKg,\s*totalCalculatedValue:(.+?),\s*photoUrl: capturedImage,\s*selectedRecycler: recycler\.name,\s*isFlaggedForFraud: !!anomalyWarning\s*\}\);/g,
  `onAnalysisComplete({\n                  ...analysis,\n                  weightKg,\n                  totalCalculatedValue:$1,\n                  photoUrl: capturedImage,\n                  selectedRecycler: recycler.name,\n                  isFlaggedForFraud: !!anomalyWarning,\n                  condition,\n                  itemAge\n                });`
);

content = content.replace(
  /onAnalysisComplete\(\{\s*\.\.\.analysis,\s*weightKg,\s*totalCalculatedValue,\s*photoUrl: capturedImage,\s*isFlaggedForFraud: !!anomalyWarning\s*\}\);/g,
  `onAnalysisComplete({\n                  ...analysis,\n                  weightKg,\n                  totalCalculatedValue,\n                  photoUrl: capturedImage,\n                  isFlaggedForFraud: !!anomalyWarning,\n                  condition,\n                  itemAge\n                });`
);

// 5. Inject the UI inside {analysis && ( ... )}
const uiTarget = `          {/* Hazard & Recyclability Badges */}`;
const uiReplacement = `          {/* Universal Manual Edit & Grading Drawer */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm mb-3 overflow-hidden">
            <button 
              onClick={() => setIsEditingLot(!isEditingLot)}
              className="w-full flex justify-between items-center p-3 bg-slate-50 hover:bg-slate-100 transition-colors border-b border-slate-200"
            >
              <span className="font-bold text-slate-700 text-sm flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-emerald-600" />
                {lang === 'hi' ? '✏️ विवरण बदलें' : lang === 'mr' ? '✏️ तपशील बदला' : '✏️ Edit Details'}
              </span>
              {isEditingLot ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
            </button>
            
            {isEditingLot && (
              <div className="p-4 space-y-4">
                {/* Weight Input */}
                <div>
                  <label className="text-xs uppercase font-extrabold text-slate-600 tracking-wider mb-2 block">
                    {lang === 'hi' ? 'लॉट का वास्तविक वजन (किग्रा)' : lang === 'mr' ? 'लॉटचे प्रत्यक्ष वजन (किग्रॅ)' : 'Actual Lot Weight (KG)'}
                  </label>
                  <div className="flex items-center gap-2">
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
                  </div>
                </div>

                {/* Physical Condition */}
                <div>
                  <label className="text-xs uppercase font-extrabold text-slate-600 tracking-wider mb-2 block">
                    {lang === 'hi' ? 'सामग्री की स्थिति' : lang === 'mr' ? 'सामग्रीची स्थिती' : 'Physical Condition'}
                  </label>
                  <div className="flex flex-col gap-1.5">
                    <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 cursor-pointer">
                      <input type="radio" name="condition" value="working" checked={condition === 'working'} onChange={() => setCondition('working')} className="text-emerald-600 focus:ring-emerald-500" />
                      {lang === 'hi' ? 'चालू स्थिति / अक्षुण्ण (+20% मूल्य)' : lang === 'mr' ? 'चालू स्थिती / अखंड (+20% मूल्य)' : 'Working / Functional (+20% value)'}
                    </label>
                    <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 cursor-pointer">
                      <input type="radio" name="condition" value="semi-working" checked={condition === 'semi-working'} onChange={() => setCondition('semi-working')} className="text-emerald-600 focus:ring-emerald-500" />
                      {lang === 'hi' ? 'आंशिक खराब / मरम्मत योग्य (मूल दर)' : lang === 'mr' ? 'अंशतः खराब / दुरुस्तीयोग्य (मूळ दर)' : 'Semi-Damaged / Repairable (Base rate)'}
                    </label>
                    <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 cursor-pointer">
                      <input type="radio" name="condition" value="scrap" checked={condition === 'scrap'} onChange={() => setCondition('scrap')} className="text-emerald-600 focus:ring-emerald-500" />
                      {lang === 'hi' ? 'केवल कबाड़ / टूटा-फूटा (-15% मूल्य)' : lang === 'mr' ? 'फक्त भंगार / तुटलेले (-15% मूल्य)' : 'Scrap Only / Broken (-15% value)'}
                    </label>
                  </div>
                </div>

                {/* Item Age */}
                <div>
                  <label className="text-xs uppercase font-extrabold text-slate-600 tracking-wider mb-2 block">
                    {lang === 'hi' ? 'कितना पुराना है' : lang === 'mr' ? 'किती जुने आहे' : 'Item Age / Usage'}
                  </label>
                  <div className="flex gap-2">
                    {['<2', '2-5', '>5'].map(age => {
                      const labels = {
                        '<2': { en: '< 2 Years', hi: '2 वर्ष से कम', mr: '2 वर्षांपेक्षा कमी' },
                        '2-5': { en: '2 - 5 Years', hi: '2 से 5 वर्ष', mr: '2 ते 5 वर्षे' },
                        '>5': { en: '> 5 Years', hi: '5 वर्ष से अधिक', mr: '5 वर्षांपेक्षा जास्त' }
                      };
                      return (
                        <button
                          key={age}
                          onClick={() => setItemAge(age)}
                          className={\`flex-1 py-1.5 rounded-lg text-xs font-bold border transition-colors \${itemAge === age ? 'bg-slate-900 text-white border-slate-900' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'}\`}
                        >
                          {labels[age][lang] || labels[age]['en']}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Hazard & Recyclability Badges */}`;

if (content.includes(uiTarget)) {
  content = content.replace(uiTarget, uiReplacement);
}

// 6. Update Base line text in Scanner
const newBaseLineTextTarget = `<span>Base: ₹{analysis.estimatedValuePerKg || analysis.rate}/kg × {weightKg}kg = ₹{baseValue}</span>`;
const newBaseLineTextReplacement = `<span>Base: ₹{(analysis.estimatedValuePerKg || analysis.rate || 100)}/kg × {conditionMultiplier} (Condition) × {weightKg}kg = ₹{baseValue}</span>`;
if (content.includes(newBaseLineTextTarget)) {
  content = content.replace(newBaseLineTextTarget, newBaseLineTextReplacement);
}

fs.writeFileSync(path, content, 'utf8');
console.log("Scanner.jsx updated successfully.");
