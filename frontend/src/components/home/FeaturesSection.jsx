import {
  Shield,
  QrCode,
  Database,
  Layers,
  Zap,
  Hash
} from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Tamper-Proof Certificates",
    desc: "SHA-256 hashing and blockchain immutability ensure certificates cannot be altered."
  },
  {
    icon: QrCode,
    title: "QR Code Verification",
    desc: "Instant public verification via scannable QR codes."
  },
  {
    icon: Database,
    title: "Decentralized Storage",
    desc: "Certificates stored on IPFS for permanent access."
  },
  {
    icon: Layers,
    title: "Immutable Records",
    desc: "Every transaction is permanently recorded on Ethereum."
  },
  {
    icon: Zap,
    title: "Instant Verification",
    desc: "Verify certificates in seconds using ID or PDF."
  },
  {
    icon: Hash,
    title: "Cryptographic Security",
    desc: "Advanced cryptography protects integrity and authenticity."
  }
];

export default function FeaturesSection() {
  return (
  <section className="relative py-28
                    bg-gradient-to-br
                    from-slate-50 via-blue-50 to-indigo-100
                    text-slate-900 overflow-hidden">

      {/* Glow Background Effects */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px]
                      bg-blue-500/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 -right-40 w-[500px] h-[500px]
                      bg-indigo-500/30 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* SECTION HEADER */}
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold">
            Enterprise-Grade Security
          </h2>

          <p className="mt-4 text-slate-600 text-lg">
            Built with cutting-edge blockchain technology
          </p>
        </div>

        {/* FEATURE GRID */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

          {features.map((f, i) => (
            <div
              key={i}
              className="group relative
                         bg-white backdrop-blur-xl
                         border border-slate-200
                         p-8 rounded-3xl
                         transition-all duration-300
                         hover:-translate-y-3
                         hover:shadow-2xl
                         hover:bg-white/15"
            >

              {/* ICON */}
              <div className="w-14 h-14
                              bg-gradient-to-br from-blue-500 to-indigo-500
                              rounded-2xl flex items-center justify-center
                              mb-6 shadow-lg
                              group-hover:scale-110 transition">

                <f.icon size={26} className="text-white" />
              </div>

              {/* TITLE */}
              <h3 className="font-semibold text-xl">
                {f.title}
              </h3>

              {/* DESCRIPTION */}
              <p className="text-slate-600 mt-3 text-sm leading-relaxed">
                {f.desc}
              </p>

              {/* Glow Hover Effect */}
              <div className="absolute inset-0 rounded-3xl
                              bg-gradient-to-r from-blue-600/0
                              via-indigo-600/0 to-blue-600/0
                              group-hover:from-blue-600/10
                              group-hover:via-indigo-600/10
                              group-hover:to-blue-600/10
                              transition duration-500 pointer-events-none" />

            </div>
          ))}

        </div>
      </div>
    </section>
  );
}