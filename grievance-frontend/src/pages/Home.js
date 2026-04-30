import { useNavigate } from "react-router-dom";

function Home({ theme, toggle }) {
  const navigate = useNavigate();

  return (
    <div style={{ background: theme.bg, minHeight: "100vh" }}>
      
      {/* NAVBAR */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 30px",
        background: theme.primary
      }}>
        <h2>🎓 Grievance Portal</h2>

        <div>
          {/* 🌙 THEME TOGGLE */}
          <button
            onClick={toggle}
            style={{
              marginRight: "10px",
              padding: "8px 15px",
              borderRadius: "20px",
              border: "none",
              cursor: "pointer"
            }}
          >
            🌙
          </button>

          {/* 👤 STUDENT LOGIN (DEFAULT) */}
          <button
            onClick={() => navigate("/login/student")}
            style={{
              marginRight: "10px",
              padding: "8px 15px",
              borderRadius: "20px",
              border: "none",
              cursor: "pointer"
            }}
          >
            Login
          </button>

          {/* 🛠 ADMIN LOGIN */}
          <button
            onClick={() => navigate("/login/admin")}
            style={{
              padding: "8px 15px",
              borderRadius: "20px",
              border: "none",
              cursor: "pointer",
              background: "#ff6b6b",
              color: "#fff"
            }}
          >
            Admin
          </button>
        </div>
      </div>

      {/* HERO SECTION */}
      <div style={hero}>
        <h1 style={title}>Smart Digital Grievance System</h1>

        <p style={subtitle}>
          Empowering students to raise concerns and ensuring fast, transparent resolutions.
        </p>

        {/* ✅ GET STARTED → REGISTER */}
        <button style={ctaBtn} onClick={() => navigate("/register")}>
          Get Started
        </button>
      </div>

      {/* FEATURES */}
      <div style={section}>
        <h2 style={heading}>✨ Key Features</h2>

        <div style={grid}>
          <div style={card}>
            <h3>📢 Easy Complaints</h3>
            <p>Submit grievances quickly with category and description.</p>
          </div>

          <div style={card}>
            <h3>📊 Track Status</h3>
            <p>Monitor complaints with real-time updates.</p>
          </div>

          <div style={card}>
            <h3>⚙️ Admin Control</h3>
            <p>Admins manage and resolve issues efficiently.</p>
          </div>

          <div style={card}>
            <h3>✅ Transparency</h3>
            <p>Every complaint is tracked until resolution.</p>
          </div>
        </div>
      </div>

      {/* ABOUT */}
      <div style={sectionAlt}>
        <h2 style={heading}>About the Platform</h2>

        <p style={text}>
          This system bridges the gap between students and administration by providing a structured way to report,
          manage, and resolve grievances efficiently. It ensures accountability and faster communication.
        </p>
      </div>

      {/* MISSION & VISION */}
      <div style={section}>
        <div style={grid}>
          <div style={card}>
            <h3>🎯 Mission</h3>
            <p>To provide a transparent and efficient grievance handling system.</p>
          </div>

          <div style={card}>
            <h3>🌟 Vision</h3>
            <p>To build a responsive and digitally empowered campus environment.</p>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={footer}>
        <p>© 2026 Smart Grievance System | Built for Students</p>
      </div>
    </div>
  );
}

export default Home;


/* 🎨 STYLES (UNCHANGED) */

const hero = {
  textAlign: "center",
  padding: "100px 20px",
  background: "linear-gradient(135deg, #9795c1, #d0ceec)",
  color: "#fff"
};

const title = {
  fontSize: "40px",
  marginBottom: "20px"
};

const subtitle = {
  fontSize: "18px",
  maxWidth: "600px",
  margin: "0 auto 30px"
};

const ctaBtn = {
  padding: "14px 30px",
  border: "none",
  borderRadius: "30px",
  background: "#fff",
  color: "#5A54E0",
  fontWeight: "bold",
  cursor: "pointer",
  fontSize: "16px"
};

const section = {
  padding: "60px 20px",
  textAlign: "center"
};

const sectionAlt = {
  padding: "60px 20px",
  textAlign: "center",
  background: "#f5f5f5"
};

const heading = {
  fontSize: "28px",
  marginBottom: "30px"
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "20px",
  maxWidth: "1000px",
  margin: "auto"
};

const card = {
  background: "#fff",
  padding: "25px",
  borderRadius: "15px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.1)"
};

const text = {
  maxWidth: "800px",
  margin: "auto",
  fontSize: "16px",
  lineHeight: "1.6"
};

const footer = {
  textAlign: "center",
  padding: "20px",
  background: "#222",
  color: "#fff",
  marginTop: "40px"
};