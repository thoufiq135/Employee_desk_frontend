import { useEffect,useState } from "react";
import {useAppContext} from "./context"
import"./App.css"
function Clock(){
        const {naam}=useAppContext()
    const[dateTime,setdateTime]=useState(new Date())
    useEffect(()=>{
        const timer=setInterval(() => {
            setdateTime(new Date());
             
        }, 1000);
        return () => clearInterval(timer)
    },[])
    return(
        <>
       <div id="par">
         <div id="date">Date:{dateTime.toLocaleDateString()}<br/>
            Time:{dateTime.toLocaleTimeString()}
         </div>
         
      
     
       </div>
        
        </>
    )
}
export default Clock;