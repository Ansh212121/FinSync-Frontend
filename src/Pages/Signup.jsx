import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import { Camera, Upload, User } from "lucide-react";
import uploadImage from "../utils/uploadImage";

const Signup = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [profileImage, setProfileImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => fileInputRef.current.click();

  const onSubmit = async (data) => {
    setIsUploading(true);
    try {
      let profileImageUrl = null;
      if (profileImage) {
        const imageResponse = await uploadImage(profileImage);
        profileImageUrl = imageResponse.imageUrl || "";
      }

      const userData = {
        fullName: data.fullName,
        email: data.email,
        password: data.password,
        profileImageUrl,
      };

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, userData);
      const { token } = response.data;
      if (token) localStorage.setItem("token", token);
      navigate("/login");
    } catch (error) {
      console.error("Signup error:", error?.response?.data?.message || error.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white px-4">
      <div className="bg-[#1f2937] shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Profile Image */}
          <div className="flex flex-col items-center gap-2">
            <div
              className="w-28 h-28 rounded-full border-2 border-purple-500 overflow-hidden flex justify-center items-center cursor-pointer hover:scale-105 transition"
              onClick={triggerFileInput}
            >
              {previewUrl ? (
                <img src={previewUrl} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center text-gray-400">
                  <User size={36} />
                  <Camera size={20} className="mt-1 text-purple-500" />
                </div>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
            />
            <p className="text-sm flex items-center text-gray-400">
              <Upload size={14} className="mr-1" />
              Click to upload
            </p>
          </div>

          {/* Full Name */}
          <div>
            <label className="text-sm font-medium">Name</label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full mt-1 p-2 bg-gray-800 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
              {...register("fullName", {
                required: "Name is required!",
                minLength: { value: 3, message: "Minimum 3 characters" },
              })}
            />
            {errors.fullName && <p className="text-red-400 text-sm mt-1">{errors.fullName.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full mt-1 p-2 bg-gray-800 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
              {...register("email", {
                required: "Email is required!",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Invalid email format",
                },
              })}
            />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              placeholder="********"
              className="w-full mt-1 p-2 bg-gray-800 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
              {...register("password", {
                required: "Password is required!",
                minLength: { value: 8, message: "Minimum 8 characters" },
              })}
            />
            {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isUploading}
            className="w-full py-3 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-md font-medium text-white hover:opacity-90 transition disabled:opacity-60"
          >
            {isUploading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <p className="text-sm text-gray-400 mt-6 text-center">
          Already have an account?
          <Link to="/login" className="text-purple-400 hover:underline ml-1 font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
