"use client";

import { useEffect, useRef, useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
  time: string;
};

const SUGGESTIONS = [
  "J'ai eu un bébé 👶",
  "Je cherche des aides 💰",
  "Créer mon entreprise 🚀",
  "I lost my job 💼",
];

const WELCOME: Message = {
  role: "assistant",
  content:
    "👋 Bonjour ! Je suis votre assistant pour toutes vos démarches françaises.\n\nDécrivez votre situation en quelques mots — je vous guide pas à pas et vous indique les aides auxquelles vous avez droit.\n\n🌍 Je parle toutes les langues !",
  time: nowTime(),
};

function nowTime() {
  return new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [showNotif, setShowNotif] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([WELCOME]);
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const toggle = () => {
    setIsOpen((v) => !v);
    setShowNotif(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const send = async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || loading) return;

    setShowSuggestions(false);
    const userMsg: Message = { role: "user", content, time: nowTime() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages
            .filter((m) => m !== WELCOME)
            .map(({ role, content }) => ({ role, content })),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Erreur API");
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply, time: nowTime() },
      ]);
    } catch (e) {
      const errMsg = e instanceof Error ? e.message : "Erreur inconnue";
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `❌ Connexion impossible. ${errMsg}`,
          time: nowTime(),
        },
      ]);
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  };

  const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={toggle}
        aria-label={isOpen ? "Fermer le chat" : "Ouvrir le chat"}
        className="fixed bottom-6 right-6 w-[60px] h-[60px] rounded-full bg-navy hover:bg-navy-light hover:scale-105 transition-all flex items-center justify-center shadow-xl shadow-navy/30 z-50 text-2xl"
      >
        <span className="absolute inset-0 rounded-full border-2 border-navy chat-pulse opacity-0" />
        {isOpen ? "✕" : "💬"}
        {showNotif && !isOpen && (
          <span className="absolute top-0 right-0 w-4 h-4 bg-marianne-red rounded-full border-2 border-white text-[9px] text-white font-extrabold flex items-center justify-center">
            1
          </span>
        )}
      </button>

      {/* Chat panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[360px] max-w-[calc(100vw-3rem)] h-[500px] max-h-[calc(100vh-8rem)] bg-white rounded-3xl shadow-2xl border border-gray-200 z-40 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-navy px-5 py-3.5 flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center text-lg">
              🤖
            </div>
            <div className="flex-1">
              <div className="font-bold text-sm text-white">Assistant Démarches+</div>
              <div className="text-[11px] text-white/55 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block" />
                En ligne · Toutes langues
              </div>
            </div>
            <button
              onClick={toggle}
              aria-label="Fermer"
              className="text-white/60 hover:text-white text-lg leading-none"
            >
              ✕
            </button>
          </div>

          {/* Lang banner */}
          <div className="bg-marianne-cream px-4 py-2 text-[11px] text-gray-600 text-center border-b border-gray-200 shrink-0">
            🌍 Je comprends et réponds dans votre langue — العربية · English · Español · ...
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 chat-scroll"
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex gap-2 max-w-[90%] ${m.role === "user" ? "self-end flex-row-reverse" : ""}`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                    m.role === "user" ? "bg-navy text-white text-[10px]" : "bg-blue-50"
                  }`}
                >
                  {m.role === "user" ? "Moi" : "🤖"}
                </div>
                <div>
                  <div
                    className={`px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                      m.role === "user"
                        ? "bg-navy text-white rounded-2xl rounded-tr-sm"
                        : "bg-gray-100 text-gray-900 rounded-2xl rounded-tl-sm"
                    }`}
                  >
                    {m.content}
                  </div>
                  <div
                    className={`text-[10px] text-gray-400 mt-0.5 ${m.role === "user" ? "text-left" : "text-right"}`}
                  >
                    {m.time}
                  </div>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-2 max-w-[90%]">
                <div className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center text-base shrink-0">
                  🤖
                </div>
                <div className="bg-gray-100 px-3.5 py-3 rounded-2xl rounded-tl-sm flex gap-1 items-center">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full typing-dot" />
                  <span
                    className="w-1.5 h-1.5 bg-gray-400 rounded-full typing-dot"
                    style={{ animationDelay: "0.2s" }}
                  />
                  <span
                    className="w-1.5 h-1.5 bg-gray-400 rounded-full typing-dot"
                    style={{ animationDelay: "0.4s" }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Suggestions */}
          {showSuggestions && (
            <div className="flex gap-1.5 flex-wrap px-4 pb-3 shrink-0">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s.replace(/[👶💰🚀💼]/g, "").trim())}
                  className="bg-blue-50 border border-blue-200 text-navy rounded-full px-3 py-1.5 text-[11px] font-semibold hover:bg-navy hover:text-white hover:border-navy transition whitespace-nowrap"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="px-4 py-3 border-t border-gray-200 flex gap-2 shrink-0 bg-white">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Décrivez votre situation..."
              rows={1}
              className="flex-1 border-[1.5px] border-gray-200 rounded-xl px-3 py-2 text-sm outline-none resize-none h-10 text-gray-900 focus:border-navy"
            />
            <button
              onClick={() => send()}
              disabled={loading || !input.trim()}
              aria-label="Envoyer"
              className="bg-navy text-white rounded-xl w-10 h-10 flex items-center justify-center hover:bg-navy-light disabled:bg-gray-300 disabled:cursor-not-allowed transition shrink-0"
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
}
