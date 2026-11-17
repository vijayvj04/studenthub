import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import homeImg from "./home.png"
import studentsImg from "./students.png"
import studentImg from "./student.png"
import all from "./all.png"

function AddStudent() {
  const navigate = useNavigate()
    const [form, setForm] = useState({
    name: "",
    reg: "",
    department: "CSE",
    mark: "",
  })
  const [data,setdata] = useState(null)

  useEffect(()=>{
    fetch('http://localhost:3000/students')
    .then(res => res.json())
    .then(data => setdata(data))
  },[])
 const [show,setShow]=useState("")
  function addStudent() {
    if (!form.name || !form.reg || !form.mark) {
      return
    }
    fetch(`http://localhost:3000/students`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(
        {
        name: form.name,
        regNo: form.reg,
        department: form.department,
        mark: Number(form.mark)
      }
      ) 
    }).then(res => res.json())
    .then(newUser => setdata([...data,newUser]))
    .catch(err => console.log(err))
    setForm({ name: "", reg: "", department: "CSE", mark: "" })
    setTimeout(()=>{
      setShow("")
    },2000)
    setShow("Add Succesefully")
  }

  return (
    <>
      <div className="container">
        <div className="sideMenu">
          <div>
            <h2><img src={all}/>StudentHub</h2>
                       <ul className="menu">
                         <li onClick={() => navigate("/")}><img src={homeImg}/>Home</li>
                         <li onClick={() => navigate("/students")}><img src={studentsImg}/>Student</li>
                         <li ><img src={studentImg}/>Add Student</li>
                       </ul>
          </div>
          <div></div>
        </div>
        <div className="main">
          <div className="main2">
            
            <h2>Add New Students</h2>
            <div>
              <span>
                <label>Name</label>
                <br />
                <input
                  name="studentName"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  type="text"
                  placeholder="Enter student name"
                />
              </span>
              <br />

              <span>
                <label>Register No</label>
                <br />
                <input
                  name="studentReg"
                  value={form.reg}
                  onChange={(e) => setForm({ ...form, reg: e.target.value })}
                  type="text"
                  placeholder="Enter register number"
                />
              </span>
              <br />

              <span>
                <label>Department</label>
                <br />
                <select
                  value={form.department}
                  onChange={(e) => setForm({ ...form, department: e.target.value })}
                >
                  <option>CSE</option>
                  <option>AIDS</option>
                  <option>CS</option>
                  <option>AIML</option>
                  <option>IT</option>
                  <option>MECH</option>
                  <option>ECE</option>
                </select>
              </span>
              <br />

              <span>
                <label>Mark</label>
                <br />
                <input
                  name="studentMark"
                  value={form.mark}
                  onChange={(e) => setForm({ ...form, mark: e.target.value })}
                  type="number"
                  min="0"
                  max="100"
                  placeholder="Enter Marks(0-100)"
                />
              </span>
              <br />

              <button onClick={addStudent}>+ Add Student</button>
                    <h3>{show}</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddStudent