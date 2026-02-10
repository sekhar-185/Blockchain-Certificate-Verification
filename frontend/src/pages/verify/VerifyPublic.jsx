import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/axios";
import { ShieldCheck, XCircle } from "lucide-react";

export default function VerifyPublic() {
  const { certId } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get(`/public/verify/${certId}`)
      .then(res => setData(res.data))
      .catch(() => setData({ error: true }));
  }, [certId]);

  if (!data) return <div className="p-20 text-center">Verifying…</div>;

  if (data.error)
    return <div className="p-20 text-center text-red-500">Invalid Certificate</div>;

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-50">
      <div className="bg-white rounded-3xl shadow-xl p-10 max-w-xl w-full">

        <div className="flex items-center gap-3 mb-6">
          {data.status === "ACTIVE" ? (
            <ShieldCheck className="text-green-600" />
          ) : (
            <XCircle className="text-red-600" />
          )}
          <h1 className="text-2xl font-bold">
            Certificate {data.status}
          </h1>
        </div>

        <div className="space-y-3 text-slate-700">
          <p><b>Student:</b> {data.student.name}</p>
          <p><b>Roll:</b> {data.student.rollNumber}</p>
          <p><b>Institute:</b> {data.institute}</p>
          <p><b>Issued:</b> {new Date(data.issuedAt).toLocaleDateString()}</p>
        </div>

        <a
          href={data.ipfsURL}
          target="_blank"
          rel="noreferrer"
          className="mt-6 block text-center bg-indigo-600 text-white py-3 rounded-xl"
        >
          View Certificate
        </a>
      </div>
    </div>
  );
}
