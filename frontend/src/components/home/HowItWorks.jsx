import { FileText, Upload, Link2, QrCode, CheckCircle } from "lucide-react";

const steps = [
  { icon: FileText, title: "Institute Issues", desc: "Institute signs certificate digitally" },
  { icon: Upload, title: "Stored on IPFS", desc: "PDF uploaded to decentralized storage" },
  { icon: Link2, title: "Blockchain Record", desc: "Hash stored on Ethereum" },
  { icon: QrCode, title: "QR Generated", desc: "Unique QR for verification" },
  { icon: CheckCircle, title: "Public Verify", desc: "Anyone can verify instantly" }
];

export default function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-24">
      <style>{`
        @keyframes iconFloat {
          0%, 100% { transform: translateY(0px) rotateX(10deg) rotateY(-8deg) rotate(0deg); }
          50% { transform: translateY(-6px) rotateX(12deg) rotateY(-10deg) rotate(0deg); }
        }

        @keyframes haloPulse {
          0%, 100% { opacity: 0.35; transform: scale(0.95); }
          50% { opacity: 0.75; transform: scale(1.08); }
        }

        @keyframes stageBeam {
          0% { transform: translateX(-110%); opacity: 0; }
          15% { opacity: 0.9; }
          85% { opacity: 0.9; }
          100% { transform: translateX(110%); opacity: 0; }
        }

        @keyframes neonBreathe {
          0%, 100% { box-shadow: 0 0 10px rgba(56,189,248,0.35), 0 0 25px rgba(99,102,241,0.25); }
          50% { box-shadow: 0 0 16px rgba(56,189,248,0.65), 0 0 34px rgba(99,102,241,0.45); }
        }
      `}</style>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.22),_transparent_52%)]" />

      <h2 className="relative text-center text-4xl font-bold text-white">How It Works</h2>
      <p className="relative mt-3 text-center text-slate-300">
        A seamless blockchain-powered verification flow
      </p>

      <div className="relative mx-auto mt-16 grid w-full max-w-7xl grid-cols-1 gap-10 px-6 md:grid-cols-2 xl:grid-cols-5">
        {steps.map((s, i) => (
          <div key={i} className="group relative text-center">
            <div className="relative mx-auto h-28 w-28 [perspective:1000px]">
              <div
                className="absolute inset-0 rounded-[1.65rem] bg-cyan-400/20 blur-xl"
                style={{ animation: `haloPulse 2.6s ease-in-out ${i * 0.18}s infinite` }}
              />

              {Array.from({ length: 5 }).map((_, layer) => (
                <div
                  key={layer}
                  className="absolute left-1/2 h-16 w-16 -translate-x-1/2 rounded-2xl border border-cyan-300/45 bg-slate-950/35"
                  style={{
                    top: `${26 + layer * 5}px`,
                    transform: `translateX(-50%) rotate(-45deg) skewX(-8deg)`,
                    opacity: 1 - layer * 0.14
                  }}
                />
              ))}

              <div
                className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl
                           border border-cyan-200/75 bg-slate-950 text-cyan-300"
                style={{
                  transform: "rotateX(10deg) rotateY(-8deg) rotate(0deg)",
                  animation: `iconFloat 3.6s ease-in-out ${i * 0.2}s infinite, neonBreathe 2.6s ease-in-out ${i * 0.15}s infinite`
                }}
              >
                <s.icon size={23} />
              </div>
            </div>

            <div className="mt-4">
              <span className="inline-block rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-xs font-semibold text-slate-300">
                Step {i + 1}
              </span>
              <h4 className="mt-3 font-semibold text-slate-100">{s.title}</h4>
              <p className="mt-1 text-sm leading-relaxed text-slate-400">{s.desc}</p>
            </div>

            {i < steps.length - 1 && (
              <div className="pointer-events-none absolute right-[-2.9rem] top-12 hidden h-[2px] w-12 overflow-hidden rounded-full bg-slate-700 xl:block">
                <div
                  className="h-full w-1/2 rounded-full bg-gradient-to-r from-cyan-400 to-indigo-400"
                  style={{ animation: "stageBeam 2.5s linear infinite" }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
