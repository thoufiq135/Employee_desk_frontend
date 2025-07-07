import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import "./empdata.css";
import { useNavigate } from "react-router-dom";
function EmployeeDetails() {
  const { email } = useParams();
  const [data, setData] = useState([]);
  const [empName, setEmpName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");

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
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`https://employee-desk-backend.onrender.com/admin/employeeData?email=${email}`);
      const json = await res.json();
      if (json.length > 0) {
        setEmpName(json[0].employeeName);
        setData(json);
      }
    };
    fetchData();
  }, [email]);

  const handlePopup = (title, content) => {
    setModalTitle(title);
    setModalContent(content);
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  const handleDownload = () => {
    const exportData = data.map((d) => ({
      Date: new Date(d.date).toLocaleDateString(),
      Login: d.login_Time,
      Logout: d.logout_Time,
      "Permission From": d.Permission_From,
      "Permission To": d.Permission_to,
      Reason: d.Reason,
      Hours: d.No_of_hours,
      Summary: d.Work_summary,
      Status: d.status,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Work Data");

    XLSX.writeFile(workbook, `${empName || "Employee"}_Work_History.xlsx`);
  };

  return (
    <>
      <h2 style={{ textAlign: "center", marginTop: "10px" }}>
        📊 Work Form History of <span style={{ color: "#007acc" }}>{empName}</span>
      </h2>

     

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Login</th>
              <th>Logout</th>
              <th>Permission From</th>
              <th>Permission To</th>
              <th>Reason</th>
              <th>Hours</th>
              <th>Work Summary</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr><td colSpan="9">No data found</td></tr>
            ) : (
              data.map((entry, idx) => (
                <tr key={idx}>
                  <td>{new Date(entry.date).toLocaleDateString()}</td>
                  <td>{entry.login_Time}</td>
                  <td>{entry.logout_Time}</td>
                  <td>{entry.Permission_From}</td>
                  <td>{entry.Permission_to}</td>
                  <td
                    className="clickable"
                    onClick={() => handlePopup("Permission Reason", entry.Reason)}
                  >
                    {entry.Reason?.slice(0, 20)}...
                  </td>
                  <td>{entry.No_of_hours}</td>
                  <td
                    className="clickable"
                    onClick={() => handlePopup("Work Summary", entry.Work_summary)}
                  >
                    {entry.Work_summary?.slice(0, 20)}...
                  </td>
                  <td>{entry.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h3>{modalTitle}</h3>
            <div className="modal-scrollable">
              <p>{modalContent}</p>
            </div>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
       <div style={{ textAlign: "center", marginBottom: "10px" }}>
        <button className="excel-button" onClick={handleDownload}>Export to Excel 📥</button>
      </div>
    </>
  );
}

export default EmployeeDetails;
