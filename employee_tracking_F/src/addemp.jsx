import { useState ,useEffect} from "react";
import "./addform.css";
import { useAppContext } from "./context";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom";

function Createemp() {
  const navigate=useNavigate()
   useEffect(()=>{
         const isauth=async()=>{
          try{
            const response=await fetch("https://employeedeskbackend-env.up.railway.app/verify_token",{
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
  const [warning, setwarning] = useState(null);
  const [mail, setmail] = useState("");
  const [pass, setpass] = useState("");
  const [name, setname] = useState("");
  const [role, setrole] = useState("");
   const [pho, setpho] = useState("");
  const { addemp, setaddemp } = useAppContext();
  const [loading, setloading] = useState(false);

  async function senddata(e) {
    e.preventDefault();
    if (!mail || !pass || !name || !role) {
      setwarning("⚠️ Please fill all fields");
      setTimeout(() => setwarning(null), 5000);
    } else {
      try {
        setloading(true);
        const res = await fetch("https://employeedeskbackend-env.up.railway.app/NewUser", {
          method: "POST",
          body: JSON.stringify({ mail, pass, name, role,pho }),
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const response = await res.json();
        if (res.status === 200) {
          setwarning("Successfully added ✅");
          setTimeout(() => setaddemp(false), 2000);
        } else if (res.status === 400) {
          setwarning(response.message);
          setTimeout(() => setwarning(null), 5000);
        }
      } catch (e) {
        console.log(e);
      } finally {
        setloading(false);
      }
    }
  }

  function setback() {
    setaddemp(false);
  }

  return (
    <>
      {warning && <div id="war">{warning}</div>}
      <div id="par3">
      <div id="login-container">
  <form className="login-form" onSubmit={senddata}>
    <h2 className="login-title">ADD <FontAwesomeIcon icon={faPlus} beatFade style={{color: "#3f63a2",}} /></h2>

    <input
      type="text"
      placeholder="Name"
      onChange={(e) => setname(e.target.value)}
      className="login-input"
      required
    />

    <input
      type="email"
      placeholder="Email"
      onChange={(e) => setmail(e.target.value)}
      className="login-input"
      required
    />

    <input
      type="password"
      placeholder="Password"
      onChange={(e) => setpass(e.target.value)}
      className="login-input"
      required
    />
     <input
      type="number"
      placeholder="Mobile.no"
      onChange={(e) => setpho(e.target.value)}
      className="login-input"
      id="mobile"
      required
    />

    <select
      value={role}
      onChange={(e) => setrole(e.target.value)}
      className="login-input"
      required
    >
      <option value="">-- Select Role --</option>
      <option value="Admin">Admin</option>
      <option value="Employee">Employee</option>
    </select>

    <button type="submit" className="login-button">
      {loading ? "Loading..." : "Submit"}
    </button>

    <button type="button" onClick={()=>{navigate("/admindashboard")}} className="login-button cancel-button">
      Cancel
    </button>
  </form>

  {warning && <div id="login-warning">{warning}</div>}
</div>


      </div>
    </>
  );
}

export default Createemp;
