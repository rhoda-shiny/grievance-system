import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function Login({ theme }) {
  const navigate = useNavigate();
  const { role } = useParams();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "https://grievance-system-5h08.onrender.com/api/auth/login",
        form
      );

      localStorage.setItem("user", JSON.stringify(res.data));

      // ✅ SAME LOGIC
      if (res.data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/student");
      }

    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div style={container(theme)}>
      <div style={card(theme)}>

        <h2 style={{ marginBottom: "15px" }}>
          {role === "admin" ? "Admin Login" : "Student Login"}
        </h2>

        <input
          type="email"
          placeholder="Email"
          style={input}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          style={input}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button style={btn(theme)} onClick={handleLogin}>
          Login
        </button>

        {/* SWITCH ROLE */}
        {role === "student" && (
          <button
            style={switchBtn}
            onClick={() => navigate("/login/admin")}
          >
            Login as Admin
          </button>
        )}

      </div>
    </div>
  );
}

/* ✅ UI STYLES (RESTORED — NOT CHANGED) */

const container = (t) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  background: t?.bg || "#f4f7fb"
});

const card = (t) => ({
  background: t?.primary || "#ffffff",
  padding: "35px",
  borderRadius: "16px",
  width: "340px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
  textAlign: "center"
});

const input = {
  width: "100%",
  padding: "12px",
  margin: "12px 0",
  borderRadius: "10px",
  border: "1px solid #ccc",
  outline: "none"
};

const btn = (t) => ({
  width: "100%",
  padding: "12px",
  background: "linear-gradient(135deg, #6C63FF, #5A54E0)",
  color: "#fff",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "bold",
  marginTop: "10px"
});

const switchBtn = {
  marginTop: "12px",
  border: "none",
  background: "transparent",
  color: "#6C63FF",
  cursor: "pointer",
  fontWeight: "bold"
};

export default Login;