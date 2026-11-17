import { useNavigate } from "react-router-dom"
import { useState,useEffect } from "react"
import image from "./deletee.png"
import homeImg from "./home.png"
import studentsImg from "./students.png"
import studentImg from "./student.png"
import all from "./all.png"
import loading from './loading.gif'
function getGrade(mark) {
  const score = Number(mark)

  if (score >= 90) return "A+"
  if (score >= 80) return "A"
  if (score >= 70) return "B+"
  if (score >= 60) return "B"
  if (score >= 50) return "C"
  return "F"
} 

function Students() {
  const navigate = useNavigate()
   const [data,setData]=useState(null)
   const [search,setSeatch]=useState('')
const [dept,setDept]=useState('')

       function deleteList(id){
      fetch(`http://localhost:3000/students/${id}`,{
        method:"DELETE",
      }).then(()=>
      setData(data.filter(x=> x._id!=id)
    ))
    }
    useEffect(()=>{
      fetch(`http://localhost:3000/students?search=${search||dept}`)
      .then(res => res.json())
      .then(data => setData(data))
    },[search||dept])
  return (
    <>
      <div className="container">
        <div className="sideMenu">
          <div>
            <h2><img src={all}/>StudentHub</h2>
                       <ul className="menu">
                         <li onClick={() => navigate("/")}><img src={homeImg}/>Home</li>
                         <li ><img src={studentsImg}/>Student</li>
                         <li onClick={() => navigate("/add")}><img src={studentImg}/>Add Student</li>
                       </ul>
          </div>
          <div></div>
        </div>

        <div className="main">
          <div className="main3">
            <h2>Students</h2>
            <input onChange={(e)=>setSeatch(e.target.value)} name="studentSearch" placeholder="Search" />
            <select onChange={(e)=>setDept(e.target.value)} >
              <option value={""}>All Department</option>
                <option>CSE</option>
                  <option>AIDS</option>
                  <option>CS</option>
                  <option>AIML</option>
                  <option>IT</option>
                  <option>MECH</option>
                  <option>ECE</option>
            </select>
            <div className="head">
              <ul>
                <li>Name</li>
                <li>Reg No</li>
                <li>Department</li>
                <li>Mark</li>
                <li>Grade</li>
                <li>Action</li>
                
              </ul>
              {data?.length===0 ? <p>NO studnets added yet.</p> : ""}
                {data ? data.map((x) => (
                  <ol key={x._id}>
                    <li>{x.name}</li>
                    <li>{x.regNo}</li>
                    <li>{x.department}</li>
                    <li>{x.mark}</li>
                    <li>{getGrade(x.mark)}</li>
                    <li><button onClick={()=>deleteList(x._id)}><img src={image}/></button></li>
                  </ol>
                ))  : <div className="loading"><img src={loading} alt="Loading..." ></img></div>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Students;