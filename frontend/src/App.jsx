import React from 'react';
import './../node_modules/tailwindcss/tailwind.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ParentLogin from './pages/login/ParentLogin';
import ChildLogin from './pages/login/ChildLogin';
import ParentRegister from './pages/ParentRegister';
import ChildRegister from './pages/ChildRegister';
import ParentHome from './pages/ParentHome';
import ChildHome from './pages/ChildHome';
import ParentGeofencingHistory from './pages/ParentGeofencingHistory';
import ParentHistory from './pages/ParentHistory';
import ParentNotificationHistory from './pages/ParentNotificationHistory';
import ParentNotification from './pages/ParentNotification';
import ParentChildLocation from './pages/ParentChildLocation';
import ParentGeofencing from './pages/ParentGeofencing';
import PrivateRoute from './routes/PrivateRoute';
import ProtectedRoute from './routes/ProtectedRoute';
import Profile from './pages/profile/Profile';
import Trial from './pages/Trial';
import EditProfile from './pages/profile/EditProfile';
import ConfirmDelete from './pages/alert/ConfirmDelete';

function App() {
  return (
    <div className="font-poppins">
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/parent/login" element={<ParentLogin />} />
            <Route path="/child/childlogin" element={<ChildLogin />} />
            <Route path="/parent/register" element={<ParentRegister />} />
            <Route path="/child/register" element={<ChildRegister />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/editprofile" element={<EditProfile />} />
            <Route path="/trial" element={<Trial />} />
            <Route path="/deleteaccount" element={<ConfirmDelete />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/child/home" element={<ChildHome />} />
            <Route path="/parent/home" element={<ParentHome />} />
            <Route path="/parent/history" element={<ParentGeofencingHistory />} />
            <Route path="/parent/history/:childname" element={<ParentHistory />} />
            <Route path="/parent/notification_history" element={<ParentNotificationHistory />} />
            <Route path="/parent/notification_history/:childname" element={<ParentNotification />} />
            <Route path="/parent/lokasianak/:childname" element={<ParentChildLocation />} />
            <Route path="/parent/geofencing/:childname" element={<ParentGeofencing />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
