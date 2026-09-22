const fs = require('fs');
const path = './frontend/src/components/VoiceAssistant.jsx';
let content = fs.readFileSync(path, 'utf8');

const MATERIAL_KEYWORDS_STR = `  const MATERIAL_KEYWORDS = [
    { id: "copper_cables", basePrice: 440, names: { hi: "तांबे के तार और केबल", mr: "तांब्याची तार आणि केबल्स", en: "Copper Wires & Cables" }, keys: ["तांबा", "तांबे", "ताम्बा", "copper", "wire", "cable", "wires", "तार", "केबल"] },
    { id: "pcb_motherboard", basePrice: 183, names: { hi: "सर्किट बोर्ड / मदरबोर्ड", mr: "सर्किट बोर्ड", en: "Printed Circuit Boards (PCB)" }, keys: ["सर्किट", "मदरबोर्ड", "pcb", "circuit", "board", "laptop", "लैपटॉप"] },
    { id: "li_ion_battery", basePrice: 225, names: { hi: "लिथियम-आयन बैटरी", mr: "लिथियम-आयन बॅटरी", en: "Lithium-ion Batteries" }, keys: ["बैटरी", "लिथियम", "battery", "lithium", "सेल", "बॅटरी"] },
    { id: "crt_monitor", basePrice: 85, names: { hi: "सीआरटी मॉनिटर", mr: "सीआरटी मॉनिटर", en: "CRT Monitor" }, keys: ["crt", "मॉनिटर", "कांच", "काच", "screen", "monitor", "स्क्रीन", "tv", "टीवी"] },
    { id: "aluminium_scrap", basePrice: 153, names: { hi: "एल्युमिनियम स्क्रैप", mr: "अॅल्युमिनियम स्क्रॅप", en: "Aluminium Scrap" }, keys: ["एल्युमिनियम", "अल्युमिनियम", "aluminium", "aluminum"] },
    { id: "brass_bronze", basePrice: 310, names: { hi: "पीतल और कांसा", mr: "पितळ आणि कांस्य", en: "Brass & Bronze Scrap" }, keys: ["पीतल", "कांसा", "brass", "bronze", "पितळ"] },
    { id: "electric_motors", basePrice: 195, names: { hi: "इलेक्ट्रिक मोटर", mr: "इलेक्ट्रिक मोटर", en: "Electric Motors" }, keys: ["मोटर", "motor", "वाइंडिंग", "winding"] },
    { id: "pet_rigid_plastic", basePrice: 26, names: { hi: "कठोर प्लास्टिक", mr: "कठीण प्लॅस्टिक", en: "Rigid E-Plastics" }, keys: ["प्लास्टिक", "plastic", "कठोर प्लास्टिक", "pet", "प्लॅस्टिक"] },
    { id: "hdpe_plastic", basePrice: 34, names: { hi: "एचडीपीई प्लास्टिक ड्रम", mr: "एचडीपीई ड्रम", en: "HDPE Drums" }, keys: ["hdpe", "ड्रम", "drum", "container"] },
    { id: "lead_battery_plates", basePrice: 148, names: { hi: "लेड / बैटरी प्लेट", mr: "लेड बॅटरी प्लेट", en: "Lead Plates" }, keys: ["लेड", "सीसा", "lead", "ingot", "battery plate"] }
  ];`;

// We will inject MATERIAL_KEYWORDS inside VoiceAssistant.
// Then replace the parseVoiceCommand logic.

// First find parseVoiceCommand block.
const parseStart = "const parseVoiceCommand = (rawCmd) => {";
const endToken = "const toggleListening = () => {";

const parseBlock = content.substring(content.indexOf(parseStart), content.indexOf(endToken));

const newParseBlock = `${parseStart}
    const cmd = rawCmd.toLowerCase();

${MATERIAL_KEYWORDS_STR}

    // Single item rate check
    let matchedItem = null;
    for (const item of MATERIAL_KEYWORDS) {
      if (item.keys.some(k => cmd.includes(k.toLowerCase()))) {
        matchedItem = item;
        break;
      }
    }

    if (matchedItem) {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      const matName = matchedItem.names[lang] || matchedItem.names.en;
      const baseRate = matchedItem.basePrice;
      const eprBonus = 15;
      const netRate = baseRate + eprBonus;

      let response = '';
      if (lang === 'hi') {
        response = \`\${matName} का ताज़ा भाव ₹\${netRate} प्रति किलो है, जिसमें ₹\${eprBonus} EPR बोनस शामिल है।\`;
      } else if (lang === 'mr') {
        response = \`\${matName} चा दर ₹\${netRate} प्रति किलो आहे.\`;
      } else {
        response = \`The current rate for \${matName} is ₹\${netRate} per kilogram.\`;
      }

      setSpokenText(response); // Ensure we show the exact text spoken
      speak(response);
      if (onNavigate) onNavigate('prices');
      return;
    }

    // Pricing (all items)
    if (
      cmd.includes('price') || cmd.includes('rate') || cmd.includes('bhav') || 
      cmd.includes('भाव') || cmd.includes('दाम') || cmd.includes('रेट') || 
      cmd.includes('दर') || cmd.includes('किंमत')
    ) {
      const response = lang === 'mr'
        ? 'लाइव्ह भाव दाखवत आहे. सर्व 10 वस्तूंचे दर याप्रमाणे आहेत: तांब्याची तार ₹440, सर्किट बोर्ड ₹183, लिथियम बॅटरी ₹225, रॅम मेमरी ₹850, संमिश्र ई-कचरा ₹45, पीईटी प्लॅस्टिक ₹26, सीआरटी ग्लास ₹85, इलेक्ट्रिक मोटर ₹195, एचडीपीई प्लॅस्टिक ₹34, आणि लेड बॅटरी प्लेट्स ₹148 प्रति किलो.'
        : lang === 'en'
        ? 'Showing live scrap prices. Here are the rates for all 10 items: Copper wires are ₹440, Circuit Boards ₹183, Lithium Batteries ₹225, RAM Memory ₹850, Mixed E-waste ₹45, PET Plastic ₹26, CRT Glass ₹85, Electric Motors ₹195, HDPE Plastic ₹34, and Lead Battery plates ₹148 per kg.'
        : 'लाइव भाव दिखाया जा रहा है। सभी 10 सामग्रियों की दरें इस प्रकार हैं: तांबे का तार ₹440, सर्किट बोर्ड ₹183, लिथियम बैटरी ₹225, रैम मेमोरी ₹850, मिश्रित ई-कचरा ₹45, पीईटी प्लास्टिक ₹26, CRT ग्लास ₹85, इलेक्ट्रिक मोटर ₹195, एचडीपीई प्लास्टिक ₹34, और लेड बैटरी प्लेट्स ₹148 प्रति किलो हैं।';
      speak(response);
      if (onNavigate) onNavigate('prices');
      return;
    }

    // Scanner / Camera
    if (
      cmd.includes('scan') || cmd.includes('camera') || cmd.includes('photo') ||
      cmd.includes('कैमरा') || cmd.includes('स्कैन') || cmd.includes('फोटो') ||
      cmd.includes('कॅमेरा') || cmd.includes('स्कॅन') || cmd.includes('तपासा')
    ) {
      const response = lang === 'mr'
        ? 'कॅमेरा सुरू करत आहे. ई-कचरा कॅमेऱ्यासमोर ठेवा.'
        : lang === 'en'
        ? 'Opening waste classifier camera. Show your scrap item to the lens.'
        : 'कैमरा स्कैनर खोला जा रहा है। सामग्री को कैमरे के सामने रखें।';
      speak(response);
      if (onNavigate) onNavigate('scanner');
      if (onTriggerScan) onTriggerScan();
      return;
    }

    // Recycler Portal
    if (
      cmd.includes('recycler') || cmd.includes('portal') || cmd.includes('center') ||
      cmd.includes('रीसायकलर') || cmd.includes('कबाड़ी') || cmd.includes('सेंटर') ||
      cmd.includes('हब') || cmd.includes('हस्तांतरण')
    ) {
      const response = lang === 'mr'
        ? 'CPCB अधिकृत रीसायकलर पोर्टल उघडत आहे.'
        : lang === 'en'
        ? 'Navigating to CPCB EPR Recycler Management Portal.'
        : 'CPCB अधिकृत रीसायकलर पोर्टल खोला जा रहा है।';
      speak(response);
      if (onNavigate) onNavigate('recycler');
      return;
    }

    // Fallback general prompt
    const defaultReply = lang === 'mr'
      ? \`तुम्ही म्हटले: "\${rawCmd}". कृपया "भाव", "स्कॅनर" किंवा "रीसायकलर" बोला.\`
      : lang === 'en'
      ? \`You said: "\${rawCmd}". Say "Price", "Scanner", or "Recycler Portal".\`
      : \`आपने कहा: "\${rawCmd}". कृपया "भाव", "स्कैनर", या "रीसायकलर" कहें।\`;
    speak(defaultReply);
  };
`;

content = content.replace(parseBlock, newParseBlock);
fs.writeFileSync(path, content, 'utf8');
console.log("VoiceAssistant patched successfully.");
