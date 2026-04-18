import { ShieldCheck } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const linkClass =
    "relative text-sm font-medium text-slate-700 hover:text-blue-600 transition";

  return (
    <nav
      className="sticky top-0 z-50
                 backdrop-blur-xl bg-white/70
                 border-b border-white/40
                 shadow-sm"
    >
      <div className="flex items-center justify-between px-10 py-4 max-w-7xl mx-auto">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3">
          <div
            className="bg-gradient-to-br from-blue-600 to-indigo-600
                       text-white p-2.5 rounded-xl shadow-md"
          >
            <ShieldCheck size={22} />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-slate-900">
            BlockCert
          </span>
        </Link>

        {/* LINKS */}
        <div className="flex items-center gap-8">

          <NavLink to="/verify" className={linkClass}>
            Verify Certificate
            <Underline />
          </NavLink>

          <NavLink to="/institute/register" className={linkClass}>
            Institute Register
            <Underline />
          </NavLink>

          <NavLink to="/admin/login" className={linkClass}>
            Admin
            <Underline />
          </NavLink>

          <NavLink to="/institute/login" className={linkClass}>
            Institute
            <Underline />
          </NavLink>

          {/* CTA */}
          <Link
            to="/student/login"
            className="ml-2 inline-flex items-center
                       px-5 py-2.5 rounded-xl
                       text-sm font-semibold
                       border border-blue-600
                       text-blue-600
                       hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600
                       hover:text-white
                       transition shadow-sm"
          >
            Student Login
          </Link>
        </div>
      </div>
    </nav>
  );
}

/* ---------- Hover underline ---------- */
function Underline() {
  return (
    <span
      className="absolute left-0 -bottom-1 w-0 h-[2px]
                 bg-gradient-to-r from-blue-600 to-indigo-600
                 transition-all duration-300
                 group-hover:w-full"
    />
  );
}
