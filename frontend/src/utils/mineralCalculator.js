export const calculateMinerals = (category, weightKg) => {
  const cat = (category || "").toLowerCase();
  
  if (cat.includes("pcb") || cat.includes("laptop") || cat.includes("circuit") || cat.includes("motherboard") || cat.includes("e-waste")) {
    return [
      { name: "Gold (Au)", amount: (0.22 * weightKg).toFixed(2), unit: "g", color: "text-yellow-400" },
      { name: "Copper (Cu)", amount: (140 * weightKg).toFixed(1), unit: "g", color: "text-amber-500" },
      { name: "Tantalum (Ta)", amount: (14 * weightKg).toFixed(1), unit: "g", color: "text-blue-300" },
      { name: "Neodymium (Nd)", amount: (8 * weightKg).toFixed(1), unit: "g", color: "text-purple-300" }
    ];
  }
  
  if (cat.includes("battery") || cat.includes("lithium")) {
    return [
      { name: "Lithium (Li)", amount: (65 * weightKg).toFixed(1), unit: "g", color: "text-zinc-300" },
      { name: "Cobalt (Co)", amount: (110 * weightKg).toFixed(1), unit: "g", color: "text-blue-500" },
      { name: "Nickel (Ni)", amount: (85 * weightKg).toFixed(1), unit: "g", color: "text-emerald-300" }
    ];
  }

  if (cat.includes("copper") || cat.includes("wire") || cat.includes("motor") || cat.includes("armature")) {
    return [
      { name: "Refined Copper (Cu)", amount: (620 * weightKg).toFixed(1), unit: "g", color: "text-amber-500" }
    ];
  }

  // Fallback for CRT, plastic, etc.
  return [
    { name: "Aluminum (Al)", amount: (30 * weightKg).toFixed(1), unit: "g", color: "text-slate-300" },
    { name: "Copper (Cu)", amount: (20 * weightKg).toFixed(1), unit: "g", color: "text-amber-500" }
  ];
};
