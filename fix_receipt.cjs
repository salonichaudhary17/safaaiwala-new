const fs = require('fs');
const path = './frontend/src/components/ReceiptModal.jsx';
let content = fs.readFileSync(path, 'utf8');

// The corrupted block looks like:
//           <div className="bg-emerald-50/80 p-3 rounded-xl border border-emerald-200 flex justify-between items-center">
//             <div>
//               <span className="text-[11px] text-emerald-800 font-extrabold block">
//                 {t.envSaved}
//               </span>
//               <span className="text-[10px] text-emerald-700">
//                 ~{co2Saved} {t.co2Saved}
//               </span>
//             </div>
// 
//           {/* Strategic Mineral Yield */}
// ...
//           })()}
// 
//             <span className="text-2xl font-black text-emerald-800">₹{totalVal}</span>
//           </div>

// I will just find the whole Strategic Mineral Yield block and move it after the closing div of the emerald block.

const extractRegex = /\s*\{\/\* Strategic Mineral Yield \*\/\}[\s\S]*?\}\)\(\)\}/;

const match = content.match(extractRegex);
if (match) {
  const mineralBlock = match[0];
  // Remove it from its current position
  content = content.replace(mineralBlock, '');
  
  // Now place it safely after the entire emerald block
  // We look for the span with totalVal and the closing div.
  const targetToInsertAfter = /<span className="text-2xl font-black text-emerald-800">₹\{totalVal\}<\/span>\n\s*<\/div>/;
  
  content = content.replace(targetToInsertAfter, (m) => m + "\n" + mineralBlock);
  
  fs.writeFileSync(path, content, 'utf8');
  console.log("Receipt Modal layout fixed!");
} else {
  console.log("Could not find mineral block to extract");
}
