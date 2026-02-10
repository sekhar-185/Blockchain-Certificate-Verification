import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { UserPlus } from "lucide-react";
import { toast } from "react-toastify";

export default function Students() {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await api.get("/students");
        setStudents(res.data.students);
      } catch {
        toast.error("Failed to load students");
      }
    };
    fetchStudents();
  }, []);

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row
                      md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">
            Students
          </h1>
          <p className="text-slate-500 mt-1">
            Manage your institution&apos;s students
          </p>
        </div>

        {/* ADD STUDENT */}
        <button
          onClick={() => navigate("/institute/students/create")}
          className="inline-flex items-center gap-3
                     px-6 py-3 rounded-xl
                     bg-gradient-to-r from-blue-600 to-indigo-600
                     text-white font-semibold
                     shadow-lg hover:shadow-xl
                     hover:opacity-95 transition"
        >
          <UserPlus size={18} />
          Add Student
        </button>
      </div>

      {/* TABLE CARD */}
      <div className="relative overflow-hidden 

                      bg-white/70 backdrop-blur-xl
                      rounded-md shadow-2xl ">

        {/* TABLE */}
        <table className="w-full text-left">
          <thead className="bg-blue-100 text-slate-600 text-sm">
            <tr>
              <th className="px-6 py-4">Student</th>
              <th className="px-6 py-4">Roll Number</th>
              <th className="px-6 py-4">Program</th>
              <th className="px-6 py-4">Department</th>
              <th className="px-6 py-4">Admission</th>
              <th className="px-6 py-4">Created</th>
            </tr>
          </thead>

          <tbody>
            {students.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="px-6 py-12 text-center text-slate-400"
                >
                  No students found
                </td>
              </tr>
            ) : (
              students.map((s) => (
                <tr
                  key={s._id}
                  className="border-t border-t-slate-50 hover:bg-slate-50
                             transition"
                >
                  {/* STUDENT */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      {/* Avatar */}
                      <div className="h-10 w-10 rounded-xl
                                      bg-gradient-to-br
                                      from-blue-600 to-indigo-600
                                      text-white font-bold
                                      flex items-center justify-center">
                        {s.name?.[0]?.toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">
                          {s.name}
                        </p>
                        <p className="text-xs text-slate-500">
                          {s.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 font-medium">
                    {s.studentId}
                  </td>

                  <td className="px-6 py-4">
                    {s.program}
                  </td>

                  <td className="px-6 py-4">
                    {s.department}
                  </td>

                  <td className="px-6 py-4">
                    {s.admissionYear}
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-500">
                    {new Date(s.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
