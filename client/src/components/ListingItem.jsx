import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { BsPlusCircle, BsPencil, BsTrash } from 'react-icons/bs';
import { FaRegEye } from 'react-icons/fa';

export default function Listings() {
  const { currentUser } = useSelector((state) => state.user);
  const [userListings, setUserListings] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await fetch(`/api/user/listings/${currentUser._id}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          return;
        }
        setUserListings(data);
        setError(false);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser?._id) {
      fetchListings();
    }
  }, [currentUser]);

  const handleListingDelete = async (listingId) => {
    const listing = userListings.find((item) => item._id === listingId);

    // SweetAlert2 Confirmation Dialog
    const result = await Swal.fire({
      title: `Delete "${listing?.name}"?`,
      text: 'Are you sure you want to delete this listing? This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`/api/listing/delete/${listingId}`, {
          method: 'DELETE',
        });
        const data = await res.json();
        if (data.success === false) {
          Swal.fire('Error', data.message, 'error');
          return;
        }

        // Remove the deleted listing from the state
        setUserListings((prev) => prev.filter((listing) => listing._id !== listingId));

        // Show success message
        Swal.fire('Deleted!', `The listing "${listing?.name}" has been deleted.`, 'success');
      } catch (err) {
        Swal.fire('Error', 'Failed to delete the listing. Please try again later.', 'error');
      }
    }
  };

  const calculateDiscountPercentage = (regularPrice, discountedPrice) => {
    return (((regularPrice - discountedPrice) / regularPrice) * 100).toFixed(0);
  };

  return (
    <div className="min-h-screen p-2 bg-gray-50">
      <div className="max-w-8xl mx-auto shadow-md rounded-lg p-6">
        <div className="mb-8 flex flex-col items-center">
          
          <p className="text-md text-gray-600 max-w-3xl text-center mb-6">
            Manage your property listings here. You can add, view, or delete your listings.
          </p>

          {/* New Listing Section */}
          <div className="w-full flex justify-center mb-6">
            <Link
              to="/create-listing"
              className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition duration-300"
            >
              <BsPlusCircle className="text-2xl" />
              <span className="font-semibold text-lg">Add a New Listing</span>
            </Link>
          </div>
        </div>

        {/* Listings Section */}
        {loading ? (
          <p className="text-center text-gray-600 text-lg animate-pulse">Loading...</p>
        ) : error ? (
          <p className="text-red-600 text-center text-lg font-semibold bg-red-100 p-3 rounded-md shadow-md">
          Failed to load listings. Please try to re-login.
        </p>
        ) : userListings.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">No listings found. Add a new listing to get started!</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {userListings.map((listing) => {
              const discountPercentage = calculateDiscountPercentage(
                listing.regularPrice,
                listing.discountPrice
              );

              return (
                <div
                  key={listing._id}
                  className="bg-white border border-gray-300 shadow-md rounded-lg overflow-hidden hover:shadow-lg transform hover:scale-105 transition duration-300"
                >
                  <Link to={`/listing/${listing._id}`} className="block">
                    <img
                      src={listing.imageUrls[0]}
                      alt={listing.name}
                      className="h-40 w-full object-cover"
                    />
                  </Link>
                  <div className="p-4">
                    <h3 className="text-lg font-medium text-gray-800 truncate">
                      <Link to={`/listing/${listing._id}`}>{listing.name}</Link>
                    </h3>
                    <p className="text-sm text-gray-600 mt-2 mb-2 line-clamp-1">
                      {listing.description || 'No description available'}
                    </p>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-gray-500 font-medium text-lg line-through">
                        ₹{listing.regularPrice}
                      </span>
                      <div className="flex items-center">
                        <span className="text-indigo-600 font-medium text-lg mr-2">
                          ₹{listing.discountPrice}
                        </span>
                        <span className="text-white text-xs font-bold bg-red-500 px-2 py-1 rounded-full">
                          {discountPercentage}% OFF
                        </span>
                      </div>
                    </div>
                 
                  <div className="flex gap-2 mb-4">
                      {listing.type === 'sale' && (
                        <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                          For Sale
                        </span>
                      )}
                      {listing.type === 'rent' && (
                        <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium">
                          For Rent
                        </span>
                      )}
                      {listing.offer && (
                        <span className="px-2 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-medium">
                          Special Offer
                        </span>
                      )}
                      {listing.parking && (
                        <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-medium">
                          Parking
                        </span>
                      )}
                      {listing.furnished && (
                        <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-medium">
                          Furnished
                        </span>
                      )}
                    </div>
                    </div>
                  {/* Action Buttons */}
                  <div className="px-4 py-1 bg-gray-50 flex justify-between items-center">
                    <div className="flex gap-4">
                      <Link
                        to={`/listing/${listing._id}`}
                        className="flex items-center text-indigo-600 text-sm font-medium hover:text-indigo-800 transition-all duration-300"
                      >
                        <FaRegEye className="inline-block mr-2 text-lg" />
                        View Details
                      </Link>
                      <Link
                        to={`/update-listing/${listing._id}`}
                        className="flex items-center text-yellow-600 text-sm font-medium hover:text-yellow-800 transition-all duration-300"
                      >
                        <BsPencil className="inline-block mr-2 text-lg" />
                        Edit
                      </Link>
                    </div>
                    <button
                      onClick={() => handleListingDelete(listing._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-full text-xs font-medium hover:bg-red-600 transition-all duration-300"
                    >
                      <BsTrash className="inline-block mr-2 text-lg" />
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
