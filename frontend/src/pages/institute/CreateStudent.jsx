import { useState } from "react";
import api from "../../api/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Loader2, UserPlus } from "lucide-react";

export default function CreateStudent() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    studentId: "",
    program: "",
    department: "",
    admissionYear: ""
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await api.post("/students/create", form);
      toast.success("Student created successfully");
      navigate("/institute/students");
    } catch {
      toast.error("Failed to create student");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-4xl">

      <form
        onSubmit={submit}
        className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white
                   shadow-[0_24px_60px_rgba(15,23,42,0.12)]"
      >
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-50 via-white to-cyan-50" />

        {/* HEADER */}
        <div className="border-b border-slate-200 bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-900 px-8 py-7 md:px-10">
          <span className="mb-3 inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-100">
            Student Onboarding
          </span>
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl
                          bg-gradient-to-br from-blue-600 to-indigo-600
                          flex items-center justify-center
                          text-white shadow-lg shadow-blue-500/30">
              <UserPlus />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-white md:text-3xl">
                Create Student
              </h2>
              <p className="text-sm text-slate-300">
                Register a student profile for certificate issuance and verification
              </p>
            </div>
          </div>
        </div>

        {/* FORM GRID */}
        <div className="grid grid-cols-1 gap-6 px-8 py-8 md:grid-cols-2 md:px-10 md:py-10">

          <Field
            label="Student Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <Field
            label="Email Address"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <Field
            label="Password"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <Field
            label="Roll Number"
            value={form.studentId}
            onChange={(e) => setForm({ ...form, studentId: e.target.value })}
          />

          <Field
            label="Program"
            placeholder="B.Tech"
            value={form.program}
            onChange={(e) => setForm({ ...form, program: e.target.value })}
          />

          <Field
            label="Department"
            placeholder="CSE"
            value={form.department}
            onChange={(e) => setForm({ ...form, department: e.target.value })}
          />

          {/* FULL WIDTH */}
          <div className="md:col-span-2">
            <Field
              label="Admission Year"
              placeholder="2022"
              value={form.admissionYear}
              onChange={(e) =>
                setForm({ ...form, admissionYear: e.target.value })
              }
            />
          </div>
        </div>

        {/* SUBMIT */}
        <button
          disabled={loading}
          className="md:col-span-2 mt-2 w-full
                     bg-gradient-to-r from-blue-600 to-indigo-600
                     text-white py-3.5 rounded-xl
                     font-semibold text-lg
                     flex items-center justify-center gap-3
                     shadow-lg shadow-blue-500/25 hover:from-blue-700 hover:to-indigo-700 transition
                     disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" />
              Creating Student...
            </>
          ) : (
            "Create Student"
          )}
        </button>
      </form>
    </div>
  );
}

/* ================= FIELD ================= */

function Field({ label, type = "text", ...props }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </label>
      <input
        type={type}
        {...props}
        required
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5
                   text-slate-800 placeholder:text-slate-400
                   shadow-sm
                   focus:outline-none focus:ring-2 focus:ring-indigo-100
                   focus:border-indigo-400
                   transition"
      />
    </div>
  );
}
