import Main_page from "./Pages/Main_page.jsx";
import Post_expand from "./Pages/Post_page_display.jsx";
import Profile from "./Pages/Profile_page.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EditProfile from "./Pages/EditProfile.jsx";
import Search from "./Pages/Search.jsx";
import { NothingFoundBackground } from "./Components/NothingFoundBackground.jsx";
import { useDispatch, useSelector } from "react-redux";
import Sign_in from "./Pages/Sign_in.jsx";
import Sign_up from "./Pages/Sign_up.jsx";
import Nav_bar from "./Components/Auth/Nav_bar.jsx";
import { useEffect } from "react";
import Cookies from "js-cookie";
import React from "react";
import ForgetPassword from "./Pages/ForgetPassword.jsx";
import Your_activity from "./Pages/Your_activity.jsx";
import Footer from "./Components/Footer.jsx";
import FollowTagsModal from "./Components/Auth/FollowTagsModal.jsx";
import Auth_google_success from "./Pages/Auth_google_success.jsx";
import Message_page from "./Pages/Message_page.jsx";
import White_board_page from "./Pages/White_board_page.jsx";
import ReactGA from 'react-ga';
const TRACKING_ID = "G-Y1FL9PMPD2"; // OUR_TRACKING_ID
ReactGA.initialize(TRACKING_ID);

const MainLayout = () => (
  <>
    <FollowTagsModal />
    <Nav_bar />
    <Routes>
      <Route
        path='/'
        element={<Main_page />}
      />
      <Route
        path='/profile/:id'
        element={<Profile />}
      />
      <Route
        path='/post/:id'
        element={<Post_expand />}
      />
      <Route
        path='/editprofile'
        element={<EditProfile />}
      />
      <Route
        path='/search'
        element={<Search />}
      />
      <Route
        path='/your_activity/:activity_type'
        element={<Your_activity />}
      />
      <Route
        path='/message/:receiverId?'
        element={<Message_page />}
      />
      <Route
        path='*'
        element={<NothingFoundBackground />}
      />
    </Routes>
    <Footer />
  </>
);
function App() {
  const { isAuth, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!isAuth) {
      const token = Cookies.get("auth_Token");
      if (token) {
        dispatch({ type: "VALIDATE_USER", data: token });
      }
    }
  }, [isAuth]);

  useEffect(() => {
    if (isAuth)
      dispatch({ type: "CONNECTED_USER", data: { userId: user._id } });
  }, [isAuth]);
  
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);
  
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/sign_in'
          element={<Sign_in />}
        />
        <Route
          path='/sign_up'
          element={<Sign_up />}
        />
        <Route
          path='/forgetPassword'
          element={<ForgetPassword />}
        />
        <Route
          path='/auth/google/success'
          element={<Auth_google_success />}
        />
        <Route
          path='/whiteBoard'
          element={<White_board_page/>}
        />
        <Route
          path='/*'
          element={<MainLayout />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
