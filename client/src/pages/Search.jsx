import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCar, FaCouch, FaFilter, FaSort } from 'react-icons/fa';
import { BiSolidOffer } from 'react-icons/bi';
import ListingItem from '../components/ListingItem';

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
  });

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const typeFromUrl = urlParams.get('type');
    const parkingFromUrl = urlParams.get('parking');
    const furnishedFromUrl = urlParams.get('furnished');
    const offerFromUrl = urlParams.get('offer');
    const sortFromUrl = urlParams.get('sort');
    const orderFromUrl = urlParams.get('order');

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || '',
        type: typeFromUrl || 'all',
        parking: parkingFromUrl === 'true' ? true : false,
        furnished: furnishedFromUrl === 'true' ? true : false,
        offer: offerFromUrl === 'true' ? true : false,
        sort: sortFromUrl || 'created_at',
        order: orderFromUrl || 'desc',
      });
    }

    const fetchListings = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await res.json();
      if (data.length > 8) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
      setListings(data);
      setLoading(false);
    };

    fetchListings();
  }, [location.search]);

  const handleChange = (e) => {
    if (['all', 'rent', 'sale'].includes(e.target.id)) {
      setSidebardata({ ...sidebardata, type: e.target.id });
    }

    if (e.target.id === 'searchTerm') {
      setSidebardata({ ...sidebardata, searchTerm: e.target.value });
    }

    if (['parking', 'furnished', 'offer'].includes(e.target.id)) {
      setSidebardata({
        ...sidebardata,
        [e.target.id]: e.target.checked || e.target.checked === 'true',
      });
    }

    if (e.target.id === 'sort_order') {
      const [sort, order] = e.target.value.split('_');
      setSidebardata({ ...sidebardata, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    Object.entries(sidebardata).forEach(([key, value]) => {
      urlParams.set(key, value);
    });
    navigate(`/search?${urlParams.toString()}`);
    setShowFilterModal(false); // Close the modal after applying filters
  };

  const onShowMoreClick = async () => {
    const numberOfListings = listings.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const res = await fetch(`/api/listing/get?${urlParams.toString()}`);
    const data = await res.json();
    if (data.length < 9) {
      setShowMore(false);
    }
    setListings([...listings, ...data]);
  };

  return (
    <div className="flex flex-col md:flex-row">
      {/* Filter Modal for Mobile */}
      {showFilterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-11/12 max-w-md relative">
            <button
              className="absolute top-4 right-4 text-red-500"
              onClick={() => setShowFilterModal(false)}
            >
              Close
            </button>
            <FilterForm
              sidebardata={sidebardata}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
          </div>
        </div>
      )}

      {/* Sidebar for Filters */}
      <div className="hidden md:block p-6 w-1/4 bg-white shadow-lg">
        <FilterForm
          sidebardata={sidebardata}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </div>

      {/* Listings Section */}
      <div className="flex-1">
        <header className="p-4 bg-gray-100 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <input
              type="text"
              id="searchTerm"
              className="border rounded-lg p-2 w-60"
              placeholder="Search..."
              value={sidebardata.searchTerm}
              onChange={handleChange}
            />
            <button
              className="md:hidden flex items-center bg-blue-600 text-white p-2 rounded-lg"
              onClick={() => setShowFilterModal(true)}
            >
              <FaFilter />
            </button>
          </div>
          <h1 className="text-2xl font-bold text-gray-700 hidden md:block">
            Listings
          </h1>
        </header>
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading && <p className="text-center text-gray-500">Loading...</p>}
          {!loading && listings.length === 0 && (
            <p className="text-center text-gray-500">No listings found!</p>
          )}
          {!loading &&
            listings.map((listing) => (
              <ListingItem key={listing._id} listing={listing} />
            ))}
        </div>
        {showMore && (
          <button
            onClick={onShowMoreClick}
            className="block mx-auto bg-blue-600 text-white px-6 py-2 rounded-lg mt-4"
          >
            Show More
          </button>
        )}
      </div>
    </div>
  );
}

function FilterForm({ sidebardata, handleChange, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <h3 className="text-sm font-medium">Type</h3>
        <div className="flex gap-2">
          <label>
            <input
              type="radio"
              id="all"
              name="type"
              className="mr-2"
              checked={sidebardata.type === 'all'}
              onChange={handleChange}
            />
            All
          </label>
          <label>
            <input
              type="radio"
              id="sale"
              name="type"
              className="mr-2"
              checked={sidebardata.type === 'sale'}
              onChange={handleChange}
            />
            Sale
          </label>
          <label>
            <input
              type="radio"
              id="rent"
              name="type"
              className="mr-2"
              checked={sidebardata.type === 'rent'}
              onChange={handleChange}
            />
            Rent
          </label>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="parking"
          className="w-4 h-4"
          checked={sidebardata.parking}
          onChange={handleChange}
        />
        <FaCar className="text-gray-600" />
        <label htmlFor="parking">Parking</label>
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="furnished"
          className="w-4 h-4"
          checked={sidebardata.furnished}
          onChange={handleChange}
        />
        <FaCouch className="text-gray-600" />
        <label htmlFor="furnished">Furnished</label>
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="offer"
          className="w-4 h-4"
          checked={sidebardata.offer}
          onChange={handleChange}
        />
        <BiSolidOffer className="text-gray-600" />
        <label htmlFor="offer">Special Offers</label>
      </div>
      <div>
        <h3 className="text-sm font-medium">Sort</h3>
        <select
          id="sort_order"
          className="w-full border rounded-lg p-2"
          onChange={handleChange}
          value={`${sidebardata.sort}_${sidebardata.order}`}
        >
          <option value="created_at_desc">Newest First</option>
          <option value="created_at_asc">Oldest First</option>
          <option value="regularPrice_desc">Price: High to Low</option>
          <option value="regularPrice_asc">Price: Low to High</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg"
      >
        Apply Filters
      </button>
    </form>
  );
}
