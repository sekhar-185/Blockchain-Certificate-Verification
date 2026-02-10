import { useEffect, useState } from "react";
import api from "../../api/axios";
import {
  Upload,
  ShieldCheck,
  ShieldX,
  FileText,
  ExternalLink,
  Loader2,
  Activity,
  Sun,
  Moon
} from "lucide-react";
import { toast } from "react-toastify";

export default function VerifyByFile() {
  const [file, setFile] = useState(null);
  const [certId, setCertId] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const [chainStatus, setChainStatus] = useState(null);
  const [dark, setDark] = useState(false);

  /* ================= LIVE BLOCKCHAIN ================= */
  useEffect(() => {
    const fetchChain = async () => {
      try {
        const res = await api.get("/blockchain/status");
        setChainStatus(res.data);
      } catch {
        setChainStatus(null);
      }
    };

    fetchChain();
    const interval = setInterval(fetchChain, 10000);
    return () => clearInterval(interval);
  }, []);

  /* ================= VERIFY ================= */
  const verify = async (e) => {
    e.preventDefault();
    if (!file || !certId) {
      toast.error("Certificate ID and PDF required");
      return;
    }

    const data = new FormData();
    data.append("certificate", file);

    try {
      setLoading(true);
      const res = await api.post(
        `/public/verify-file/${certId}`,
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setResult(res.data);
      toast.success("Verification completed");
    } catch {
      toast.error("Verification failed");
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-20 space-y-14">

      {/* ================= HEADER ================= */}
      <div className="text-center space-y-3">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text
          bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500">
          Verify Certificate (PDF)
        </h1>
        <p className="text-slate-500">
          Upload original certificate • Blockchain-backed verification
        </p>
      </div>

      {/* ================= GRID ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* ================= FORM ================= */}
        <form
          onSubmit={verify}
          className="bg-white/60 backdrop-blur-xl
          border border-white/40
          shadow-2xl rounded-3xl p-10 space-y-6"
        >
          <input
            placeholder="Certificate ID (CERT-XXXX)"
            className="w-full p-4 rounded-xl border
            focus:ring-2 focus:ring-indigo-500 outline-none"
            value={certId}
            onChange={(e) => setCertId(e.target.value)}
            required
          />

          <div className="border-2 border-dashed rounded-2xl p-10 text-center bg-slate-50">
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setFile(e.target.files[0])}
              className="hidden"
              id="file"
            />
            <label
              htmlFor="file"
              className="cursor-pointer flex flex-col items-center gap-3
              text-slate-600 font-medium"
            >
              <Upload size={34} />
              {file ? file.name : "Upload Certificate PDF"}
            </label>
          </div>

          <button
            disabled={loading}
            className="w-full flex items-center justify-center gap-3
            bg-gradient-to-r from-indigo-600 to-purple-600
            text-white py-4 rounded-xl font-semibold
            hover:opacity-90 transition"
          >
            {loading && <Loader2 className="animate-spin" />}
            Verify Certificate
          </button>
        </form>

        {/* ================= BLOCKCHAIN STATUS ================= */}
        <div className={`
          relative rounded-md p-8 shadow-2xl
          transition-all duration-500
          ${dark
            ? "bg-gradient-to-br from-slate-900 to-slate-800 text-white"
            : "bg-white/60 backdrop-blur-xl border border-white/40"}
        `}>

          {/* TOGGLE */}
          <button
            onClick={() => setDark(!dark)}
            className="absolute top-2 right-2 p-2 rounded-full
            bg-white/20 hover:bg-white/30 transition"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <div className="flex items-center gap-3 mb-6">
            <Activity className="text-green-400 animate-pulse" />
            <h2 className="text-xl font-bold">Blockchain Status</h2>
            <span className="ml-auto flex items-center gap-2 text-green-400 font-medium">
              <span className="h-2 w-2 bg-green-400 rounded-full animate-ping" />
              LIVE
            </span>
          </div>

          {chainStatus ? (
            <div className="grid grid-cols-1 gap-4 text-sm">
              <Status label="Network" value={chainStatus.network.toUpperCase()} />
              <Status label="Chain ID" value={chainStatus.chainId} />
              <Status label="Block" value={chainStatus.blockNumber.toLocaleString()} />
              <Status label="Gas Price" value={chainStatus.gasPrice} />
              <Status label="Synced" value={chainStatus.synced ? "YES" : "NO"} />
              <Status
                label="Contract"
                value={chainStatus.contractAddress.slice(0, 10) + "..."}
              />
            </div>
          ) : (
            <p className="text-red-400">Blockchain offline</p>
          )}
        </div>
      </div>

      {/* ================= RESULT ================= */}
      {result && (
        <div className={`rounded-3xl p-10 shadow-2xl border
          ${result.valid
            ? "bg-green-50 border-green-200"
            : "bg-red-50 border-red-200"}`}>

          <div className="flex items-center gap-4 mb-8">
            {result.valid
              ? <ShieldCheck className="text-green-600" size={42} />
              : <ShieldX className="text-red-600" size={42} />}
            <div>
              <h3 className="text-2xl font-bold">
                {result.valid ? "Certificate Verified" : "Verification Failed"}
              </h3>
              <p className="text-slate-600 mt-1">{result.message}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 text-sm mb-8">
            <Info label="Student Name" value={result.student?.name} />
            <Info label="Roll Number" value={result.student?.rollNumber} />
            <Info label="Program" value={result.student?.program} />
            <Info label="Department" value={result.student?.department} />
            <Info label="Certificate" value={result.certificate?.title} />
            <Info label="Status" value={result.status} />
          </div>

          <div className="flex gap-4">
            {result.ipfsURL && (
              <Action
                href={result.ipfsURL}
                icon={FileText}
                label="View IPFS"
                gradient="from-indigo-500 to-blue-500"
              />
            )}
            {result.blockchainTx && (
              <Action
                href={`https://sepolia.etherscan.io/tx/${result.blockchainTx}`}
                icon={ExternalLink}
                label="Blockchain Tx"
                gradient="from-orange-500 to-red-500"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ================= HELPERS ================= */

function Info({ label, value }) {
  return (
    <div>
      <p className="text-slate-500">{label}</p>
      <p className="font-semibold text-slate-800">{value || "-"}</p>
    </div>
  );
}

function Status({ label, value }) {
  return (
    <div className="flex justify-between border-b border-white/10 pb-2">
      <span className="opacity-70">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}

function Action({ href, icon: Icon, label, gradient }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`flex items-center gap-2 px-6 py-3 rounded-xl
      text-white font-semibold shadow-lg
      bg-gradient-to-br ${gradient}
      hover:scale-105 transition`}
    >
      <Icon size={16} />
      {label}
    </a>
  );
}
