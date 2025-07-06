
import { useContext,createContext,useState, useEffect } from "react";
const Context=createContext();
export const Contextprovider=({children})=>{
    const[naam,setnaam]=useState(()=>{
        return localStorage.getItem("naam")||""
    })
    const[addemp,setaddemp]=useState(false)
    const[removeemp,setremove]=useState(false)
    useEffect(()=>{
        if(naam){
            localStorage.setItem("naam",naam);
        }
    },[naam])
    return(
    <Context.Provider value={{naam,setnaam,addemp,setaddemp,removeemp,setremove}}>
        {children}
    </Context.Provider>
)
}

export const useAppContext=()=>useContext(Context);