import "./empdata.css";
import Clock from "./clock";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function Empdata() {
  const [mail, setMail] = useState(null);
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const isauth = async () => {
      try {
        const response = await fetch("https://employee-desk-backend.onrender.com/verify_token", {
          credentials: "include",
        });

        if (response.status !== 200) {
          navigate("/login");
          return;
        }

        const resdata = await response.json();
        const email = resdata.user.mail;
        setMail(email);

        const empresponse = await fetch(
          `https://employee-desk-backend.onrender.com/empdata?mail=${email}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const empdata = await empresponse.json();
        setData(empdata);
      } catch (e) {
        console.log(e);
      }
    };

    isauth();
  }, [navigate]);

  const handlePopup = (title, content) => {
    setModalTitle(title);
    setModalContent(content);
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  const handleExportToExcel = () => {
    const formatted = data.map((entry) => ({
      Date: new Date(entry.date).toLocaleDateString(),
      "Login Time": entry.login_Time,
      "Logout Time": entry.logout_Time,
      "Permission From": entry.Permission_From,
      "Permission To": entry.Permission_to,
      "Permission Reason": entry.Reason,
      "Hours Worked": entry.No_of_hours,
      "Work Summary": entry.Work_summary,
      Status: entry.status,
    }));

    const worksheet = XLSX.utils.json_to_sheet(formatted);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Work Report");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, `Work_Report_${new Date().toLocaleDateString()}.xlsx`);
  };

  return (
    <>
      <Clock />
      <h2 style={{ textAlign: "center", marginTop: "10px" }}>📝 Your Work Form History</h2>

   

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
         <div style={{ textAlign: "center", margin: "10px" }}>
        <button onClick={handleExportToExcel}>⬇ Export to Excel</button>
      </div>
    </>
  );
}

export default Empdata;
