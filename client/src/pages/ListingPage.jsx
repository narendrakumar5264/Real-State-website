import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { useSelector } from 'react-redux';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
  FaStar,
  FaPhoneAlt,
  FaEnvelope,
  FaStarHalf,
  FaStarHalfAlt,
  FaWhatsapp,
  FaCarAlt,
  FaCheckCircle,
  FaShieldAlt,
  FaTree,
  FaHome,
} from 'react-icons/fa';


export default function Listing() {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  return (
    <main className="bg-gray-50 min-h-screen mt-16">
      {loading && <p className='text-center my-7 text-2xl text-gray-700 font-medium'>Loading...</p>}
      {error && (
        <p className='text-center my-7 text-2xl text-red-600 font-medium'>Something went wrong!</p>
      )}
      {listing && !loading && !error && (
        <div className="container mx-auto px-6 py-4 md:py-9  md:m-3">
          <div className="relative">
            <Swiper navigation loop autoplay={{ delay: 4000 }} className="rounded-lg shadow-xl">
              {listing.imageUrls.map((url) => (
                <SwiperSlide key={url}>
                  <div
                    className="h-[400px] md:h-[400px]  rounded-lg shadow-lg overflow-hidden transition-transform duration-700 
                    ease-in-out transform hover:scale-105"
                    style={{
                      background: `url(${url}) center no-repeat`,
                      backgroundSize: 'cover',
                    }}
                  ></div>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="absolute top-5 right-5 z-10 border-2 rounded-full w-12 h-12 flex justify-center items-center bg-white cursor-pointer shadow-lg transition-all duration-300 ease-in-out hover:bg-gray-200">
              <FaShare
                className="text-gray-600"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  setCopied(true);
                  setTimeout(() => {
                    setCopied(false);
                  }, 2000);
                }}
              />
            </div>

            {copied && (
              <p className="absolute top-16 right-5 z-10 bg-white p-2 rounded-md shadow-md text-sm text-green-600 font-semibold">
                Link copied!
              </p>
            )}
          </div>

          <div className="flex flex-wrap justify-between items-start gap-8 mt-8">
          <div className="bg-white p-8 rounded-lg shadow-lg flex-1 relative">
  {/* Property Name */}
  <p className="text-4xl font-semibold text-gray-900">{listing.name}</p>

  {/* Location */}
  <div className="flex items-center mt-2">
    <p className="text-lg font-medium text-gray-600 flex items-center">
      <FaMapMarkerAlt className="inline-block text-green-700 mr-2" />
      {listing.address}
    </p>
  </div>

  {/* Status and Offer */}
  <div className="flex items-center mt-4 gap-6">
    <p className="bg-red-600 text-white px-5 py-3 rounded-md uppercase font-medium text-sm tracking-wider">
      {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
    </p>
    {listing.offer && (
      <p className="bg-green-600 text-white px-5 py-3 rounded-md uppercase font-medium text-sm tracking-wider">
        Save ${(+listing.regularPrice - +listing.discountPrice).toLocaleString('en-US')}
      </p>
    )}
  </div>

  {/* Pricing */}
  <p className="text-3xl text-gray-900 font-bold mt-6">
  ₹{' '}
    {listing.offer
      ? listing.discountPrice.toLocaleString('en-US')
      : listing.regularPrice.toLocaleString('en-US')}
    {listing.type === 'rent' && ' / month'}
  </p>

  {/* Description */}
  <p className="mt-6 text-gray-800 text-lg font-light leading-relaxed">
    <span className="font-semibold text-gray-900">Description:</span> {listing.description}
  </p>

  {/* Features List */}
  <ul className="grid grid-cols-2 gap-8 mt-6 text-gray-600">
    <li className="flex items-center">
      <FaBed className="text-green-700 text-xl mr-3" />
      {listing.bedrooms} {listing.bedrooms > 1 ? 'Beds' : 'Bed'}
    </li>
    <li className="flex items-center">
      <FaBath className="text-green-700 text-xl mr-3" />
      {listing.bathrooms} {listing.bathrooms > 1 ? 'Baths' : 'Bath'}
    </li>
    <li className="flex items-center">
      <FaParking className="text-green-700 text-xl mr-3" />
      {listing.parking ? 'Parking Available' : 'No Parking'}
    </li>
    <li className="flex items-center">
      <FaChair className="text-green-700 text-xl mr-3" />
      {listing.furnished ? 'Furnished' : 'Unfurnished'}
    </li>
  </ul>

  {/* Ratings */}
  <div className="mt-8 flex items-center">
    <div className="flex items-center text-yellow-500 text-lg font-medium">
      <FaStar />
      <FaStar />
      <FaStar />
      <FaStar />
      <FaStarHalfAlt />
      <span className="ml-2 text-gray-700">(4.5/5)</span>
    </div>
    <p className="ml-4 text-gray-600">Rated by 250+ happy clients</p>
  </div>

  {/* Additional Notes */}
  <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg text-gray-700">
    <p className="font-medium">
      Interested? Contact us to book a tour or get more details about this property. Don't miss the chance to make it yours!
    </p>
    <p className="mt-2">
      <span className="font-semibold">Special Offer:</span> Get exclusive discounts if booked this month.
    </p>
  </div>
</div>


<div className="w-full md:w-1/3 bg-white p-8 rounded-lg shadow-lg">
  {/* Header */}
  <p className="text-2xl font-semibold text-gray-900">
    Why You Should Consider This Property:
  </p>

  {/* Benefits List */}
  <ul className="mt-4 text-gray-600 list-disc pl-6 space-y-2">
    <li className="flex items-center">
      <FaCarAlt className="text-green-700 text-xl mr-3" />
      Ample parking space
    </li>
    <li className="flex items-center">
      <FaCheckCircle className="text-blue-600 text-xl mr-3" />
      RERA registered project
    </li>
    <li className="flex items-center">
      <FaHome className="text-yellow-500 text-xl mr-3" />
      Ready to move in
    </li>
    <li className="flex items-center">
      <FaShieldAlt className="text-purple-700 text-xl mr-3" />
      Gated and secure community
    </li>
    <li className="flex items-center">
      <FaTree className="text-green-600 text-xl mr-3" />
      Lush green surroundings
    </li>
  </ul>

  {/* Contact Details */}
  <div className="mt-8">
    <p className="text-lg font-medium text-gray-800 mb-4">
      <span className="font-semibold text-gray-900">Owner: </span> {listing.ownerName}
    </p>
    <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-md text-center uppercase font-medium flex items-center justify-center hover:bg-blue-700 transition duration-300">
      <FaPhoneAlt className="inline-block mr-2" />
       {listing.mobileNumber}
    </button>
 

    <button className="w-full bg-green-600 text-white px-6 py-3 mt-4 rounded-md text-center uppercase font-medium flex items-center justify-center hover:bg-green-700 transition duration-300">
      <FaWhatsapp className="inline-block mr-2" />
      Chat on WhatsApp
    </button>
  </div>

  {/* Extra Note */}
  <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg text-gray-700">
    <p className="font-medium">
      Interested? Schedule a visit or contact the owner today to learn more about this property!
    </p>
  </div>
</div>

          </div>

          <div className="mt-12">
            <h3 className="text-3xl font-semibold text-gray-900 mb-6">Customer Reviews</h3>
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300">
                  <div className="flex items-center space-x-4">
                    <img
                      className="w-12 h-12 rounded-full"
                      src={`https://randomuser.me/api/portraits/men/${i}.jpg`}
                      alt="User Avatar"
                    />
                    <div>
                      <span className="font-semibold text-gray-900">John Doe</span>
                      <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, index) => (
                          <FaStar
                            key={index}
                            className={index < 4 ? 'text-yellow-500' : 'text-gray-300'}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="mt-2 text-gray-600">
                    "Great property with excellent facilities. The location is ideal, and the pricing is very competitive."
                  </p>
                  <p className="mt-2 text-sm text-gray-500">Reviewed on: January 25, 2025</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
