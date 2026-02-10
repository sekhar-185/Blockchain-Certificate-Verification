import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { GraduationCap, IdCard, Lock, Loader2 } from "lucide-react";

export default function StudentLogin() {
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/student-auth/login",
        { studentId, password }
      );

      // ✅ STORE TOKEN, ROLE & STUDENT PROFILE
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", "STUDENT");
      localStorage.setItem("student", JSON.stringify(res.data.student));

      toast.success("Student logged in successfully");
      navigate("/student/dashboard");

    } catch {
      toast.error("Invalid student credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center
                    bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 px-4">

      <form
        onSubmit={login}
        className="w-full max-w-md
                   bg-white/70 backdrop-blur-xl
                   border border-white/50
                   rounded-md p-10 shadow-2xl"
      >

        {/* HEADER */}
        <div className="flex flex-col items-center mb-8">
          <div className="h-14 w-14 rounded-2xl
                          bg-gradient-to-br from-blue-600 to-indigo-600
                          flex items-center justify-center
                          text-white shadow-lg mb-4">
            <GraduationCap size={28} />
          </div>

          <h2 className="text-2xl font-extrabold text-slate-900">
            Student Login
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            Access your blockchain-verified certificates
          </p>
        </div>

        {/* STUDENT ID */}
        <div className="mb-5">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Student ID
          </label>
          <div className="relative">
            <IdCard
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2
                         text-slate-400"
            />
            <input
              type="text"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              required
              placeholder="22XW1A0551"
              className="w-full pl-12 pr-4 py-3.5
                         rounded-xl border
                         bg-white
                         focus:outline-none focus:ring-2
                         focus:ring-blue-500 focus:border-blue-500
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
                         rounded-xl border
                         bg-white
                         focus:outline-none focus:ring-2
                         focus:ring-blue-500 focus:border-blue-500
                         transition"
            />
          </div>
        </div>

        {/* SUBMIT */}
        <button
          disabled={loading}
          className="w-full
                     bg-gradient-to-r from-blue-600 to-indigo-600
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
  );
}
