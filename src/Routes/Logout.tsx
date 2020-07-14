import React from "react";

const Logout: React.FC = () => {
  if (process.env.NODE_ENV === "development") {
    localStorage.removeItem("userToken");
  }
  window.location.reload();
  return null;
};

export default Logout;
