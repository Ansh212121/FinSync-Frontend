import React, { useEffect, useState, useRef } from 'react';
import { API_PATHS } from '../utils/apiPaths';
import axiosInstance from '../utils/axiosInstance';

const Profile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const [showEditPhotoModal, setShowEditPhotoModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    setIsLoading(true);
    try {
      // Simulating API call delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const storedName = localStorage.getItem('name') || 'test13';
      const storedEmail = localStorage.getItem('email') || 'test13@gmail.com';
      const storedImageUrl = localStorage.getItem('profileImageUrl') || '';

      setName(storedName);
      setEmail(storedEmail);
      setProfileImageUrl(storedImageUrl);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const uploadImageToBackend = async (file) => {
    setIsUploading(true);
    try {
      // Create a preview URL for immediate visual feedback
      const previewUrl = URL.createObjectURL(file);
      setProfileImageUrl(previewUrl);
      
      const formData = new FormData();
      formData.append("image", file);

      const uploadResponse = await axiosInstance.post(
        API_PATHS.IMAGE.UPLOAD_IMAGE,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (uploadResponse.status === 200) {
        const imageUrl = uploadResponse.data.imageUrl;

        const updateResponse = await axiosInstance.post(API_PATHS.IMAGE.UPDATE_IMAGE, {
          profileImageUrl: imageUrl,
        });

        if (updateResponse.status === 200) {
          console.log("Profile image updated successfully!");
          setProfileImageUrl(imageUrl);
          localStorage.setItem('profileImageUrl', imageUrl);
        }
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      // Revert to previous image on error
      const storedImageUrl = localStorage.getItem('profileImageUrl') || '';
      setProfileImageUrl(storedImageUrl);
    } finally {
      setIsUploading(false);
    }
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadImageToBackend(file);
      setShowEditPhotoModal(false);
      
      // Show a loading overlay on the main profile picture
      // The actual loading state is handled in the uploadImageToBackend function
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  // Loading spinner component
  const LoadingSpinner = ({ size = "normal" }) => {
    const spinnerSizes = {
      small: "h-4 w-4 border-2",
      normal: "h-6 w-6 border-b-2",
      large: "h-10 w-10 border-4"
    };
    
    return (
      <div className="flex justify-center items-center">
        <div className={`animate-spin rounded-full ${spinnerSizes[size]} border-blue-500`}></div>
      </div>
    );
  };

  // Skeleton loader for profile
  const ProfileSkeleton = () => (
    <div className="flex flex-col items-center mb-8 animate-pulse">
      <div className="h-24 w-24 md:h-32 md:w-32 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
      <div className="h-6 w-32 bg-gray-300 dark:bg-gray-600 rounded mt-4"></div>
      <div className="h-4 w-48 bg-gray-300 dark:bg-gray-600 rounded mt-2"></div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* Profile Content */}
      <div className="flex-1 px-4 md:px-8 lg:px-16 m-9">
        {isLoading ? (
          <>
            <ProfileSkeleton />
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8 animate-pulse">
              <div className="h-6 w-48 bg-gray-300 dark:bg-gray-600 rounded mb-4"></div>
              <div className="h-4 w-64 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col items-center mb-8">
              <div className="relative group">
                {profileImageUrl ? (
                  <div className="h-24 w-24 md:h-32 md:w-32 rounded-full overflow-hidden relative">
                    <img src={profileImageUrl} alt="Profile" className="w-full h-full object-cover" />
                    {isUploading && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <LoadingSpinner size="normal" />
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="h-24 w-24 md:h-32 md:w-32 bg-blue-300 dark:bg-blue-500 rounded-full flex items-center justify-center text-3xl md:text-4xl font-bold text-white relative">
                    {name ? name.charAt(0).toUpperCase() : 'T'}
                    {isUploading && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-full">
                        <LoadingSpinner size="normal" />
                      </div>
                    )}
                  </div>
                )}

                {/* Edit profile photo button */}
                <button 
                  onClick={() => setShowEditPhotoModal(true)}
                  className="absolute bottom-0 right-0 bg-gray-200 dark:bg-gray-700 p-2 rounded-full shadow-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  disabled={isUploading}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
              </div>
              <h2 className="text-xl md:text-2xl font-semibold mt-4">{name}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">{email}</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
              <h3 className="text-lg md:text-xl font-semibold mb-2">Account Information</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-1">Email: {email}</p>
            </div>
          </>
        )}
      </div>

      {/* Change Profile Photo Modal */}
      {showEditPhotoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold mb-4">Change Profile Picture</h3>
            <div className="flex flex-col items-center mb-4">
              {isUploading ? (
                <div className="w-32 h-32 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <LoadingSpinner size="large" />
                </div>
              ) : profileImageUrl ? (
                <img src={profileImageUrl} alt="Current Profile" className="w-32 h-32 rounded-full object-cover mb-4" />
              ) : (
                <div className="w-32 h-32 bg-blue-300 dark:bg-blue-500 rounded-full flex items-center justify-center text-4xl font-bold text-white mb-4">
                  {name ? name.charAt(0).toUpperCase() : 'T'}
                </div>
              )}
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleProfileImageChange} 
                accept="image/*" 
                className="hidden" 
                disabled={isUploading}
              />
              <button 
                onClick={triggerFileInput}
                className={`px-4 py-2 ${isUploading 
                  ? 'bg-blue-400 cursor-not-allowed' 
                  : 'bg-blue-500 hover:bg-blue-600'} text-white rounded-md transition-colors flex items-center space-x-2`}
                disabled={isUploading}
              >
                {isUploading ? (
                  <>
                    <span>Uploading</span>
                    <LoadingSpinner size="small" />
                  </>
                ) : "Upload Photo"}
              </button>
            </div>
            <div className="flex justify-end">
              <button 
                onClick={() => setShowEditPhotoModal(false)}
                disabled={isUploading}
                className={`px-4 py-2 text-gray-600 dark:text-gray-300 ${isUploading 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'} rounded-md transition-colors`}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;