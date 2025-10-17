"use client";

import { useState } from "react";
import { useAuth } from "@/lib/authContext";
import { useRouter } from "next/navigation";
import { Orbitron } from "next/font/google";
import { FaLock, FaUser, FaExclamationCircle } from "react-icons/fa";
import Link from "next/link";

const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "700"] });

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn, user } = useAuth();
  const router = useRouter();

  // Redirect if already logged in
  if (user) {
    router.push("/admin/stats");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await signIn(email, password);

    if (error) {
      setError(error instanceof Error ? error.message : "Login failed");
    } else {
      router.push("/admin/stats");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className={`${orbitron.className} text-4xl font-bold text-white mb-2`}>
            Admin Login
          </h1>
          <p className="text-gray-400">Spectrum 2025 Management</p>
        </div>

        {/* Login Form */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-[#FFD700] focus:border-transparent outline-none transition-all"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-[#FFD700] focus:border-transparent outline-none transition-all"
                  required
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 flex items-center gap-3">
                <FaExclamationCircle className="text-red-400 flex-shrink-0" />
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-6 bg-gradient-to-r from-[#FFD700] to-yellow-600 text-black font-bold rounded-lg hover:from-yellow-500 hover:to-[#FFD700] transition-all duration-300 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black"></div>
                  Signing In...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Back to Home */}
          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-gray-400 hover:text-[#FFD700] transition-colors text-sm"
            >
              ← Back to Home
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            © 2025 Spectrum — DHA Suffa University
          </p>
        </div>
      </div>
    </div>
  );
}
