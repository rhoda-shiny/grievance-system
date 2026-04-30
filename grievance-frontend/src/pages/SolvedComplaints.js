import { useEffect, useState } from "react";
import axios from "axios";

function SolvedComplaints({ theme }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/complaints")
      .then(res => setData(res.data.filter(c => c.status === "Resolved")));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>✅ Solved Complaints</h2>

      {data.map(c => (
        <div key={c.complaint_id} style={{
          background: theme.primary,
          margin: 10,
          padding: 10,
          borderRadius: 10
        }}>
          <p>{c.description}</p>
        </div>
      ))}
    </div>
  );
}

export default SolvedComplaints;