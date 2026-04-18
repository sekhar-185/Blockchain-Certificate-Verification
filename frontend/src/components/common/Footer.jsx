import { Link } from "react-router-dom";
import { ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-6 py-8 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 p-2 text-white">
            <ShieldCheck size={16} />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-800">BlockCert</p>
            <p className="text-xs text-slate-500">
              Blockchain-based certificate verification platform
            </p>
          </div>
        </div>

        <div className="flex items-center gap-5 text-sm text-slate-600">
          <Link to="/" className="hover:text-blue-600 transition">Home</Link>
          <Link to="/verify" className="hover:text-blue-600 transition">Verify</Link>
          <Link to="/student/login" className="hover:text-blue-600 transition">Student</Link>
          <Link to="/institute/login" className="hover:text-blue-600 transition">Institute</Link>
        </div>
      </div>
      <div className="border-t border-slate-100 py-3 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} BlockCert. All rights reserved.
      </div>
    </footer>
  );
}
