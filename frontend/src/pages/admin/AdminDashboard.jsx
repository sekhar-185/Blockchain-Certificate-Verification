import { useEffect, useState } from "react";
import api from "../../api/axios";
import {
  Building2,
  Clock,
  CheckCircle,
  Users,
  Loader2
} from "lucide-react";
import { toast } from "react-toastify";

export default function AdminDashboard() {
  const [institutes, setInstitutes] = useState([]);
  const [loadingId, setLoadingId] = useState(null);

  const fetchInstitutes = async () => {
    try {
      const res = await api.get("/admin/institutes");
      setInstitutes(res.data);
    } catch {
      toast.error("Failed to load institutes");
    }
  };

  useEffect(() => {
    fetchInstitutes();
  }, []);

  const approveInstitute = async (id) => {
    try {
      setLoadingId(id);
      await api.post(`/admin/approve/${id}`);
      toast.success("Institute approved");
      fetchInstitutes();
    } catch {
      toast.error("Approval failed");
    } finally {
      setLoadingId(null);
    }
  };

  const total = institutes.length;
  const approved = institutes.filter(i => i.status === "APPROVED").length;
  const pending = institutes.filter(i => i.status === "PENDING").length;

  return (
    <>
      {/* HEADER */}
      <h1 className="text-4xl font-extrabold text-slate-900">
        Admin Dashboard
      </h1>
      <p className="text-slate-500 mb-10">
        Institute governance & system control
      </p>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <Stat
          title="Total Institutes"
          value={total}
          icon={Building2}
          gradient="from-indigo-600 to-blue-600"
        />
        <Stat
          title="Pending Approvals"
          value={pending}
          icon={Clock}
          gradient="from-amber-500 to-orange-500"
        />
        <Stat
          title="Approved Institutes"
          value={approved}
          icon={CheckCircle}
          gradient="from-emerald-500 to-green-600"
        />
        <Stat
          title="Total Students"
          value="—"
          icon={Users}
          gradient="from-purple-600 to-fuchsia-600"
        />
      </div>

      {/* TABLE */}
      <div className="bg-white/70 backdrop-blur-xl rounded-md shadow-xl  overflow-hidden">
        <div className="px-8 py-6 border-b">
          <h2 className="text-2xl font-bold">
            Institute Approvals
          </h2>
        </div>

        <table className="w-full text-sm">
          <thead className="bg-slate-100 text-slate-600">
            <tr>
              <th className="px-8 py-4 text-left">Institute</th>
              <th>Email</th>
              <th>Wallet</th>
              <th>Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {institutes.map(inst => (
              <tr
                key={inst._id}
                className="border-t hover:bg-slate-50 transition"
              >
                <td className="px-8 py-5 font-semibold">
                  {inst.name}
                </td>

                <td className="text-slate-600">
                  {inst.email}
                </td>

                <td className="font-mono text-xs">
                  {inst.walletAddress.slice(0, 10)}...
                </td>

                <td>
                  {inst.status === "APPROVED" ? (
                    <Badge color="green" text="APPROVED" />
                  ) : (
                    <Badge color="amber" text="PENDING" />
                  )}
                </td>

                <td className="text-center">
                  {inst.status === "PENDING" ? (
                    <button
                      onClick={() => approveInstitute(inst._id)}
                      disabled={loadingId === inst._id}
                      className="px-5 py-2 rounded-xl
                                 bg-gradient-to-r from-emerald-600 to-green-600
                                 text-white font-semibold
                                 hover:opacity-90 transition
                                 inline-flex items-center gap-2"
                    >
                      {loadingId === inst._id ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          Approving
                        </>
                      ) : (
                        "Approve"
                      )}
                    </button>
                  ) : (
                    <span className="text-slate-400">
                      Approved
                    </span>
                  )}
                </td>
              </tr>
            ))}

            {institutes.length === 0 && (
              <tr>
                <td colSpan="5" className="py-12 text-center text-slate-400">
                  No institutes found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

/* ---------- Components ---------- */

function Stat({ title, value, icon: Icon, gradient }) {
  return (
    <div
      className={`relative overflow-hidden rounded-md p-6 hover:scale-110 transition
                  bg-gradient-to-br ${gradient}
                  text-white shadow-xl`}
    >
      <div className="absolute inset-0 bg-white/10" />
      <div className="relative flex justify-between items-center">
        <div>
          <p className="text-white/80 text-sm">{title}</p>
          <p className="text-4xl font-extrabold mt-2">{value}</p>
        </div>
        <div className="p-4 bg-white/20 rounded-2xl">
          <Icon size={28} />
        </div>
      </div>
    </div>
  );
}

function Badge({ color, text }) {
  const styles = {
    green: "bg-green-100 text-green-700",
    amber: "bg-amber-100 text-amber-700"
  };
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[color]}`}>
      {text}
    </span>
  );
}
