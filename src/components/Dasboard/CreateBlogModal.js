import React, { useState } from "react";
import { API_BASE_URL } from "../../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const CreateBlog = ({onClose}) => {
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const { title, description } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error('Token not found');
        return;
      }
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const body = JSON.stringify(formData);
      console.log(body);
      const res = await axios.post(
        `${API_BASE_URL}/blogs/`,
        body,
        config
      );
      console.log("BLog Created Successfully",res.data);
      alert("Blog Created Successfully");
       navigate("/dashboard");
    } catch (err) {
      console.error("Blog creation failed", err.response.data);
      alert("Blog creation failed");
    }
  };
  return (
    <div className="modal-background">
    <div className="modal-content">
      <span className="close" onClick={onClose}>&times;</span>
            <h1>Add New Blog</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="title"
          name="title"
          value={title}
          onChange={onChange}
          required
        />
        <input
          type="text"
          placeholder="description"
          name="description"
          value={description}
          onChange={onChange}
          required
        />
      <button type="submit">Add Blog</button>
      </form>
      </div>
    </div>
  );
};

export default CreateBlog;
