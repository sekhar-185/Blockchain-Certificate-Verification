import { useState } from "react";
import api from "../../api/axios";
import {
  ShieldCheck,
  ShieldX,
  Upload,
  Search,
  Loader2,
  FileText,
  ExternalLink
} from "lucide-react";
import { toast } from "react-toastify";

export default function VerifyHub() {
  const [mode, setMode] = useState("ID"); // ID | FILE
  const [certId, setCertId] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const verify = async (e) => {
    e.preventDefault();

    if (mode === "ID" && !certId) {
      toast.error("Certificate ID required");
      return;
    }

    if (mode === "FILE" && (!certId || !file)) {
      toast.error("Certificate ID & PDF required");
      return;
    }

    try {
      setLoading(true);
      setResult(null);

      let res;
      if (mode === "ID") {
        res = await api.get(`/public/verify/${certId}`);
      } else {
        const data = new FormData();
        data.append("certificate", file);

        res = await api.post(
          `/public/verify-file/${certId}`,
          data,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      }

      setResult(res.data);
      toast.success("Verification completed");
    } catch {
      toast.error("Verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-20 space-y-14">

      {/* HEADER */}
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-slate-900">
          Certificate Verification
        </h1>
        <p className="text-slate-500 mt-3">
          Verify academic credentials using blockchain
        </p>
      </div>

      {/* MODE SWITCH */}
      <div className="flex justify-center gap-4">
        {["ID", "FILE"].map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-6 py-3 rounded-xl font-semibold transition
              ${mode === m
                ? "bg-indigo-600 text-white shadow"
                : "bg-white border hover:bg-slate-100"}`}
          >
            {m === "ID" ? "Verify by ID / QR" : "Verify by File"}
          </button>
        ))}
      </div>

      {/* FORM */}
      <form
        onSubmit={verify}
        className="bg-white/60 backdrop-blur-xl
                   rounded-[36px] p-12 shadow-2xl border space-y-8"
      >
        {/* CERT ID */}
        <div className="relative">
          <Search className="absolute left-4 top-4 text-slate-400" />
          <input
            placeholder="Certificate ID (CERT-XXXX)"
            className="w-full pl-12 pr-4 py-4 rounded-xl border
                       focus:ring-2 focus:ring-indigo-500"
            value={certId}
            onChange={(e) => setCertId(e.target.value)}
          />
        </div>

        {/* FILE UPLOAD */}
        {mode === "FILE" && (
          <div className="border-2 border-dashed rounded-2xl p-8 text-center">
            <input
              type="file"
              accept="application/pdf"
              hidden
              id="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label
              htmlFor="file"
              className="cursor-pointer flex flex-col items-center gap-3 text-slate-600"
            >
              <Upload size={30} />
              {file ? file.name : "Upload Certificate PDF"}
            </label>
          </div>
        )}

        {/* SUBMIT */}
        <button
          disabled={loading}
          className="w-full flex items-center justify-center
                     bg-gradient-to-r from-indigo-600 to-purple-600
                     text-white py-4 rounded-xl font-semibold
                     hover:opacity-90 transition"
        >
          {loading ? <Loader2 className="animate-spin" /> : "Verify Certificate"}
        </button>
      </form>

      {/* RESULT */}
      {result && (
        <div
          className={`rounded-[36px] p-12 shadow-2xl border
          ${result.valid
            ? "bg-green-50 border-green-200"
            : "bg-red-50 border-red-200"}`}
        >
          {/* STATUS */}
          <div className="flex items-center gap-5 mb-10">
            {result.valid ? (
              <ShieldCheck className="text-green-600" size={44} />
            ) : (
              <ShieldX className="text-red-600" size={44} />
            )}

            <div>
              <h3
                className={`text-2xl font-bold
                ${result.valid ? "text-green-700" : "text-red-700"}`}
              >
                {result.valid ? "Certificate Verified" : "Verification Failed"}
              </h3>
              <p className="text-slate-600 mt-1">{result.message}</p>
            </div>
          </div>

          {/* DETAILS */}
          {result.valid && (
            <>
              <div className="grid grid-cols-2 gap-6 text-sm mb-10">
                <Info label="Student Name" value={result.student?.name} />
                <Info label="Roll Number" value={result.student?.rollNumber} />
                <Info label="Program" value={result.student?.program} />
                <Info label="Department" value={result.student?.department} />
                <Info label="Certificate Title" value={result.certificate?.title} />
                <Info label="Status" value={result.certificate?.status} />
              </div>

              {/* LINKS */}
              <div className="flex flex-wrap gap-4">
                <a
                  href={result.ipfsURL}
                  target="_blank"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl
                             border bg-white hover:bg-slate-100 transition"
                >
                  <FileText size={16} /> View IPFS
                </a>

                <a
                  href={`https://sepolia.etherscan.io/tx/${result.blockchainTx}`}
                  target="_blank"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl
                             border bg-white hover:bg-slate-100 transition"
                >
                  <ExternalLink size={16} /> Blockchain
                </a>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <p className="text-slate-500">{label}</p>
      <p className="font-semibold text-slate-800">{value || "-"}</p>
    </div>
  );
}
