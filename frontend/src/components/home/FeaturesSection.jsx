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
    <section className="py-24 bg-white">
      <h2 className="text-4xl font-bold text-center">
        Enterprise-Grade Security
      </h2>
      <p className="text-center text-slate-600 mt-3">
        Built with cutting-edge blockchain technology
      </p>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10 px-10">
        {features.map((f, i) => (
          <div
            key={i}
            className="bg-white p-8 rounded-2xl shadow hover:shadow-xl transition"
          >
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
              <f.icon className="text-primary" />
            </div>
            <h3 className="font-semibold text-lg">{f.title}</h3>
            <p className="text-slate-600 mt-2 text-sm">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
