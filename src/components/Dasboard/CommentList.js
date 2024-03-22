import React, { useState, useEffect } from 'react';
import axios from "axios";
import Comment from './Comment';
import { API_BASE_URL } from '../../config';

const CommentsList = ({ blogId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchCommentsForBlog = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
        const res = await axios.get(`${API_BASE_URL}/blogs/${blogId}/comments`,config);
        setComments(res.data);
      } catch (error) {
        console.error('Error fetching comments:', error.response.data);
      }
    };

    fetchCommentsForBlog();
  }, [blogId]);

  const handleDeleteComment = (deletedCommentId) => {
    setComments((prevComments) =>
      prevComments.filter((comment) => comment._id !== deletedCommentId)
    );
  };

  return (
    <div className="comments-list">
      <h2>Comments</h2>
      {comments.map((comment) => (
        <Comment key={comment._id} comment={comment} onDelete={handleDeleteComment} blogId={blogId} />
      ))}
    </div>
  );
};

export default CommentsList;
