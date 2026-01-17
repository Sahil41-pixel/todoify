import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Navbar = () => {
  const [username, setUserName] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  // Logout
  const logoutHandler = () => {
    localStorage.removeItem("todoapp");
    sessionStorage.removeItem("todos");
    toast.success("Logout successfully");
    navigate("/login");
  };

  // Get username
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("todoapp"));
    if (userData && userData.user && userData.user.username) {
      setUserName(userData.user.username);
    }
  }, []);

  return (
    <nav className="fixed top-0 w-full z-50 bg-gradient-to-r from-indigo-600 to-blue-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Brand */}
          <h4 className="text-lg font-semibold flex items-center gap-2 text-white">
            <i className="fa-solid fa-user-tie" />
            <span>
              Welcome <span className="italic text-yellow-300">{username}</span>
            </span>
          </h4>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/home"
              className="text-white hover:text-yellow-300 font-medium transition !no-underline"
            >
              Home
            </Link>

            <Link
              to="/todoList"
              className="text-white hover:text-yellow-300 font-medium transition !no-underline"
            >
              My Todo List
            </Link>

            <button
              onClick={logoutHandler}
              title="Logout"
              className="text-red-200 hover:text-red-400 transition"
            >
              <i className="fa-solid fa-power-off text-2xl" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white text-2xl"
          >
            <i className="fa-solid fa-bars" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gradient-to-r from-indigo-600 to-blue-600 px-4 pb-4 space-y-3">
          <Link
            to="/home"
            onClick={() => setMenuOpen(false)}
            className="block text-white hover:text-yellow-300 transition"
          >
            Home
          </Link>

          <Link
            to="/todoList"
            onClick={() => setMenuOpen(false)}
            className="block text-white hover:text-yellow-300 transition"
          >
            My Todo List
          </Link>

          <button
            onClick={logoutHandler}
            className="flex items-center gap-2 text-red-200 hover:text-red-400 transition"
          >
            <i className="fa-solid fa-power-off" />
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
