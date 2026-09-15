const fs = require('fs');
const path = './frontend/src/components/RecyclerDashboard.jsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Add velocityFraud to TXN-90822
content = content.replace(
  "id: 'TXN-90822',",
  "id: 'TXN-90822',\n      velocityFraud: true,"
);

// 2. Replace the old Fraud Alert Banner with the new sophisticated ones
const oldBannerRegex = /\{\/\* Fraud Alert Banner for Recycler \*\/\}\s*\{batch\.isFlaggedForFraud && \(\s*<div className="bg-red-950.*?<\/div>\s*\)\}/s;

const newBanners = `
                {/* Advanced Fraud & Anomaly Engine UI */}
                {(batch.isFlaggedForFraud || batch.velocityFraud) && (
                  <div className="w-full md:max-w-xs space-y-2 animate-pulse">
                    {batch.isFlaggedForFraud && (
                      <div className="bg-red-950/80 border border-red-600/50 p-2.5 rounded-lg w-full flex flex-col gap-1.5 shadow-lg">
                        <div className="flex items-center gap-1.5 text-red-400 text-[10px] sm:text-xs font-black uppercase tracking-wider">
                          <ShieldAlert className="w-4 h-4 text-red-500 shrink-0" />
                          Density Check: Failed
                        </div>
                        <div className="bg-red-900/40 px-2 py-1.5 rounded border border-red-800/50 flex justify-between items-center text-[10px]">
                          <span className="text-red-300">Anomaly Score:</span>
                          <span className="text-red-400 font-mono font-bold">High (Z-score > 3.2)</span>
                        </div>
                        <p className="text-[10px] text-red-300/90 leading-tight">
                          Expected typical lot range: 8–18 kg per unit. Manual weigh-in required.
                        </p>
                      </div>
                    )}

                    {batch.velocityFraud && (
                      <div className="bg-amber-950/80 border border-amber-500/50 p-2.5 rounded-lg w-full flex flex-col gap-1.5 shadow-lg">
                        <div className="flex items-center gap-1.5 text-amber-400 text-[10px] sm:text-xs font-black uppercase tracking-wider">
                          <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
                          Geo-Velocity Flag
                        </div>
                        <p className="text-[10px] text-amber-300/90 leading-tight font-medium">
                          Impossible Travel Velocity: Claimed pickup 30 km away 3 minutes ago. High risk of shell aggregator EPR fraud.
                        </p>
                      </div>
                    )}
                  </div>
                )}
`;

content = content.replace(oldBannerRegex, newBanners.trim());

fs.writeFileSync(path, content, 'utf8');
console.log("Anomaly visuals patched successfully");
