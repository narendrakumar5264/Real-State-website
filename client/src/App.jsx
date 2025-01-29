import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import About from './pages/About';
import Profile from './pages/Profile';
import Header from './components/Header';
import Home from './pages/Home'; // Assuming you have a Home component
import PrivateRoute from './components/PrivateRoute'; // Assuming you have a PrivateRoute component
import CreateListing from './pages/CreateListing';
import Listing from './pages/Listing';
import UpdateListing from './pages/UpdateListing';
import ListingPage from './pages/ListingPage';
import Search from './pages/Search';
import ScrollToTop from './components/ScrollToTop';
function AppContent() {
  const location = useLocation(); // Now it's inside BrowserRouter's context

  return (
    <div>
      {/* Show Header only if the current path is not "/" */}
      {location.pathname !== '/' && <Header />}
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/listing/:listingId" element={<ListingPage />} />
        <Route path='/search' element={<Search />} />
        {/* Private routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route path="/update-listing/:listingId" element={<UpdateListing />} />
          <Route path="/listing" element={<Listing />} />
        </Route>
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
