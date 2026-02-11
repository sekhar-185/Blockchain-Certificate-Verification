import { ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center
                        bg-gradient-to-br
                        from-slate-900 via-blue-900 to-indigo-900
                        overflow-hidden px-6">

      {/* Glow Background Effects */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px]
                      bg-blue-500/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 -right-40 w-[500px] h-[500px]
                      bg-indigo-500/30 rounded-full blur-3xl" />

      {/* CENTER CONTAINER */}
      <div className="relative z-10 max-w-7xl mx-auto
                      flex flex-col lg:flex-row items-center
                      gap-16 py-20">

        {/* LEFT CONTENT */}
        <div className="flex-1 text-center lg:text-left">

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
          <h1 className="text-4xl md:text-6xl font-extrabold
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
                        text-slate-200 max-w-2xl">
            Secure • Tamper-Proof • Decentralized • Trustless
            <br className="hidden md:block" />
            Academic Credential Verification
          </p>

          {/* CTA BUTTONS */}
          <div className="mt-12 flex flex-wrap
                          justify-center lg:justify-start gap-6">
            <Link
              to="/verify"
              className="inline-flex items-center
                         px-8 py-4 rounded-2xl
                         bg-gradient-to-r from-blue-600 to-indigo-600
                         text-white font-semibold text-lg
                         shadow-xl hover:scale-105 transition"
            >
              Verify Certificate →
            </Link>

            <Link
              to="/institute/register"
              className="inline-flex items-center
                         px-8 py-4 rounded-2xl
                         bg-white/90 text-slate-900
                         font-semibold text-lg
                         shadow-xl hover:bg-white transition"
            >
              Institute Register
            </Link>
          </div>

          {/* QUICK ACCESS */}
          <div className="mt-12 flex flex-wrap
                          justify-center lg:justify-start gap-8
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


        {/* RIGHT IMAGE */}
        <div className="flex-1 relative">

          <div className="relative rounded-3xl overflow-hidden shadow-2xl">

            <img
              src="/images/landing image.png"
              alt="Blockchain Graduation"
              className="w-full h-full object-cover rounded-3xl"
            />

            {/* Soft overlay glow */}
            <div className="absolute inset-0
                            bg-gradient-to-tr
                            from-blue-900/40 via-transparent to-indigo-900/40" />
          </div>

        </div>

      </div>
    </section>
  );
}