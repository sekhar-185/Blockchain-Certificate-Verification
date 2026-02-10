import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Building2,
  Mail,
  Lock,
  Globe,
  Wallet,
  Loader2,
  ArrowRight
} from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

export default function InstituteRegister() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    website: "",
    walletAddress: ""
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const nextStep = () => {
    if (!form.name || !form.email || !form.password) {
      toast.error("Please fill all required fields");
      return;
    }
    setStep(2);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.walletAddress) {
      toast.error("Wallet address is required");
      return;
    }

    try {
      setLoading(true);
      await axios.post(
        "http://localhost:5000/api/institutes/register",
        form
      );
      toast.success("Institute registered. Waiting for admin approval.");
      navigate("/institute/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center
                    bg-gradient-to-br from-slate-50 to-slate-100 px-4">

      <div className="w-full max-w-3xl
                      bg-white/70 backdrop-blur-xl
                      border border-white/50
                      rounded-md p-10 shadow-2xl">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600
                            p-4 rounded-2xl shadow-lg">
              <Building2 className="text-white" size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">
                Institute Registration
              </h2>
              <p className="text-slate-500 text-sm">
                Secure blockchain onboarding
              </p>
            </div>
          </div>

          {/* STEP INDICATOR */}
          <div className="text-sm font-semibold text-slate-500">
            Step {step} of 2
          </div>
        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Field
              label="Institute Name"
              icon={Building2}
              name="name"
              placeholder="JNTUH College of Engineering"
              value={form.name}
              onChange={handleChange}
              required
            />

            <Field
              label="Institute Email"
              icon={Mail}
              name="email"
              type="email"
              placeholder="admin@college.edu"
              value={form.email}
              onChange={handleChange}
              required
            />

            <div className="md:col-span-2">
              <Field
                label="Password"
                icon={Lock}
                name="password"
                type="password"
                placeholder="Create a strong password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="md:col-span-2 flex justify-end mt-4">
              <button
                type="button"
                onClick={nextStep}
                className="inline-flex items-center gap-2
                           bg-gradient-to-r from-blue-600 to-indigo-600
                           text-white px-8 py-3 rounded-xl
                           font-semibold shadow-lg hover:opacity-90 transition"
              >
                Next
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <Field
              label="Website (optional)"
              icon={Globe}
              name="website"
              placeholder="https://college.edu"
              value={form.website}
              onChange={handleChange}
            />

            <Field
              label="Ethereum Wallet Address"
              icon={Wallet}
              name="walletAddress"
              placeholder="0x..."
              value={form.walletAddress}
              onChange={handleChange}
              required
            />

            <div className="md:col-span-2 flex justify-between items-center mt-6">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-slate-500 font-semibold hover:text-slate-800"
              >
                ← Back
              </button>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2
                           bg-gradient-to-r from-blue-600 to-indigo-600
                           text-white px-10 py-3 rounded-xl
                           font-semibold shadow-lg
                           disabled:opacity-60 transition"
              >
                {loading && <Loader2 className="animate-spin" size={18} />}
                {loading ? "Registering..." : "Register Institute"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

/* ================= FIELD ================= */
function Field({ label, icon: Icon, ...props }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-2">
        {label}
      </label>
      <div className="relative">
        <Icon
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2
                     text-slate-400"
        />
        <input
          {...props}
          className="w-full pl-12 pr-4 py-3.5
                     rounded-xl border bg-white
                     focus:outline-none focus:ring-2
                     focus:ring-blue-500 focus:border-blue-500
                     transition"
        />
      </div>
    </div>
  );
}
