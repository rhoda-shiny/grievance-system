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
    const res = await axios.get("https://grievance-system-5h08.onrender.com/api/users");
    setUsers(res.data);
  };

  const fetchComplaints = async () => {
    const res = await axios.get("https://grievance-system-5h08.onrender.com/api/complaints");
    setComplaints(res.data);
  };

  useEffect(() => {
    fetchUsers();
    fetchComplaints();
  }, []);

  const updateStatus = async (id, status) => {
    await axios.put(`https://grievance-system-5h08.onrender.com/api/complaints/update/${id}`, { status });
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
      <div style={header}>
        <h2>Admin Dashboard</h2>
        <button style={logoutBtn} onClick={logout}>Logout</button>
      </div>

      <div style={tabContainer}>
        <button style={tab(view === "users")} onClick={() => setView("users")}>Users</button>
        <button style={tab(view === "unsolved")} onClick={() => setView("unsolved")}>Unsolved</button>
        <button style={tab(view === "solved")} onClick={() => setView("solved")}>Solved</button>
      </div>

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

      {(view === "unsolved" || view === "solved") && (
        <div>
          <h3>{view === "unsolved" ? "Unsolved Complaints" : "Solved Complaints"}</h3>

          <select value={filter} onChange={(e) => setFilter(e.target.value)} style={input}>
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

export default AdminDashboard;