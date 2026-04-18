import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, LogOut, ShieldCheck, Sparkles } from "lucide-react";

export default function StudentLayout() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/student/login");
  };

  const linkClass = ({ isActive }) =>
    `group flex items-center gap-3 px-4 py-3 rounded-xl font-medium
     whitespace-nowrap transition-all duration-300
     ${
       isActive
        ? "bg-gradient-to-r from-slate-900 to-indigo-900 text-white shadow-lg"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 hover:translate-x-1"
     }`;

  return (
    <div className="flex min-h-screen bg-slate-100/70">
      {/* SIDEBAR */}
      <aside
        className="sticky top-0 flex min-h-screen w-72 min-w-[18rem] flex-col
                   border-r border-slate-200 bg-white px-6 py-7 shadow-[0_14px_34px_rgba(15,23,42,0.08)]"
      >
        <div
          className="mb-10 rounded-2xl border border-slate-200 bg-gradient-to-br
                     from-slate-900 via-slate-800 to-indigo-900 p-4 text-white"
        >
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-white/15 p-2">
              <ShieldCheck size={20} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-200">Student Portal</p>
              <h1 className="text-lg font-bold tracking-tight">BlockCert</h1>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-xs text-slate-100">
            <Sparkles size={14} />
            Verified records and blockchain-backed certificates
          </div>
        </div>

        <nav className="space-y-2 flex-1">
          <NavLink end to="/student/dashboard" className={linkClass}>
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </NavLink>
        </nav>

        <button
          onClick={logout}
          className="mt-8 flex items-center gap-3 rounded-xl border border-red-200
                     px-4 py-3 font-medium text-red-600 transition hover:bg-red-50"
        >
          <LogOut size={18} />
          Logout
        </button>
      </aside>

      {/* CONTENT */}
      <main className="flex-1 p-6 md:p-8 lg:p-10">
        <Outlet />
      </main>
    </div>
  );
}
