
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthServices from "../../Services/AuthServices";
import toast from "react-hot-toast";
import { getErrorMessage } from "../../Utils/ErrorMessage";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const loginHandler = async (e) => {
    try {
      e.preventDefault();
      const data = { email, password };
      const res = await AuthServices.loginUser(data);
      toast.success(res.data.message);
      navigate("/home");
      localStorage.setItem("todoapp", JSON.stringify(res.data));
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
      <div className="w-[420px] bg-white rounded-xl border border-gray-200 px-8 py-10 shadow-sm">
        
        {/* Brand */}
        <h1 className="text-center text-2xl font-semibold text-[#1a2e35] mb-2">
          Sign in to <span className="text-[#ff775f]">Todoify</span>
        </h1>
        <p className="text-center text-gray-500 mb-8 text-sm">
          Organize work and life, simply.
        </p>

        <form onSubmit={loginHandler} className="space-y-5">
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
            className="w-full mt-2 h-[44px] rounded-md bg-[#ff775f] text-white font-medium hover:bg-[#ff6a4d] transition"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 !mt-6">
          Don’t have an account?
          <Link
            to="/register"
            className="ml-1 text-[#ff775f] font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
