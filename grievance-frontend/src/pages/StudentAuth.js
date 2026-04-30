import { useNavigate } from "react-router-dom";

function StudentAuth() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Student Access</h2>

      <button style={btn} onClick={() => navigate("/register")}>
        Register
      </button>

      <button style={btn} onClick={() => navigate("/login/student")}>
        Login
      </button>
    </div>
  );
}

const btn = {
  padding: "12px 25px",
  margin: "10px",
  border: "none",
  borderRadius: "25px",
  background: "linear-gradient(135deg, #6C63FF, #5A54E0)",
  color: "#fff",
  fontWeight: "bold",
  cursor: "pointer"
};

export default StudentAuth;