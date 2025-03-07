import React, { useState } from "react";

const dummyUsers = [
  { id: 1, name: "John Doe", eventsSubmitted: 5, status: "Active" },
  { id: 2, name: "Alice Smith", eventsSubmitted: 3, status: "Banned" },
];

const UserManagement = () => {
  const [users, setUsers] = useState(dummyUsers);

  const toggleBan = (id) => {
    setUsers(users.map(user =>
      user.id === id ? { ...user, status: user.status === "Active" ? "Banned" : "Active" } : user
    ));
  };

  return (
    <div className="card p-4 shadow mt-4">
      <h5 className="mb-3">User Management</h5>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Events Submitted</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.eventsSubmitted}</td>
              <td>
                <span className={`badge px-3 py-2 ${user.status === "Active" ? "bg-success" : "bg-danger"}`}>
                  {user.status}
                </span>
              </td>
              <td>
                <button className="btn btn-sm btn-warning" onClick={() => toggleBan(user.id)}>
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
