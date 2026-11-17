import { useNavigate } from "react-router-dom"
import { useStudentContext } from "./context.jsx"

function Students() {
  const navigate = useNavigate()
  const { details } = useStudentContext()

  return (
    <>
      <div className="container">
        <div className="sideMenu">
          <div>
            <h2>StudentHub</h2>
            <ul className="menu">
              <li onClick={() => navigate("/")}>Home</li>
              <li>Student</li>
              <li onClick={() => navigate("/add")}>Add Student</li>
            </ul>
          </div>
          <div></div>
          Learn Build Grow
        </div>

        <div className="main">
          <div className="main3">
            <h2>Students</h2>
            <input name="studentSearch" placeholder="Search" />

            <div className="head">
              <ul>
                <li>Name</li>
                <li>Reg No</li>
                <li>Department</li>
                <li>Mark</li>
                <li>Grade</li>
                <li>Action</li>
              </ul>
            </div>

            <div>
              {details.length === 0 ? (
                <p>No students added yet.</p>
              ) : (
                details.map((student, index) => (
                  <div key={`${student.reg}-${index}`} className="student-row">
                    <span>{student.name}</span>
                    <span>{student.reg}</span>
                    <span>{student.department}</span>
                    <span>{student.mark}</span>
                    <span>{student.mark >= 90 ? "A" : student.mark >= 80 ? "B" : student.mark >= 70 ? "C" : student.mark >= 50 ? "D" : "F"}</span>
                    <button>View</button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Students
