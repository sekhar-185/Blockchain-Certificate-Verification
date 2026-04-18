import { useState } from "react";
import api from "../../api/axios";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import FormInput from "../../components/ui/FormInput";


export default function IssueCertificate() {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  const [form, setForm] = useState({
    studentId: "",
    type: "DIGITAL",
    title: "",
    certificateCategory: ""
  });

  const submit = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.error("Upload certificate PDF");
      return;
    }

    const data = new FormData();
    data.append("certificate", file);
    data.append("studentId", form.studentId);
    data.append("type", form.type);
    data.append("title", form.title);
    data.append("certificateCategory", form.certificateCategory);

    try {
      setLoading(true);
      await api.post("/certificates/issue", data);
      toast.success("Certificate issued successfully");
    } catch {
      toast.error("Certificate issuance failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={submit}
      className="relative mx-auto w-full max-w-3xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.12)]"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-50 via-white to-cyan-50" />

      <div className="border-b border-slate-200 bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-900 px-8 py-7 md:px-10">
        <p className="mb-2 inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-100">
          Blockchain Issuance
        </p>
        <h2 className="text-2xl font-bold text-white md:text-3xl">
          Issue New Certificate
        </h2>
        <p className="mt-2 text-sm text-slate-300 md:text-base">
          Create, notarize, and publish a tamper-proof certificate record.
        </p>
      </div>

      <div className="space-y-7 px-8 py-8 md:px-10 md:py-10">
        <FormInput
          label="Student Roll Number"
          placeholder="22XW1A0551"
          value={form.studentId}
          onChange={(e) =>
            setForm({ ...form, studentId: e.target.value })
          }
          required
        />

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-slate-700">
              Certificate Category
            </label>
            <select
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 shadow-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              value={form.certificateCategory}
              onChange={(e) =>
                setForm({ ...form, certificateCategory: e.target.value })
              }
              required
            >
              <option value="">Select category</option>
              <option value="DEGREE">Degree</option>
              <option value="MARKSHEET">Marksheet</option>
              <option value="BONAFIDE">Bonafide</option>
              <option value="COURSE">COURSE</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">
              Certificate Type
            </label>
            <select
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-600 shadow-sm outline-none"
              value={form.type}
              disabled
            >
              <option>DIGITAL</option>
            </select>
          </div>
        </div>

        <FormInput
          label="Certificate Title"
          placeholder="B.Tech Certificate"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
          required
        />

        <div>
          <label className="text-sm font-medium text-slate-700">
            Upload Certificate PDF
          </label>
          <div className="mt-2 rounded-2xl border border-dashed border-slate-300 bg-slate-50/70 p-4">
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full cursor-pointer text-sm text-slate-600 file:mr-4 file:rounded-lg file:border-0 file:bg-indigo-600 file:px-4 file:py-2 file:font-semibold file:text-white hover:file:bg-indigo-700"
              required
            />
          </div>
        </div>

        <button
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3.5 font-semibold text-white shadow-lg shadow-blue-500/25 transition hover:from-blue-700 hover:to-indigo-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading && <Loader2 className="animate-spin" size={18} />}
          {loading ? "Issuing on Blockchain..." : "Issue Certificate"}
        </button>
      </div>
    </form>
  );
}
