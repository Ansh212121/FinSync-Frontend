import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

const Logout = () => {
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    setLoading(true);
    setShowConfirmation(false);
    
    // Clear local storage
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("id");
    localStorage.removeItem("categories");
    
    // Simulate async delay
    setTimeout(() => {
      setLoading(false);
      navigate('/');
    }, 1500);
  };

  const handleCancel = () => {
    navigate('/dashboard');
  };

  return (
    <div className="flex items-center justify-center  dark:text-gray-200  h-screen">
      {showConfirmation ? (
        <div className="bg-slate-300  p-8 rounded-lg shadow-md max-w-md w-full">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">Confirm Logout</h2>
          <p className=" mb-8  text-slate-900  text-center">Are you sure you want to logout?</p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={handleCancel}
              className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleLogout}
              className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      ) : loading ? (
        <div className="text-center">
          <ClipLoader size={50} color={"#36d7b7"} loading={loading} />
          <p className="mt-4 text-gray-600">Logging out...</p>
        </div>
      ) : null}
    </div>
  );
};

export default Logout;