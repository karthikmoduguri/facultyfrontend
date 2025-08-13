import React from "react";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";

const FacultyLogin = () => {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:7000/api/v1/auth/google"; 
    // backend lo Google OAuth route ki redirect
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-200 via-gray-200 to-gray-500">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Faculty Login
        </h2>
        <p className="text-gray-600 text-center mb-8">
          Sign in to access your dashboard
        </p>

        {/* Google Login Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleGoogleLogin}
          className="flex items-center justify-center gap-3 w-full py-3 border border-gray-300 rounded-lg shadow-sm hover:shadow-lg transition bg-white"
        >
          <FcGoogle className="text-2xl" />
          <span className="text-gray-700 font-medium">
            Sign in with Google
          </span>
        </motion.button>

        {/* Divider */}
        <div className="flex items-center my-8">
          <hr className="flex-grow border-gray-300" />
          <span className="px-4 text-gray-500 text-sm">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Placeholder for Manual Login */}
        <button
          disabled
          className="w-full py-3 rounded-lg bg-gray-400 text-white cursor-not-allowed"
        >
          Manual Login (Coming Soon)
        </button>
      </motion.div>
    </div>
  );
};

export default FacultyLogin;
