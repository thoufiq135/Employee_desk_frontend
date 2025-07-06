import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Admindata() {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      const res = await fetch("http://localhost:5000/admin/employees");
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
