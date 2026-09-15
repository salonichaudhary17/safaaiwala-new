const fs = require('fs');
const path = './frontend/src/components/RecyclerDashboard.jsx';
let content = fs.readFileSync(path, 'utf8');

const insertBtnCode = `
        {/* NEW EXPORT BUTTON */}
        <button
          onClick={() => setShowDatasetsModal(true)}
          className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-emerald-500/50 px-4 py-2.5 rounded-xl font-black text-sm flex items-center justify-center gap-2 shadow-lg transition active:scale-95"
        >
          <Download className="w-5 h-5" /> Export CPCB Datasets
        </button>
`;

const scanBtnRegex = /<button\\s+onClick=\{\\(\\)\\s*=>\\s*setShowQrScanner\\(true\\)\}[\\s\\S]*?Scan Handover Receipt\\s*<\\/button>/;
const scanBtnRegex2 = /Scan Handover Receipt\n\s*<\/button>/;

content = content.replace(scanBtnRegex2, (match) => {
  return match + "\n" + insertBtnCode;
});

// Since the Scan button is inside a flex column, let's wrap them in a flex row or gap if needed.
// Actually just injecting it next to it is fine, the parent has `flex flex-col sm:flex-row gap-3`.

fs.writeFileSync(path, content, 'utf8');
console.log("Button patched successfully");
