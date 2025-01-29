import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ListingItem from '../components/ListingItem';

import { FiFilter } from 'react-icons/fi';
import { CiSearch } from "react-icons/ci";

export default function Search() {
  const navigate = useNavigate();
  const [sidebardata, setSidebardata] = useState({
    searchTerm: '',
    type: 'all',
    parking: false,
    furnished: false,
    offer: false,
    sort: 'created_at',
    order: 'desc',
    city: ''
  });
 
    const [showFilters, setShowFilters] = useState(false);

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
  
    const updatedData = {
      searchTerm: urlParams.get('searchTerm') || '',
      city: urlParams.get('city') || '',  // ✅ Ensure city is handled correctly
      type: urlParams.get('type') || 'all',
      parking: urlParams.get('parking') === 'true',
      furnished: urlParams.get('furnished') === 'true',
      offer: urlParams.get('offer') === 'true',
      sort: urlParams.get('sort') || 'created_at',
      order: urlParams.get('order') || 'desc',
    };
  
    setSidebardata((prev) => ({ ...prev, ...updatedData }));
  
    const fetchListings = async () => {
      setLoading(true);
      setShowMore(false);
      try {
        const res = await fetch(`/api/listing/get?${urlParams.toString()}`);
        const data = await res.json();
        setListings(data);
        setShowMore(data.length > 8);
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
      setLoading(false);
    };
  
    fetchListings();
  }, [location.search]);
  

  const handleChange = (e) => {
    if (
      e.target.id === 'all' ||
      e.target.id === 'rent' ||
      e.target.id === 'sale'
    ) {
      setSidebardata({ ...sidebardata, type: e.target.id });
    }

    if (e.target.id === 'searchTerm') {
      setSidebardata({ ...sidebardata, searchTerm: e.target.value });
    }
    if (e.target.id === 'searchTerm' || e.target.id === 'city') { // Added city
      setSidebardata({ ...sidebardata, [e.target.id]: e.target.value });
    }

    if (
      e.target.id === 'parking' ||
      e.target.id === 'furnished' ||
      e.target.id === 'offer'
    ) {
      setSidebardata({
        ...sidebardata,
        [e.target.id]:
          e.target.checked || e.target.checked === 'true' ? true : false,
      });
    }

    if (e.target.id === 'sort_order') {
      const sort = e.target.value.split('_')[0] || 'created_at';

      const order = e.target.value.split('_')[1] || 'desc';

      setSidebardata({ ...sidebardata, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
  
    if (sidebardata.searchTerm) urlParams.set('searchTerm', sidebardata.searchTerm);
    if (sidebardata.city) urlParams.set('city', sidebardata.city);  // ✅ Ensure city is set correctly
    if (sidebardata.type) urlParams.set('type', sidebardata.type);
    if (sidebardata.parking) urlParams.set('parking', sidebardata.parking);
    if (sidebardata.furnished) urlParams.set('furnished', sidebardata.furnished);
    if (sidebardata.offer) urlParams.set('offer', sidebardata.offer);
    if (sidebardata.sort) urlParams.set('sort', sidebardata.sort);
    if (sidebardata.order) urlParams.set('order', sidebardata.order);
  
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };
  

  const onShowMoreClick = async () => {
    const numberOfListings = listings.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await res.json();
    if (data.length < 9) {
      setShowMore(false);
    }
    setListings([...listings, ...data]);
  };
  return (
    <div className='flex flex-col md:flex-row mt-10 md:mt-20'>
      <div className='p-7  border-b-2 md:border-r-2 md:min-h-screen'>
       
      
      {/* Filter Options */}
      <div
    className={`fixed bottom-0 left-0 w-full bg-white p-4 shadow-lg rounded-t-lg transition-transform ${
      showFilters ? 'translate-y-0' : 'translate-y-full'
    } md:relative md:translate-y-0 md:block md:shadow-none md:p-18`}
    style={{ transition: 'transform 0.3s ease-in-out' }}
  >
    {/* Filter Content */}
    
    <div className='flex flex-col gap-2 md:mt-[20px]'>
      <div className='flex gap-2'>
        <input type='checkbox' id='all' className='w-5' onChange={handleChange} checked={sidebardata.type === 'all'} />
        <span>Rent & Sale</span>
      </div>
      <div className='flex gap-2'>
        <input type='checkbox' id='rent' className='w-5' onChange={handleChange} checked={sidebardata.type === 'rent'} />
        <span>Rent</span>
      </div>
      <div className='flex gap-2'>
        <input type='checkbox' id='sale' className='w-5' onChange={handleChange} checked={sidebardata.type === 'sale'} />
        <span>Sale</span>
      </div>
      <div className='flex gap-2'>
        <input type='checkbox' id='offer' className='w-5' onChange={handleChange} checked={sidebardata.offer} />
        <span>Offer</span>
      </div>
    </div>

    <div className='flex flex-wrap items-center gap-2 mt-4'>
      <label className='font-semibold'>Amenities:</label>
      <div className='flex gap-2'>
        <input type='checkbox' id='parking' className='w-5' onChange={handleChange} checked={sidebardata.parking} />
        <span>Parking</span>
      </div>
      <div className='flex gap-2'>
        <input type='checkbox' id='furnished' className='w-5' onChange={handleChange} checked={sidebardata.furnished} />
        <span>Furnished</span>
      </div>
    </div>

    <div className='flex items-center gap-2 mt-8'>
      <label className='font-semibold'>Sort:</label>
      <select
        onChange={handleChange}
        defaultValue={'created_at_desc'}
        id='sort_order'
        className='border rounded-lg p-3'
      >
        <option value='regularPrice_desc'>Price high to low</option>
        <option value='regularPrice_asc'>Price low to high</option>
        <option value='createdAt_desc'>Latest</option>
        <option value='createdAt_asc'>Oldest</option>
      </select>
    </div>

    <button onClick={handleSubmit} className='bg-slate-700 text-white p-3 mt-4 rounded-lg uppercase hover:opacity-95 w-full md:w-auto'>
      Apply filter
    </button>
  </div>
  </div>
      <div className='flex-1'>
      <div className='flex justify-center items-center gap-2 relative'>
          <form onSubmit={handleSubmit}>
          <input
    type="text"
    id="city"
    placeholder="Search..."
    className="border rounded-lg p-3 w-[300px]"
    value={sidebardata.city}
    onChange={handleChange}
  />
  
  
            <button
    onClick={handleSubmit}
    className="absolute right-[75px] md:right-[450px] top-1/2 transform -translate-y-1/2  text-slate-900 p-2 rounded-md hover:opacity-95"
  >
    <CiSearch className="w-5 h-5" />
  </button>
  </form>  
             <button
        className='md:hidden flex items-center gap-2 bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'
        onClick={() => setShowFilters(!showFilters)}
      >
        <FiFilter className='w-6 h-6' />
       
      </button>


          </div  >


          <div className=' mt-0'>
          <h1 className="text-2xl md:text-4xl font-bold border-b-4 border-gray-300 p-2
           text-gray-800 mt-2 shadow-sm">
  Properties in  <span className="text-blue-600">{sidebardata.city}</span> :
</h1>


        <div className='p-14 pt-4 flex flex-wrap gap-4 max-w-7xl'>
          {!loading && listings.length === 0 && (
            <p className='text-xl text-slate-700'>No listing found!</p>
          )}
          {loading && (
            <p className='text-xl text-slate-700 text-center w-full'>
              Loading...
            </p>
          )}

          {!loading &&
            listings &&
            listings.map((listing) => (
              <ListingItem key={listing._id} listing={listing} />
            ))}

          {showMore && (
            <button
              onClick={onShowMoreClick}
              className='text-green-700 hover:underline p-7 text-center w-full'
            >
              Show more
            </button>
          )}
        </div>
        </div>
      </div>
    </div>
  );
}
