import { useNavigate } from "react-router-dom";

function AuthChoice() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Select Role</h2>

      <button
        style={{
          padding: "12px 25px",
          margin: "10px",
          border: "none",
          borderRadius: "25px",
          background: "linear-gradient(135deg, #6C63FF, #5A54E0)",
          color: "#fff",
          fontWeight: "bold",
          cursor: "pointer"
        }}
        onClick={() => navigate("/student-auth")}
      >
        Student
      </button>

      <button
        style={{
          padding: "12px 25px",
          margin: "10px",
          border: "none",
          borderRadius: "25px",
          background: "linear-gradient(135deg, #6C63FF, #5A54E0)",
          color: "#fff",
          fontWeight: "bold",
          cursor: "pointer"
        }}
        onClick={() => navigate("/login/admin")}
      >
        Admin
      </button>
    </div>
  );
}

export default AuthChoice;