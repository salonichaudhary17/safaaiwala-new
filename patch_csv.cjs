const fs = require('fs');
const path = './frontend/src/components/RecyclerDashboard.jsx';
let content = fs.readFileSync(path, 'utf8');

const downloadFuncCode = `
  const downloadMockCSV = (title) => {
    let csvContent = "data:text/csv;charset=utf-8,";
    
    if (title.includes('Classification')) {
      csvContent += "Timestamp,DeviceID,Material,AI_Confidence_Score,Est_Weight_Kg\\n";
      csvContent += "2024-11-12 10:00,DEV-991,CRT Monitor,98.5%,40\\n";
      csvContent += "2024-11-12 11:30,DEV-422,PCB Board,92.1%,12\\n";
    } else if (title.includes('Payout')) {
      csvContent += "TransactionID,CollectorID,AmountPaid_INR,Weight_Kg,FraudFlag\\n";
      csvContent += "TXN-90812,CW-481,12300,145.5,TRUE\\n";
      csvContent += "TXN-90815,CW-109,24000,320.0,FALSE\\n";
    } else {
      csvContent += "LogID,Timestamp,Action,Status,Hash_Signature\\n";
      csvContent += "LOG-001,2024-11-12 09:15,Verification,Success,sha256_abcdef123456\\n";
      csvContent += "LOG-002,2024-11-12 14:20,Custody_Transfer,Success,sha256_9876543210ab\\n";
    }

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", \`\${title.replace(/\\s+/g, '_').toLowerCase()}_export.csv\`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
`;

// Insert the downloadMockCSV function just before the useEffects
content = content.replace(
  "// Dynamically load newly created transactions",
  downloadFuncCode + "\n  // Dynamically load newly created transactions"
);

// Replace the alert with the actual function call
content = content.replace(
  /onClick=\{\(\) => alert\('Downloading ' \+ ds\.title \+ '\.\.\.'\)\}/g,
  "onClick={() => downloadMockCSV(ds.title)}"
);

fs.writeFileSync(path, content, 'utf8');
console.log("CSV Download patched successfully");
