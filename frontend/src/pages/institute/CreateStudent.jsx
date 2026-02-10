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
    <div className="max-w-4xl">

      <form
        onSubmit={submit}
        className="relative bg-white/70 backdrop-blur-xl
                   border border-white/50
                   rounded-md p-10 shadow-2xl"
      >
        {/* HEADER */}
        <div className="flex items-center gap-4 mb-8">
          <div className="h-12 w-12 rounded-2xl
                          bg-gradient-to-br from-blue-600 to-indigo-600
                          flex items-center justify-center
                          text-white shadow-lg">
            <UserPlus />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900">
              Create Student
            </h2>
            <p className="text-slate-500 text-sm">
              Add a student to your institution
            </p>
          </div>
        </div>

        {/* FORM GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

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
          className="mt-10 w-full
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
      <label className="block text-sm font-semibold text-slate-700 mb-2">
        {label}
      </label>
      <input
        type={type}
        {...props}
        required
        className="w-full px-4 py-3.5
                   rounded-xl border
                   bg-white
                   focus:outline-none focus:ring-2
                   focus:ring-blue-500 focus:border-blue-500
                   transition"
      />
    </div>
  );
}
