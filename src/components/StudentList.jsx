import { api } from "../api";

export default function StudentList({ students, fetchStudents, setEditingStudent }) {
  const handleDelete = async (id) => {
    await api.delete(`/students/${id}`);
    fetchStudents();
  };

  
  const getGrade = (marks) => {
    if (marks >= 90) return "O";
    if (marks >= 80) return "A+";
    if (marks >= 70) return "A";
    if (marks >= 60) return "B+";
    if (marks >= 50) return "B";
    if (marks >= 40) return "C";
    return "F";
  };

 
  const getStatus = (marks) => {
    return marks < 27 ? "Fail" : "Pass";
  };

  return (
    <div className="p-4 bg-white rounded shadow mt-4">
      <h2 className="text-xl font-semibold mb-4">Student List</h2>

      <table className="w-full text-left">
        <thead>
          <tr className="border-b">
            <th>Name</th>
            <th>Roll</th>
            <th>Section</th>
            <th>Marks</th>
            <th>Status</th>
            <th>Grade</th>
          </tr>
        </thead>

        <tbody>
          {students.map((s) => {
            const status = getStatus(s.result);
            const grade = getGrade(s.result);

            return (
              <tr key={s.id} className="border-b">
                <td>{s.name}</td>
                <td>{s.roll}</td>
                <td>{s.section}</td>
                <td>{s.result}</td>

               
                <td
                  className={
                    status === "Pass" ? "text-green-600 font-semibold" : "text-red-600 font-semibold"
                  }
                >
                  {status}
                </td>

              
                <td className="font-semibold">{grade}</td>

                <td className="space-x-2">
                  <button
                    onClick={() => setEditingStudent(s)}
                    className="px-2 py-1 bg-yellow-400 m-1.5 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(s.id)}
                    className="px-2 py-1 bg-red-500 text-white rounded m-1.5"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
