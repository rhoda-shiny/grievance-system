import { useEffect, useState } from "react";
import axios from "axios";

function Users({ theme }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/users")
      .then(res => setUsers(res.data))
      .catch(() => alert("Error fetching users"));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Registered Users</h2>

      {users.map(u => (
        <div key={u.user_id} style={{
          background: theme.primary,
          padding: "10px",
          margin: "10px 0",
          borderRadius: "8px"
        }}>
          <p>{u.name}</p>
          <p>{u.email}</p>
        </div>
      ))}
    </div>
  );
}

export default Users;