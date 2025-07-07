import "./form.css"
import Clock from "./clock"
import { useAppContext } from "./context"
import { useNavigate } from "react-router-dom"
import { useState,useEffect } from "react"
import Loader from "./loder"
function  Form(){
    const [intime,setintime]=useState(null)
        const [outtime,setouttime]=useState(null)
            const [overalltime,setoveralltime]=useState(null)
                const [task,settask]=useState(null)
                const [per,setper]=useState(null)
                const[hper,sethper]=useState(false)
                const[autotimemin,setautotimemin]=useState(null)
                const[autotimehrs,setautotimehrs]=useState(null)
                  const[perintime,setperintime]=useState(null)
                const[perouttime,setperouttime]=useState(null)
                const[autotime,setautotime]=useState(false)
                const[load,setload]=useState(false)
                const[filled,setfilled]=useState(false)
                const [warning,setwarning]=useState(null)
    const {naam}=useAppContext()
    const navigate=useNavigate()
    const email=localStorage.getItem("email")
    useEffect(() => {
  if (!hper) {
    setperintime(null);
    setperouttime(null);
    setper(null);
  }
}, [hper]);
          useEffect(()=>{
          const isauth=async()=>{
           try{
            
             const response=await fetch("https://employeedeskbackend-env.up.railway.app/verify_token",{
               credentials:"include"
             })
             if(response.status!==200){
   navigate("/login")
             }else{
         
             }
           }catch(e){
             console.log(e)
           }
          }
         isauth()
       },[])
       useEffect(()=>{
         const isfilled=async()=>{
           try{
            
             const response=await fetch("https://employee-desk-backend.onrender.com/fill_form",{
              method:"POST",
              body:JSON.stringify({naam,email,intime,outtime,perintime,perouttime,per,overalltime,task}),
              headers:{
                "content-type":"application/json"
              },
               credentials:"include"
             })
             if(response.status==400){
  setfilled(true)
             }else{
         setfilled(false)
             }
           }catch(e){
             console.log(e)
           }
          }
         isfilled()
       },[])
function calculate(ischecked){
if(ischecked){
    if(intime&&outtime){
         const [inHours, inMinutes] = intime.split(":").map(Number);
  const [outHours, outMinutes] = outtime.split(":").map(Number);


  const inDate = new Date();
  const outDate = new Date();

  inDate.setHours(inHours, inMinutes, 0);
  outDate.setHours(outHours, outMinutes, 0);


  if (outDate < inDate) {
    outDate.setDate(outDate.getDate() + 1);
  }

  const diffMs = outDate - inDate;
  const diffHrs = Math.floor(diffMs / 1000 / 60 / 60);
  const diffMin = Math.floor((diffMs / 1000 / 60) % 60);

  setautotime(true)
setautotimemin(diffMin+"Minutes")
setautotimehrs(diffHrs+"Hours")
setoveralltime(`${diffHrs} Hours ${diffMin} Minutes`);
    }
}else{
    setautotime(false)
       setoveralltime("");
}
}

     async   function submitform(e){
        e.preventDefault()
              console.log(naam)
              console.log(email)
        console.log(intime)
        console.log(outtime)
        console.log(perintime)
        console.log(perouttime)
        console.log(per)
        console.log(overalltime)
        console.log(task)
     if(naam&&email&&intime&&outtime&&overalltime&&task){
      setload(true)
      try{
const res=await fetch("https://employee-desk-backend.onrender.com/fill_form",{
  method:"POST",
  body:JSON.stringify({naam,email,intime,outtime,perintime,perouttime,per,overalltime,task}),
  headers:{
    "Content-type":"application/json"
  },
  credentials:"include"
})
const returndata=await res.json()
console.log(returndata)
if(res.status==200){
  setwarning("Form Submitted")
  setTimeout(() => {
      setwarning("Form Submitted")
    navigate("/employeedashboard")
  }, 2000);
}
      }catch(e){
        console.log("error at send form")
      }finally{
            setload(false)
           }
     }
  
       }
    return(
        <>
        {warning?<h1>{warning}</h1>:''}
        <Clock/>
    {filled?<>
<div className="tooltip-container">
  <span className="tooltip">Form Submitted for today!</span>
  <span className="text">!</span>
</div>
</>:<> <form id="employee-form" onSubmit={submitform}>
  <div className="form-row" >
    <label htmlFor="emp-name">Name</label>
    <input type="text" id="emp-name" className="emp-input"  disabled={naam} value={naam||""} required/>
    
  </div>

  <div className="form-row">
    <label htmlFor="emp-email">Email</label>
    <input type="email" id="emp-email" className="emp-input" required disabled={email} value={email||""}/>
  </div>

  <div className="form-row">
    <label htmlFor="emp-in-time">In Time</label>
    <input type="time" id="emp-in-time" className="emp-input" required onChange={(e)=>{setintime(e.target.value)}}/>
  </div>

  <div className="form-row">
    <label htmlFor="emp-out-time">Out Time</label>
    <input type="time" id="emp-out-time" className="emp-input" required onChange={(e)=>{setouttime(e.target.value)}}/>
  </div>



  <div className="form-row checkbox-row">
    <input type="checkbox" id="perm-check" checked={hper} onChange={()=>{sethper(!hper)}} />
    <label htmlFor="perm-check">Permission Taken?</label>
  </div>
{hper?<>
<div id="perm-times">
    <div className="form-row">
      <label htmlFor="perm-from">From Time</label>
      <input type="time" id="perm-from" className="emp-input" required onChange={(e)=>{setperintime(e.target.value)}}/>
    </div>

    <div className="form-row">
      <label htmlFor="perm-to">To Time</label>
      <input type="time" id="perm-to" className="emp-input" required onChange={(e)=>{setperouttime(e.target.value)}}/>
    </div>
       <div className="form-row">
    <label htmlFor="perm-description">Permission Description</label>
    <textarea
      id="perm-description"
      className="emp-textarea"
      placeholder="Describe the reason for permission..."
      required
      onChange={(e)=>{setper(e.target.value)}}
    ></textarea>
  </div>
  </div>
</>:""}
    <div className="form-row checkbox-row">
    <input type="checkbox" id="calc-hours" onChange={(e)=>{calculate(e.target.checked)}} />
    <label htmlFor="calc-hours">Calculate Total Hours</label>
  </div>

  <div className="form-row">
    <label htmlFor="emp-overall">Overall Time</label>
    <input type="text" id="emp-overall" className="emp-input" required value={autotime ? `${autotimehrs} ${autotimemin}` : overalltime}  onChange={(e)=>{setoveralltime(e.target.value)}}/>
  </div>

  <div className="form-row">
    <label htmlFor="emp-task-desc">Task Description</label>
    <textarea id="emp-task-desc" className="emp-textarea" required onChange={(e)=>{settask(e.target.value)}}></textarea>
  </div>

  {load?<Loader/>:<><button type="submit" className="emp-btn">Submit</button>
  <button  className="emp-btn">Back</button></>}
</form></>}

  

        </>
    )
}
export default Form;