import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, LogOut } from "lucide-react";

export default function StudentLayout() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/student/login");
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl font-medium
     whitespace-nowrap transition-all duration-300
     ${
       isActive
         ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow"
         : "text-slate-600 hover:bg-slate-100 hover:translate-x-1"
     }`;

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* SIDEBAR */}
      <aside className="w-64 min-w-[16rem] bg-white border-r px-6 py-8 sticky top-0 flex flex-col">
        <div className="text-xl font-bold mb-12 flex items-center gap-2">
          🎓 <span>BlockCert</span>
        </div>

        <nav className="space-y-2 flex-1">
          <NavLink end to="/student/dashboard" className={linkClass}>
            <LayoutDashboard size={18} />
            Dashboard
          </NavLink>
        </nav>

        <button
          onClick={logout}
          className="mt-14 flex items-center gap-3 text-red-500 px-4 py-3 rounded-xl hover:bg-red-50 transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      </aside>

      {/* CONTENT */}
      <main className="flex-1 p-10">
        <Outlet />
      </main>
    </div>
  );
}
