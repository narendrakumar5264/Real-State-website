

import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


import { FaMobileAlt, FaMapMarkerAlt, FaUser, FaCity } from 'react-icons/fa';
import { MdOutlineRealEstateAgent } from 'react-icons/md';
import { FiTrendingUp } from 'react-icons/fi';
export default function CreateListing() {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  const [page, setPage] = useState(1); // Page tracker
  const [formData, setFormData] = useState({
    ownerName: '',
    mobileNumber: '',
    city: '',
    address: '',
    imageUrls: [],
    name: '',
    description: '',
    type: 'rent',
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });

  const [files, setFiles] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [uploadStatus, setUploadStatus] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const rajasthanCities = [
    "Jaipur",
    "Jodhpur",
    "Udaipur",
    "Ajmer",
    "Kota",
    "Bikaner",
    "Alwar",
    "Bharatpur",
    "Sikar",
    "Pali",
    "Tonk",
  ];

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (files.length + selectedFiles.length <= 6) {
      setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
      setUploadStatus("");
    } else {
      setUploadStatus("You can only upload a total of 6 images.");
    }
  };

  const handleUploadClick = async () => {
    setIsUploading(true);
    if (files.length === 0) {
      setUploadStatus("No files selected for upload.");
      return;
    }

    try {
      const promises = files.map((file, index) => storeImage(file, index));
      const imageUrls = await Promise.all(promises);
      setUploadedImages(imageUrls);
      setFormData((prevFormData) => ({
        ...prevFormData,
        imageUrls,
      }));
      setIsUploading(false);
      setUploadStatus("All images uploaded successfully!");
    } catch (error) {
      console.error("Error uploading images:", error);
      setUploadStatus("Some images failed to upload. Please try again.");
    }
  };

  const storeImage = (file, index) => {
    return new Promise((resolve, reject) => {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "Realstate");
      data.append("cloud_name", "dvph1rffn");

      const xhr = new XMLHttpRequest();
      xhr.open(
        "POST",
        "https://api.cloudinary.com/v1_1/dvph1rffn/image/upload",
        true
      );

      xhr.onload = () => {
        if (xhr.status === 200) {
          const uploadedImage = JSON.parse(xhr.responseText);
          resolve(uploadedImage.url);
        } else {
          reject(new Error(`Failed to upload file: ${file.name}`));
        }
      };

      xhr.onerror = () => {
        reject(new Error("Network error during upload"));
      };

      xhr.send(data);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (uploadedImages.length < 1)
        return setError('You must upload at least one image');
      if (+formData.regularPrice < +formData.discountPrice)
        return setError('Discount price must be lower than regular price');
      setLoading(true);
      setError(false);
      const res = await fetch('/api/listing/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      navigate(`/listing/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleRemoveImage = (index) => {
    setUploadedImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };


  return (
   
    
  
        <main className="w-full h-auto bg-gray-50 pb-10">
          <div className="p-5 max-w-6xl mx-auto">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-extrabold text-blue-700 mb-3">Post Your Property Ad</h1>
              <p className="text-gray-600 text-lg">Sell or Rent Online for Free!</p>
              <div className="flex flex-col md:flex-row justify-center gap-6 mt-6 items-center">
                <div className="flex items-center gap-2 text-blue-600 text-sm">
                  <MdOutlineRealEstateAgent size={28} />
                  <span className="font-semibold">Access to 4 Lakh+ Buyers</span>
                </div>
                <div className="flex items-center gap-2 text-green-600 text-sm">
                  <FiTrendingUp size={28} />
                  <span className="font-semibold">Sell Faster with Premium Services</span>
                </div>
                <div className="flex items-center gap-2 text-purple-600 text-sm">
                  <FaCity size={28} />
                  <span className="font-semibold">Expert Market Insights</span>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-4">Currently serving properties in Rajasthan only.</p>
            </div>
    
            <div className="bg-white shadow-xl p-8 rounded-lg border-t-4 border-blue-400">
              {page === 1 && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setPage(2);
                  }}
                  className="flex flex-col gap-5"
                >
                  <h2 className="text-2xl font-bold mb-6 text-blue-700">Owner Details</h2>
                  <div className="flex items-center gap-3">
                    <FaUser size={24} className="text-blue-500" />
                    <input
                      type="text"
                      placeholder="Owner's Name"
                      className="border p-4 rounded-lg focus:ring-2 focus:ring-blue-400 w-full"
                      id="ownerName"
                      required
                      onChange={handleChange}
                      value={formData.ownerName}
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <FaMobileAlt size={24} className="text-blue-500" />
                    <input
                      type="text"
                      placeholder="Mobile Number"
                      className="border p-4 rounded-lg focus:ring-2 focus:ring-blue-400 w-full"
                      id="mobileNumber"
                      required
                      onChange={handleChange}
                      value={formData.mobileNumber}
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <FaCity size={24} className="text-blue-500" />
                    <select
                      id="city"
                      className="border p-4 rounded-lg focus:ring-2 focus:ring-blue-400 w-full"
                      required
                      onChange={handleChange}
                      value={formData.city}
                    >
                      <option value="" disabled>
                        Select City
                      </option>
                      {rajasthanCities.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaMapMarkerAlt size={24} className="text-blue-500" />
                    <textarea
                      placeholder="Address"
                      className="border p-4 rounded-lg focus:ring-2 focus:ring-blue-400 w-full"
                      id="address"
                      required
                      onChange={handleChange}
                      value={formData.address}
                    />
                  </div>
                  <button
                    type="submit"
                    className="py-3 px-5 bg-blue-600 text-white font-semibold rounded-lg uppercase hover:bg-blue-700 transition-all"
                  >
                    Next
                  </button>
                </form>
              )}
    
              {page === 2 && (
              <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-5"
            >
              <h2 className="text-2xl font-bold mb-6 text-blue-700">Property Details</h2>
              <input
                type="text"
                placeholder="Title"
                className="border p-4 rounded-lg focus:ring-2 focus:ring-blue-400"
                id="name"
                maxLength="62"
                minLength="10"
                required
                onChange={handleChange}
                value={formData.name}
              />
              <textarea
                placeholder="Description"
                className="border p-4 rounded-lg focus:ring-2 focus:ring-blue-400"
                id="description"
                required
                onChange={handleChange}
                value={formData.description}
              />
              <div className="flex flex-wrap gap-3">
              <label
  className={`cursor-pointer px-6 py-2 rounded-lg ${
    formData.type === 'sale' ? 'bg-blue-500 text-white' : 'bg-gray-200'
  }`}
>
  Sell
  <input
    type="radio"
    id="type"
    name="type"
    className="hidden"
    value="sale"
    onChange={handleChange}
    checked={formData.type === 'sale'}
  />
</label>
<label
  className={`cursor-pointer px-6 py-2 rounded-lg ${
    formData.type === 'rent' ? 'bg-blue-500 text-white' : 'bg-gray-200'
  }`}
>
  Rent
  <input
    type="radio"
    id="type"
    name="type"
    className="hidden"
    value="rent"
    onChange={handleChange}
    checked={formData.type === 'rent'}
  />
</label>


                <label className={`cursor-pointer px-6 py-2 rounded-lg ${formData.parking ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                  Parking Spot
                  <input
                    type="checkbox"
                    id="parking"
                    className="hidden"
                    onChange={handleChange}
                    checked={formData.parking}
                  />
                </label>
                <label className={`cursor-pointer px-6 py-2 rounded-lg ${formData.furnished ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                  Furnished
                  <input
                    type="checkbox"
                    id="furnished"
                    className="hidden"
                    onChange={handleChange}
                    checked={formData.furnished}
                  />
                </label>
              </div>
            
              <div className="flex flex-wrap gap-6 mt-4">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    id="bedrooms"
                    min="1"
                    max="10"
                    required
                    className="p-4 border rounded-lg focus:ring-2 focus:ring-blue-400"
                    onChange={handleChange}
                    value={formData.bedrooms}
                  />
                  <p className="text-gray-600">Beds</p>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    id="bathrooms"
                    min="1"
                    max="10"
                    required
                    className="p-4 border rounded-lg focus:ring-2 focus:ring-blue-400"
                    onChange={handleChange}
                    value={formData.bathrooms}
                  />
                  <p className="text-gray-600">Baths</p>
                </div>
              </div>
            
              <div className="flex flex-wrap gap-6 mt-4">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    id="regularPrice"
                    min="50"
                    max="10000000"
                    required
                    className="p-4 border rounded-lg focus:ring-2 focus:ring-blue-400"
                    onChange={handleChange}
                    value={formData.regularPrice}
                  />
                  <div className="flex flex-col items-start">
                    <p className="text-gray-600">Regular Price</p>
                    {formData.type === 'rent' && <span className="text-xs">(₹ / month)</span>}
                  </div>
                </div>
                {formData.offer && (
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      id="discountPrice"
                      min="0"
                      max="10000000"
                      required
                      className="p-4 border rounded-lg focus:ring-2 focus:ring-blue-400"
                      onChange={handleChange}
                      value={formData.discountPrice}
                    />
                    <div className="flex flex-col items-start">
                      <p className="text-gray-600">Discounted Price</p>
                      {formData.type === 'rent' && <span className="text-xs">(₹ / month)</span>}
                    </div>
                  </div>
                )}
                <label className={`cursor-pointer px-6 py-2 rounded-lg ${formData.offer ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                  Offer
                  <input
                    type="checkbox"
                    id="offer"
                    className="hidden"
                    onChange={handleChange}
                    checked={formData.offer}
                  />
                </label>
              </div>
            
              <div className="flex flex-col gap-4 mt-6">
                <p className="font-semibold text-gray-700">
                  Images:
                  <span className="font-normal text-gray-500 ml-2 text-sm">
                    The first image will be the cover (max 6)
                  </span>
                </p>
                <div className="flex gap-4">
                  <input
                    className="p-3 border border-gray-300 rounded w-full focus:ring-2 focus:ring-blue-400"
                    type="file"
                    id="images"
                    accept="image/*"
                    onChange={handleFileChange}
                    multiple
                  />
               <button
      type="button"
      onClick={handleUploadClick}
      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
      disabled={isUploading}
    >
      {isUploading ? "Uploading..." : "Upload"}
    </button>
                </div>
                {uploadStatus && (
                  <p
                    className={`text-sm mt-2 ${
                      uploadStatus.includes("successfully") ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {uploadStatus}
                  </p>
                )}
                {uploadedImages.length > 0 && (
                  <div className="flex flex-wrap gap-4 mt-4">
                    {uploadedImages.map((url, index) => (
                      <div key={index} className="relative">
                        <img
                          src={url}
                          alt={`Uploaded ${index}`}
                          className="w-24 h-24 object-cover rounded-lg shadow-md"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            
              <button
                type="button"
                onClick={() => setPage(1)}
                className="p-3 bg-gray-400 text-white rounded-lg uppercase hover:opacity-95"
              >
                Back
              </button>
              <button
                type="submit"
                className="p-3 bg-blue-600 text-white rounded-lg uppercase hover:opacity-95"
              >
                Submit
              </button>
            </form>
            
              )}
            </div>
          </div>
        </main>
      );
    };
    
   
