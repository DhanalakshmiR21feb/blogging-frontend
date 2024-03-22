import React from 'react';
import axios from "axios";
import { API_BASE_URL } from '../../config';

const Comment = ({ comment, onDelete,blogId }) => {
  const handleDelete = async () => {
    try {
        const token = localStorage.getItem("token");
        const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.delete(`${API_BASE_URL}/blogs/${blogId}/comments/${comment._id}`,config);
      onDelete(comment._id); // Notify parent component to remove the deleted comment from the UI
    } catch (error) {
      console.error('Error deleting comment:', error.response.data);
    }
  };

  return (
    <div className="comment">
      <span>{comment.text}</span>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default Comment;
