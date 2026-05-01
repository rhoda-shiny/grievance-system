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
    const res = await axios.get("https://grievance-system-5h08.onrender.com/api/complaints");

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
      await axios.post("https://grievance-system-5h08.onrender.com/api/complaints/add", {
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
    <div style={{ padding: "30px" }}>
      <h2>Student Dashboard</h2>
    </div>
  );
}

export default StudentDashboard;