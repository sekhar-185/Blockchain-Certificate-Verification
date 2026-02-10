import { ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section
      className="relative min-h-[90vh] flex items-center justify-center
                 bg-[url('/images/unpjpg.jpg')] bg-cover bg-center"
    >
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-br
                      from-slate-900/70 via-blue-900/60 to-indigo-900/70" />

      {/* GLOW ORBS */}
      <div className="absolute -top-32 -left-32 w-96 h-96
                      bg-blue-500/30 rounded-full blur-3xl" />
      <div className="absolute top-1/3 -right-32 w-96 h-96
                      bg-indigo-500/30 rounded-full blur-3xl" />

      {/* CONTENT */}
      <div
        className="relative z-10 max-w-5xl mx-auto text-center
                   bg-white/10 backdrop-blur-2xl
                   border border-white/20
                   rounded-md px-12 py-20 shadow-2xl my-5"
      >
        {/* BADGE */}
        <div className="inline-flex items-center gap-2
                        bg-white/90 text-blue-600
                        px-5 py-2 rounded-full
                        shadow-md mb-8">
          <ShieldCheck size={18} />
          <span className="text-sm font-semibold tracking-wide">
            Powered by Blockchain & IPFS
          </span>
        </div>

        {/* TITLE */}
        <h1 className="text-5xl md:text-7xl font-extrabold
                       leading-tight tracking-tight
                       text-white drop-shadow-lg">
          Blockchain-Based
          <br />
          <span className="bg-gradient-to-r from-blue-400 to-indigo-400
                           bg-clip-text text-transparent">
            Certificate Verification
          </span>
          <br />
          System
        </h1>

        {/* SUBTITLE */}
        <p className="mt-8 text-lg md:text-xl
                      text-slate-200 max-w-3xl mx-auto">
          Secure • Tamper-Proof • Decentralized • Trustless  
          <br className="hidden md:block" />
          Academic Credential Verification
        </p>

        {/* CTA BUTTONS */}
        <div className="mt-12 flex flex-wrap justify-center gap-6">
          <Link
            to="/verify"
            className="relative inline-flex items-center
                       px-10 py-4 rounded-2xl
                       bg-gradient-to-r from-blue-600 to-indigo-600
                       text-white font-semibold text-lg
                       shadow-xl hover:scale-105 transition"
          >
            Verify Certificate →
          </Link>

          <Link
            to="/institute/register"
            className="inline-flex items-center
                       px-10 py-4 rounded-2xl
                       bg-white/90 text-slate-900
                       font-semibold text-lg
                       shadow-xl hover:bg-white transition"
          >
            Institute Register
          </Link>
        </div>

        {/* QUICK ACCESS */}
        <div className="mt-12 flex justify-center gap-10
                        text-sm text-slate-300 font-medium">
          <span className="hover:text-white transition cursor-default">
            🏫 Institute Login
          </span>
          <span className="hover:text-white transition cursor-default">
            🎓 Student Login
          </span>
          <span className="hover:text-white transition cursor-default">
            🛡️ Admin Login
          </span>
        </div>
      </div>
    </section>
  );
}
