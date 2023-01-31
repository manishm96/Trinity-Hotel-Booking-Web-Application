import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom'
import LandingPage from './Pages/LandingPage/LandingPage'
import HotelMain from './Pages/HotelMainPage/HotelMain';
import TopNav from './components/TopNav';
// import Footer from './components/Footer';
import Summary from './Pages/PaymentPage/Summary'
import UserSignup from './Pages/LoginSignup/UserSignUp';
import HotelSignUp from './Pages/LoginSignup/HotelSignUp';
import UserLogin from './Pages/LoginSignup/UserLogin';
import HoteLogin from './Pages/LoginSignup/HoteLogin';
import UpdateHotel from './Pages/HotelMainPage/UpdateHotel';
import UserProfile from './Pages/ProfilePage/userProfile';
import HotelRoomUpdate from './Pages/HotelMainPage/HotelRoomUpdate';
import HotelLandingPage from './Pages/HotelMainPage/HotelLandingPage';
import UserReservations from './Pages/HistoryPage/UserReservations';

function App() {
  const location = useLocation()
  return (


    < div className="App" >
      <div className='background'></div>
      <div className='overlay'></div>
      {
        location.pathname !== `/user/login`
        && location.pathname !== `/user/signup`
        && location.pathname !== `/hotel/login`
        && location.pathname !== `/hotel/signup`
        && location.pathname !== `/hotel/updateRooms`
        && location.pathname !== `/hotel/updateDetails`
        && location.pathname !== `/hotel/profile`
        && <TopNav />
      }




      <Routes>
        <Route path="/" element={<LandingPage />}>
        </Route>
        <Route path="/user/:id" element={<UserProfile />}>
        </Route>
        <Route path={`/hotels/:id`} element={<HotelMain />}>
        </Route>
        <Route path={`/hotel/profile`} element={<HotelLandingPage />}>
        </Route>
        <Route path={`/summary`} element={<Summary />}>
        </Route>
        <Route path={`/user/login`} element={<UserLogin />}>
        </Route>
        <Route path={`/hotel/login`} element={<HoteLogin />}>
        </Route>
        <Route path={`/user/signup`} element={<UserSignup />}>
        </Route>
        <Route path={`/user/reservations`} element={<UserReservations />}>
        </Route>
        <Route path={`/hotel/signup`} element={<HotelSignUp />}>
        </Route>
        <Route path={`/hotel/updateDetails`} element={<UpdateHotel />} />

        <Route path={`/hotel/updateRooms`} element={<HotelRoomUpdate />} />
      </Routes>

      {/* <Footer /> */}
    </div >
  );
}

export default App;
