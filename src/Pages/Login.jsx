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

  // Save user data and token to localStorage
  const saveUserToLocalStorage = (userData, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('id', userData._id);
    localStorage.setItem('name', userData.fullName);
    localStorage.setItem('email', userData.email);
    localStorage.setItem('profileImageUrl', userData.profileImageUrl || "");

    const categories = userData.categories || [];
    localStorage.setItem('categories', JSON.stringify(categories));
  };

  // Update Redux store with user data
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
      console.log("Login response:", response);

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
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-slate-300 p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center mb-4">Log In</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="example@gmail.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="********"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 8, message: "Password must be at least 8 characters" },
              })}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          {/* Forgot Password Link */}
          <div className="mb-4 text-right">
            <Link to="/forgot-password" className="text-sm text-blue-500 hover:underline">
              Forgot Password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white p-2 rounded-md hover:opacity-90 transition disabled:opacity-70"
          >
            {isSubmitting ? "Logging in..." : "Log In"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
