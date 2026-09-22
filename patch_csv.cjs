const fs = require('fs');
const path = './frontend/src/components/RecyclerDashboard.jsx';
let content = fs.readFileSync(path, 'utf8');

const oldFunc = `  const downloadMockCSV = (title) => {
    let csvContent = "data:text/csv;charset=utf-8,";
    
    let savedLots = [];
    try {
      savedLots = JSON.parse(localStorage.getItem("safaaiwala_offline_lots") || "[]");
    } catch(e) {}

    if (title.includes("Material Classification")) {
      csvContent += "Timestamp,DeviceID,Material,Hazard_Level,Est_Weight_Kg\\n";
      if (savedLots.length > 0) {
        savedLots.forEach(lot => {
          const item = lot.itemsList?.[0];
          csvContent += \`\${lot.createdAt},\${lot.userId},\${item?.materialName || "Unknown"},\${lot.hazardLevel},\${item?.weightKg || 0}\\n\`;
        });
      } else {
        csvContent += "2024-11-12 10:00,DEV-991,CRT Monitor,High Hazard,40.5\\n";
      }
    } 
    else if (title.includes("Authorized Recycler")) {
      csvContent += "RecyclerID,Company_Name,CPCB_Auth_Number,Capacity,Location,Status\\n";
      EPR_RECYCLERS.forEach(r => {
        csvContent += \`\${r.id},\${r.name},\${r.authId},"\${r.capacity}","\${r.location}",\${r.status}\\n\`;
      });
    } 
    else if (title.includes("Transaction & Payout") || title.includes("Traceability")) {
      if (title.includes("Payout")) {
        csvContent += "TransactionID,CollectorID,AmountPaid_INR,Weight_Kg,FraudFlag\\n";
        incomingBatches.forEach(b => {
          csvContent += \`\${b.id},\${b.collector.split(" ")[0]},\${Math.round(b.weightKg*85)},\${b.weightKg},\${b.isFlaggedForFraud ? "TRUE" : "FALSE"}\\n\`;
        });
      } else {
        csvContent += "BatchID,Origin_GPS,Destination_Hub,Custody_Hash,Status,ETA\\n";
        incomingBatches.forEach(b => {
          csvContent += \`\${b.id},"\${b.origin}",\${b.city.toUpperCase()},\${b.batchHash},\${b.status},\${b.eta}\\n\`;
        });
      }
    } 
    else if (title.includes("Price & Trend")) {
      csvContent += "Material_Category,Base_Rate_INR,Trend_Direction,Market_Demand\\n";
      csvContent += "Printed Circuit Boards (PCBs),₹185/kg,UP,+4.2%\\n";
      csvContent += "Copper Scrap / Cables,₹715/kg,UP,+1.8%\\n";
      csvContent += "Electric Motors / Compressors,₹105/kg,STABLE,0%\\n";
      csvContent += "Lithium-ion Batteries,₹145/kg,DOWN,-2.1%\\n";
      csvContent += "CRT Glass / Monitor Screens,₹85/kg,UP,+1.5%\\n";
      csvContent += "Mixed E-Waste Plastics,₹55/kg,STABLE,+0.5%\\n";
    }
    else if (title.includes("Collector Profile")) {
      csvContent += "CollectorID,Total_Lots_Submitted,Safety_Rating,Account_Status\\n";
      csvContent += "Current Kabadiwala," + savedLots.length + ",4.8,VERIFIED\\n";
      csvContent += "Kabadiwala Ram Prasad (CW-481),142,4.5,VERIFIED\\n";
      csvContent += "Kishan Lal Scrap Network (CW-109),89,4.2,VERIFIED\\n";
    }`;

const newFunc = `  const downloadMockCSV = (title) => {
    let csvContent = "data:text/csv;charset=utf-8,";
    
    let savedLots = [];
    try {
      savedLots = JSON.parse(localStorage.getItem("safaaiwala_offline_lots") || "[]");
    } catch(e) {}

    // We will generate a consistent pseudo-random TransactionID for mock rows
    const generateTxnId = (seed) => "TXN-" + Math.abs(seed.split("").reduce((a,b)=>{a=((a<<5)-a)+b.charCodeAt(0);return a&a},0)).toString(16).toUpperCase().substring(0,6);

    if (title.includes("Material Classification")) {
      csvContent += "TransactionID,Timestamp,DeviceID,Material,Hazard_Level,Est_Weight_Kg\\n";
      if (savedLots.length > 0) {
        savedLots.forEach(lot => {
          const item = lot.itemsList?.[0];
          const txnId = lot.id ? lot.id : generateTxnId(lot.createdAt || "mock");
          csvContent += \`\${txnId},\${lot.createdAt},\${lot.userId},\${item?.materialName || "Unknown"},\${lot.hazardLevel},\${item?.weightKg || 0}\\n\`;
        });
      } else {
        csvContent += "TXN-A1B2C3,2024-11-12 10:00,DEV-991,CRT Monitor,High Hazard,40.5\\n";
      }
    } 
    else if (title.includes("Authorized Recycler")) {
      csvContent += "TransactionID,RecyclerID,Company_Name,CPCB_Auth_Number,Capacity,Location,Status\\n";
      EPR_RECYCLERS.forEach((r, idx) => {
        csvContent += \`TXN-REC\${idx+1}9A,\${r.id},\${r.name},\${r.authId},"\${r.capacity}","\${r.location}",\${r.status}\\n\`;
      });
    } 
    else if (title.includes("Transaction & Payout") || title.includes("Traceability")) {
      if (title.includes("Payout")) {
        csvContent += "TransactionID,CollectorID,AmountPaid_INR,Weight_Kg,FraudFlag\\n";
        incomingBatches.forEach(b => {
          csvContent += \`\${b.id},\${b.collector.split(" ")[0]},\${Math.round(b.weightKg*85)},\${b.weightKg},\${b.isFlaggedForFraud ? "TRUE" : "FALSE"}\\n\`;
        });
      } else {
        csvContent += "TransactionID,BatchID,Origin_GPS,Destination_Hub,Custody_Hash,Status,ETA\\n";
        incomingBatches.forEach(b => {
          // b.id is like BATCH-1042, we map it to TXN
          const txnId = b.id.replace("BATCH", "TXN");
          csvContent += \`\${txnId},\${b.id},"\${b.origin}",\${b.city.toUpperCase()},\${b.batchHash},\${b.status},\${b.eta}\\n\`;
        });
      }
    } 
    else if (title.includes("Price & Trend")) {
      csvContent += "TransactionID,Material_Category,Base_Rate_INR,Trend_Direction,Market_Demand\\n";
      csvContent += "TXN-P98X1,Printed Circuit Boards (PCBs),₹185/kg,UP,+4.2%\\n";
      csvContent += "TXN-P98X2,Copper Scrap / Cables,₹715/kg,UP,+1.8%\\n";
      csvContent += "TXN-P98X3,Electric Motors / Compressors,₹105/kg,STABLE,0%\\n";
      csvContent += "TXN-P98X4,Lithium-ion Batteries,₹145/kg,DOWN,-2.1%\\n";
      csvContent += "TXN-P98X5,CRT Glass / Monitor Screens,₹85/kg,UP,+1.5%\\n";
      csvContent += "TXN-P98X6,Mixed E-Waste Plastics,₹55/kg,STABLE,+0.5%\\n";
    }
    else if (title.includes("Collector Profile")) {
      csvContent += "TransactionID,CollectorID,Total_Lots_Submitted,Safety_Rating,Account_Status\\n";
      csvContent += "TXN-LATEST-1,Current Kabadiwala," + savedLots.length + ",4.8,VERIFIED\\n";
      csvContent += "TXN-LATEST-2,Kabadiwala Ram Prasad (CW-481),142,4.5,VERIFIED\\n";
      csvContent += "TXN-LATEST-3,Kishan Lal Scrap Network (CW-109),89,4.2,VERIFIED\\n";
    }`;

// Replace exact code
if (content.includes('const downloadMockCSV = (title) => {') && content.includes('Current Kabadiwala," + savedLots.length + ",4.8,VERIFIED\\n";')) {
  // We can't just replace the whole block because of whitespace. Let's do a smart replace.
  const startIdx = content.indexOf('const downloadMockCSV = (title) => {');
  const endIdx = content.indexOf('const encodedUri = encodeURI(csvContent);', startIdx);
  
  if (startIdx !== -1 && endIdx !== -1) {
    content = content.substring(0, startIdx) + newFunc + '\n\n    ' + content.substring(endIdx);
    fs.writeFileSync(path, content, 'utf8');
    console.log('Successfully patched datasets with TransactionID columns.');
  } else {
    console.log('Failed to find indices');
  }
} else {
  console.log('Failed to find function in file.');
}
