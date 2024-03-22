import React, { useState } from "react";
import { API_BASE_URL } from "../../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddComment = ({onClose,blogId,fetchBlogs}) => {
   // console.log("inside add comment ",blogId);
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    text: "" });
  const {text} = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    //console.log("inside add comment modal",blogId);
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
     // console.log(body);
      const res = await axios.post(
        `${API_BASE_URL}/blogs/${blogId}/comments`,
        body,
        config
      );
      //console.log("Comment Added Successfully",res.data);
      onClose(blogId); 
      fetchBlogs(blogId);
      alert("Comment Added Successfully");
       navigate("/dashboard");
    } catch (err) {
      console.error("Comment creation failed", err.response);
      alert("Comment creation failed");
    }
  };
  return (
    <div className="modal-background">
    <div className="modal-add-content">
      <span className="close" onClick={onClose}>&times;</span>
                 <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Enter your comment"
          name="text"
          value={text}
          onChange={onChange}
          required
        />
               <button type="submit" >Add Comment</button>
      </form>
      </div>
    </div>
  );
};

export default AddComment;
