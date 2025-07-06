import { useState } from 'react'
import {BrowserRouter,Routes,Route, Link} from "react-router-dom"
import './App.css'
import Home from "./Home"
import Login from "./login"
import Admin from "./admindashboard"
import Employee from './employeedashboard'
import Removeemp from './removeemp'
import Createemp from "./addemp"
import Form from "./empform"
import Empdata from './employeedata'
import Admindata from './admindata'
import EmployeeDetails from './employee_details'
function App() {
  const [count, setCount] = useState(0)

  return (
   
    
   <BrowserRouter>
      
   <Routes>
 
    <Route path='/' element={<Home/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path="/admindashboard" element={<Admin/>}/>
    <Route path="/employeedashboard" element={<Employee/>}/>
    <Route path="/admindashboard/Remove_Employee" element={<Removeemp/>}/>
    <Route path="/admindashboard/ADD_Employee" element={<Createemp/>}/>
        <Route path="/employeedashboard/fill_Form" element={<Form/>}/>
         <Route path="/employeedashboard/Employee_data" element={<Empdata/>}/>
          <Route path="/admindashboard/Employee_Data" element={<Admindata/>}/>
          <Route path="/admindashboard/employee/:email" element={<EmployeeDetails />} />
    
   </Routes>
   </BrowserRouter>
  )
}

export default App
