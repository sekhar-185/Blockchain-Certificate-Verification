import { useEffect, useState } from "react";
import api from "../../api/axios";
import {
  Download,
  ExternalLink,
  GraduationCap,
  Mail,
  IdCard,
  Building2,
  FileBadge,
  MessageCircle
} from "lucide-react";
import { toast } from "react-toastify";
import { QrCode, X, Copy } from "lucide-react";


export default function StudentDashboard() {
  const [student, setStudent] = useState(null);
  const [certificates, setCertificates] = useState([]);
  const [qrData, setQrData] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const stored = JSON.parse(localStorage.getItem("student"));
        setStudent(stored);

        const res = await api.get("/student/certificates");
        setCertificates(res.data.certificates);
        console.log(res.data.certificates);
      } catch {
        toast.error("Failed to load student data");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="mx-auto w-full max-w-7xl space-y-8">

      {/* ================= PREMIUM STUDENT PROFILE ================= */}
      {student && (
        <div
          className="relative overflow-hidden rounded-3xl border border-slate-200
                     bg-white p-8 shadow-[0_18px_40px_rgba(15,23,42,0.08)] lg:p-10"
        >

          {/* Gradient background */}
          <div
            className="absolute inset-0 bg-gradient-to-br
                       from-blue-50 via-indigo-50 to-violet-50"
          />

          {/* Content */}
          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">

            {/* Avatar */}
            <div className="h-24 w-24 rounded-3xl
                            bg-gradient-to-br from-blue-600 to-indigo-600
                            flex items-center justify-center
                            text-white text-4xl font-extrabold shadow-lg">
              {student.name?.[0]?.toUpperCase()}
            </div>

            {/* Details */}
            <div className="w-full space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                  {student.name}
                </h1>
                <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  STUDENT PROFILE
                </span>
              </div>

              <p className="text-sm text-slate-500">
                Your verified profile metadata used for certificate issuance and validation.
              </p>

              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-2xl border border-slate-200 bg-white/80 p-4">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Roll Number</p>
                  <p className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                    <IdCard size={16} className="text-indigo-600" />
                    {student.rollNumber}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white/80 p-4">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Email</p>
                  <p className="flex items-center gap-2 text-sm font-semibold text-slate-800 break-all">
                    <Mail size={16} className="text-indigo-600" />
                    {student.email}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white/80 p-4">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Program</p>
                  <p className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                    <GraduationCap size={16} className="text-indigo-600" />
                    B.Tech
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white/80 p-4">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Institute</p>
                  <p className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                    <Building2 size={16} className="text-indigo-600" />
                    Your Institution
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= CERTIFICATES ================= */}
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_18px_40px_rgba(15,23,42,0.08)]">

        {/* Header */}
        <div className="border-b border-slate-200 bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-900 p-6 md:p-8">
          <h2 className="flex items-center gap-3 text-2xl font-bold text-white">
            <FileBadge className="text-indigo-300" />
            My Certificates
            <span className="rounded-full bg-white/15 px-3 py-1 text-sm font-medium text-slate-100">
              ({certificates.length})
            </span>
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            Review issued certificates, access blockchain proof, and share QR verification links.
          </p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] text-left">
          <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-600">
            <tr>
              <th className="px-8 py-4">Certificate</th>
              <th className="px-8 py-4">Status</th>
              <th className="px-8 py-4">Issued</th>
              <th className="px-8 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {certificates.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  className="px-8 py-14 text-center text-slate-400"
                >
                  No certificates issued yet
                </td>
              </tr>
            ) : (
              certificates.map((c) => (
                <tr
                  key={c._id}
                  className="border-t border-slate-100 transition hover:bg-indigo-50/30"
                >
                  {/* TITLE */}
                  <td className="px-8 py-6">
                    <div className="font-semibold text-slate-900">
                      {c.title}
                    </div>
                   <div className="mt-1 flex items-center gap-2">
                    <span className="rounded-md bg-slate-100 px-2 py-1 font-mono text-xs text-slate-600">
                      {c.certId}
                    </span>

                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(c.certId);
                        toast.success("Certificate ID copied");
                      }}
                      className="rounded-md p-1 text-slate-500 transition hover:bg-slate-100"
                      title="Copy Certificate ID"
                    >
                      <Copy size={14} />
                    </button>
                  </div>
                  </td>

                  {/* STATUS */}
                  <td className="px-8 py-6">
                    <span className="inline-flex px-4 py-1 rounded-full
                                     text-xs font-semibold
                                     bg-green-100 text-green-700">
                      {c.status}
                    </span>
                  </td>

                  {/* DATE */}
                  <td className="px-8 py-6 text-sm font-medium text-slate-600">
                    {new Date(c.issuedAt).toLocaleDateString()}
                  </td>

                  {/* ACTIONS */}
                  <td className="px-8 py-6">
                    <div className="flex justify-center gap-3">
                      <a
                        href={c.ipfsURL}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2
                                   px-5 py-2 rounded-xl
                                   border border-slate-200 shadow-sm
                                   text-slate-700 font-semibold
                                   hover:bg-slate-50 transition"
                      >
                        <Download size={16} />
                        Download
                      </a>

                      <a
                        href={`https://sepolia.etherscan.io/tx/${c.blockchainTx}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2
                                   px-5 py-2 rounded-xl
                                   border border-blue-200 shadow-sm
                                   text-blue-600 font-semibold
                                   hover:bg-blue-50 transition"
                      >
                        <ExternalLink size={16} />
                        Blockchain
                      </a>
                      <button
                        onClick={() => setQrData(c)}
                        className="inline-flex items-center gap-2
                                   rounded-xl border border-indigo-200 px-5 py-2
                                   font-semibold text-indigo-600 shadow-sm
                                   transition hover:bg-indigo-50"
                      >
                        <QrCode size={16} />
                        QR
                      </button>

                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        </div>

        {qrData && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4 backdrop-blur-sm">

    <div className="relative w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl">

      {/* Close */}
      <button
        onClick={() => setQrData(null)}
        className="absolute top-4 right-4 text-slate-400 hover:text-slate-700"
      >
        <X />
      </button>

      <h3 className="mb-2 text-center text-xl font-bold text-slate-900">
        Scan to Verify Certificate
      </h3>
      <p className="mb-5 text-center text-sm text-slate-500">
        Scan or share this secure verification link.
      </p>

      {/* QR */}
      <div className="flex justify-center mb-6">
        <img
          src={qrData.qrCode}
          alt="QR Code"
          className="h-52 w-52 rounded-xl shadow"
        />
      </div>

      {/* Verify URL */}
      <div className="rounded-xl bg-slate-50 p-4 text-sm break-all text-slate-600">
        {qrData.verifyURL}
      </div>

      <button
        onClick={() => {
          navigator.clipboard.writeText(qrData.verifyURL);
          toast.success("Verify link copied");
        }}
        className="mt-4 w-full flex items-center justify-center gap-2
                   bg-indigo-600 text-white py-3 rounded-xl font-semibold
                   hover:bg-indigo-700 transition"
      >
        <Copy size={16} />
        Copy Verify Link
      </button>

      <div className="mt-3 grid grid-cols-2 gap-3">
        <a
          href={qrData.qrCode}
          download={`${qrData.certId || "certificate"}-qr.png`}
          className="w-full flex items-center justify-center gap-2
                     bg-slate-100 text-slate-700 py-3 rounded-xl font-semibold
                     hover:bg-slate-200 transition"
        >
          <Download size={16} />
          Download QR
        </a>

        <a
          href={`https://wa.me/?text=${encodeURIComponent(
            `Certificate Verification Link (${qrData.certId})\n${qrData.verifyURL}`
          )}`}
          target="_blank"
          rel="noreferrer"
          className="w-full flex items-center justify-center gap-2
                     bg-emerald-600 text-white py-3 rounded-xl font-semibold
                     hover:bg-emerald-700 transition"
        >
          <MessageCircle size={16} />
          WhatsApp Share
        </a>
      </div>
    </div>
  </div>
)}

      </div>
    </div>

    
  );
}
