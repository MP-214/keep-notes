// components/Header.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  email: string;
  name?: string;
  exp: number;
}

const Header: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  let userName = "User";

  if (token) {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      userName = decoded.name || decoded.email.split("@")[0];
    } catch {
      userName = "User";
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header style={{ display: "flex", justifyContent: "space-between", padding: "10px 20px", }}>
      <h3>📝 Keep Notes</h3>
      <div>
        <span style={{ marginRight: 20 }}>Welcome, <strong>{userName}</strong></span>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </header>
  );
};

export default Header;
