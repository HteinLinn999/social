import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Profile from './Pages/Profile/Profile';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';

import { useSelector } from 'react-redux';
import { VerifyEmail } from './Pages/VerifyEmail/VerifyEmail';
import ForgotPassword from './Pages/ForgotPassword/ForgotPassword';
import ResetPassword from './Pages/ResetPassword/ResetPassword';

const App = () => {
   const userDetails = useSelector((state) => state.user);
   const user = userDetails.user;
   // console.log('user  in App.js:', user);

   return (
      <div className="App">
         <BrowserRouter>
            <Routes>
               <Route
                  path="/"
                  element={
                     user?.user?.verifed === true ? (
                        <Home />
                     ) : (
                        <Navigate to={'/login'} replace={true} />
                     )
                  }
               />

               <Route path="/Profile/:id" element={<Profile />} />

               <Route
                  path="/login"
                  element={
                     user?.user?.verifed === true ? (
                        <Navigate to={'/'} replace={true} />
                     ) : (
                        <Login />
                     )
                  }
               />

               <Route path="/signup" element={<Register />}></Route>
               <Route
                  path="/verify/email"
                  element={
                     user?.Status === 'Pending' ? (
                        <VerifyEmail />
                     ) : user?.user?.verifed === true ? (
                        <Navigate to={'/'} replace={true} />
                     ) : (
                        <Login />
                     )
                  }
               />
               <Route path="/forgot/password" element={<ForgotPassword />} />
               <Route path="/reset/password" element={<ResetPassword />} />
            </Routes>
         </BrowserRouter>
      </div>
   );
};

export default App;
