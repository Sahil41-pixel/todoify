import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthServices from "../../Services/AuthServices";
import toast from "react-hot-toast";
import { getErrorMessage } from "../../Utils/ErrorMessage";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  const navigate = useNavigate();

  // register function
  const registerHandler = async (e) => {
    try {
      e.preventDefault();
      const data = { email, password, username };
      const res = await AuthServices.registerUser(data);
      toast.success(res.data.message);
      navigate("/login");
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
      <div className="w-[420px] bg-white rounded-xl border border-gray-200 px-8 py-10 shadow-sm">
        
        {/* Header */}
        <h1 className="text-center text-2xl font-semibold text-[#1a2e35] mb-2">
          Create your <span className="text-[#ff775f]">Todoify</span> account
        </h1>
        <p className="text-center text-gray-500 mb-8 text-sm">
          Start organizing your work and life
        </p>

        {/* Form */}
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Username
            </label>
            <input
              type="text"
              className="w-full rounded-md border border-gray-300 px-3 py-2.5 outline-none focus:border-[#ff775f]"
              placeholder="Your name"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full rounded-md border border-gray-300 px-3 py-2.5 outline-none focus:border-[#ff775f]"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full rounded-md border border-gray-300 px-3 py-2.5 outline-none focus:border-[#ff775f]"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            onClick={registerHandler}
            className="w-full mt-2 h-[44px] rounded-md bg-[#ff775f] text-white font-medium hover:bg-[#ff6a4d] transition"
          >
            Create Account
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 !mt-6">
          Already have an account?
          <Link
            to="/login"
            className="ml-1 text-[#ff775f] font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
