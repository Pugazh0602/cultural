import React, { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export const SportsChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        'Welcome to **Quantum² Athletic Intelligence**.\n\nAsk me anything about our upcoming **Global Field Trials** (Chennai, Tokyo, Berlin), the **Active Athlete Roster** (Maya Chen, Marcus Vance, Elena Rostova), telemetry challenges, or lab footwear & apparel engineering.',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || loading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(({ role, content }) => ({
            role,
            content,
          })),
        }),
      });

      const data = await response.json();
      if (data.success && data.reply) {
        setMessages((prev) => [
          ...prev,
          {
            id: `assistant-${Date.now()}`,
            role: 'assistant',
            content: data.reply,
          },
        ]);
      } else {
        throw new Error(data.error || 'Failed to receive reply');
      }
    } catch (err) {
      console.error('Chatbot error:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: 'assistant',
          content:
            'Transmission interrupted. Our sports intelligence module is reconnecting. Please check upcoming trials in the Events section.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const quickPrompts = [
    'Upcoming Field Trials',
    'Chennai Night Run details',
    'Tokyo 3x3 Hoops',
    'Who is Maya Chen?',
    'Best gear for night runs?',
  ];

  return (
    <>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 left-6 z-[80] flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-black text-white hover:bg-[#006687] transition-all shadow-2xl border border-white/10 hover:scale-105 cursor-pointer group"
          type="button"
          aria-label="Open Sports & Events AI Chat"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0db5ed] opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#0db5ed]" />
          </span>
          <span className="material-symbols-outlined text-[18px] text-[#0db5ed]">smart_toy</span>
          <span className="text-xs font-bold uppercase tracking-tight">Kinetic AI Assistant</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 left-6 z-[90] w-[90vw] sm:w-[400px] h-[550px] max-h-[85vh] bg-black text-white rounded-3xl shadow-2xl border border-white/15 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-neutral-900 to-black border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#006687] flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-[18px]">bolt</span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-bold text-xs uppercase tracking-tight text-white">
                    QUANTUM² KINETIC AI
                  </h4>
                  <span className="px-1.5 py-0.2 rounded bg-[#0db5ed]/20 text-[#0db5ed] text-[9px] font-mono">
                    GROQ LLM
                  </span>
                </div>
                <p className="text-[10px] text-gray-400">Sports &amp; Field Trials Intelligence</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() =>
                  setMessages([
                    {
                      id: 'welcome',
                      role: 'assistant',
                      content:
                        'Session reset. Ask me anything about Field Trials, athletes, or technical gear specifications.',
                    },
                  ])
                }
                title="Clear conversation"
                className="w-7 h-7 rounded-full text-gray-400 hover:text-white flex items-center justify-center hover:bg-white/10"
              >
                <span className="material-symbols-outlined text-[16px]">refresh</span>
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-full text-gray-400 hover:text-white flex items-center justify-center hover:bg-white/10"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl leading-relaxed whitespace-pre-wrap ${
                    m.role === 'user'
                      ? 'bg-[#006687] text-white rounded-br-none'
                      : 'bg-neutral-900 text-gray-200 border border-white/10 rounded-bl-none'
                  }`}
                >
                  {m.content}
                </div>
                <span className="text-[9px] text-gray-500 mt-0.5 px-1 uppercase">
                  {m.role === 'user' ? 'You' : 'Kinetic AI'}
                </span>
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 p-3 bg-neutral-900 rounded-2xl w-fit border border-white/10 text-gray-400">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0db5ed] animate-pulse" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#0db5ed] animate-pulse delay-75" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#0db5ed] animate-pulse delay-150" />
                <span className="text-[10px] uppercase font-mono tracking-wider ml-1">
                  Synthesizing Sports Telemetry...
                </span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Bar */}
          <div className="px-3 py-2 bg-neutral-950 border-t border-white/5 flex gap-1.5 overflow-x-auto text-[10px] scrollbar-none">
            {quickPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(prompt)}
                className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-[#0db5ed] hover:text-black text-gray-300 whitespace-nowrap transition-colors border border-white/5 cursor-pointer"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-black border-t border-white/10 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask about events, athletes, race pacing..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-white/10 rounded-full px-3.5 py-2 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-[#0db5ed]"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="w-8 h-8 rounded-full bg-[#0db5ed] text-black disabled:opacity-40 flex items-center justify-center hover:bg-white transition-colors cursor-pointer flex-shrink-0"
            >
              <span className="material-symbols-outlined text-[16px]">arrow_upward</span>
            </button>
          </form>
        </div>
      )}
    </>
  );
};
