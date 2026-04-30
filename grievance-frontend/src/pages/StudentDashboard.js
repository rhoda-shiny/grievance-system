import { useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";

function StudentDashboard({ theme }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [form, setForm] = useState({
    category: "",
    description: "",
    image: null
  });

  const [complaints, setComplaints] = useState([]);
  const [showList, setShowList] = useState(false);

  const fetchData = useCallback(async () => {
    const res = await axios.get("http://localhost:5000/api/complaints");

    setComplaints(
      res.data.filter(c => c.student_id === user.user_id)
    );
  }, [user.user_id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const submit = async () => {
    if (!form.category || !form.description) {
      alert("Please fill all fields");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/complaints/add", {
        student_id: user.user_id,
        category: form.category,
        description: form.description
      });

      setForm({ category: "", description: "", image: null });
      alert("Complaint submitted!");

      fetchData();
    } catch (err) {
      console.log(err);
      alert("Error submitting complaint");
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div style={page}>

      {/* HEADER */}
      <div style={header}>
        <div>
          <h2 style={title}>🎓 Student Dashboard</h2>

          {/* ✅ ADDED WELCOME MESSAGE */}
          <p style={{ marginTop: "5px", color: "#555" }}>
            <h2>Welcome, <b>{user?.name}</b> 👋</h2>
          </p>
        </div>

        <button style={logoutBtn} onClick={logout}>Logout</button>
      </div>

      {/* TOGGLE */}
      <button style={toggleBtn} onClick={() => setShowList(!showList)}>
        {showList ? "➕ Submit Complaint" : "📄 View Complaints"}
      </button>

      {/* FORM */}
      {!showList && (
        <div style={centerWrapper}>
          <div style={card}>
            <h3 style={{ marginBottom: "15px" }}>Submit Complaint</h3>

            <select
              value={form.category}
              onChange={(e) =>
                setForm({ ...form, category: e.target.value })
              }
              style={input}
            >
              <option value="">Select Category</option>

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

            <textarea
              placeholder="Describe your issue..."
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              style={textarea}
            />

            <input
              type="file"
              onChange={(e) =>
                setForm({ ...form, image: e.target.files[0] })
              }
              style={{ margin: "10px 0" }}
            />

            <button style={submitBtn} onClick={submit}>
              Submit Complaint
            </button>
          </div>
        </div>
      )}

      {/* LIST */}
      {showList && (
        <div style={{ marginTop: "20px" }}>
          <h3>Your Complaints</h3>

          {complaints.length === 0 && <p>No complaints yet</p>}

          {complaints.map(c => (
            <div key={c.complaint_id} style={item}>
              <p><b>{c.category}</b></p>
              <p>{c.description}</p>

              <p style={{
                color:
                  c.status === "Pending"
                    ? "#f39c12"
                    : c.status === "In Progress"
                    ? "#2980b9"
                    : "#27ae60"
              }}>
                Status: {c.status}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* SAME UI (UNCHANGED) */

const page = {
  padding: "30px",
  minHeight: "100vh",
  background: "#f4f7fb"
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px"
};

const title = {
  fontWeight: "600",
  color: "#2c3e50"
};

const centerWrapper = {
  display: "flex",
  justifyContent: "center",
  marginTop: "20px"
};

const card = {
  background: "#ffffff",
  padding: "30px",
  borderRadius: "16px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
  width: "100%",
  maxWidth: "500px"
};

const input = {
  width: "100%",
  padding: "12px",
  margin: "10px 0",
  borderRadius: "10px",
  border: "1px solid #ddd"
};

const textarea = {
  width: "100%",
  padding: "12px",
  margin: "10px 0",
  borderRadius: "10px",
  border: "1px solid #ddd",
  minHeight: "100px"
};

const toggleBtn = {
  padding: "10px 18px",
  borderRadius: "20px",
  border: "none",
  background: "#6c5ce7",
  color: "#fff",
  cursor: "pointer",
  marginBottom: "10px"
};

const submitBtn = {
  width: "100%",
  padding: "12px",
  background: "#00b894",
  color: "#fff",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  marginTop: "10px"
};

const item = {
  background: "#fff",
  padding: "15px",
  marginTop: "10px",
  borderRadius: "12px",
  boxShadow: "0 5px 15px rgba(0,0,0,0.05)"
};

const logoutBtn = {
  padding: "8px 16px",
  background: "#e74c3c",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer"
};

export default StudentDashboard;