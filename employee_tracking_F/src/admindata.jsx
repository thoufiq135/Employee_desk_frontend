import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Admindata() {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

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
  useEffect(() => {
    const fetchEmployees = async () => {
      const res = await fetch("https://employee-desk-backend.onrender.com/admin/employees");
      const data = await res.json();
      setEmployees(data);
    };
    fetchEmployees();
  }, []);

  const handleSelect = (email) => {
    navigate(`/admindashboard/employee/${email}`);
  };

  return (
    <div>
      <h2>👥 All Employees</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp, idx) => (
            <tr key={idx} onClick={() => handleSelect(emp.Email)} style={{ cursor: "pointer" }}>
              <td>{emp.name}</td>
              <td>{emp.Email}</td>
              <td>{emp.Role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Admindata;
