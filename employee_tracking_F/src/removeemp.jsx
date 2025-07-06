import "./removeemp.css"
import { useAppContext } from "./context"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom"
import Loader from "./loder"
import { useState,useEffect } from "react"
import { useNavigate } from "react-router-dom"
function Removeemp(){
    const navigate=useNavigate()
      useEffect(()=>{
             const isauth=async()=>{
              try{
                const response=await fetch("https://employee-desk-backend.onrender.com/verify_token",{
                  credentials:"include"
                })
                if(response.status!==200){
      navigate("/login")
                }
              }catch(e){
                console.log(e)
              }
             }
            isauth()
          },[])
    const[mail,setmail]=useState(null);
    const[notify,setnotify]=useState(null);
        const[loader,setloader]=useState(false);
    async function senddata() {
        if(mail){
            try{
                setloader(true)
                const dataresponse=await fetch("https://employee-desk-backend.onrender.com/Remove_Emp",{
                    method:"delete",
                    body:JSON.stringify({mail}),
                    headers:{
                        "Content-Type":"application/json"
                    },
                    credentials:"include"
                })
                const res=await dataresponse.json()
                if(dataresponse.status==200){
                    setnotify(res.message)
                    setTimeout(() => {
                        navigate("/admindashboard")
                    }, 2000);
                }else{
                     setnotify(res.message)
                    setTimeout(() => {
                              setnotify(null)
                    }, 5000);
                    
                }

            }catch(e){
                console.log("erroe at delete employee")
            }finally{
                setloader(false)
            }
        }
        
    }
    return(
        <>
        <div par="4">
            {notify?<div id="del_warning">{notify}</div>:""}
            <div className="remove-container">
  <form className="remove-form">
    <h2 className="remove-title">Delete Employee</h2>

    <input
      type="email"
      placeholder="Enter Employee Email"
      className="remove-input"
      required
      onChange={(e)=>{setmail(e.target.value)}}
    />

    <div className="remove-button-group">
      {loader?<Loader/>:<><button type="submit" className="remove-button delete-btn" onClick={senddata}>Delete</button>
       <Link to="/admindashboard">  <button type="button" className="remove-button cancel-btn">Cancel</button></Link></>}
       
    
    </div>
  </form>
</div>

        </div>
        </>
    )
}
export default Removeemp;