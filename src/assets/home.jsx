import { useNavigate } from "react-router-dom"
import homeImg from "./home.png"
import studentsImg from "./students.png"
import studentImg from "./student.png"
import all from "./all.png"
import { useEffect, useState } from "react"
import loading from './loading.gif'
function Home() {
  const navigate = useNavigate()
  const [data,setData]=useState(null)
  useEffect(()=>{
    fetch('http://localhost:3000/students')
    .then(res => res.json())
    .then(data => setData(data))
  },[])
  console.log(data)
  const totalStudents = data?.length
  const averageMark = totalStudents
    ? (data.reduce((sum, student) => sum + Number(student.mark || 0), 0) / totalStudents).toFixed(1)
    : 0
  const highestMarks = totalStudents
    ? Math.max(...data.map((student) => Number(student.mark || 0)))
    : 0
  return (
    <>
      <div className="container">
        <div className="sideMenu">
          <div>
            <h2><img src={all}/>StudentHub</h2>
            <ul className="menu">
              <li><img src={homeImg}/>Home</li>
              <li onClick={() => navigate("/students")}><img src={studentsImg}/>Student</li>
              <li onClick={() => navigate("/add")}><img src={studentImg}/>Add Student</li>
            </ul>
          </div>
          <div></div>
        </div>

        <div className="main">
          <h2>Students Progress</h2>
          
          <div className="totaBox">
            <div className="box1">
              <p>
                <img></img>
                <b>Total Students</b>
              </p>
              <h1>{totalStudents}</h1>
            </div>

            <div className="box2">
              <p>
                <img></img>
                <b>Average Mark</b>
              </p>
              <h1>{averageMark}</h1>
            </div>

            <div className="box3">
              <p>
                <img></img>
                <b>Highest Marks</b>
              </p>
              <h1>{highestMarks}</h1>
            </div>
          </div>

          <div className="recent">
             
            <ul>
              <h2>Recent Students</h2>
              <li className="view" onClick={() => navigate("/students")}>View All-</li>
            </ul><div className="recent1">
            <ul>
              <li>Name</li>
              <li>Reg No</li>
              <li>Department</li>
              <li>Mark</li>
            </ul>

            {data ? data.map((student, index) => (
              <ol key={index}>
                <li>{student.name}</li>
                <li>{student.regNo}</li>
                <li>{student.department}</li>
                <li>{student.mark}</li>
              </ol>
            ))
            : <div className="loading"><img src={loading} alt="Loading..." ></img></div>
          } </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home