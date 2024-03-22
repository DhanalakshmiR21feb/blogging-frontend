import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../config";
import CreateBlog from "./CreateBlogModal";
import "./dassboard.css";
import AddComment from "./AddComment";
import CommentsList from "./CommentList";

const Dashboard = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token") ? true : false;
  const token = localStorage.getItem("token");
  const [blogs, setBlogs] = useState([]);
  const [showCreateBlogModal, setCreateBlogModal] = useState(false);
  const [showAddNewCommentModal, setshowAddNewCommentModal] = useState(false);
  const [currentBlogId, setcurrentBlogId] = useState(null);

  const fetchBlogs = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.get(`${API_BASE_URL}/blogs/`, config);
      setBlogs(res.data);
    } catch (err) {
      console.error(`Error`);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const logout = () => {
    try {
      localStorage.removeItem("token");
      alert("logged out successfully");
      // console.log("logged out successfully");
      navigate("/");
    } catch (err) {
      console.error("logout failed", err.response.data);
      alert("logout failed");
    }
  };
  const toggleCreate = () => {
    setCreateBlogModal(!showCreateBlogModal);
  };
  const toggleAddComment = (blogId) => {
    setshowAddNewCommentModal(!showAddNewCommentModal);
    setcurrentBlogId(blogId);
  };
  return (
    <div>
      <h1>Welcome to Blog Dashboard</h1>
      {isLoggedIn && (
        <div>
          <input type="button" name="Logout" value="Logout" onClick={logout} />
          <input
            type="button"
            name="createBlog"
            value="Create Blog"
            onClick={toggleCreate}
          />
          {showCreateBlogModal && <CreateBlog onClose={toggleCreate} />}
          <div className="blog-list-container">
            <h1>Blog List</h1>
            <div className="blog-container">
              {blogs.length>0?(
                blogs.map((blog) => (
                  <div className="blog-card" key={blog._id}>

                    <h2>{blog.title}</h2>
                    <p>{blog.description}</p>
                     <CommentsList blogId={blog._id} />
                    <input type="button" name="addComment" value="Add New Comment"
                      onClick={() => toggleAddComment(blog._id)} />
                  </div>
                )))
                :<div></div>}
                {showAddNewCommentModal && (
                <AddComment
                  onClose={() => setshowAddNewCommentModal(false)} fetchBlogs={fetchBlogs}
                  blogId={currentBlogId}
                />)}
              
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
