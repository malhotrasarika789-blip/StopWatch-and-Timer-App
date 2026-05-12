import Stopwatch from "./components/Stopwatch";
import Timer from "./components/Timer";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black flex items-center justify-center p-6">
      <div className="w-full max-w-6xl">
        <h1 className="text-white text-5xl font-bold text-center mb-12">
          ⏰ Stopwatch & Timer
        </h1>

        <div className="grid md:grid-cols-2 gap-10">
          <Stopwatch />
          <Timer />
        </div>
      </div>
    </div>
  );
}