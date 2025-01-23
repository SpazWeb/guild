import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/components/Header.css";

function Header() {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setUser(null);

    fetch("/api/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log("Logout successful");
        }
      })
      .catch((error) => {
        console.error("Error logging out: ", error);
      });

    setIsAuthenticated(false);
    setUser(null);

    navigate("/");

    alert("You have been logged out.");
  };

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Guilds", path: "/" },
    { label: "Recruit", path: "/" },
    { label: "Games", path: "/" },
    { label: "Platforms", path: "/" },
    { label: "News", path: "/" },
    { label: "About", path: "/" },
  ];
  return (
    <div className="Header">
      <div className="header-container">
        <div className="header-logo">
          <Link to="/">
            <img src="img/logo.webp" alt="GUILD" />
          </Link>
        </div>
        <div className="header-navigation">
          <nav className="nav">
            <ul className="nav-container">
              {navLinks.map((link, index) => (
                <li key={index} className="nav-item">
                  <Link to={link.path} className="nav-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div class="header-auth">
          <div className="auth-container">
            {isAuthenticated ? (
              <div className="logout">
                <Link to="/" onClick={handleLogout}>
                  <h3>Logout</h3>
                </Link>
              </div>
            ) : (
              <>
                <div className="signin">
                  <Link to="/">
                    <h3>Sign-In</h3>
                  </Link>
                </div>
                <div className="signup">
                  <Link to="/">
                    <h3>Sign-Up</h3>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
