import React from "react";

const Logout = () => {
  const onChange = () => {
    try {
      localStorage.removeItem("token");
      alert("logged out successfully");
    } catch (err) {
      console.error("logout failed", err.response.data);
      alert("logout failed");
    }
  };
  return (
    <div>
      <input name="Logout" value="Logout" type="button" onChange={onChange} />
    </div>
  );
};

export default Logout;