import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layouts
import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import InstituteLayout from "./layouts/InstituteLayout";
import StudentLayout from "./layouts/StudentLayout";
// Pages
import Home from "./pages/Home";

// Admin
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";

// Institute
import InstituteRegister from "./pages/institute/InstituteRegister";
import InstituteLogin from "./pages/institute/InstituteLogin";
import InstituteDashboard from "./pages/institute/InstituteDashboard";
import Students from "./pages/institute/Students";
import CreateStudent from "./pages/institute/CreateStudent";
import IssueCertificate from "./pages/institute/IssueCertificate";
import Certificates from "./pages/institute/Certificates";


// Student
import StudentLogin from "./pages/student/StudentLogin";
import StudentDashboard from "./pages/student/StudentDashboard";

// Verify
import VerifyById from "./pages/verify/VerifyById";
import VerifyByFile from "./pages/verify/VerifyByFile";
import VerifyPublic from "./pages/verify/VerifyPublic";

import VerifyHub from "./pages/verify/VerifyHub";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* 🌍 PUBLIC */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/verify" element={<VerifyById />} />
          <Route path="/verify-file" element={<VerifyByFile />} />

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/institute/register" element={<InstituteRegister />} />
          <Route path="/institute/login" element={<InstituteLogin />} />
          <Route path="/student/login" element={<StudentLogin />} />
        </Route>

        {/* 🛡️ ADMIN */}
        <Route element={<ProtectedRoute allowedRole="ADMIN" />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
          </Route>
        </Route>

        {/* 🏫 INSTITUTE (TEMP) */}
   <Route element={<ProtectedRoute allowedRole="INSTITUTE" />}>
  <Route path="/institute" element={<InstituteLayout />}>
    <Route path="dashboard" element={<InstituteDashboard />} />
    <Route path="students" element={<Students />} />
    <Route path="students/create" element={<CreateStudent />} />
    <Route path="issue-certificate" element={<IssueCertificate />} />
    <Route path="certificates" element={<Certificates />} />
  </Route>
</Route>



       {/* STUDENT */}
<Route path="/student/login" element={<StudentLogin />} />

<Route path="/student" element={<StudentLayout />}>
  <Route path="dashboard" element={<StudentDashboard />} />
</Route>

<Route path="/verify/:certId" element={<VerifyPublic />} />

<Route path="/verify-hub" element={<VerifyHub />} />


      </Routes>
    </BrowserRouter>
  );
}
