import { useState, useRef, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Send, Bot, User, MessageCircle, Loader2 } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTED_QUESTIONS = [
  "What is the difference between Medicare Part A and Part B?",
  "How do I apply for Social Security Disability (SSDI)?",
  "When can I enroll in Medicare?",
  "What is the Medicare Extra Help program?",
  "How does Medicaid work with Medicare?",
  "What are Medigap supplemental plans?",
];

export default function AskClaude() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  async function sendMessage(text?: string) {
    const msg = text || input.trim();
    if (!msg || loading) return;
    setInput("");
    const userMsg: Message = { role: "user", content: msg };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updated }),
      });
      const data = await res.json();
      if (data.reply) {
        setMessages([...updated, { role: "assistant", content: data.reply }]);
      } else {
        setMessages([...updated, { role: "assistant", content: data.error || "Something went wrong. Please try again." }]);
      }
    } catch {
      setMessages([...updated, { role: "assistant", content: "Network error. Please check your connection and try again." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-[oklch(0.98_0.012_80)]">
      <Navbar />
      {/* Hero */}
      <div
        className="relative border-b border-[oklch(0.88_0.02_75)]"
        style={{ background: "linear-gradient(135deg, oklch(0.22 0.02 50) 0%, oklch(0.32 0.06 42) 100%)" }}
      >
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
        <div className="relative container py-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/15 text-white/90 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
              <Bot className="w-3.5 h-3.5" />
              Ask Claude
            </div>
            <h1 className="text-4xl font-bold text-white mb-3 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              Benefits & Medicare Assistant
            </h1>
            <p className="text-white/80 text-base leading-relaxed mb-6">
              Get instant answers about Medicare, disability programs, retirement benefits, and more.
              Powered by Claude AI.
            </p>
          </div>
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 container py-8 flex flex-col max-w-3xl">
        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-4 mb-6 min-h-[400px] max-h-[60vh]">
          {messages.length === 0 ? (
            <div className="text-center py-12">
              <MessageCircle className="w-12 h-12 mx-auto text-[oklch(0.55_0.13_42)] mb-4" />
              <h2 className="text-lg font-semibold text-[oklch(0.30_0.05_50)] mb-2">How can I help you today?</h2>
              <p className="text-sm text-[oklch(0.52_0.04_60)] mb-6">Ask me anything about Medicare, disability benefits, or retirement services.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto">
                {SUGGESTED_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="text-left text-sm px-4 py-3 rounded-xl border border-[oklch(0.88_0.02_75)] bg-white hover:bg-[oklch(0.95_0.015_80)] transition-colors text-[oklch(0.40_0.05_50)]"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((msg, i) => (
              <div key={i} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}>
                {msg.role === "assistant" && (
                  <div className="w-8 h-8 rounded-full bg-[oklch(0.55_0.13_42)] flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === "user"
                      ? "bg-[oklch(0.55_0.13_42)] text-white rounded-br-md"
                      : "bg-white border border-[oklch(0.88_0.02_75)] text-[oklch(0.30_0.05_50)] rounded-bl-md"
                  }`}
                >
                  {msg.content}
                </div>
                {msg.role === "user" && (
                  <div className="w-8 h-8 rounded-full bg-[oklch(0.85_0.03_60)] flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-[oklch(0.40_0.05_50)]" />
                  </div>
                )}
              </div>
            ))
          )}
          {loading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-[oklch(0.55_0.13_42)] flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white border border-[oklch(0.88_0.02_75)] px-4 py-3 rounded-2xl rounded-bl-md">
                <Loader2 className="w-4 h-4 animate-spin text-[oklch(0.55_0.13_42)]" />
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="border border-[oklch(0.88_0.02_75)] bg-white rounded-2xl flex items-center gap-2 px-4 py-3 shadow-sm">
          <input
            className="flex-1 outline-none text-sm text-[oklch(0.30_0.05_50)] placeholder:text-[oklch(0.65_0.02_60)]"
            placeholder="Ask about Medicare, disability benefits, retirement..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            disabled={loading}
          />
          <button
            onClick={() => sendMessage()}
            disabled={loading || !input.trim()}
            className="w-9 h-9 rounded-xl bg-[oklch(0.55_0.13_42)] hover:bg-[oklch(0.48_0.13_42)] disabled:opacity-40 flex items-center justify-center transition-colors"
          >
            <Send className="w-4 h-4 text-white" />
          </button>
        </div>
        <p className="text-xs text-[oklch(0.60_0.02_60)] text-center mt-3">
          AI assistant for informational purposes only. Not a substitute for professional advice.
        </p>
      </div>
      <Footer />
    </div>
  );
}
