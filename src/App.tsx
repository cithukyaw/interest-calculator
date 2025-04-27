import './App.css'
import {FC, useState} from "react";

const App: FC = () => {
  const [amount, setAmount] = useState(1);
  const [rate, setRate] = useState(6.5);
  const [results, setResults] = useState<{ period: number; label: string; value: number }[] | null>(null);

  const calculateInterest = () => {
    const periods = [
      { period: 365, label: "per day" },
      { period: 12, label: "per month" },
      { period: 3, label: "per every 3 month" },
      { period: 1, label: "per year" },
    ];

    const calculated = periods.map(({ period, label }) => {
      const value = Math.floor((amount * 100000 * (rate / 100)) / period);
      return {
        period,
        label,
        value,
      };
    });

    setResults(calculated);
  };

  return (
    <div className="container mx-auto min-h-screen flex items-center px-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 sm:w-screen max-w-2xl">
        <h1 className="text-3xl font-bold mb-4 text-center">Interest Calculator</h1>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Amount in Lakh (Enter 1 for 100,000 MMK)</label>
          <input
            type="number"
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            min={1}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-semibold">Interest Rate (%)</label>
          <select
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
          >
            {[...Array(13)].map((_, i) => {
              const val = 6 + i * 0.5;
              return (
                <option key={val} value={val}>
                  {val.toFixed(1)}%
                </option>
              );
            })}
          </select>
        </div>

        <button
          onClick={calculateInterest}
          className="w-full text-white py-2 rounded-lg bg-blue-500 hover:bg-blue-700 transition"
        >
          Calculate
        </button>

        {results && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Results:</h2>
            <ul className="space-y-2">
              {results.map(({period, label, value}) => (
                <li key={period} className="bg-gray-50 p-3 rounded-lg shadow-sm text-left">
                  <strong>{value.toLocaleString("en-US", { minimumFractionDigits: 0 })} MMK</strong> {label}
                </li>
              ))}
            </ul>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;
