// features/auth/components/AuthForm.jsx

import { useState } from "react";

const AuthForm = ({ onSubmit, loading, type }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form
     id="auth-form"
    onSubmit={handleSubmit} 
    className="flex flex-col gap-4">
  {type === "signup" && (
  <div className="flex flex-col gap-1">
    <label className="text-xs text-gray-500">
      First Name
    </label>

    <input
      name="name"
      placeholder="Enter your first name"
      onChange={handleChange}
      className="px-3 py-2 border border-gray-300 rounded-xl text-sm text-black
                 focus:outline-none focus:ring-2 focus:ring-black focus:border-black 
                 transition"
    />
  </div>
)}
 
  {/* Email*/}
  <div className="flex flex-col gap-1">
    <label className="text-xs text-gray-500">
      Email
    </label>

    <input
    type="email"
      name="email"
      placeholder="Enter your email"
      onChange={handleChange}
      className="px-3 py-2 border border-gray-300 rounded-xl text-sm text-black
                 focus:outline-none focus:ring-2 focus:ring-black focus:border-black 
                 transition"
    />
  </div>

  {/* Password */}
  <div className="flex flex-col gap-1">
    <label className="text-xs text-gray-500">
      Password
    </label>

    <input
      type="password"
      name="password"
      placeholder="Enter your password"
      onChange={handleChange}
      className="px-3 py-2 border border-gray-300 rounded-xl text-sm text-black
                 focus:outline-none focus:ring-2 focus:ring-black focus:border-black 
                 transition"
    />
  </div>

  {/* Button */}
  {/* <button
    className="mt-2 w-full py-2.5 rounded-xl bg-black text-white text-sm 
               hover:bg-gray-800 transition disabled:opacity-60"
    disabled={loading}
  >
    {loading
  ? "Loading..."
  : type === "login"
    ? "Login"
    : "Signup"}
  </button> */}

</form>
  );
};

export default AuthForm;