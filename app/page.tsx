"use client";
import { useState } from 'react';

const ACCENT = 'text-indigo-400';

export default function AIBrandVoice() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResult('');
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input }),
      });
      const data = await res.json();
      setResult(data.output || data.error || '');
    } catch {
      setResult('Error generating brand voice. Please try again.');
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 text-white flex flex-col">
      <div className="border-b border-indigo-900/30 px-8 py-5 flex items-center gap-3">
        <div className={`${ACCENT} text-2xl`}>🎨</div>
        <div>
          <h1 className="text-xl font-bold text-white">AI Brand Voice</h1>
          <p className="text-sm text-gray-400">Generate brand voice frameworks & messaging guidelines</p>
        </div>
      </div>

      <div className="flex-1 max-w-4xl mx-auto w-full px-6 py-10 flex flex-col gap-6">
        <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-6 space-y-4">
          <label className={`block text-sm font-semibold ${ACCENT}`}>Describe Your Brand & Content</label>
          <textarea
            className="w-full bg-gray-900 border border-gray-700 rounded-xl p-4 text-sm text-gray-100 placeholder-gray-500 resize-y min-h-48 focus:outline-none focus:border-indigo-500 transition-colors"
            placeholder="Describe your brand (industry, values, mission), paste sample content, or share your target audience. The AI will generate a comprehensive brand voice framework..."
            value={input}
            onChange={e => setInput(e.target.value)}
          />
          <button
            onClick={handleGenerate}
            disabled={loading || !input.trim()}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-gray-700 disabled:text-gray-500 rounded-xl font-semibold text-sm transition-colors"
          >
            {loading ? 'Analyzing Brand...' : 'Generate Brand Voice'}
          </button>
        </div>

        {result && (
          <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-6 space-y-4">
            <h2 className={`text-sm font-semibold ${ACCENT}`}>Brand Voice Framework</h2>
            <div className="text-sm text-gray-200 whitespace-pre-wrap leading-relaxed">{result}</div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { icon: '🗣️', title: 'Voice Attributes', desc: 'Tone, vocabulary, style, rhythm definitions' },
            { icon: '✅', title: "Do's & Don'ts", desc: 'Concrete examples of on-brand and off-brand copy' },
            { icon: '📡', title: 'Channel Adaptation', desc: 'LinkedIn, Twitter, email, website tone guides' },
            { icon: '🎯', title: 'Messaging Pillars', desc: 'Core value propositions and key messages by audience' },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="bg-gray-800/30 border border-gray-700/40 rounded-xl p-4">
              <div className="text-2xl mb-2">{icon}</div>
              <div className="text-sm font-semibold text-gray-100">{title}</div>
              <div className="text-xs text-gray-400 mt-1">{desc}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
