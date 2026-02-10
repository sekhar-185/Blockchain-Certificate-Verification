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
    <section className="py-24 bg-slate-50">
      <h2 className="text-4xl font-bold text-center">How It Works</h2>
      <p className="text-center text-slate-600 mt-3">
        A seamless blockchain-powered verification flow
      </p>

      <div className="mt-16 flex flex-wrap justify-center gap-16">
        {steps.map((s, i) => (
          <div key={i} className="text-center max-w-xs">
            <div className="w-16 h-16 mx-auto bg-primary  rounded-xl flex items-center justify-center">
              <s.icon />
            </div>
            <h4 className="mt-4 font-semibold">{s.title}</h4>
            <p className="text-sm text-slate-600 mt-1">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
