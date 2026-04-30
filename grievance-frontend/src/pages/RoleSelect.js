import { useNavigate } from "react-router-dom";

function RoleSelect({ theme }) {
  const navigate = useNavigate();

  return (
    <div style={center}>
      <div style={card(theme)}>
        <h2>Select Role</h2>

        <button style={btn(theme)} onClick={() => navigate("/login/student")}>
          Student Login
        </button>

        <button style={btn(theme)} onClick={() => navigate("/register")}>
          Student Register
        </button>

        <button style={btn(theme)} onClick={() => navigate("/login/admin")}>
          Admin Login
        </button>
      </div>
    </div>
  );
}

const center = {
  display: "flex",
  justifyContent: "center",
  marginTop: "100px"
};

const card = (t) => ({
  background: t.primary,
  padding: "40px",
  borderRadius: "15px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
  textAlign: "center"
});

const btn = (t) => ({
  display: "block",
  margin: "15px auto",
  padding: "12px",
  width: "200px",
  border: "none",
  borderRadius: "8px",
  background: t.accent,
  cursor: "pointer"
});

export default RoleSelect;