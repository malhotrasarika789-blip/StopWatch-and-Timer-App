import { useEffect, useRef, useState } from "react";

export default function Timer() {
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const alarmRef = useRef(null);

  useEffect(() => {
    let interval;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    if (timeLeft === 0 && isRunning) {
      setIsRunning(false);

      if (alarmRef.current) {
        alarmRef.current.play();
      }
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const startTimer = () => {
    const total =
      Number(minutes) * 60 + Number(seconds);

    if (total > 0 && timeLeft === 0) {
      setTimeLeft(total);
    }

    setIsRunning(true);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(0);
    setMinutes("");
    setSeconds("");
  };

  const formatTime = () => {
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;

    return `${String(mins).padStart(2, "0")}:${String(
      secs
    ).padStart(2, "0")}`;
  };

  return (
    <div className="timer-card p-10 text-center">
      <h2 className="text-white text-4xl font-bold mb-8">
        ⏳ Timer
      </h2>

      <div className="flex justify-center gap-4 mb-8">
        <input
          type="number"
          min="0"
          placeholder="Min"
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
          className="w-28 p-4 rounded-2xl bg-slate-800 border border-slate-600 text-white text-lg outline-none"
        />

        <input
          type="number"
          min="0"
          placeholder="Sec"
          value={seconds}
          onChange={(e) => setSeconds(e.target.value)}
          className="w-28 p-4 rounded-2xl bg-slate-800 border border-slate-600 text-white text-lg outline-none"
        />
      </div>

      <div className="text-7xl font-mono text-lime-400 mb-10 time-text">
        {formatTime()}
      </div>

      <div className="flex justify-center gap-4 flex-wrap">
        <button
          onClick={startTimer}
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
          onClick={resetTimer}
          className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-2xl text-white text-lg font-semibold"
        >
          Reset
        </button>
      </div>

      <audio
        ref={alarmRef}
        src="https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg"
      />
    </div>
  );
}