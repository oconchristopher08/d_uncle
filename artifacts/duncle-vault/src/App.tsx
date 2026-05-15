import { useState, useEffect } from "react";

const LAMBDA_URL = "https://3gs3mmwlsn3xgvjosfvbwtthom0cgcpc.lambda-url.us-east-1.on.aws/?username=@DUncle_CEO";
const USERNAME = "@DUncle_CEO";

interface Balance {
  balance_usd: string | number;
  balance_php: string | number;
  balance_usdt: string | number;
}

function App() {
  const [activeTab, setActiveTab] = useState<"home" | "history" | "profile">("home");
  const [balance, setBalance] = useState<Balance | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function updateBalance() {
      try {
        setLoading(true);
        setError(false);
        const response = await fetch(LAMBDA_URL);
        const data = await response.json();
        if (data.balance) {
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
    updateBalance();
  }, []);

  const usd = balance ? `$${balance.balance_usd}` : loading ? "Loading…" : "$—";
  const php = balance ? `₱${balance.balance_php}` : loading ? "…" : "₱—";
  const usdt = balance ? `$${balance.balance_usdt}` : loading ? "…" : "$—";

  return (
    <div
      className="min-h-screen pb-20"
      style={{ backgroundColor: "#fef9c3", fontFamily: "'Fredoka', sans-serif" }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;600&display=swap');`}</style>

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
            style={{
              backgroundColor: "#a78bfa",
              border: "3px solid #000",
              boxShadow: "4px 4px 0px #000",
            }}
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
            className="text-5xl font-semibold text-gray-800 mb-2 transition-all"
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
            style={{
              backgroundColor: "#93c5fd",
              border: "4px solid #000",
              boxShadow: "5px 5px 0px #000",
              transform: "rotate(-2deg)",
            }}
          >
            <p className="text-xs font-semibold uppercase" style={{ color: "#1e40af" }}>PHP Balance</p>
            <p className="text-xl font-semibold text-gray-800 mt-1" style={{ opacity: loading ? 0.4 : 1 }}>{php}</p>
          </div>
          <div
            className="rounded-2xl p-4"
            style={{
              backgroundColor: "#86efac",
              border: "4px solid #000",
              boxShadow: "5px 5px 0px #000",
              transform: "rotate(2deg)",
            }}
          >
            <p className="text-xs font-semibold uppercase" style={{ color: "#166534" }}>USDT Balance</p>
            <p className="text-xl font-semibold text-gray-800 mt-1" style={{ opacity: loading ? 0.4 : 1 }}>{usdt}</p>
          </div>
        </div>

        {/* QUICK ACTIONS */}
        <div className="flex justify-around gap-3 mb-8">
          {[
            { label: "Send", emoji: "💸", bg: "#f472b6", text: "#fff" },
            { label: "Request", emoji: "📥", bg: "#facc15", text: "#1f2937" },
            { label: "Swap", emoji: "🔄", bg: "#c084fc", text: "#fff" },
          ].map(({ label, emoji, bg, text }) => (
            <button
              key={label}
              className="rounded-full px-5 py-3 font-semibold transition-all active:scale-95"
              style={{
                backgroundColor: bg,
                color: text,
                border: "3px solid #000",
                boxShadow: "4px 4px 0px #000",
                cursor: "pointer",
              }}
              onMouseDown={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "1px 1px 0px #000";
                (e.currentTarget as HTMLButtonElement).style.transform = "translate(3px, 3px)";
              }}
              onMouseUp={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "4px 4px 0px #000";
                (e.currentTarget as HTMLButtonElement).style.transform = "";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "4px 4px 0px #000";
                (e.currentTarget as HTMLButtonElement).style.transform = "";
              }}
            >
              {label} {emoji}
            </button>
          ))}
        </div>

        {/* RECENT TRANSACTIONS */}
        <div
          className="rounded-2xl p-5 mb-6"
          style={{
            backgroundColor: "#fff",
            border: "4px solid #000",
            boxShadow: "6px 6px 0px #000",
          }}
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
          style={{
            backgroundColor: "#fde68a",
            border: "4px solid #000",
            boxShadow: "6px 6px 0px #000",
            transform: "rotate(-1deg)",
          }}
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
