import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/axios";
import { ShieldCheck, XCircle, GraduationCap, Building2, FileText, Hash, ExternalLink, MessageCircle } from "lucide-react";

export default function VerifyPublic() {
  const { certId } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get(`/public/verify/${certId}`)
      .then(res => setData(res.data))
      .catch(() => setData({ error: true }));
  }, [certId]);

  if (!data) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-4">
        <div className="w-full max-w-xl rounded-2xl border border-slate-800 bg-slate-900/70 backdrop-blur p-8 text-center shadow-2xl">
          <p className="text-lg font-semibold tracking-wide">Verifying certificate...</p>
          <p className="mt-2 text-slate-400">Please wait while we validate blockchain and IPFS data.</p>
        </div>
      </div>
    );
  }

  if (data.error) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-4">
        <div className="w-full max-w-xl rounded-2xl border border-red-900/50 bg-slate-900 p-8 shadow-2xl">
          <div className="flex items-center gap-3 text-red-400">
            <XCircle className="h-8 w-8" />
            <h1 className="text-2xl font-bold">Invalid Certificate</h1>
          </div>
          <p className="mt-3 text-slate-300">
            We could not verify this certificate. Please check the QR URL or certificate ID and try again.
          </p>
        </div>
      </div>
    );
  }

  const isActive = data.status === "ACTIVE";
  const issueDate = data.issuedAt ? new Date(data.issuedAt).toLocaleString() : "N/A";
  const verifyPageUrl = window.location.href;
  const shareMessage = `Certificate verification (${data.certId || certId}) - ${isActive ? "Valid" : "Invalid"}\n${verifyPageUrl}`;
  const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(shareMessage)}`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100 px-4 py-10">
      <div className="mx-auto w-full max-w-3xl rounded-3xl border border-slate-800 bg-slate-900/80 p-7 md:p-10 shadow-[0_24px_80px_rgba(15,23,42,0.65)] backdrop-blur">
        <div className="flex items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="flex items-center gap-3">
            {isActive ? (
              <ShieldCheck className="h-8 w-8 text-emerald-400" />
            ) : (
              <XCircle className="h-8 w-8 text-red-400" />
            )}
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Verification Result</p>
              <h1 className="text-2xl font-bold">
                Certificate {isActive ? "Valid" : "Invalid"}
              </h1>
            </div>
          </div>
          <span
            className={`rounded-full border px-4 py-1 text-sm font-semibold ${
              isActive
                ? "border-emerald-600/40 bg-emerald-500/10 text-emerald-300"
                : "border-red-600/40 bg-red-500/10 text-red-300"
            }`}
          >
            {data.status}
          </span>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
            <p className="mb-3 text-xs uppercase tracking-wider text-slate-400">Student</p>
            <p className="flex items-center gap-2 text-slate-100"><GraduationCap className="h-4 w-4 text-indigo-300" />{data.student?.name || "N/A"}</p>
            <p className="mt-1 text-slate-300">Roll: {data.student?.rollNumber || "N/A"}</p>
            <p className="mt-1 text-slate-300">{data.student?.program || "N/A"} - {data.student?.department || "N/A"}</p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
            <p className="mb-3 text-xs uppercase tracking-wider text-slate-400">Institute</p>
            <p className="flex items-center gap-2 text-slate-100"><Building2 className="h-4 w-4 text-indigo-300" />{data.institute?.name || "N/A"}</p>
            <p className="mt-2 text-slate-300">Issued: {issueDate}</p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
            <p className="mb-3 text-xs uppercase tracking-wider text-slate-400">Certificate</p>
            <p className="flex items-center gap-2 text-slate-100"><FileText className="h-4 w-4 text-indigo-300" />{data.certificate?.title || "Untitled"}</p>
            <p className="mt-1 text-slate-300">Type: {data.certificate?.type || "N/A"}</p>
            <p className="mt-1 text-slate-300">Category: {data.certificate?.category || "N/A"}</p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
            <p className="mb-3 text-xs uppercase tracking-wider text-slate-400">Integrity</p>
            <p className="flex items-center gap-2 text-slate-100"><Hash className="h-4 w-4 text-indigo-300" />Hash Match: {data.hashes?.matched ? "Yes" : "No"}</p>
            <p className="mt-1 text-slate-300 break-all">Cert ID: {data.certId || certId}</p>
          </div>
        </div>

        <div className="mt-7 grid gap-3 md:grid-cols-2">
          <a
            href={data.ipfsURL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-500"
          >
            <ExternalLink className="h-4 w-4" />
            View Certificate
          </a>

          <a
            href={whatsappShareUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-500/50 bg-emerald-500/10 px-5 py-3 font-semibold text-emerald-300 transition hover:bg-emerald-500/20"
          >
            <MessageCircle className="h-4 w-4" />
            Share on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
