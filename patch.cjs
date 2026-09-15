const fs = require('fs');
const path = './frontend/src/components/RecyclerDashboard.jsx';
let content = fs.readFileSync(path, 'utf8');

const useEffectCode = `

  // Dynamically load newly created transactions from localStorage so they appear instantly!
  useEffect(() => {
    try {
      const savedLots = JSON.parse(localStorage.getItem('safaaiwala_offline_lots') || '[]');
      if (savedLots && savedLots.length > 0) {
        const formattedLots = savedLots.map(lot => ({
          id: lot._id,
          origin: lot.location ? \`\${lot.location.lat.toFixed(4)}, \${lot.location.lng.toFixed(4)} (GPS)\` : 'Local Drop-off',
          city: 'delhi',
          material: lot.itemsList && lot.itemsList.length > 0 ? lot.itemsList[0].materialName : 'E-Waste',
          weightKg: lot.itemsList && lot.itemsList.length > 0 ? lot.itemsList[0].weightKg : 0,
          collector: 'Current Kabadiwala',
          status: 'In Transit',
          batchHash: lot.handoverHash || 'none',
          hazardLevel: lot.hazardLevel || 'Unknown',
          eta: 'Just Now',
          isFlaggedForFraud: lot.isFlaggedForFraud
        }));

        setIncomingBatches(prev => {
          const newIds = formattedLots.map(f => f.id);
          const filteredPrev = prev.filter(p => !newIds.includes(p.id));
          return [...formattedLots, ...filteredPrev];
        });
      }
    } catch (e) {
      console.warn("Could not load local lots", e);
    }
  }, []);

`;

// Insert the code just before "const verifyBatch"
content = content.replace("const verifyBatch = (id) => {", useEffectCode + "const verifyBatch = (id) => {");
fs.writeFileSync(path, content, 'utf8');
console.log("Patched successfully");
