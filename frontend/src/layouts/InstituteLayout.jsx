import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Award,
  FilePlus,
  LogOut,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useState } from "react";

export default function InstituteLayout() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/institute/login");
  };

const linkClass = ({ isActive }) =>
  `
  relative group
  flex items-center gap-3 px-4 py-3 rounded-xl font-medium
  transition-all duration-300
  ${
    isActive
      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
      : "text-slate-600 hover:bg-white/70 hover:shadow hover:translate-x-1"
  }
  ${collapsed ? "justify-center" : ""}
  `;


  return (
    <div className="flex min-h-screen relative overflow-hidden">

      {/* 🌌 BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50" />

      {/* ================= SIDEBAR ================= */}
     <aside
  className={`
    relative z-20
    ${collapsed ? "w-20" : "w-64"}
    transition-[width] duration-300 ease-in-out
    bg-white/80 backdrop-blur-xl
    border-r border-white/50
    px-4 py-8
    shadow-[10px_0_40px_rgba(0,0,0,0.08)] flex flex-col
  `}
>

        {/* LOGO */}
  <div className="mb-12 flex items-center justify-center gap-3">
  <div className="relative">
    <div className="absolute inset-0 blur-xl bg-indigo-400/40 rounded-xl" />
    <div className="relative h-10 w-10 rounded-xl
                    bg-gradient-to-br from-blue-600 to-indigo-600
                    text-white flex items-center justify-center
                    shadow-lg">
      🏫
    </div>
  </div>

  {!collapsed && (
    <span className="text-xl font-extrabold tracking-tight text-slate-800">
      BlockCert
    </span>
  )}
</div>

  {/* Divider under logo */}
  <div className="h-[1px] bg-slate-300/40 mb-6" />



        {/* NAV */}
        <nav className="space-y-2 flex-1">
          <NavLink end to="/institute/dashboard" className={linkClass}>
            <LayoutDashboard size={18} />
            {!collapsed && "Dashboard"}
          </NavLink>

          <NavLink to="/institute/students" className={linkClass}>
            <Users size={18} />
            {!collapsed && "Students"}
          </NavLink>

          <NavLink to="/institute/issue-certificate" className={linkClass}>
            <FilePlus size={18} />
            {!collapsed && "Issue Certificate"}
          </NavLink>

          <NavLink to="/institute/certificates" className={linkClass}>
            <Award size={18} />
            {!collapsed && "Certificates"}
          </NavLink>
        </nav>


  {/* Divider above logout */}
  <div className="h-[1px] bg-slate-300/40 my-6" />


        {/* LOGOUT */}
        <button
          onClick={logout}
          className={`mt-14 flex items-center gap-3 px-4 py-3 rounded-xl
                     text-red-600 font-medium hover:bg-red-50 transition
                     ${collapsed ? "justify-center" : ""}`}
        >
          <LogOut size={18} />
          {!collapsed && "Logout"}
        </button>

        {/* ⬅ ➡ TOGGLE BUTTON */}
       {/* ⬅ ➡ TOGGLE BUTTON */}
<button
  onClick={() => setCollapsed((v) => !v)}
  className="
    absolute top-6 -right-5
    h-10 w-10 rounded-full
    bg-white
    border border-slate-200
    shadow-[0_10px_25px_rgba(0,0,0,0.25)]
    flex items-center justify-center
    hover:scale-110 active:scale-95
    transition-all
    z-50
  "
>
  {collapsed ? (
    <ChevronRight size={18} className="text-slate-700" />
  ) : (
    <ChevronLeft size={18} className="text-slate-700" />
  )}
</button>


      </aside>
      <div className="w-[1px] bg-gradient-to-b from-transparent via-slate-300/40 to-transparent" />


      {/* ================= MAIN CONTENT ================= */}
     <main
  className="z-10 flex-1 relative p-[0.5px]
    bg-gradient-to-br
    from-indigo-300 via-purple-300 to-pink-300"
>
  <div className="absolute -top-40 -left-40 h-[500px] w-[500px]
                bg-white/40 rounded-full blur-[120px]" />


        <div className="absolute inset-0 opacity-[0.035]
                bg-[url('https://www.transparenttextures.com/patterns/white-wall.png')]" />
        {/* GLASS CONTENT */}
       <div
  className="
    min-h-full
    rounded-md
    bg-white/40 backdrop-blur-2xl
    border border-white/50
    shadow-[0_30px_80px_rgba(0,0,0,0.25)]
    p-10
  "
>
  <Outlet />
</div>

      </main>
    </div>
  );
}
