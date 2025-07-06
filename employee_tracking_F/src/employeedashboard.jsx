import {useAppContext} from "./context"
import Clock from "./clock" 
import { useNavigate } from "react-router-dom"
import { useEffect,useState } from "react"
import "./App.css"

function Employee(){
    const navigate=useNavigate()
   const {naam}=useAppContext()
   const [disnaam,setdisnaam]=useState(null)
      
       useEffect(()=>{
          const isauth=async()=>{
           try{
             const response=await fetch("https://employee-desk-backend.onrender.com/verify_token",{
               credentials:"include"
             })
             if(response.status!==200){
   navigate("/login")
             }else{
               setdisnaam(naam)
               setTimeout(()=>{
                 setdisnaam(null)
               },5000)
             }
           }catch(e){
             console.log(e)
           }
          }
         isauth()
       },[])
       async function formfill() {
        navigate("fill_Form")
        
       }
       function showdata(){
     navigate("Employee_data")
       }
    return(
        <>{disnaam?<span id="intro">Welcome {disnaam}</span>:""}
        <Clock/>
       <div id="employee-dashboard">

  <div class="employee-card" id="employee-fill-form">
    <span></span>
    <div class="employee-card-content" onClick={()=>{formfill()}}>📝<br />Fill Form</div>
  </div>


  <div class="employee-card" id="employee-view-log">
    <span></span>
    <div class="employee-card-content" onClick={()=>{showdata()}}>📄<br />View Previous Log</div>
  </div>
</div>

        </>
    )
}
export default Employee;