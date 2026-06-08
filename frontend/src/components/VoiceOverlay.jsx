import React, { useEffect, useState } from 'react';
import { Mic, X, Check } from 'lucide-react';

export default function VoiceOverlay({ bilingual, placeholder, onResult, onClose }) {
  const [interimText, setInterimText] = useState('');
  const [errorText, setErrorText] = useState('');

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = bilingual === 'TE' ? 'te-IN' : 'en-IN';

    let finalTranscript = '';

    recognition.onresult = (event) => {
      let interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript + ' ';
        } else {
          interimTranscript += transcript;
        }
      }
      // Clean up multiple spaces
      const fullText = (finalTranscript + interimTranscript).replace(/\s+/g, ' ');
      setInterimText(fullText);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      if (event.error === 'no-speech') {
        // Do not auto-close for continuous speech, just inform them
        setErrorText(bilingual === 'EN' ? 'No speech detected. Please speak...' : 'ఏమీ వినపడలేదు. దయచేసి మాట్లాడండి...');
        setTimeout(() => setErrorText(''), 3000);
      } else if (event.error === 'not-allowed') {
        setErrorText(bilingual === 'EN' ? 'Microphone permission blocked.' : 'మైక్రోఫోన్ అనుమతి నిలిపివేయబడింది.');
        setTimeout(() => onClose(), 2500);
      } else {
        setErrorText(bilingual === 'EN' ? 'Could not understand. Please try again.' : 'అర్థం కాలేదు. దయచేసి మళ్లీ ప్రయత్నించండి.');
        setTimeout(() => setErrorText(''), 3000);
      }
    };

    recognition.start();

    return () => {
      recognition.stop();
    };
  }, [bilingual, onClose]);

  const handleDone = () => {
    if (interimText.trim()) {
      onResult(interimText.trim());
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 backdrop-blur-md animate-fadeIn no-print">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-lg w-full mx-4 text-center space-y-6 shadow-2xl relative">
        <button 
          onClick={onClose} 
          className="absolute right-4 top-4 text-slate-400 hover:text-white p-2 hover:bg-slate-800 rounded-full transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex justify-center">
          <div className="relative">
            {/* Pulsing ring */}
            <span className="absolute -inset-4 rounded-full bg-red-500/20 animate-ping"></span>
            <div className="relative bg-red-600 text-white p-6 rounded-full shadow-lg flex items-center justify-center">
              <Mic className="w-8 h-8 animate-pulse" />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-white font-bold text-lg">
            {bilingual === 'EN' ? 'Listening Continuously...' : 'నిరంతరంగా వింటున్నారు...'}
          </h3>
          <p className="text-xs text-slate-400">
            {bilingual === 'EN' 
              ? `Speaking into: "${placeholder}"` 
              : `మాట్లాడండి: "${placeholder}"`
            }
          </p>
          <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold block">
            {bilingual === 'EN' ? 'Language: English (India)' : 'భాష: తెలుగు (భారతదేశం)'}
          </span>
        </div>

        {/* Live speech box */}
        <div className="bg-slate-950/50 border border-slate-800 p-5 rounded-2xl min-h-[120px] max-h-[200px] overflow-y-auto flex items-center justify-center text-sm font-medium text-left leading-relaxed">
          {errorText ? (
            <span className="text-red-400 text-center w-full">{errorText}</span>
          ) : interimText ? (
            <span className="text-emerald-400 w-full">"{interimText}"</span>
          ) : (
            <span className="text-slate-500 italic text-center w-full">
              {bilingual === 'EN' ? 'Speak clearly. You can speak long sentences and paragraphs...' : 'స్పష్టంగా మాట్లాడండి. మీరు పెద్ద వాక్యాలు మరియు పేరాలు మాట్లాడవచ్చు...'}
            </span>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex gap-4 pt-2">
          <button
            onClick={onClose}
            className="flex-1 py-3 bg-slate-800 hover:bg-slate-750 text-slate-300 font-semibold rounded-xl transition text-xs uppercase tracking-wider"
          >
            {bilingual === 'EN' ? 'Cancel' : 'రద్దు చేయి'}
          </button>
          <button
            onClick={handleDone}
            className="flex-2 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-1.5"
          >
            <Check className="w-4 h-4" />
            {bilingual === 'EN' ? 'Save & Insert' : 'పూర్తి చేయి'}
          </button>
        </div>
      </div>
    </div>
  );
}
