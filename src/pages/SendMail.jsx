import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLoadUserQuery } from "../redux/features/api/apiSlice";
import { Sidebar } from "../components/Sidebar/Sidebar";
import toast from "react-hot-toast";
import { useUsersListQuery } from "../redux/features/user/userApi";

const SendMail = () => {
  const [emailData, setEmailData] = useState({
    to: "",
    subject: "",
    message: "",
  });
  const [selectedBranch, setSelectedBranch] = useState("");
  const [branches, setBranches] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const { data: userData } = useLoadUserQuery();
  const { data: usersList } = useUsersListQuery();
console.log(filteredUsers)
  useEffect(() => {
    if (usersList?.data) {
      const uniqueBranches = [...new Set(usersList.data.map(user => user.branch))];
      setBranches(uniqueBranches);
    }
  }, [usersList]);

  const handleBranchChange = (e) => {
    const branch = e.target.value;
    setSelectedBranch(branch);
    if (usersList?.data) {
      
      const filtered = branch==='all'? usersList.data :usersList.data.filter(user => user.branch === branch);

   
      setFilteredUsers(filtered);
      setEmailData((prev) => ({
        ...prev,
        to: filtered.map(user => user.email).join(", "),
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmailData({ ...emailData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/v1/users/send-mail", emailData);
      toast.success(res.data.message);
      setEmailData({ to: "", subject: "", message: "" });
      setSelectedBranch("");
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to send email.");
    }
  };

  return (
    <div className="min-h-screen flex">
      <Sidebar data={userData?.data} className="w-64" />

      <main className="lg:ml-64 min-h-screen w-[85%] bg-gray-100 p-8">
        <div style={{ maxWidth: "600px", margin: "50px auto", padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
          <h2>Send Email to Employees</h2>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "10px" }}>
              <label>Select Branch:</label>
              <select
                value={selectedBranch}
                onChange={handleBranchChange}
                style={{ width: "100%", padding: "8px", margin: "5px 0", border: "1px solid #ddd", borderRadius: "4px" }}
                required
              >
                <option value="">Select Branch</option>
                <option value="all">All Employees</option>
                {branches.map((branch, index) => (
                  <option key={index} value={branch}>
                    {branch}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: "10px" }}>
              <label>To (Auto-filled):</label>
              <input
                type="text"
                name="to"
                value={emailData.to}
                readOnly
                style={{ width: "100%", padding: "8px", margin: "5px 0", border: "1px solid #ddd", borderRadius: "4px", background: "#f3f3f3" }}
              />
            </div>

            <div style={{ marginBottom: "10px" }}>
              <label>Subject:</label>
              <input
                type="text"
                name="subject"
                value={emailData.subject}
                onChange={handleChange}
                style={{ width: "100%", padding: "8px", margin: "5px 0", border: "1px solid #ddd", borderRadius: "4px" }}
                required
              />
            </div>

            <div style={{ marginBottom: "10px" }}>
              <label>Message:</label>
              <textarea
                name="message"
                value={emailData.message}
                onChange={handleChange}
                style={{ width: "100%", padding: "8px", margin: "5px 0", border: "1px solid #ddd", borderRadius: "4px" }}
                rows="5"
                required
              ></textarea>
            </div>

            <button type="submit" style={{ padding: "10px 20px", background: "#007BFF", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>
              Send Email
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default SendMail;
