const fs = require('fs');
const path = './frontend/src/App.jsx';
let content = fs.readFileSync(path, 'utf8');

const targetStr = `  const handleScanComplete = async (analysisResult) => {
    const weight = analysisResult.weightKg || 1;
    const rate = analysisResult.estimatedValuePerKg || analysisResult.rate || 100;
    const total = Math.round(weight * rate);
    const timeNow = new Date().toISOString();
    const handoverHash = generateClientHash(\`collector-\${analysisResult.category}-\${weight}-\${total}-\${timeNow}\`);`;

const replacementStr = `  const handleScanComplete = async (analysisResult) => {
    const weight = analysisResult.weightKg || 1;
    const total = analysisResult.totalCalculatedValue || Math.round(weight * (analysisResult.estimatedValuePerKg || analysisResult.rate || 100));
    const condition = analysisResult.condition || 'semi-working';
    const itemAge = analysisResult.itemAge || '2-5';
    const timeNow = new Date().toISOString();
    const handoverHash = generateClientHash(\`collector-\${analysisResult.category}-\${weight}-\${condition}-\${itemAge}-\${total}-\${timeNow}\`);`;

if (content.includes(targetStr)) {
  content = content.replace(targetStr, replacementStr);
  
  // also inject condition and age into itemsList
  const itemTarget = `        weightKg: weight,
        ratePerKg: rate,
        subtotal: total
      }],
      totalAmount: total,`;
  
  const itemReplacement = `        weightKg: weight,
        ratePerKg: analysisResult.estimatedValuePerKg || analysisResult.rate || 100,
        subtotal: total,
        condition,
        itemAge
      }],
      totalAmount: total,
      condition,
      itemAge,`;
      
  content = content.replace(itemTarget, itemReplacement);
  
  fs.writeFileSync(path, content, 'utf8');
  console.log("App.jsx patched successfully.");
} else {
  console.log("Could not find target string in App.jsx");
}
