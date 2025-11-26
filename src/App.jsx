import { useEffect, useState } from "react";
import { api } from "./api";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";

export default function App() {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);

  const fetchStudents = async () => {
    const res = await api.get("/students");
    setStudents(res.data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
  <div className="h-screen bg-gray-100 p-6 overflow-hidden">
    <h1 className="text-3xl font-bold text-center mb-6">
      Student Result Management
    </h1>

    
    <div className="flex gap-6 h-[85vh]">

     
      <div className="w-1/3 mt-4">
        <StudentForm
          fetchStudents={fetchStudents}
          editingStudent={editingStudent}
          setEditingStudent={setEditingStudent}
        />
      </div>

      
      <div className="w-2/3 overflow-y-auto rounded">
        <StudentList
          students={students}
          fetchStudents={fetchStudents}
          setEditingStudent={setEditingStudent}
        />
      </div>
      
    </div>
  </div>
);

}
