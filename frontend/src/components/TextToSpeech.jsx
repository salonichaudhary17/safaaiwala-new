import React from 'react';
import { Volume2 } from 'lucide-react';

export default function TextToSpeech({ text, lang = 'hi-IN' }) {
  const speak = () => {
    if (!('speechSynthesis' in window)) {
      alert("Spoken audio is not supported on this device.");
      return;
    }
    window.speechSynthesis.cancel(); // Stop active speech
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = ({ hi: 'hi-IN', mr: 'mr-IN', en: 'en-US', bn: 'bn-IN', gu: 'gu-IN', kn: 'kn-IN', te: 'te-IN', ta: 'ta-IN' }[lang] || 'en-US');
    utterance.rate = 0.9; // Slightly slower rate for clarity
    window.speechSynthesis.speak(utterance);
  };

  return (
    <button
      onClick={speak}
      type="button"
      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-100 text-emerald-800 rounded-lg text-sm font-medium hover:bg-emerald-200 focus:outline-none"
      aria-label="Listen to description"
    >
      <Volume2 className="w-4 h-4" />
      <span>Listen</span>
    </button>
  );
}