import { useState, useEffect } from "react";

const BALANCE_URL = "/api/get_balance";
const SEND_URL = "/api/send";
const USERNAME = "@DUncle_CEO";

interface Balance {
  balance_usd?: string | number;
  balance_php?: string | number;
  balance_usdt?: string | number;
}

interface SendForm {
  receiver: string;
  amount: string;
  currency: "balance_usd" | "balance_php" | "balance_usdt";
}

function DoodleButton({
  label,
  emoji,
  bg,
  text,
  onClick,
  disabled,
}: {
  label: string;
  emoji: string;
  bg: string;
  text: string;
  onClick?: () => void;
  disabled?: boolean;
}) {
  const [pressed, setPressed] = useState(false);
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => setPressed(false)}
      className="rounded-full px-5 py-3 font-semibold transition-all"
      style={{
        backgroundColor: bg,
        color: text,
        border: "3px solid #000",
        boxShadow: pressed ? "1px 1px 0px #000" : "4px 4px 0px #000",
        transform: pressed ? "translate(3px, 3px)" : "",
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      {label} {emoji}
    </button>
  );
}

const shakeKeyframes = `
@keyframes doodle-shake {
  0%   { transform: rotate(-1deg) translate(0, 0); }
  15%  { transform: rotate(-1deg) translate(-8px, 0); }
  30%  { transform: rotate(-1deg) translate(8px, 0); }
  45%  { transform: rotate(-1deg) translate(-6px, 0); }
  60%  { transform: rotate(-1deg) translate(6px, 0); }
  75%  { transform: rotate(-1deg) translate(-3px, 0); }
  90%  { transform: rotate(-1deg) translate(3px, 0); }
  100% { transform: rotate(-1deg) translate(0, 0); }
}
.doodle-shake { animation: doodle-shake 0.55s ease-in-out; }
`;

function SendModal({
  onClose,
  onSent,
}: {
  onClose: () => void;
  onSent: () => void;
}) {
  const [form, setForm] = useState<SendForm>({
    receiver: "",
    amount: "",
    currency: "balance_usd",
  });
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [shaking, setShaking] = useState(false);

  async function handleSend() {
    if (!form.receiver || !form.amount) return;
    setSending(true);
    setError(null);
    try {
      const res = await fetch(SEND_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sender: USERNAME,
          receiver: form.receiver,
          amount: parseFloat(form.amount),
          currency: form.currency,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess(`🚀 D'Uncle just moved that money for you! Keep it colorful! 🌈`);
        setShaking(true);
        setTimeout(() => setShaking(false), 600);
        if (navigator.vibrate) navigator.vibrate([80, 40, 80]);
        onSent();
      } else {
        setError(data.error ?? "Something went wrong.");
      }
    } catch {
      setError("D'Uncle's vault is acting up! Try again later.");
    } finally {
      setSending(false);
    }
  }

  const currencies: { key: SendForm["currency"]; label: string; bg: string; flag: string }[] = [
    { key: "balance_usd", label: "USD", bg: "#93c5fd", flag: "🇺🇸" },
    { key: "balance_php", label: "PHP", bg: "#86efac", flag: "🇵🇭" },
    { key: "balance_usdt", label: "USDT", bg: "#fde68a", flag: "💚" },
  ];

  return (
    <>
      <style>{shakeKeyframes}</style>

      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        onClick={(e) => { if (e.target === e.currentTarget && !success) onClose(); }}
      >
        {/* SUCCESS SCREEN */}
        {success ? (
          <div
            className={`w-full max-w-sm rounded-3xl p-8 text-center${shaking ? " doodle-shake" : ""}`}
            style={{
              backgroundColor: "#fff",
              border: "4px solid #000",
              boxShadow: "8px 8px 0px #000",
            }}
          >
            <div className="text-6xl mb-4">🚀</div>
            <h3
              className="text-2xl font-semibold mb-2"
              style={{ color: "#7c3aed" }}
            >
              Money Moved!
            </h3>
            <p className="text-gray-600 text-sm mb-6 font-medium">{success}</p>
            <button
              onClick={onClose}
              className="w-full rounded-2xl py-3 font-semibold text-white"
              style={{
                backgroundColor: "#f472b6",
                border: "3px solid #000",
                boxShadow: "4px 4px 0px #000",
                cursor: "pointer",
              }}
            >
              Back to Vault 💜
            </button>
          </div>
        ) : (
          /* SEND FORM — Doodle Bubble */
          <div
            className="w-full max-w-sm rounded-3xl p-6"
            style={{
              backgroundColor: "#fff",
              border: "4px solid #000",
              boxShadow: "8px 8px 0px #000",
              transform: "rotate(1deg)",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-xl font-semibold text-gray-800">Send Love 💸</h3>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full font-bold text-gray-700 flex items-center justify-center"
                style={{ border: "3px solid #000", backgroundColor: "#fde68a", boxShadow: "3px 3px 0px #000", cursor: "pointer" }}
              >
                ✕
              </button>
            </div>

            {/* To Whom */}
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
              To Whom?
            </label>
            <input
              type="text"
              placeholder="@username"
              value={form.receiver}
              onChange={(e) => setForm({ ...form, receiver: e.target.value })}
              className="w-full rounded-2xl px-4 py-3 mb-4 font-semibold text-gray-800"
              style={{ border: "3px solid #000", outline: "none", backgroundColor: "#fef9c3", boxShadow: "3px 3px 0px #000" }}
            />

            {/* How Much */}
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
              How Much?
            </label>
            <input
              type="number"
              placeholder="0.00"
              min="0"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              className="w-full rounded-2xl px-4 py-3 mb-4 font-semibold text-gray-800"
              style={{ border: "3px solid #000", outline: "none", backgroundColor: "#fef9c3", boxShadow: "3px 3px 0px #000" }}
            />

            {/* Currency Selector */}
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-2">
              Which Currency?
            </label>
            <div className="flex gap-2 mb-5">
              {currencies.map(({ key, label, bg, flag }) => (
                <button
                  key={key}
                  onClick={() => setForm({ ...form, currency: key })}
                  className="flex-1 py-2 rounded-2xl text-sm font-semibold"
                  style={{
                    backgroundColor: form.currency === key ? bg : "#f3f4f6",
                    color: "#1f2937",
                    border: form.currency === key ? "3px solid #000" : "3px solid #d1d5db",
                    boxShadow: form.currency === key ? "3px 3px 0px #000" : "none",
                    transform: form.currency === key ? "translate(-1px,-1px)" : "",
                    cursor: "pointer",
                  }}
                >
                  {flag} {label}
                </button>
              ))}
            </div>

            {/* Error */}
            {error && (
              <div
                className="rounded-2xl px-4 py-3 mb-4 text-sm font-semibold"
                style={{ backgroundColor: "#fee2e2", border: "3px solid #000", color: "#dc2626", boxShadow: "3px 3px 0px #000" }}
              >
                ❌ {error}
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 rounded-full py-3 font-semibold text-gray-700"
                style={{ backgroundColor: "#e5e7eb", border: "3px solid #000", boxShadow: "3px 3px 0px #000", cursor: "pointer" }}
              >
                Cancel
              </button>
              <button
                onClick={handleSend}
                disabled={sending || !form.receiver || !form.amount}
                className="flex-1 rounded-full py-3 font-semibold text-white"
                style={{
                  backgroundColor: "#f472b6",
                  border: "3px solid #000",
                  boxShadow: sending ? "1px 1px 0px #000" : "4px 4px 0px #000",
                  transform: sending ? "translate(3px,3px)" : "",
                  opacity: !form.receiver || !form.amount ? 0.5 : 1,
                  cursor: sending || !form.receiver || !form.amount ? "not-allowed" : "pointer",
                }}
              >
                {sending ? "Sending 🌀" : "Send! 💖"}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

interface ChatMessage {
  role: "user" | "uncle";
  text: string;
  status?: "paid" | "chat" | "error";
}

function AskUncleTab({ onBalanceChange }: { onBalanceChange: () => void }) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "uncle", text: "Hey Nephew! 🌈 I'm D'Uncle — your Global Financial Guide. Tell me what you need. I can send money, check your vault, or just chat!" },
  ]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const bottomRef = { current: null as HTMLDivElement | null };

  async function handleAsk() {
    const msg = input.trim();
    if (!msg || thinking) return;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: msg }]);
    setThinking(true);
    try {
      const res = await fetch("/api/ask_uncle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg, username: USERNAME }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessages((prev) => [...prev, { role: "uncle", text: data.error ?? "Something went wrong. Try again!", status: "error" }]);
      } else {
        setMessages((prev) => [...prev, { role: "uncle", text: data.reply, status: data.status }]);
        if (data.status === "paid") onBalanceChange();
      }
    } catch {
      setMessages((prev) => [...prev, { role: "uncle", text: "My brain took a nap. Try again! 🧠", status: "error" }]);
    } finally {
      setThinking(false);
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div
        className="rounded-2xl p-4 mb-4 text-center"
        style={{ backgroundColor: "#c084fc", border: "4px solid #000", boxShadow: "5px 5px 0px #000", transform: "rotate(-1deg)" }}
      >
        <p className="text-2xl mb-1">🧠</p>
        <p className="font-semibold text-white text-sm">Ask D'Uncle anything — or tell him to send money!</p>
      </div>

      {/* Suggestion pills */}
      <div className="flex gap-2 flex-wrap mb-4">
        {[
          "What's my balance?",
          "Send 5 USD to @Newbie_User",
          "Who are you?",
        ].map((s) => (
          <button
            key={s}
            onClick={() => setInput(s)}
            className="text-xs rounded-full px-3 py-1 font-semibold"
            style={{ backgroundColor: "#fde68a", border: "2px solid #000", boxShadow: "2px 2px 0px #000", cursor: "pointer" }}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Chat bubbles */}
      <div className="flex-1 space-y-3 overflow-y-auto pb-4" style={{ maxHeight: "340px" }}>
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className="rounded-2xl px-4 py-3 text-sm font-medium max-w-[80%]"
              style={{
                backgroundColor:
                  m.role === "user" ? "#c084fc"
                  : m.status === "paid" ? "#86efac"
                  : m.status === "error" ? "#fca5a5"
                  : "#fff",
                color: m.role === "user" ? "#fff" : "#1f2937",
                border: "3px solid #000",
                boxShadow: "3px 3px 0px #000",
                transform: m.role === "uncle" ? "rotate(-0.5deg)" : "rotate(0.5deg)",
              }}
            >
              {m.status === "paid" && <span className="block text-xs font-bold mb-1 text-green-700">✅ Payment Executed</span>}
              {m.text}
            </div>
          </div>
        ))}
        {thinking && (
          <div className="flex justify-start">
            <div
              className="rounded-2xl px-4 py-3 text-sm font-medium"
              style={{ backgroundColor: "#fff", border: "3px solid #000", boxShadow: "3px 3px 0px #000", color: "#7c3aed" }}
            >
              D'Uncle is thinking… 🧠
            </div>
          </div>
        )}
        <div ref={(el) => { bottomRef.current = el; }} />
      </div>

      {/* Input row */}
      <div className="flex gap-2 mt-2">
        <input
          type="text"
          placeholder="Talk to D'Uncle…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") handleAsk(); }}
          className="flex-1 rounded-2xl px-4 py-3 font-semibold text-gray-800 text-sm"
          style={{ border: "3px solid #000", outline: "none", backgroundColor: "#fef9c3", boxShadow: "3px 3px 0px #000" }}
        />
        <button
          onClick={handleAsk}
          disabled={thinking || !input.trim()}
          className="rounded-2xl px-4 py-3 font-bold text-white"
          style={{
            backgroundColor: "#7c3aed",
            border: "3px solid #000",
            boxShadow: thinking ? "1px 1px 0px #000" : "4px 4px 0px #000",
            transform: thinking ? "translate(3px,3px)" : "",
            cursor: thinking || !input.trim() ? "not-allowed" : "pointer",
            opacity: !input.trim() ? 0.5 : 1,
          }}
        >
          {thinking ? "…" : "→"}
        </button>
      </div>
    </div>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState<"home" | "brain">("home");
  const [balance, setBalance] = useState<Balance | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showSend, setShowSend] = useState(false);

  async function fetchBalance() {
    try {
      setLoading(true);
      setError(false);
      const response = await fetch(`${BALANCE_URL}?username=${encodeURIComponent(USERNAME)}`);
      const data = await response.json();
      if (data.balance_usd !== undefined) {
        setBalance(data);
      } else if (data.balance) {
        setBalance(data.balance);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchBalance(); }, []);

  const usd = balance ? `$${balance.balance_usd ?? "—"}` : loading ? "Loading…" : "$—";
  const php = balance ? `₱${balance.balance_php ?? "—"}` : loading ? "…" : "₱—";
  const usdt = balance ? `$${balance.balance_usdt ?? "—"}` : loading ? "…" : "$—";

  return (
    <div
      className="min-h-screen pb-20"
      style={{ backgroundColor: "#fef9c3", fontFamily: "'Fredoka', sans-serif" }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;600&display=swap');`}</style>

      {showSend && (
        <SendModal
          onClose={() => setShowSend(false)}
          onSent={() => { setTimeout(fetchBalance, 500); }}
        />
      )}

      {/* BRAIN TAB */}
      {activeTab === "brain" && (
        <div className="max-w-md mx-auto px-4 pt-6">
          <AskUncleTab onBalanceChange={fetchBalance} />
        </div>
      )}

      {/* HOME TAB */}
      <div className="max-w-md mx-auto px-4 pt-6" style={{ display: activeTab === "home" ? "block" : "none" }}>

        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              Hello, <span style={{ color: "#7c3aed" }}>{USERNAME}</span>! 🌈
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">D'Uncle has your money safe!</p>
          </div>
          <div
            className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center text-xl font-bold text-white"
            style={{ backgroundColor: "#a78bfa", border: "3px solid #000", boxShadow: "4px 4px 0px #000" }}
          >
            U
          </div>
        </div>

        {/* MAIN BALANCE CARD */}
        <div
          className="rounded-3xl p-8 text-center mb-6"
          style={{
            backgroundColor: "#fff",
            border: "4px solid #000",
            boxShadow: "6px 6px 0px #000",
            transform: "rotate(1deg)",
          }}
        >
          <p className="uppercase tracking-widest text-xs font-semibold mb-2" style={{ color: "#6b7280" }}>
            Your Global Vault
          </p>
          <h2
            className="text-5xl font-semibold text-gray-800 mb-2"
            style={{ opacity: loading ? 0.4 : 1 }}
          >
            {usd}
          </h2>
          <p className="font-medium" style={{ color: "#7c3aed" }}>
            {balance ? `Equivalent to ₱${balance.balance_php}` : loading ? "Fetching vault…" : "Could not load"}
          </p>
          {error && (
            <p className="text-xs mt-2" style={{ color: "#dc2626" }}>
              ⚠️ Couldn't reach the vault. Check your connection.
            </p>
          )}
        </div>

        {/* CURRENCY CARDS */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div
            className="rounded-2xl p-4"
            style={{ backgroundColor: "#93c5fd", border: "4px solid #000", boxShadow: "5px 5px 0px #000", transform: "rotate(-2deg)" }}
          >
            <p className="text-xs font-semibold uppercase" style={{ color: "#1e40af" }}>PHP Balance</p>
            <p className="text-xl font-semibold text-gray-800 mt-1" style={{ opacity: loading ? 0.4 : 1 }}>{php}</p>
          </div>
          <div
            className="rounded-2xl p-4"
            style={{ backgroundColor: "#86efac", border: "4px solid #000", boxShadow: "5px 5px 0px #000", transform: "rotate(2deg)" }}
          >
            <p className="text-xs font-semibold uppercase" style={{ color: "#166534" }}>USDT Balance</p>
            <p className="text-xl font-semibold text-gray-800 mt-1" style={{ opacity: loading ? 0.4 : 1 }}>{usdt}</p>
          </div>
        </div>

        {/* QUICK ACTIONS */}
        <div className="flex justify-around gap-3 mb-8">
          <DoodleButton label="Send" emoji="💸" bg="#f472b6" text="#fff" onClick={() => setShowSend(true)} />
          <DoodleButton label="Request" emoji="📥" bg="#facc15" text="#1f2937" />
          <DoodleButton label="Swap" emoji="🔄" bg="#c084fc" text="#fff" />
        </div>

        {/* RECENT TRANSACTIONS */}
        <div
          className="rounded-2xl p-5 mb-6"
          style={{ backgroundColor: "#fff", border: "4px solid #000", boxShadow: "6px 6px 0px #000" }}
        >
          <h3 className="font-semibold text-gray-800 text-base mb-4">Recent Transactions</h3>
          <div className="space-y-3">
            {[
              { name: "Maria Santos", type: "Received", amount: "+$50.00", color: "#16a34a", bg: "#dcfce7", emoji: "📨" },
              { name: "Coffee Shop", type: "Sent", amount: "-$3.50", color: "#dc2626", bg: "#fee2e2", emoji: "☕" },
              { name: "Juan Dela Cruz", type: "Received", amount: "+$200.00", color: "#16a34a", bg: "#dcfce7", emoji: "📨" },
              { name: "Online Shop", type: "Sent", amount: "-$45.00", color: "#dc2626", bg: "#fee2e2", emoji: "🛍️" },
            ].map(({ name, type, amount, color, bg, emoji }) => (
              <div key={name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-base"
                    style={{ backgroundColor: bg, border: "2px solid #000" }}
                  >
                    {emoji}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{name}</p>
                    <p className="text-xs text-gray-500">{type}</p>
                  </div>
                </div>
                <span className="text-sm font-semibold" style={{ color }}>{amount}</span>
              </div>
            ))}
          </div>
        </div>

        {/* EXCHANGE RATES */}
        <div
          className="rounded-2xl p-4 mb-6"
          style={{ backgroundColor: "#fde68a", border: "4px solid #000", boxShadow: "6px 6px 0px #000", transform: "rotate(-1deg)" }}
        >
          <p className="text-xs font-semibold uppercase text-gray-600 mb-2">Live Rates</p>
          <div className="flex justify-between">
            {[
              { pair: "USD → PHP", rate: "56.40" },
              { pair: "USDT → PHP", rate: "56.35" },
              { pair: "PHP → USD", rate: "0.018" },
            ].map(({ pair, rate }) => (
              <div key={pair} className="text-center">
                <p className="text-xs text-gray-600">{pair}</p>
                <p className="text-sm font-semibold text-gray-800">{rate}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BOTTOM NAV */}
      <div
        className="fixed bottom-0 left-0 w-full"
        style={{ backgroundColor: "#fff", borderTop: "4px solid #000" }}
      >
        <div className="max-w-md mx-auto flex justify-around items-center py-3 px-4">
          {[
            { id: "home", icon: "🏠", label: "Home" },
            { id: "brain", icon: "🧠", label: "Ask Uncle" },
          ].map(({ id, icon, label }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as typeof activeTab)}
              className="flex flex-col items-center gap-0.5 px-6 py-1 rounded-xl transition-all"
              style={{
                backgroundColor: activeTab === id ? "#fde68a" : "transparent",
                border: activeTab === id ? "2px solid #000" : "2px solid transparent",
                cursor: "pointer",
              }}
            >
              <span className="text-xl">{icon}</span>
              <span className="text-xs font-semibold" style={{ color: activeTab === id ? "#7c3aed" : "#9ca3af" }}>
                {label}
              </span>
            </button>
          ))}
        </div>
        <p className="text-center text-xs text-gray-400 italic pb-2 font-medium">
          "Keep it colorful, keep it global!" — D'Uncle 🌍
        </p>
      </div>
    </div>
  );
}

export default App;
