import { useNavigate } from "react-router-dom";
import {
  Shield,
  Zap,
  Trophy,
  Users,
} from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "../Redux/store";


export default function Landing() {
  const navigate = useNavigate();
  const {user} = useSelector((state : RootState) => state.user);

  return (
    <div className="min-h-screen bg-[#0f1115] text-white overflow-hidden">


      {/* HERO */}
      <section className="relative px-8 md:px-20 py-20">

        {/* Green Glow */}
        <div className="absolute top-40 left-1/2 -translate-x-1/2 h-80 w-80 bg-green-500/10 blur-[150px]" />

        <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
          {/* LEFT */}

          <div>
            <div className="flex items-center gap-2 text-green-500 font-semibold tracking-widest mb-6">
              <Users size={18} />
              <span>MULTIPLAYER CHESS</span>
            </div>

            <h1 className="text-6xl md:text-7xl font-extrabold leading-tight">
              Play Chess
              <br />
              Online.
              <br />
              <span className="text-green-500">
                Anytime.
              </span>
            </h1>

            <p className="text-gray-400 text-xl mt-8 max-w-lg">
              Challenge real players from around the world
              and climb the leaderboard.
            </p>

            <button
              onClick={() => Object.keys(user).length === 0 ? navigate("/signin") : navigate("/selectGame")}
              className="mt-10 bg-green-500 hover:bg-green-400 transition text-black font-bold text-xl px-10 py-4 rounded-xl"
            >
              Play Now
            </button>

            {/* STATS */}

            <div className="flex gap-12 mt-14">
              <div>
                <p className="text-3xl font-bold">
                  12,540+
                </p>
                <p className="text-gray-400">
                  Players Online
                </p>
              </div>

              <div>
                <p className="text-3xl font-bold">
                  2.4M+
                </p>
                <p className="text-gray-400">
                  Games Played
                </p>
              </div>

              <div>
                <p className="text-3xl font-bold">
                  1560+
                </p>
                <p className="text-gray-400">
                  Active Today
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT */}

          <div className="relative flex justify-center">
            <img
              src="/landingPageImage.jpg"
              alt="Chess Board"
              className="w-full max-w-3xl drop-shadow-[0_0_40px_rgba(34,197,94,0.35)]"
            />
          </div>
        </div>
      </section>

      {/* FEATURES */}

      <section className="px-8 md:px-20 py-24">
        <div className="text-center">
          <p className="text-green-500 uppercase tracking-[5px]">
            Why Play On CheckMate?
          </p>

          <h2 className="text-5xl font-bold mt-4">
            Built for Real Players
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">
          <FeatureCard
            icon={<Users size={40} />}
            title="Real-Time Matches"
            desc="Play live games with players around the world."
          />

          <FeatureCard
            icon={<Zap size={40} />}
            title="Fast & Smooth"
            desc="Optimized matchmaking and gameplay."
          />

          <FeatureCard
            icon={<Shield size={40} />}
            title="Fair Play"
            desc="Competitive and enjoyable chess experience."
          />

          <FeatureCard
            icon={<Trophy size={40} />}
            title="Climb & Improve"
            desc="Track progress and improve your rating."
          />
        </div>
      </section>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="border border-white/10 rounded-3xl p-8 bg-white/2 hover:border-green-500/40 hover:-translate-y-2 transition duration-300">
      <div className="text-green-500">{icon}</div>

      <h3 className="text-2xl font-bold mt-6">
        {title}
      </h3>

      <p className="text-gray-400 mt-4 leading-relaxed">
        {desc}
      </p>
    </div>
  );
}