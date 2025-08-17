import {useAppContext} from "./context"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons'
import Clock from "./clock"
import Createemp from "./addemp"
import { useEffect, useState } from "react"
import Removeemp from "./removeemp"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import "./App.css"

function Admin(){
  const navigate=useNavigate()
const {naam}=useAppContext()
const [disnaam,setdisnaam]=useState(null)
   
    useEffect(()=>{
       const isauth=async()=>{
        try{
          const response=await fetch("http://localhost:5000/verify_token",{
            credentials:"include",
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
    const{addemp,setaddemp,removeemp,setremove}=useAppContext();
    return(
  <>{disnaam?<span id="intro">Welcome {disnaam}</span>:""}
 <Clock/>

<><div id="par2">

 <div className="card" onClick={()=>{navigate("/admindashboard/ADD_Employee")}}>
   <span></span>
   
            <div className="content">
              <FontAwesomeIcon icon={faPlus}  id="plus"beat /><br/>Add</div>
        </div>
         <div className="card">
   <span></span>
   
            <div className="content" onClick={()=>{navigate("./Employee_Data")}}>
             <FontAwesomeIcon icon={faUsers} /><br/>View<br/>data</div>
        </div>
        <div className="card">
   <span></span>
   
            <Link to="Remove_Employee" id="link"><div className="content"  onClick={()=>setremove(true)}>
             <FontAwesomeIcon icon={faXmark} id="remove" beat style={{color: "#ff0000",}} /><br/>Remove</div></Link>
        </div>
  </div></>

  </>
    )
}
export default Admin;