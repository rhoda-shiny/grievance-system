import { useEffect, useState } from "react";
import axios from "axios";

function Users({ theme }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("https://grievance-system-5h08.onrender.com/api/users")
      .then(res => setUsers(res.data))
      .catch(() => alert("Error fetching users"));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Registered Users</h2>

      {users.map(u => (
        <div key={u.user_id}>
          <p>{u.name}</p>
          <p>{u.email}</p>
        </div>
      ))}
    </div>
  );
}

export default Users;