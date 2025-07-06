import { Link } from "react-router-dom";
import "./index.css";

function Home() {
  return (
    
    <div className="home-container">
      <header className="hero">
        <h1>📊 Employee Work Progress Desk</h1>
        <p>Track daily work. View task history. Stay accountable.</p>
      </header>

      <section className="features">
        <div className="feature-card">
          <h2>📝 Daily Work Submission</h2>
          <p>Employees submit login time, logout time, hours worked, and a summary every day.</p>
        </div>

        <div className="feature-card">
          <h2>📬 Instant Email Acknowledgment</h2>
          <p>Each submission sends a confirmation email to the employee's inbox.</p>
        </div>

        <div className="feature-card">
          <h2>🗂 Task History</h2>
          <p>Employees can view their submitted tasks anytime within the same week.</p>
        </div>

        <div className="feature-card">
          <h2>🧹 Weekly Auto-Cleanup</h2>
          <p>At the end of each week, all task records are cleaned to keep the system fresh.</p>
        </div>
      </section>

      <section className="tech-stack">
        <h2>⚙️ Tech Stack</h2>
        <p>React.js, Context API, Node.js, Express, MongoDB, Mongoose</p>
      </section>

      <footer className="cta">
        <Link to="/login"><button className="login-btn">Login to Get Started</button></Link>
      </footer>
    </div>
  );
}

export default Home;
