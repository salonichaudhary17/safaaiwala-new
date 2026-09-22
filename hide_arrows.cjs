const fs = require('fs');
const path = './frontend/src/components/Scanner.jsx';
let content = fs.readFileSync(path, 'utf8');

const targetStr = `className="w-full border border-slate-300 rounded-lg p-3 text-xl font-black text-slate-800 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500 text-center shadow-inner"`;
const replacementStr = `className="w-full border border-slate-300 rounded-lg p-3 text-xl font-black text-slate-800 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500 text-center shadow-inner [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"`;

if (content.includes(targetStr)) {
  content = content.replace(targetStr, replacementStr);
  fs.writeFileSync(path, content, 'utf8');
  console.log("Arrows hidden successfully!");
} else {
  console.log("Could not find input className string.");
}
