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
  const [result, setResult] = useState<{ ok: boolean; msg: string } | null>(null);

  async function handleSend() {
    if (!form.receiver || !form.amount) return;
    setSending(true);
    setResult(null);
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
        setResult({ ok: true, msg: data.message });
        onSent();
      } else {
        setResult({ ok: false, msg: data.error });
      }
    } catch {
      setResult({ ok: false, msg: "Connection error. Try again." });
    } finally {
      setSending(false);
    }
  }

  const currencyLabels = {
    balance_usd: "USD 🇺🇸",
    balance_php: "PHP 🇵🇭",
    balance_usdt: "USDT 💚",
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="w-full max-w-md rounded-t-3xl p-6 pb-10"
        style={{ backgroundColor: "#fff", border: "4px solid #000", borderBottom: "none" }}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-semibold text-gray-800">Send Money 💸</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-gray-600"
            style={{ border: "2px solid #000", backgroundColor: "#fef9c3" }}
          >
            ✕
          </button>
        </div>

        {/* Receiver */}
        <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
          Send To (username)
        </label>
        <input
          type="text"
          placeholder="@username"
          value={form.receiver}
          onChange={(e) => setForm({ ...form, receiver: e.target.value })}
          className="w-full rounded-xl px-4 py-3 mb-4 text-gray-800 font-semibold"
          style={{ border: "3px solid #000", outline: "none", backgroundColor: "#fef9c3" }}
        />

        {/* Amount */}
        <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
          Amount
        </label>
        <input
          type="number"
          placeholder="0.00"
          min="0"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
          className="w-full rounded-xl px-4 py-3 mb-4 text-gray-800 font-semibold"
          style={{ border: "3px solid #000", outline: "none", backgroundColor: "#fef9c3" }}
        />

        {/* Currency picker */}
        <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">
          Currency
        </label>
        <div className="flex gap-2 mb-6">
          {(Object.keys(currencyLabels) as Array<keyof typeof currencyLabels>).map((key) => (
            <button
              key={key}
              onClick={() => setForm({ ...form, currency: key })}
              className="flex-1 py-2 rounded-xl text-sm font-semibold transition-all"
              style={{
                backgroundColor: form.currency === key ? "#c084fc" : "#f3f4f6",
                color: form.currency === key ? "#fff" : "#374151",
                border: form.currency === key ? "3px solid #000" : "3px solid #d1d5db",
                boxShadow: form.currency === key ? "3px 3px 0px #000" : "none",
              }}
            >
              {currencyLabels[key]}
            </button>
          ))}
        </div>

        {/* Result message */}
        {result && (
          <div
            className="rounded-xl px-4 py-3 mb-4 text-sm font-semibold"
            style={{
              backgroundColor: result.ok ? "#dcfce7" : "#fee2e2",
              border: `2px solid ${result.ok ? "#16a34a" : "#dc2626"}`,
              color: result.ok ? "#15803d" : "#dc2626",
            }}
          >
            {result.msg}
          </div>
        )}

        {/* Send button */}
        <button
          onClick={handleSend}
          disabled={sending || !form.receiver || !form.amount}
          className="w-full rounded-2xl py-4 font-semibold text-white text-base transition-all"
          style={{
            backgroundColor: sending ? "#a78bfa" : "#7c3aed",
            border: "3px solid #000",
            boxShadow: "4px 4px 0px #000",
            opacity: !form.receiver || !form.amount ? 0.5 : 1,
            cursor: sending || !form.receiver || !form.amount ? "not-allowed" : "pointer",
          }}
        >
          {sending ? "Sending… 🌀" : "Confirm Send 💸"}
        </button>
      </div>
    </div>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState<"home" | "history" | "profile">("home");
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

      <div className="max-w-md mx-auto px-4 pt-6">

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
            { id: "history", icon: "📋", label: "History" },
            { id: "profile", icon: "👤", label: "Profile" },
          ].map(({ id, icon, label }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as typeof activeTab)}
              className="flex flex-col items-center gap-0.5 px-4 py-1 rounded-xl transition-all"
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
