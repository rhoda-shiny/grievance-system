import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import { lightTheme, darkTheme } from "./theme";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AuthChoice from "./pages/AuthChoice";
import StudentAuth from "./pages/StudentAuth";
import Users from "./pages/Users";
import SolvedComplaints from "./pages/SolvedComplaints";

function App() {
  const [dark, setDark] = useState(false);
  const theme = dark ? darkTheme : lightTheme;

  const toggleTheme = () => {
    setDark(!dark);
  };

  return (
    <div style={{
      background: theme.background,
      color: theme.text,
      minHeight: "100vh"
    }}>
      <BrowserRouter>
        <Routes>

          {/* HOME */}
          <Route path="/" element={<Home theme={theme} toggle={toggleTheme} />} />

          {/* ROLE SELECT */}
          <Route path="/auth" element={<AuthChoice theme={theme} />} />

          {/* STUDENT AUTH (REGISTER / LOGIN) */}
          <Route path="/student-auth" element={<StudentAuth theme={theme} />} />

          {/* REGISTER */}
          <Route path="/register" element={<Register theme={theme} />} />

          {/* LOGIN */}
          <Route path="/login/:role" element={<Login theme={theme} />} />

          {/* DASHBOARDS */}
          <Route path="/student" element={<StudentDashboard theme={theme} />} />
          <Route path="/admin" element={<AdminDashboard theme={theme} />} />

          {/* EXTRA */}
          <Route path="/solved" element={<SolvedComplaints theme={theme} />} />
          <Route path="/users" element={<Users theme={theme} />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;