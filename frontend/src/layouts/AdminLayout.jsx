import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Building2,
  LogOut,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useState } from "react";

export default function AdminLayout() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/admin/login");
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition
     ${isActive
       ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow"
       : "text-slate-300 hover:bg-white/10"
     }`;

  return (
    <div className="flex min-h-screen bg-slate-100">

      {/* SIDEBAR */}
      <aside
        className={`${
          collapsed ? "w-20" : "w-72"
        } transition-all duration-300
        bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900
        text-white px-4 py-6 flex flex-col`}
      >
        {/* LOGO */}
        <div className="flex items-center justify-between mb-10">
          {!collapsed && (
            <div className="text-xl font-extrabold tracking-wide">
              🛡️ BlockCert
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-lg hover:bg-white/10"
          >
            {collapsed ? <ChevronRight /> : <ChevronLeft />}
          </button>
        </div>

        {/* NAV */}
        <nav className="space-y-2 flex-1">
          <NavLink to="/admin/dashboard" className={linkClass}>
            <LayoutDashboard size={20} />
            {!collapsed && "Dashboard"}
          </NavLink>

          <NavLink to="/admin/dashboard" className={linkClass}>
            <Building2 size={20} />
            {!collapsed && "Institutes"}
          </NavLink>
        </nav>

        {/* LOGOUT */}
        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3
                     text-red-400 hover:bg-red-500/10 rounded-xl"
        >
          <LogOut size={20} />
          {!collapsed && "Logout"}
        </button>
      </aside>

      {/* CONTENT */}
      <main className="flex-1 p-10 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
