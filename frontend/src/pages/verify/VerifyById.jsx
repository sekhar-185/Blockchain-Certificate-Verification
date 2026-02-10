import { useEffect, useState } from "react";
import api from "../../api/axios";
import {
  ShieldCheck,
  ShieldX,
  Search,
  ExternalLink,
  FileText,
  Loader2,
  Activity,
  Sun,
  Moon
} from "lucide-react";
import { toast } from "react-toastify";

export default function VerifyById() {
  const [certId, setCertId] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [chainStatus, setChainStatus] = useState(null);
  const [dark, setDark] = useState(false);
  const [checkingHash, setCheckingHash] = useState(false);
  const [hashMatched, setHashMatched] = useState(false);

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
    const i = setInterval(fetchChain, 10000);
    return () => clearInterval(i);
  }, []);

  /* ================= VERIFY ================= */
  const verify = async (e) => {
    e.preventDefault();
    if (!certId) return toast.error("Certificate ID required");

    setResult(null);
    setCheckingHash(false);
    setHashMatched(false);

    try {
      setLoading(true);
      const res = await api.get(`/public/verify/${certId}`);
      setResult(res.data);
    

      // hash animation
     // hash animation driven by backend truth
setCheckingHash(true);

setTimeout(() => {
  setCheckingHash(false);
  setHashMatched(res.data?.hashes?.matched === true);
}, 1200);


      toast.success("Verification completed");
    } catch {
      toast.error("Certificate not found or invalid");
    } finally {
      setLoading(false);
    }
  };

  const isActive = result?.valid && result?.status === "ACTIVE";
  const isRevoked = result?.status === "REVOKED";
  const isInvalid = result && !result.valid && !isRevoked;

  return (
    <div className="max-w-7xl mx-auto py-20 space-y-14">

      {/* ================= HEADER ================= */}
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-extrabold
          text-transparent bg-clip-text
          bg-gradient-to-r from-indigo-600 to-purple-700">
          Certificate Verification
        </h1>
        <p className="text-slate-500">
          Blockchain-secured • Real-time • Tamper-proof
        </p>
      </div>

      {/* ================= GRID ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* ================= VERIFY FORM ================= */}
        <form
          onSubmit={verify}
          className="bg-white/60 backdrop-blur-xl
          border border-white/40
          shadow-2xl rounded-md p-10 space-y-6"
        >
          <div className="relative">
            <Search className="absolute left-4 top-4 text-slate-400" />
            <input
              placeholder="Enter Certificate ID (CERT-XXXX)"
              className="w-full pl-12 pr-4 py-4 rounded-xl border
              focus:ring-2 focus:ring-indigo-500 outline-none"
              value={certId}
              onChange={(e) => setCertId(e.target.value)}
            />
          </div>

          <button
            disabled={loading}
            className="w-full flex items-center justify-center gap-3
            bg-gradient-to-r from-indigo-600 to-purple-600
            text-white py-4 rounded-xl font-semibold"
          >
            {loading && <Loader2 className="animate-spin" />}
            Verify Certificate
          </button>

          {/* STATUS CARD */}
          {result && (
            <div className={`mt-6 rounded-xl p-6 border
              ${isActive && "bg-green-50 border-green-200"}
              ${isRevoked && "bg-yellow-50 border-yellow-300"}
              ${isInvalid && "bg-red-50 border-red-200"}`}
            >
              <div className="flex items-center gap-4">
                {isActive && <ShieldCheck className="text-green-600" size={36} />}
                {isRevoked && <ShieldX className="text-yellow-600" size={36} />}
                {isInvalid && <ShieldX className="text-red-600" size={36} />}

                <div>
                  <h3 className="font-bold text-lg">
                    {isActive && "Certificate Verified"}
                    {isRevoked && "Certificate Revoked"}
                    {isInvalid && "Invalid Certificate"}
                  </h3>
                  <p className="text-sm text-slate-600">{result.message}</p>
                </div>
              </div>
            </div>
          )}
        </form>

        {/* ================= BLOCKCHAIN STATUS ================= */}
        <div className={`
          relative rounded-md p-8 shadow-2xl
          ${dark
            ? "bg-gradient-to-br from-slate-900 to-slate-800 text-white"
            : "bg-white/60 backdrop-blur-xl border border-white/40"}
        `}>
          <button
            onClick={() => setDark(!dark)}
            className="absolute top-2 right-2 p-2 rounded-full bg-white/20"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <div className="flex items-center gap-3 mb-6">
            <Activity className="text-green-400 animate-pulse" />
            <h2 className="text-xl font-bold">Blockchain Status</h2>
            <span className="ml-auto flex items-center gap-2 text-green-400">
              <span className="h-2 w-2 bg-green-400 rounded-full animate-ping" />
              LIVE
            </span>
          </div>

          {!chainStatus ? (
            <div className="space-y-3 animate-pulse">
              <Skeleton /><Skeleton /><Skeleton /><Skeleton />
            </div>
          ) : (
            <div className="grid gap-4 text-sm">
              <Status label="Network" value={chainStatus.network.toUpperCase()} />
              <Status label="Chain ID" value={chainStatus.chainId} />
              <Status label="Block" value={chainStatus.blockNumber.toLocaleString()} />
              <Status label="Gas Price" value={chainStatus.gasPrice} />
              <Status label="Synced" value={chainStatus.synced ? "YES" : "NO"} />
              <Status label="Contract" value={chainStatus.contractAddress.slice(0, 12) + "..."} />
            </div>
          )}
        </div>
      </div>

      {/* ================= DETAILS (ACTIVE + REVOKED) ================= */}
      {(isActive || isRevoked) && (
        <div className="bg-white/60 backdrop-blur-xl
        border border-white/40 shadow-2xl rounded-3xl p-10">
          <h3 className="text-xl font-bold mb-6">Certificate Details</h3>

          <div className="grid grid-cols-2 gap-6 text-sm mb-8">
            <Info label="Student" value={result.student?.name} />
            <Info label="Roll No" value={result.student?.rollNumber} />
            <Info label="Program" value={result.student?.program} />
            <Info label="Department" value={result.student?.department} />
            <Info label="Certificate" value={result.certificate?.title} />
            <Info label="Issued On" value={new Date(result.issuedAt).toLocaleDateString()} />
            {isRevoked && (
              <Info label="Revoked On" value={new Date(result.revokedAt).toLocaleDateString()} />
            )}
          </div>

          <div className="flex gap-4">
            <Action href={result.ipfsURL} icon={FileText} label="View IPFS" gradient="from-indigo-500 to-blue-500" />
            <Action href={`https://sepolia.etherscan.io/tx/${result.blockchain?.txHash}`} icon={ExternalLink} label="Blockchain Tx" gradient="from-orange-500 to-red-500" />
          </div>
        </div>
      )}

      {/* ================= HASH VERIFICATION ================= */}
      {(isActive || isRevoked) && (
        <div className="bg-white/70 backdrop-blur-xl border border-white/40
        shadow-inner rounded-2xl p-6">
          <h4 className="font-bold mb-4">Cryptographic Hash Verification</h4>

         <HashRow
  label="File Hash (Computed)"
  value={result.hashes?.fileHash}
/>

<HashRow
  label="On-Chain Hash (Ethereum)"
  value={result.hashes?.onChainHash}
/>

<div className="mt-6 flex items-center gap-6">

  {/* CIRCULAR HASH MATCH INDICATOR */}
  <div className="relative h-20 w-20">
    <svg className="h-full w-full rotate-[-90deg]">
      <circle
        cx="40"
        cy="40"
        r="32"
        stroke="rgba(0,0,0,0.1)"
        strokeWidth="6"
        fill="none"
      />

      <circle
        cx="40"
        cy="40"
        r="32"
        stroke={hashMatched ? "#22c55e" : "#ef4444"}
        strokeWidth="6"
        fill="none"
        strokeDasharray="201"
        strokeDashoffset={
          checkingHash
            ? 201
            : hashMatched
            ? 0
            : 201
        }
        className="transition-all duration-700 ease-out"
      />
    </svg>

    <div className="absolute inset-0 flex items-center justify-center">
      {checkingHash && <Loader2 className="animate-spin text-indigo-600" />}
      {!checkingHash && hashMatched && (
        <ShieldCheck className="text-green-600" />
      )}
      {!checkingHash && !hashMatched && (
        <ShieldX className="text-red-500" />
      )}
    </div>
  </div>

  {/* TEXT */}
  <div>
    {checkingHash && (
      <p className="text-indigo-600 font-medium">
        Verifying hash integrity…
      </p>
    )}

    {!checkingHash && hashMatched && (
      <p className="text-green-600 font-semibold">
        Hash matched — Certificate integrity confirmed
      </p>
    )}

    {!checkingHash && !hashMatched && (
      <p className="text-red-600 font-semibold">
        Hash mismatch — Certificate may be tampered
      </p>
    )}
  </div>
</div>



          {checkingHash && (
            <div className="flex items-center gap-3 text-indigo-600 mt-4">
              <Loader2 className="animate-spin" /> Matching hashes…
            </div>
          )}

          {hashMatched && (
            <div className="flex items-center gap-2 text-green-600 mt-4 font-semibold">
              <ShieldCheck /> Hash verified — Integrity confirmed
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ================= HELPERS ================= */

function Skeleton() {
  return <div className="h-4 bg-white/20 rounded" />;
}

function Info({ label, value }) {
  return (
    <div>
      <p className="text-slate-500">{label}</p>
      <p className="font-semibold">{value || "-"}</p>
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
      text-white font-semibold shadow-lg bg-gradient-to-br ${gradient}`}
    >
      <Icon size={16} /> {label}
    </a>
  );
}

function HashRow({ label, value }) {
  return (
    <div className="mb-3">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="font-mono text-xs bg-slate-100 p-2 rounded break-all">
        {value}
      </p>
    </div>
  );
}
