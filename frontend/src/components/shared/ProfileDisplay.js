import React, { useState } from "react";
import { FaTimes, FaCamera, FaUser, FaEnvelope, FaShieldAlt } from "react-icons/fa";
import { FaUserLarge } from "react-icons/fa6";
import SummaryApi from "../../common";
import { toast } from "react-toastify";
import imageTobase64 from "../../helpers/imageTobase64";

const ProfileDisplay = ({
  name,
  email,
  role,
  userId,
  onClose,
  profilePic,
  callFunc,
}) => {
  const [newProfilePic, setNewProfilePic] = useState("");
  const [imgError, setImgError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState({
    userId: userId,
    newemail: email,
    newname: name,
    newprofilepic: profilePic
  });

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const imagePic = await imageTobase64(file);
      setData((prev) => ({
        ...prev,
        newprofilepic: imagePic
      }));
      setNewProfilePic(imagePic);
      setImgError(false);
    } catch (error) {
      toast.error("Failed to upload image");
    }
  };

  const updateUserProfile = async () => {
    setIsLoading(true);
    try {
      const fetchResponse = await fetch(SummaryApi.updateProfile.url, {
        method: SummaryApi.updateProfile.method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: userId,
          email: data.newemail,
          name: data.newname,
          profilePic: data.newprofilepic
        })
      });

      const responseData = await fetchResponse.json();

      if (responseData.success) {
        toast.success(responseData.message);
        onClose();
        callFunc();
      } else {
        toast.error(responseData.message || "Failed to update profile");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 dark:bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="bg-gray-200 relative  dark:bg-slate-900 rounded-3xl shadow-2xl w-full max-w-lg mx-auto overflow-hidden transform transition-all duration-300 scale-100 max-h-[90vh] flex flex-col">
        {/* Header - Fixed */}
        <div className="relative bg-green-800 px-6 py-8 text-center shrink-0">
          <button
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-200"
            onClick={onClose}
          >
            <FaTimes size={18} />
          </button>
          
          <h2 className="text-2xl font-bold text-white mb-2">Profile Settings</h2>
          <p className="text-blue-100 text-sm">Update your account information</p>
        </div>

        {/* Scrollable Content */}
        <div className="px-6 py-8 overflow-y-auto flex-grow">
          {/* Profile Picture Section */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative group">
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-lg">
                {data.newprofilepic && !imgError ? (
                  <img
                    src={data.newprofilepic}
                    alt="Profile"
                    className="w-full h-full object-cover"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                    <FaUserLarge className="w-10 h-10 text-white" />
                  </div>
                )}
              </div>

              {/* Upload Overlay */}
              <label className="absolute inset-0 rounded-full cursor-pointer group-hover:bg-black/20 transition-colors duration-200 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <FaCamera className="w-5 h-5 text-white" />
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleUploadPic}
                />
              </label>
            </div>
            
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 text-center">
              Click on avatar to change photo
            </p>
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            {/* Name Field */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                <FaUser className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                Full Name
              </label>
              <input
                type="text"
                value={data.newname}
                onChange={(e) => setData({ ...data, newname: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 outline-none dark:bg-slate-800 dark:text-white"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                <FaEnvelope className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                Email Address
              </label>
              <input
                type="email"
                value={data.newemail}
                onChange={(e) => setData({ ...data, newemail: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 outline-none dark:bg-slate-800 dark:text-white"
                placeholder="Enter your email address"
              />
            </div>

            {/* Role Field (Read-only) */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                <FaShieldAlt className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                Account Role
              </label>
              <div className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 capitalize">
                {role}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons - Fixed at bottom */}
        <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0">
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={updateUserProfile}
              disabled={isLoading}
              className="flex-1 px-6 py-3 rounded-xl bg-green-800 text-white font-medium bg-green-800 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Saving...
                </div>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDisplay;