import { useEffect, useState } from "react";
import api from "../../api/axios";
import {
  Users,
  Award,
  FileCheck,
  XCircle,
  Activity
} from "lucide-react";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend
} from "recharts";

/* ================= COLORS ================= */
const PIE_COLORS = {
  ISSUED: "#6366F1",
  ACTIVE: "#22C55E",
  REVOKED: "#EF4444"
};

export default function InstituteDashboard() {
  const [stats, setStats] = useState({
    students: 0,
    totalCerts: 0,
    activeCerts: 0,
    revokedCerts: 0
  });

  const [chainStatus, setChainStatus] = useState(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const studentsRes = await api.get("/students");
        const certRes = await api.get("/institute-dashboard/certificates");
        const chainRes = await api.get("/blockchain/status");

        const certs = certRes.data.certificates;

        setStats({
          students: studentsRes.data.students.length,
          totalCerts: certs.length,
          activeCerts: certs.filter(c => c.status === "ACTIVE").length,
          revokedCerts: certs.filter(c => c.status === "REVOKED").length
        });

        setChainStatus(chainRes.data);

      } catch (err) {
        console.error("Dashboard load failed", err);
      }
    };

    loadStats();
  }, []);

  /* ================= CHART DATA ================= */
  const pieData = [
    { name: "Issued", value: stats.totalCerts },
    { name: "Active", value: stats.activeCerts },
    { name: "Revoked", value: stats.revokedCerts }
  ];

  return (
    <div className="space-y-10">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900">
          Institute Dashboard
        </h1>
        <p className="text-slate-500 mt-2">
          Live overview of students, certificates & blockchain
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard title="Total Students" value={stats.students} icon={Users} gradient="from-blue-600 to-indigo-600" />
        <StatCard title="Issued Certificates" value={stats.totalCerts} icon={Award} gradient="from-purple-600 to-pink-600" />
        <StatCard title="Active Certificates" value={stats.activeCerts} icon={FileCheck} gradient="from-green-600 to-emerald-600" />
        <StatCard title="Revoked Certificates" value={stats.revokedCerts} icon={XCircle} gradient="from-red-600 to-rose-600" />
      </div>

      {/* LOWER GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

        {/* ================= LIVE PIE CHART ================= */}
        <div className="bg-white/70 backdrop-blur-xl rounded-md shadow-xl p-8">
          <h2 className="text-xl font-bold text-slate-800 mb-6">
            Certificate Distribution
          </h2>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={5}
                >
                  <Cell fill={PIE_COLORS.ISSUED} />
                  <Cell fill={PIE_COLORS.ACTIVE} />
                  <Cell fill={PIE_COLORS.REVOKED} />
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ================= BLOCKCHAIN STATUS ================= */}
        <div className="rounded-md p-8 bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-xl">

          <div className="flex items-center gap-3 mb-6">
            <Activity className="text-green-400 animate-pulse" />
            <h2 className="text-xl font-bold">
              Blockchain Node Status
            </h2>
          </div>

          {chainStatus && (
            <>
              <StatusRow label="Network" value={chainStatus.network.toUpperCase()} green />
              <StatusRow label="Chain ID" value={chainStatus.chainId} />
              <StatusRow
                label="Node Status"
                value={chainStatus.synced ? "SYNCED" : "NOT SYNCED"}
                green={chainStatus.synced}
                heartbeat={chainStatus.synced}
              />
              <StatusRow label="Current Block" value={chainStatus.blockNumber.toLocaleString()} />
              <StatusRow label="Gas Price" value={chainStatus.gasPrice} />
            </>
          )}

          <div className="mt-6 text-xs text-slate-400">
            Smart Contract Address
            <div className="mt-1 break-all text-indigo-400">
              {chainStatus?.contractAddress}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= STAT CARD ================= */

function StatCard({ title, value, icon: Icon, gradient }) {
  return (
    <div className="relative group rounded-md p-6 shadow-2xl bg-white/70 backdrop-blur-xl hover:-translate-y-1 transition-all">
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br ${gradient}/10 transition`} />
      <div className="relative flex justify-between items-center">
        <div>
          <p className="text-slate-500 text-sm">{title}</p>
          <p className="text-3xl font-extrabold mt-2">{value}</p>
        </div>
        <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg`}>
          <Icon className="text-white" size={26} />
        </div>
      </div>
    </div>
  );
}

/* ================= STATUS ROW + HEARTBEAT ================= */

function StatusRow({ label, value, green, heartbeat }) {
  return (
    <div className="flex justify-between items-center border-b border-slate-700 py-3">
      <span className="text-slate-400 text-sm">{label}</span>
      <span className={`font-semibold flex items-center gap-2 ${green ? "text-green-400" : ""}`}>
        {heartbeat && (
          <span className="h-2 w-2 rounded-full bg-green-400 animate-ping" />
        )}
        {value}
      </span>
    </div>
  );
}
