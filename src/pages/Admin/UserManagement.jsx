import React, { useState } from "react";
import "./Admin.css";
import { FaEye, FaCheckCircle, FaTimesCircle, FaTrash, FaSearch, FaPlusCircle } from "react-icons/fa";  // Plus button for creating new users

const UserManagement = () => {
    const [users, setUsers] = useState([
        { id: 1, name: "Cyclist A", email: "cyclistA@gmail.com", phone: "08133768472", role: "Cyclist", department: "Radiology", verified: false },
        { id: 2, name: "Shop Owner B", email: "shopB@gmail.com", phone: "08132962607", role: "Shop Owner", department: "Internal Medicine", verified: true },
        { id: 3, name: "Cyclist C", email: "cyclistC@gmail.com", phone: "08133768472", role: "Cyclist", department: "Pathology", verified: true },
        { id: 4, name: "Shop Owner D", email: "shopD@gmail.com", phone: "08133768472", role: "Shop Owner", department: "Orthopedic", verified: false },
    ]);

    const [showCreateForm, setShowCreateForm] = useState(false);
    const [newUser, setNewUser] = useState({
        name: "",
        email: "",
        phone: "",
        role: "Cyclist",
        department: "Radiology",
        verified: false,
    });

    // Filter states
    const [searchTerm, setSearchTerm] = useState("");
    const [filterRole, setFilterRole] = useState("All");
    const [filterVerified, setFilterVerified] = useState("All");

    const handleCreateNewUser = () => {
        setShowCreateForm(true);
    };

    const handleCloseForm = () => {
        setShowCreateForm(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser({ ...newUser, [name]: value });
    };

    const handleCreateUser = (e) => {
        e.preventDefault(); // Prevent default form submission
        const newId = users.length + 1; // Simple way to generate new ID
        setUsers([...users, { ...newUser, id: newId }]);
        setShowCreateForm(false); // Close the modal after adding the user
        setNewUser({ name: "", email: "", phone: "", role: "Cyclist", department: "Radiology", verified: false }); // Reset form
    };

    const handleViewDetails = (user) => {
        alert(`User Details:\nName: ${user.name}\nEmail: ${user.email}\nPhone: ${user.phone}\nRole: ${user.role}\nDepartment: ${user.department}`);
    };

    const handleVerify = (id) => {
        setUsers(users.map(user => user.id === id ? { ...user, verified: true } : user));
    };

    const handleSuspend = (id) => {
        setUsers(users.filter(user => user.id !== id));
    };

    // Filter users based on search and selected filters
    const filteredUsers = users.filter(user => {
        const matchesSearch =
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.phone.includes(searchTerm);

        const matchesRole =
            filterRole === "All" || user.role === filterRole;

        const matchesVerified =
            filterVerified === "All" ||
            (filterVerified === "Verified" && user.verified) ||
            (filterVerified === "Not Verified" && !user.verified);

        return matchesSearch && matchesRole && matchesVerified;
    });

    return (
        <div className="admin-container">
            <h1>User & Shop Management</h1>
            <p>Manage user profiles and shop authenticity.</p>

            {/* Search and Filter Controls */}
            <div className="admin-controls">
                <div className="search-box">
                    <FaSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search by name, email or phone..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <select className="role-filter" value={filterRole} onChange={(e) => setFilterRole(e.target.value)}>
                    <option value="All">All Roles</option>
                    <option value="Cyclist">Cyclist</option>
                    <option value="Shop Owner">Shop Owner</option>
                    <option value="Admin">Admin</option>
                </select>

                <select className="verified-filter" value={filterVerified} onChange={(e) => setFilterVerified(e.target.value)}>
                    <option value="All">All Users</option>
                    <option value="Verified">Verified</option>
                    <option value="Not Verified">Not Verified</option>
                </select>

                <button className="create-user-btn" onClick={handleCreateNewUser}>
                    <FaPlusCircle /> Create New User
                </button>
            </div>

            {/* User List Table */}
            <div className="admin-table">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email Address</th>
                            <th>Phone</th>
                            <th>Role</th>
                            <th>Department</th>
                            <th>Verified</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map(user => (
                                <tr key={user.id}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.role}</td>
                                    <td>{user.department}</td>
                                    <td>
                                        {user.verified ? (
                                            <FaCheckCircle className="verified-icon" />
                                        ) : (
                                            <FaTimesCircle className="not-verified-icon" />
                                        )}
                                    </td>
                                    <td>
                                        <button className="action-button view" onClick={() => handleViewDetails(user)}>
                                            <FaEye />
                                        </button>
                                        {!user.verified && (
                                            <button className="action-button verify" onClick={() => handleVerify(user.id)}>
                                                <FaCheckCircle />
                                            </button>
                                        )}
                                        <button className="action-button suspend" onClick={() => handleSuspend(user.id)}>
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="no-results">No users found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Create New User Form Modal */}
            {showCreateForm && (
                <div className="modal-overlay">
                    <div className="create-user-form">
                        <h2>Create New User</h2>
                        <form onSubmit={handleCreateUser}>
                            <label>Name</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Enter name"
                                value={newUser.name}
                                onChange={handleInputChange}
                            />

                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter email"
                                value={newUser.email}
                                onChange={handleInputChange}
                            />

                            <label>Phone</label>
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Enter phone"
                                value={newUser.phone}
                                onChange={handleInputChange}
                            />

                            <label>Role</label>
                            <select
                                name="role"
                                value={newUser.role}
                                onChange={handleInputChange}
                            >
                                <option value="Cyclist">Cyclist</option>
                                <option value="Shop Owner">Shop Owner</option>
                                <option value="Admin">Admin</option>
                            </select>

                            <label>Department</label>
                            <input
                                type="text"
                                name="department"
                                placeholder="Enter department"
                                value={newUser.department}
                                onChange={handleInputChange}
                            />

                            <button type="submit">Create User</button>
                            <button type="button" onClick={handleCloseForm}>Cancel</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserManagement;
