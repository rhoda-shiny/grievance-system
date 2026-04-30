import { useNavigate } from "react-router-dom";

function Navbar({ theme, toggle }) {
  const navigate = useNavigate();

  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      padding: "15px 40px",
      background: theme.primary,
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
    }}>
      <h2>🎓 Grievance Portal</h2>

      <div>
        <button style={{
          padding: "12px 25px",
          margin: "10px",
          border: "none",
          borderRadius: "25px",
          background: "#6C63FF",
          color: "#fff",
          cursor: "pointer"
        }} onClick={() => navigate("/auth")}>Login</button>
        <button style={{
          padding: "12px 25px",
          margin: "10px",
          border: "none",
          borderRadius: "25px",
          background: "#6C63FF",
          color: "#fff",
          cursor: "pointer"
        }} onClick={toggle}>🌙</button>
      </div>
    </div>
  );
}

export default Navbar;