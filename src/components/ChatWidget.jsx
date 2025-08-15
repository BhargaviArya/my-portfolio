import React, { useEffect, useMemo, useRef, useState } from "react";
import { X, Send, Loader2 } from "lucide-react";

/** POST endpoint for chat */
const CHAT_API =
  import.meta.env.MODE === "development"
    ? "http://127.0.0.1:3000/api/chat" // your local Next.js API
    : "https://bhargavi-chat.vercel.app/api/chat"; // <-- change to your deployed chatbot URL

export default function ChatWidget({ open, onClose }) {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! I’m Bhargavi’s assistant. How can I help?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const canSend = useMemo(() => input.trim() && !loading, [input, loading]);

  async function sendMessage() {
    if (!canSend) return;
    const text = input.trim();
    setInput("");
    setMessages((m) => [...m, { role: "user", content: text }]);
    setLoading(true);

    try {
      const res = await fetch(CHAT_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            { role: "system", content: "You are Bhargavi's helpful assistant." },
            ...messages.map(({ role, content }) => ({ role, content })),
            { role: "user", content: text },
          ],
        }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      // Try a few common shapes
      const reply =
        data?.content ||
        data?.message?.content ||
        data?.reply ||
        data?.choices?.[0]?.message?.content ||
        "Sorry, I couldn’t answer that.";

      setMessages((m) => [...m, { role: "assistant", content: String(reply) }]);
    } catch (_) {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            "I couldn’t reach the chat service right now. Please email Bhargavi at bhargaviarya11@gmail.com.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  if (!open) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50" aria-live="polite" aria-label="Chat window">
      <div className="w-[360px] h-[480px] rounded-2xl shadow-2xl border border-[#262626] bg-[#0c0c0c] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#262626] bg-black/70">
          <div className="text-white font-semibold">Chat with Bhargavi</div>
          <button
            onClick={onClose}
            className="text-[#9ca3af] hover:text-white transition"
            aria-label="Close chat"
            title="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-auto px-3 py-3 space-y-3">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`max-w-[85%] rounded-xl px-3 py-2 text-sm leading-relaxed ${
                m.role === "user"
                  ? "ml-auto bg-[#1a1a1a] text-white"
                  : "mr-auto bg-[#111111] text-[#e5e7eb] border border-[#1f1f1f]"
              }`}
            >
              {m.content}
            </div>
          ))}
          {loading && (
            <div className="mr-auto flex items-center gap-2 text-[#cbd5e1] text-sm">
              <Loader2 className="animate-spin" size={16} />
              Thinking…
            </div>
          )}
          <div ref={endRef} />
        </div>

        {/* Input */}
        <div className="p-3 border-t border-[#262626] bg-black/60">
          <div className="flex items-center gap-2">
            <textarea
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message…"
              className="flex-1 resize-none rounded-md bg-[#0f0f0f] text-white placeholder:text-[#6b7280] border border-[#2b2b2b] px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#FF9900]"
            />
            <button
              onClick={sendMessage}
              disabled={!canSend}
              className={`inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium ${
                canSend
                  ? "bg-[#FF9900] hover:bg-[#e68900] text-black"
                  : "bg-[#2a2a2a] text-[#9ca3af] cursor-not-allowed"
              }`}
              title="Send"
            >
              <Send size={16} />
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
