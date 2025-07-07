import { Link, useNavigate } from "react-router-dom"
import Loader from "./loder";
import{useAppContext} from "./context"

import "./login.css"
import { useState } from "react";
function Login(){
    const navigate = useNavigate();
    const[mail,setmail]=useState(null)
    const[pass,setpass]=useState(null)
    const[load,setload]=useState(false)
        const[warn1,setwarn1]=useState(false)
                const[warn2,setwarn2]=useState(false)
    const {naam,setnaam}=useAppContext()


    const senddata=async (e)=>{
       e.preventDefault();
      
       if(mail&&pass){
        setwarn1(false)
       console.log(mail);
       console.log(pass);
       setload(true)
       setwarn2(null)
       try{
      const res=  await fetch("https://employee-desk-backend.onrender.com/Login",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({mail,pass}),
        credentials: "include"
      
       })
       const data = await res.json();
       console.log(data.message)
       console.log(data.name)
       setwarn2(data.message)
       setnaam(data.name)
       localStorage.setItem("email",data.mail)
       if(res.status==200){
        if(data.message=="Admin"){
            navigate("/admindashboard")
        }else if(data.message=="Employee"){
            navigate("/employeedashboard")
        }
       }

       }catch(e){
        console.log("err with fetch",e)
       }finally{
        setload(false)
       }
       
       }else{
        setwarn1(true)
       }
    }
    return(
        <>
        

{warn1?<><h1 id="warning">Please Enter The Data😊</h1></>:""}
{warn2?<><h1 id="warning">{warn2}</h1></>:""}
    <div id="parent1">
    <div className="login-wrapper">
      <form className="login-box" onSubmit={senddata}>
        <span>LOGIN</span>
        <input
          type="email"
          placeholder="Email"
          required
          value={mail}
          onChange={(e) => setmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          required
          value={pass}
          onChange={(e) => setpass(e.target.value)}
        />

        {load?<Loader/>:<button type="submit">Login</button>}
      </form>
    </div>
</div>

        </>
    )
}
export default Login;