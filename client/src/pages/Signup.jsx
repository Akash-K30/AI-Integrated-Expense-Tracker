import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { User, Mail, Lock } from "lucide-react";


export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const res = await fetch(`${API_URL}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error);
      login(data.token);
    } catch (err) {
      setError(err.message);
    }
  };

  
return (
  <div className="min-h-screen bg-[#F7F5F0] flex items-center justify-center px-4 py-8">
    <div className="w-full max-w-md rounded-2xl border border-[#DDD6C7] bg-white p-6 sm:p-8 shadow-lg">

      {/* Heading */}
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-[#1F2937]">
          Create Account
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Start tracking your expenses in just a few clicks.
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Full Name */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Full Name
          </label>

          <input
            type="text"
            placeholder="Enter your full name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-[#DDD6C7] bg-white px-4 py-3 outline-none transition-all focus:border-[#176E5C] focus:ring-2 focus:ring-[#176E5C]/20"
          />
        </div>

        {/* Email */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Email Address
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-[#DDD6C7] bg-white px-4 py-3 outline-none transition-all focus:border-[#176E5C] focus:ring-2 focus:ring-[#176E5C]/20"
          />
        </div>

        {/* Password */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Password
          </label>

          <input
            type="password"
            placeholder="Create a password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-[#DDD6C7] bg-white px-4 py-3 outline-none transition-all focus:border-[#176E5C] focus:ring-2 focus:ring-[#176E5C]/20"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full rounded-xl bg-[#176E5C] py-3 font-semibold text-white transition-all duration-200 hover:bg-[#125848] hover:shadow-md active:scale-[0.98]"
        >
          Create Account
        </button>
      </form>

      {/* Footer */}
      <p className="mt-6 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-semibold text-[#176E5C] hover:underline"
        >
          Login
        </Link>
      </p>

    </div>
  </div>
);
}