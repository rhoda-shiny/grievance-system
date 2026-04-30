import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard({ theme }) {
  const navigate = useNavigate();

  const [view, setView] = useState("users");
  const [users, setUsers] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [filter, setFilter] = useState("");

  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:5000/api/users");
    setUsers(res.data);
  };

  const fetchComplaints = async () => {
    const res = await axios.get("http://localhost:5000/api/complaints");
    setComplaints(res.data);
  };

  useEffect(() => {
    fetchUsers();
    fetchComplaints();
  }, []);

  const updateStatus = async (id, status) => {
    await axios.put(`http://localhost:5000/api/complaints/update/${id}`, { status });
    fetchComplaints();
  };

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const filtered = complaints.filter(c => {
    if (filter && c.category !== filter) return false;

    if (view === "unsolved") {
      return c.status === "Pending" || c.status === "In Progress";
    }

    if (view === "solved") {
      return c.status === "Resolved";
    }

    return false;
  });

  return (
    <div style={page}>

      {/* HEADER */}
      <div style={header}>
        <h2>Admin Dashboard</h2>
        <button style={logoutBtn} onClick={logout}>Logout</button>
      </div>

      {/* TABS */}
      <div style={tabContainer}>
        <button style={tab(view === "users")} onClick={() => setView("users")}>Users</button>
        <button style={tab(view === "unsolved")} onClick={() => setView("unsolved")}>Unsolved</button>
        <button style={tab(view === "solved")} onClick={() => setView("solved")}>Solved</button>
      </div>

      {/* USERS */}
      {view === "users" && (
        <div>
          <h3>Registered Users</h3>

          {users.map(u => (
            <div key={u.user_id} style={card}>
              <p>{u.name}</p>
              <p>{u.email}</p>
            </div>
          ))}
        </div>
      )}

      {/* COMPLAINTS */}
      {(view === "unsolved" || view === "solved") && (
        <div>
          <h3>{view === "unsolved" ? "Unsolved Complaints" : "Solved Complaints"}</h3>

          {/* ✅ CATEGORY DROPDOWN ADDED */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={input}
          >
            <option value="">All Categories</option>

            <option>Exam Issues</option>
            <option>Faculty Complaint</option>
            <option>Timetable Issues</option>

            <option>WiFi / Internet</option>
            <option>Lab Equipment</option>
            <option>Power / Water</option>

            <option>Hostel Room</option>
            <option>Food Quality</option>
            <option>Cleanliness</option>

            <option>Portal / Login Issue</option>
            <option>ID Card Issue</option>

            <option>Fee / Payment</option>
            <option>Scholarship</option>

            <option>Harassment</option>
            <option>Ragging</option>

            <option>Other</option>
          </select>

          {filtered.map(c => (
            <div key={c.complaint_id} style={card2}>
              <p><b>{c.category}</b></p>
              <p>{c.description}</p>
              <p>Status: {c.status}</p>
              <p>Student ID: {c.student_id}</p>

              {view === "unsolved" && (
                <div style={{ display: "flex", gap: "10px" }}>
                  <button style={blueBtn} onClick={() => updateStatus(c.complaint_id, "In Progress")}>
                    In Progress
                  </button>

                  <button style={greenBtn} onClick={() => updateStatus(c.complaint_id, "Resolved")}>
                    Resolve
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* 🎨 CLEAN ADMIN UI (UNCHANGED) */

const page = {
  padding: "30px",
  minHeight: "100vh",
  background: "#f4f7fb"
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "20px"
};

const tabContainer = {
  display: "flex",
  gap: "10px",
  marginBottom: "20px"
};

const tab = (active) => ({
  padding: "10px 18px",
  borderRadius: "20px",
  border: "none",
  cursor: "pointer",
  background: active ? "#6c5ce7" : "#ddd",
  color: active ? "#fff" : "#333",
  fontWeight: "bold"
});

const input = {
  width: "100%",
  padding: "12px",
  margin: "10px 0",
  borderRadius: "10px",
  border: "1px solid #ddd"
};

const card = {
  background: "#fff",
  padding: "15px",
  marginBottom: "10px",
  borderRadius: "12px",
  boxShadow: "0 5px 15px rgba(0,0,0,0.05)"
};

const card2 = {
  background: "#fff",
  padding: "15px",
  marginTop: "10px",
  borderRadius: "12px",
  boxShadow: "0 5px 15px rgba(0,0,0,0.05)"
};

const blueBtn = {
  padding: "8px 14px",
  border: "none",
  borderRadius: "8px",
  background: "#0984e3",
  color: "#fff",
  cursor: "pointer"
};

const greenBtn = {
  padding: "8px 14px",
  border: "none",
  borderRadius: "8px",
  background: "#00b894",
  color: "#fff",
  cursor: "pointer"
};

const logoutBtn = {
  padding: "8px 16px",
  height:"40px",
  background: "#e74c3c",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer"
};

export default AdminDashboard;