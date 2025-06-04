import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import { setUser, setEmail, setName, setCategories } from "../Slices/AuthSlice";
import { useDispatch } from 'react-redux';

import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const saveUserToLocalStorage = (userData, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('id', userData._id);
    localStorage.setItem('name', userData.fullName);
    localStorage.setItem('email', userData.email);
    localStorage.setItem('profileImageUrl', userData.profileImageUrl || "");

    const categories = userData.categories || [];
    localStorage.setItem('categories', JSON.stringify(categories));
  };

  const updateToAuthSlice = (userData) => {
    const user = {
      _id: userData._id,
      name: userData.fullName,
      email: userData.email,
      isAdmin: userData.isAdmin,
      createdAt: userData.createdAt,
      updatedAt: userData.updatedAt,
      categories: userData.categories || [],
    };

    dispatch(setUser(user));
    dispatch(setName(userData.fullName));
    dispatch(setEmail(userData.email));
    dispatch(setCategories(userData.categories || []));
  };

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, data);
      const responseData = response.data;
      const token = responseData.token;
      const userData = responseData.user;

      if (token && userData) {
        saveUserToLocalStorage(userData, token);
        updateToAuthSlice(userData);
        toast.success(responseData.message || "Login successful!");
        navigate("/dashboard");
      } else {
        toast.error("Login failed: Invalid response structure.");
      }
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Login failed. Please try again.");
      }
      console.error("Login error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white px-4">
      <div className="bg-[#1f2937] shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
          Log In to Your Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full mt-1 p-2 bg-gray-800 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Invalid email format",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              placeholder="********"
              className="w-full mt-1 p-2 bg-gray-800 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 8, message: "Minimum 8 characters" },
              })}
            />
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <Link to="/forgot-password" className="text-sm text-purple-400 hover:underline">
              Forgot Password?
            </Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-md font-medium text-white hover:opacity-90 transition disabled:opacity-60"
          >
            {isSubmitting ? "Logging in..." : "Log In"}
          </button>
        </form>

        <p className="text-sm text-gray-400 mt-6 text-center">
          Don’t have an account?
          <Link to="/signup" className="text-purple-400 hover:underline ml-1 font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
