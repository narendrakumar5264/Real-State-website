import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,

  signOutUserStart,
} from '../redux/user/userSlice';
import { Link } from "react-router-dom";



export default function Profile() {
  const fileRef = useRef(null);
  
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState("");
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false); // Loading state
  const [updateSuccess, setUpdateSuccess] = useState(false); // Success message state
  const [successMessage, setSuccessMessage] = useState(""); // Success message state
  const [updatePercentage, setUpdatePercentage] = useState(0); // Update progress percentage

  const dispatch = useDispatch();
  const { currentUser, error } = useSelector((state) => state.user);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "Realstate");
    data.append("cloud_name", "dvph1rffn");

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://api.cloudinary.com/v1_1/dvph1rffn/image/upload", true);

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentage = Math.round((event.loaded / event.total) * 100);
        setUploadProgress(percentage);
      }
    };

    xhr.onload = () => {
      if (xhr.status === 200) {
        const uploadImage = JSON.parse(xhr.responseText);
        setUploadedImage(uploadImage.url);
        setUploadStatus("Image uploaded successfully!");
        setFormData((prev) => ({ ...prev, avatar: uploadImage.url })); // Update formData with the uploaded image URL
      } else {
        setUploadStatus("Image upload failed. Please try again.");
      }
    };

    xhr.onerror = () => {
      setUploadStatus("Image upload failed. Please check your network.");
    };

    xhr.send(data);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    setSuccessMessage(""); // Reset success message
    setUpdatePercentage(0); // Reset progress

    // Simulate update progress with percentage
    let progress = 0;
    const interval = setInterval(() => {
      if (progress < 100) {
        progress += 10;
        setUpdatePercentage(progress); // Update percentage
      } else {
        clearInterval(interval); // Stop interval when 100% is reached
      }
    }, 500); // Increase progress every 500ms

    // Simulate a delay for the update process (e.g., 4 seconds)
    setTimeout(async () => {
      setFormData((prev) => ({
        ...prev,
        avatar: uploadedImage || currentUser.avatar,
      }));

      try {
        dispatch(updateUserStart());
        const res = await fetch(`/api/user/update/${currentUser._id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (data.success === false) {
          dispatch(updateUserFailure(data.message));
          setLoading(false); // Stop loading if error occurs
          clearInterval(interval); // Clear the interval
          return;
        }

        dispatch(updateUserSuccess(data));
        setLoading(false); // Stop loading

        // Set success message and trigger effect after 1 second
        setUpdateSuccess(true);
        setSuccessMessage("User updated successfully!");
        setTimeout(() => {
          setUpdateSuccess(false); // Hide success message after 3 seconds
        }, 3000); // 3000 ms = 3 seconds
      } catch (error) {
        dispatch(updateUserFailure(error.message));
        setLoading(false); // Stop loading if error occurs
        clearInterval(interval); // Clear the interval
      }
    }, 4000); // Simulated delay for the update process (4 seconds)
  };


  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  // Sign Out

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(data.message));
    }
  };



  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={handleUpdate}>
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={handleFileUpload}
        />

        <img
          onClick={() => fileRef.current.click()}
          src={uploadedImage || currentUser.avatar}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />

        {uploadProgress > 0 && uploadProgress < 100 && (
          <div className="text-sm text-blue-500 text-center mt-2">
            Uploading: {uploadProgress}%
          </div>
        )}

        {uploadStatus && (
          <div
            className={`text-sm text-center mt-2 ${
              uploadStatus.includes("successfully")
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {uploadStatus}
          </div>
        )}

        <input
          type="text"
          placeholder="Username"
          defaultValue={currentUser.username}
          id="username"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />

        <input
          type="email"
          placeholder="Email"
          id="email"
          defaultValue={currentUser.email}
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />

        <input
          type="password"
          placeholder="Password"
          id="password"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? (
            <div className="w-8 h-8 border-4 border-t-transparent border-blue-500 rounded-full animate-spin mx-auto"></div> // Tailwind spinner
          ) : (
            "Update"
          )}
        </button>
        {/* Updating progress and percentage */}
      {loading && (
        <div className="text-center mt-4">
          <p className="text-lg text-blue-500 animate-pulse">Updating...</p>
          <div className="w-full bg-gray-200 h-2 mt-2 rounded-full">
            <div
              className={`bg-blue-500 h-2 rounded-full transition-all duration-500`}
              style={{ width: `${updatePercentage}%` }}
            ></div>
          </div>
          <p className="text-center mt-2">{updatePercentage}%</p>
        </div>
      )}

      {/* Success Message */}
      {updateSuccess && (
        <div className="text-green-500 text-center mt-4 animate-bounce">
          {successMessage}
        </div>
      )}

               {/* Listing Ui */}
             

      </form>

      

      <div className="flex justify-between mt-5">
        <span onClick={handleDeleteUser} className="text-red-700 cursor-pointer">Delete Account</span>
        <span onClick={handleSignOut} className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
};
