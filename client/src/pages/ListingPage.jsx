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
    <main className="bg-gray-50 min-h-screen">
      {loading && <p className='text-center my-7 text-2xl text-gray-700 font-medium'>Loading...</p>}
      {error && (
        <p className='text-center my-7 text-2xl text-red-600 font-medium'>Something went wrong!</p>
      )}
      {listing && !loading && !error && (
        <div className="container mx-auto px-6 py-12">
          <div className="relative">
            <Swiper navigation loop autoplay={{ delay: 4000 }} className="rounded-lg shadow-xl">
              {listing.imageUrls.map((url) => (
                <SwiperSlide key={url}>
                  <div
                    className="h-[500px] md:h-[600px] rounded-lg shadow-lg overflow-hidden transition-transform duration-700 ease-in-out transform hover:scale-105"
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
            <div className="bg-white p-8 rounded-lg shadow-lg flex-1">
              <p className="text-4xl font-semibold text-gray-900">{listing.name}</p>
              <div className="flex items-center mt-2">
                <p className="text-lg font-medium text-gray-600">
                  <FaMapMarkerAlt className="inline-block text-green-700 mr-2" />
                  {listing.address}
                </p>
              </div>

              <div className="flex items-center mt-4 gap-6">
                <p className="bg-red-600 text-white px-5 py-3 rounded-md uppercase font-medium text-sm tracking-wider">
                  {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
                </p>
                {listing.offer && (
                  <p className="bg-green-600 text-white px-5 py-3 rounded-md uppercase font-medium text-sm tracking-wider">
                    ${+listing.regularPrice - +listing.discountPrice} OFF
                  </p>
                )}
              </div>

              <p className="text-3xl text-gray-900 font-bold mt-6">
                ${' '}
                {listing.offer
                  ? listing.discountPrice.toLocaleString('en-US')
                  : listing.regularPrice.toLocaleString('en-US')}
                {listing.type === 'rent' && ' / month'}
              </p>

              <p className="mt-6 text-gray-800 text-lg font-light">
                <span className="font-semibold text-gray-900">Description:</span> {listing.description}
              </p>

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
            </div>

            <div className="w-full md:w-1/3 bg-gray-50 p-8 rounded-lg shadow-lg">
              <p className="text-2xl font-semibold text-gray-900">Why you should consider this property:</p>
              <ul className="mt-4 text-gray-600 list-disc pl-6 space-y-2">
                <li>Ample parking space</li>
                <li>RERA registered project</li>
                <li>Ready to move in</li>
              </ul>

              <div className="mt-8">
                <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-md text-center uppercase font-medium hover:bg-blue-700 transition duration-300">
                  <FaPhoneAlt className="inline-block mr-2" /> {listing.mobileNumber}
                </button>
                <button className="w-full bg-gray-600 text-white px-6 py-3 mt-4 rounded-md text-center uppercase font-medium hover:bg-gray-700 transition duration-300">
                  <FaEnvelope className="inline-block mr-2" /> Email Builder
                </button>
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
