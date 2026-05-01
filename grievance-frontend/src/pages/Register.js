import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register({ theme }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleRegister = async () => {
    try {
      await axios.post("https://grievance-system-5h08.onrender.com/api/auth/register", {
        ...form,
        role: "student"
      });

      alert("Registered successfully!");
      navigate("/login/student");
    } catch (err) {
      alert("Error registering user");
    }
  };

  return (
    <div style={container(theme)}>
      <div style={card(theme)}>
        <h2>Student Register</h2>

        <input
          placeholder="Name"
          style={input}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
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

        <button style={btn(theme)} onClick={handleRegister}>
          Register
        </button>
      </div>
    </div>
  );
}

const container = (t) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  background: t.bg
});

const card = (t) => ({
  background: t.primary,
  padding: "30px",
  borderRadius: "15px",
  width: "350px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
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
  background: "linear-gradient(135deg, #FF7A18, #FFB347)",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  color: "#fff",
  fontWeight: "bold"
});

export default Register;