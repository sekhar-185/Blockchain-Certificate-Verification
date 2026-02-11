import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Building2, Mail, Lock, Loader2,ShieldCheck, QrCode, FileSearch } from "lucide-react";


export default function InstituteLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/institute-auth/login",
        { email, password }
      );

      // ✅ SAME STORAGE (unchanged)
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", "INSTITUTE");

      toast.success("Institute logged in successfully");
      navigate("/institute/dashboard");

    } catch {
      toast.error("Invalid institute credentials");
    } finally {
      setLoading(false);
    }
  };
return (
  <div className="min-h-screen flex items-center justify-center
                  bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200
                  px-6">

    {/* CENTER CONTAINER */}
    <div className="w-full max-w-6xl bg-white rounded-md
                    shadow-2xl overflow-hidden flex">

      {/* LEFT IMAGE SECTION */}
      <div className="hidden lg:flex w-5/12 relative">

        <img
          src="/images/correctInsituteLogin.png"
          alt="Institute Blockchain"
          className="w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r
                        from-indigo-900/80 via-indigo-800/50 to-transparent
                        flex flex-col justify-center px-10 text-white">

          <h1 className="text-3xl font-extrabold mb-6">
            Institutional Certificate Control
          </h1>

          <div className="space-y-4 text-sm">

            <div className="flex items-center gap-3">
              <ShieldCheck size={18} />
              <span>Blockchain secured records</span>
            </div>

            <div className="flex items-center gap-3">
              <QrCode size={18} />
              <span>QR based verification</span>
            </div>

            <div className="flex items-center gap-3">
              <FileSearch size={18} />
              <span>Immutable audit trail</span>
            </div>

          </div>
        </div>
      </div>

      {/* RIGHT LOGIN FORM */}
      <div className="w-full lg:w-7/12 flex items-center justify-center p-12">

        <form
          onSubmit={login}
          className="w-full max-w-md"
        >

          {/* HEADER */}
          <div className="flex flex-col items-center mb-8">
            <div
              className="h-14 w-14 rounded-2xl
                         bg-gradient-to-br from-indigo-600 to-blue-600
                         flex items-center justify-center
                         text-white shadow-lg mb-4"
            >
              <Building2 size={28} />
            </div>

            <h2 className="text-2xl font-extrabold text-slate-900">
              Institute Login
            </h2>

            <p className="text-slate-500 text-sm mt-1 text-center">
              Secure access for approved certificate issuers
            </p>
          </div>

          {/* EMAIL */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Institute Email
            </label>
            <div className="relative">
              <Mail
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2
                           text-slate-400"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@college.edu"
                className="w-full pl-12 pr-4 py-3.5
                           rounded-xl border bg-white
                           focus:outline-none focus:ring-2
                           focus:ring-indigo-500 focus:border-indigo-500
                           transition"
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div className="mb-7">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2
                           text-slate-400"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-3.5
                           rounded-xl border bg-white
                           focus:outline-none focus:ring-2
                           focus:ring-indigo-500 focus:border-indigo-500
                           transition"
              />
            </div>
          </div>

          {/* SUBMIT */}
          <button
            disabled={loading}
            className="w-full
                       bg-gradient-to-r from-indigo-600 to-blue-600
                       text-white py-4 rounded-xl
                       font-semibold text-lg
                       flex items-center justify-center gap-3
                       shadow-lg hover:opacity-90 transition
                       disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" />
                Signing in…
              </>
            ) : (
              "Login"
            )}
          </button>

        </form>
      </div>

    </div>
  </div>
);
}
