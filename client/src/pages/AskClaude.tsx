import { useState, useRef, useEffect, useMemo } from "react";
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

function renderMarkdown(text: string): string {
  return text
    .replace(/^### (.+)$/gm, '<h3 class="text-lg font-bold mt-4 mb-2" style="font-family: \'Playfair Display\', serif; color: oklch(0.15 0 0)">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold mt-5 mb-2" style="font-family: \'Playfair Display\', serif; color: oklch(0.15 0 0)">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold mt-5 mb-3" style="font-family: \'Playfair Display\', serif; color: oklch(0.15 0 0)">$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold" style="color: oklch(0.35 0.08 170)">$1</strong>')
    .replace(/^[-*] (.+)$/gm, '<li class="ml-4 mb-1 flex items-start gap-2"><span class="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style="background: oklch(0.45 0.08 175)"></span><span>$1</span></li>')
    .replace(/^\d+\. (.+)$/gm, '<li class="ml-4 mb-1">$1</li>')
    .replace(/^---$/gm, '<hr class="my-4 border-t" style="border-color: oklch(0.85 0.03 170)" />')
    .replace(/\n{2,}/g, '</p><p class="mb-3 leading-relaxed">')
    .replace(/^/, '<p class="mb-3 leading-relaxed">')
    .replace(/$/, '</p>');
}

export default function AskClaude() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
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
    <div className="min-h-screen flex flex-col bg-[oklch(1_0_0)]">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1e4d47] to-[oklch(0.22_0.03_50)]" />
        <div className="relative container py-12 md:py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-4 border border-white/20">
              <MessageCircle className="w-3.5 h-3.5" />
              Ask Claude
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Benefits & Medicare Assistant
            </h1>
            <p className="text-white/80 text-base">
              Get instant answers about Medicare, disability programs, retirement benefits, and more. Powered by Claude AI.
            </p>
          </div>
        </div>
      </section>

      {/* Chat area */}
      <section className="flex-1 container py-8 max-w-3xl">
        {/* Messages */}
        <div ref={scrollRef} className="mb-6 space-y-5 max-h-[60vh] overflow-y-auto scroll-smooth">
          {messages.length === 0 ? (
            <div className="text-center py-10">
              <MessageCircle className="w-10 h-10 mx-auto mb-3" style={{ color: "oklch(0.45 0.08 175)" }} />
              <h2 className="text-xl font-bold mb-2" style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.15 0 0)" }}>
                How can I help you today?
              </h2>
              <p className="text-sm text-[oklch(0.55_0.03_60)] mb-6">
                Ask me anything about Medicare, disability benefits, or retirement services.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-lg mx-auto">
                {SUGGESTED_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="text-left text-sm px-4 py-3 rounded-xl border border-[oklch(0.90_0_0)] bg-white hover:bg-[oklch(0.95_0.01_170)] transition-colors text-[oklch(0.35_0.08_170)]"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((msg, i) => (
              <div key={i} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                {msg.role === "assistant" && (
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-1" style={{ background: "oklch(0.68 0.15 55)" }}>
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                )}
                <div
                  className={`rounded-2xl px-5 py-4 max-w-[85%] text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-[oklch(0.45 0.08 175)] text-white rounded-br-md"
                      : "bg-white border border-[oklch(0.90_0_0)] text-[oklch(0.30_0.04_50)] rounded-bl-md shadow-sm"
                  }`}
                >
                  {msg.role === "assistant" ? (
                    <div
                      className="prose-sm [&_h1]:text-xl [&_h1]:font-bold [&_h1]:mt-4 [&_h1]:mb-2 [&_h2]:text-lg [&_h2]:font-bold [&_h2]:mt-4 [&_h2]:mb-2 [&_h3]:text-base [&_h3]:font-bold [&_h3]:mt-3 [&_h3]:mb-1 [&_strong]:font-semibold [&_hr]:my-3 [&_li]:mb-1 [&_p]:mb-2 [&_p:last-child]:mb-0"
                      dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.content) }}
                    />
                  ) : (
                    msg.content
                  )}
                </div>
                {msg.role === "user" && (
                  <div className="w-8 h-8 rounded-lg bg-[oklch(0.90_0.02_75)] flex items-center justify-center shrink-0 mt-1">
                    <User className="w-4 h-4 text-[oklch(0.45_0.05_50)]" />
                  </div>
                )}
              </div>
            ))
          )}
          {loading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: "oklch(0.68 0.15 55)" }}>
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white border border-[oklch(0.90_0_0)] rounded-2xl rounded-bl-md px-5 py-4 shadow-sm">
                <Loader2 className="w-5 h-5 animate-spin" style={{ color: "oklch(0.45 0.08 175)" }} />
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="sticky bottom-4 bg-white rounded-2xl border border-[oklch(0.90_0_0)] shadow-lg p-2 flex items-center gap-2">
          <input
            className="flex-1 outline-none text-sm text-[oklch(0.25_0.05_170)] placeholder:text-[oklch(0.60_0.02_170)] px-3 py-2"
            placeholder="Ask about Medicare, disability benefits, retirement..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            disabled={loading}
          />
          <button
            onClick={() => sendMessage()}
            disabled={loading || !input.trim()}
            className="w-9 h-9 rounded-xl bg-[oklch(0.45 0.08 175)] hover:bg-[oklch(0.48_0.08_175)] disabled:opacity-40 flex items-center justify-center transition-colors"
          >
            <Send className="w-4 h-4 text-white" />
          </button>
        </div>
        <p className="text-center text-xs text-[oklch(0.55_0.02_170)] mt-3">
          AI assistant for informational purposes only. Not a substitute for professional advice.
        </p>
      </section>
      <Footer />
    </div>
  );
}
