import { useEffect, useState } from "react";

export default function Stopwatch() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = () => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${String(hrs).padStart(2, "0")}:${String(
      mins
    ).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <div className="timer-card p-10 text-center">
      <h2 className="text-white text-4xl font-bold mb-8">
        ⏱ Stopwatch
      </h2>

      <div className="text-7xl font-mono text-orange-400 mb-10 time-text">
        {formatTime()}
      </div>

      <div className="flex justify-center gap-4 flex-wrap">
        <button
          onClick={() => setIsRunning(true)}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-2xl text-white text-lg font-semibold"
        >
          Start
        </button>

        <button
          onClick={() => setIsRunning(false)}
          className="bg-gray-600 hover:bg-gray-700 px-6 py-3 rounded-2xl text-white text-lg font-semibold"
        >
          Pause
        </button>

        <button
          onClick={() => {
            setIsRunning(false);
            setSeconds(0);
          }}
          className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-2xl text-white text-lg font-semibold"
        >
          Reset
        </button>
      </div>
    </div>
  );
}