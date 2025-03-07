import React, { useState } from "react";

const dummyUsers = [
  { id: 1, name: "John Doe", email: "john@example.com", status: "Active", submissions: 10 },
  { id: 2, name: "Alice Smith", email: "alice@example.com", status: "Banned", submissions: 3 },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", status: "Active", submissions: 5 },
];

const UserManagement = () => {
  const [users, setUsers] = useState(dummyUsers);

  const toggleBanStatus = (id) => {
    setUsers(users.map(user =>
      user.id === id
        ? { ...user, status: user.status === "Active" ? "Banned" : "Active" }
        : user
    ));
  };

  return (
    <div className="card p-4 shadow">
      <h5 className="mb-3">User Management</h5>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Submissions</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <span className={`badge px-3 py-2 ${user.status === "Active" ? "bg-success" : "bg-danger"}`}>
                  {user.status}
                </span>
              </td>
              <td>{user.submissions}</td>
              <td>
                <button
                  className={`btn btn-sm ${user.status === "Active" ? "btn-outline-danger" : "btn-outline-success"}`}
                  onClick={() => toggleBanStatus(user.id)}
                >
                  {user.status === "Active" ? "Ban" : "Unban"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
