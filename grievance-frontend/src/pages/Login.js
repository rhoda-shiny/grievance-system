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
      const res = await axios.post("https://grievance-system-5h08.onrender.com/api/auth/login", form);

      localStorage.setItem("user", JSON.stringify(res.data));

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
    <div>
      <h2>{role === "admin" ? "Admin Login" : "Student Login"}</h2>

      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;