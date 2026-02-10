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
      className="bg-white p-10 rounded-2xl shadow max-w-2xl"
    >
      <h2 className="text-2xl font-bold mb-2">
        Issue New Certificate
      </h2>
      <p className="text-slate-500 mb-8">
        Create and store a certificate on the blockchain
      </p>

      <div className="space-y-6">

        <FormInput
          label="Student Roll Number"
          placeholder="22XW1A0551"
          value={form.studentId}
          onChange={(e) =>
            setForm({ ...form, studentId: e.target.value })
          }
          required
        />

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium text-slate-600">
              Certificate Category
            </label>
            <select
              className="w-full mt-1 border rounded-lg px-4 py-3"
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
            <label className="text-sm font-medium text-slate-600">
              Certificate Type
            </label>
            <select
              className="w-full mt-1 border rounded-lg px-4 py-3"
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
          <label className="text-sm font-medium text-slate-600">
            Upload Certificate PDF
          </label>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files[0])}
            className="mt-2"
            required
          />
        </div>

        <button
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-xl
          font-semibold flex justify-center items-center gap-2"
        >
          {loading && <Loader2 className="animate-spin" size={18} />}
          {loading ? "Issuing on Blockchain..." : "Issue Certificate"}
        </button>

      </div>
    </form>
  );
}
