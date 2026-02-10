import { useEffect, useState } from "react";
import api from "../../api/axios";
import {
  Download,
  ExternalLink,
  GraduationCap,
  Mail,
  IdCard,
  Building2,
  FileBadge
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
    <div className="space-y-12">

      {/* ================= PREMIUM STUDENT PROFILE ================= */}
      {student && (
        <div className="relative overflow-hidden rounded-md p-10 shadow-2xl
                        bg-white/40 backdrop-blur-2xl border border-white/40">

          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br
                          from-blue-600/20 via-indigo-600/20 to-purple-600/20" />

          {/* Content */}
          <div className="relative flex items-start gap-10">

            {/* Avatar */}
            <div className="h-28 w-28 rounded-3xl
                            bg-gradient-to-br from-blue-600 to-indigo-600
                            flex items-center justify-center
                            text-white text-5xl font-extrabold shadow-xl">
              {student.name?.[0]?.toUpperCase()}
            </div>

            {/* Details */}
            <div className="space-y-3">
              <h1 className="text-3xl font-bold text-slate-900">
                {student.name}
              </h1>

              <div className="flex flex-wrap flex-col gap-6 text-slate-700 font-medium">
                <span className="flex items-center gap-2 inline-block">
                  <IdCard size={18} />
                  {student.rollNumber}
                </span>

                <span className="flex items-center gap-2 inline-block">
                  <Mail size={18} />
                  {student.email}
                </span>

                {/* OPTIONAL (if backend later sends these) */}
                <span className="flex items-center gap-2 inline-block">
                  <GraduationCap size={18} />
                  B.Tech
                </span>

                <span className="flex items-center gap-2">
                  <Building2 size={18} />
                  Your Institution
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= CERTIFICATES ================= */}
      <div className="bg-white rounded-md shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="p-8 border-b bg-gradient-to-r from-red-500 to-orange-500">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <FileBadge className="text-blue-600" />
            My Certificates
            <span className="text-slate-500 text-sm font-medium">
              ({certificates.length})
            </span>
          </h2>
        </div>

        {/* Table */}
        <table className="w-full text-left">
          <thead className="bg-slate-100 text-slate-600 text-sm">
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
                  className="border-t border-blue-100 hover:bg-slate-50 transition"
                >
                  {/* TITLE */}
                  <td className="px-8 py-6">
                    <div className="font-semibold text-slate-800">
                      {c.title}
                    </div>
                   <div className="flex items-center gap-2">
  <span className="font-mono text-xs text-slate-500">
    {c.certId}
  </span>

  <button
    onClick={() => {
      navigator.clipboard.writeText(c.certId);
      toast.success("Certificate ID copied");
    }}
    className="p-1 rounded-md hover:bg-slate-100 text-slate-500"
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
                  <td className="px-8 py-6 text-sm text-slate-500">
                    {new Date(c.issuedAt).toLocaleDateString()}
                  </td>

                  {/* ACTIONS */}
                  <td className="px-8 py-6">
                    <div className="flex justify-center gap-4">
                      <a
                        href={c.ipfsURL}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2
                                   px-5 py-2 rounded-xl
                                   border shadow-sm
                                   text-slate-700 font-semibold
                                   hover:bg-slate-100 transition"
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
                                   border shadow-sm
                                   text-blue-600 font-semibold
                                   hover:bg-blue-50 transition"
                      >
                        <ExternalLink size={16} />
                        Blockchain
                      </a>
                      <button
  onClick={() => setQrData(c)}
  className="inline-flex items-center gap-2
             px-5 py-2 rounded-xl
             border shadow-sm
             text-indigo-600 font-semibold
             hover:bg-indigo-50 transition"
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

        {qrData && (
  <div className="fixed inset-0 z-50 flex items-center justify-center
                  bg-black/40 backdrop-blur-sm">

    <div className="relative bg-white rounded-3xl p-8 w-[420px]
                    shadow-2xl border">

      {/* Close */}
      <button
        onClick={() => setQrData(null)}
        className="absolute top-4 right-4 text-slate-400 hover:text-slate-700"
      >
        <X />
      </button>

      <h3 className="text-xl font-bold text-center mb-4">
        Scan to Verify Certificate
      </h3>

      {/* QR */}
      <div className="flex justify-center mb-6">
        <img
          src={qrData.qrCode}
          alt="QR Code"
          className="h-52 w-52 rounded-xl shadow"
        />
      </div>

      {/* Verify URL */}
      <div className="bg-slate-50 rounded-xl p-4 text-sm break-all">
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
    </div>
  </div>
)}

      </div>
    </div>

    
  );
}
