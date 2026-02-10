import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { ShieldCheck, Mail, Lock, Loader2 } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/admin/login",
        { email, password }
      );

      // ✅ SAME STORAGE (unchanged)
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", "ADMIN");

      toast.success("Admin logged in successfully");
      navigate("/admin/dashboard");

    } catch (err) {
      toast.error("Invalid admin credentials");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4
                 bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300"
    >
      <form
        onSubmit={login}
        className="w-full max-w-md
                   bg-white/70 backdrop-blur-xl
                   border border-white/50
                   rounded-md p-10 shadow-2xl"
      >
        {/* HEADER */}
        <div className="flex flex-col items-center mb-8">
          <div
            className="h-14 w-14 rounded-2xl
                       bg-gradient-to-br from-emerald-600 to-teal-600
                       flex items-center justify-center
                       text-white shadow-lg mb-4"
          >
            <ShieldCheck size={28} />
          </div>

          <h2 className="text-2xl font-extrabold text-slate-900">
            Admin Login
          </h2>
          <p className="text-slate-500 text-sm mt-1 text-center">
            Secure administrative access
          </p>
        </div>

        {/* EMAIL */}
        <div className="mb-5">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Admin Email
          </label>
          <div className="relative">
            <Mail
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2
                         text-slate-400"
            />
            <input
              type="email"
              placeholder="admin@blockcert.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-12 pr-4 py-3.5
                         rounded-xl border bg-white
                         focus:outline-none focus:ring-2
                         focus:ring-emerald-500 focus:border-emerald-500
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
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-12 pr-4 py-3.5
                         rounded-xl border bg-white
                         focus:outline-none focus:ring-2
                         focus:ring-emerald-500 focus:border-emerald-500
                         transition"
            />
          </div>
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={loading}
          className="w-full
                     bg-gradient-to-r from-emerald-600 to-teal-600
                     text-white py-4 rounded-xl
                     font-semibold text-lg
                     flex items-center justify-center gap-3
                     shadow-lg hover:opacity-90 transition
                     disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" />
              Authenticating…
            </>
          ) : (
            "Login"
          )}
        </button>
      </form>
    </div>
  );
}
