import { useEffect, useState } from "react";
import api from "../../api/axios";
import { ExternalLink, Ban } from "lucide-react";
import { toast } from "react-toastify";

export default function Certificates() {
  const [certificates, setCertificates] = useState([]);
  const [loadingId, setLoadingId] = useState(null);

  const fetchCertificates = async () => {
    try {
      const res = await api.get("/institute-dashboard/certificates");
      setCertificates(res.data.certificates);
    } catch {
      toast.error("Failed to load certificates");
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);
const revoke = async (certId) => {
  if (!window.confirm("Revoke this certificate?")) return;

  try {
    setLoadingId(certId);
    await api.post(`/institute-dashboard/revoke/${certId}`);
    toast.success("Certificate revoked");
    fetchCertificates();
  } catch (err) {
    const msg =
      err.response?.data?.message ||
      "Failed to revoke certificate";
    toast.error(msg);
  } finally {
    setLoadingId(null);
  }
};


  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">
            Issued Certificates
          </h1>
          <p className="text-slate-500 mt-1">
            Manage, view, and revoke issued certificates
          </p>
        </div>
        <div className="text-sm text-slate-500">
          Total: <span className="font-semibold">{certificates.length}</span>
        </div>
      </div>

      {/* TABLE CARD */}
      <div className="bg-white rounded-md shadow-xl  overflow-hidden">

        {/* TABLE HEADER */}
        <div className="grid grid-cols-6 gap-4 px-8 py-4
                        bg-gradient-to-r from-indigo-600 to-blue-600
                        text-white text-sm font-semibold">
          <div>Certificate ID</div>
          <div>Student</div>
          <div>Type</div>
          <div>Status</div>
          <div>Issued</div>
          <div className="text-center">Actions</div>
        </div>

        {/* ROWS */}
        {certificates.length === 0 ? (
          <div className="py-16 text-center text-slate-400">
            No certificates found
          </div>
        ) : (
          certificates.map((c) => (
            <div
              key={c._id}
              className="grid grid-cols-6 gap-4 px-8 py-5
                         border-t border-t-blue-200 hover:bg-slate-50 transition"
            >
              {/* CERT ID */}
              <div className="font-mono text-sm text-slate-700">
                {c.certId}
              </div>

              {/* STUDENT */}
              <div className="font-medium text-slate-800">
                {c.studentId?.name || "—"}
              </div>

              {/* TYPE */}
              <div className="text-slate-600">
                {c.type}
              </div>

              {/* STATUS */}
              <div>
                {c.status === "ACTIVE" ? (
                  <span className="inline-flex px-3 py-1 rounded-full
                                   text-xs font-semibold
                                   bg-emerald-100 text-emerald-700">
                    ACTIVE
                  </span>
                ) : (
                  <span className="inline-flex px-3 py-1 rounded-full
                                   text-xs font-semibold
                                   bg-rose-100 text-rose-700">
                    REVOKED
                  </span>
                )}
              </div>

              {/* DATE */}
              <div className="text-sm text-slate-500">
                {new Date(c.issuedAt).toLocaleDateString()}
              </div>

              {/* ACTIONS */}
              <div className="flex justify-center gap-3">

                {/* VIEW */}
                <a
                  href={c.ipfsURL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2
                             px-4 py-2 rounded-xl
                             bg-slate-100 text-slate-700
                             hover:bg-slate-200 transition
                             font-semibold text-sm"
                >
                  <ExternalLink size={16} />
                  View
                </a>

                {/* REVOKE */}
                {c.status === "ACTIVE" && (
                  <button
                    onClick={() => revoke(c.certId)}
                    disabled={loadingId === c.certId}
                    className="inline-flex items-center gap-2
                               px-4 py-2 rounded-xl
                               bg-rose-600 text-white
                               hover:bg-rose-700 transition
                               font-semibold text-sm
                               disabled:opacity-70"
                  >
                    {loadingId === c.certId ? (
                      <span className="flex items-center gap-1">
                        <Spinner />
                        Revoking
                        <Dots />
                      </span>
                    ) : (
                      <>
                        <Ban size={16} />
                        Revoke
                      </>
                    )}
                  </button>
                )}

              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

/* ===================== UI HELPERS ===================== */

function Spinner() {
  return (
    <span className="h-4 w-4 rounded-full border-2 border-white/40
                     border-t-white animate-spin" />
  );
}

function Dots() {
  return (
    <span className="inline-flex">
      <span className="animate-bounce">.</span>
      <span className="animate-bounce delay-150">.</span>
      <span className="animate-bounce delay-300">.</span>
    </span>
  );
}
