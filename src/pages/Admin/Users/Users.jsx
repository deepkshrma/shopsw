import React, { useEffect, useState } from "react";
import AdminSidebar from "../../../components/Admin/AdminSidebar/AdminSidebar";
import './Users.css'

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:8080/users", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });

        const result = await response.json();
        if (result.success) {
          setUsers(result.users);
        } else {
          console.error("Failed to fetch users");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="admin-container" style={{ display: "flex" }}>
      <AdminSidebar />
      <div className="admin-content" style={{ padding: "60px", flex: 1 }}>
        <h2>Users</h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
