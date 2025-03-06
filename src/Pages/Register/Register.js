import { Link, useNavigate } from 'react-router-dom';
import './signup.css';
import { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { signup } from '../../Components/ReduxContainer/apiCall';

import app from '../../firebase';
import {
   getStorage,
   ref,
   uploadBytesResumable,
   getDownloadURL,
} from 'firebase/storage';

const Register = () => {
   const dispatch = useDispatch();
   const { isFetching, error } = useSelector((state) => state.user);
   //If  null , the Redux store might not have received an update after signup.
   const user = useSelector((state) => state.user);
   console.log('user in register:', user);
   const userDetails = user?.user;
   console.log('userDetails in register:', userDetails);

   const navigate = useNavigate();

   const [email, setEmail] = useState('');
   const [phonenumber, setPhonenumber] = useState('');
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const [file, setFile] = useState(null);
   const [showPassword, setShowPassword] = useState(false);

   const handleClick = (e) => {
      e.preventDefault();

      const fileName = new Date().getTime() + file?.name;
      const storage = getStorage(app);
      const StorageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(StorageRef, file);

      uploadTask.on(
         'state_changed',
         (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
               (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
               case 'paused':
                  console.log('Upload is paused');
                  break;
               case 'running':
                  console.log('Upload is running');
                  break;
            }
         },
         (error) => {
            // Handle unsuccessful uploads
         },
         () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
               signup(dispatch, {
                  email,
                  password,
                  username,
                  phonenumber,
                  profile: downloadURL,
               });
            });
         },
      );
   };

   console.log('userDetails?.Status:', userDetails?.Status);
   if (userDetails?.Status === 'Pending') {
      navigate('/verify/email');
   }

   return (
      <div className="mainConatinerForSignup">
         <div className="subMainContainer">
            <div style={{ flex: 1, marginLeft: 150, marginBottom: '170px' }}>
               <p className="logoText">
                  Soc<span className="part">ial</span>
               </p>
               <p className="introText">
                  Connect with your
                  <span className="part"> family and friends</span>{' '}
               </p>
            </div>
            <div style={{ flex: 3 }}>
               <p className="createAccountText">Create New account</p>
               <input
                  type="file"
                  name="file"
                  id="file"
                  onChange={(e) => {
                     const selectedFile = e.target.files[0];
                     if (selectedFile) {
                        setFile(selectedFile);
                     }
                  }}
               />
               <input
                  type="text"
                  placeholder="Username"
                  className="inputText"
                  onChange={(e) => setUsername(e.target.value)}
               />
               <input
                  type="text"
                  placeholder="Phone Number"
                  className="inputText"
                  onChange={(e) => setPhonenumber(e.target.value)}
               />
               <input
                  type="email"
                  placeholder="Email"
                  className="inputText"
                  onChange={(e) => setEmail(e.target.value)}
               />
               {/* <input
                  type="password"
                  placeholder="Password"
                  className="inputText"
                  onChange={(e) => setPassword(e.target.value)}
               /> */}
               <div className="passwordContainer">
                  <input
                     type={showPassword ? 'text' : 'password'}
                     placeholder="Password"
                     className="inputText"
                     onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                     type="button"
                     className="togglePasswordBtn"
                     onClick={() => {
                        setShowPassword(!showPassword);
                     }}
                  >
                     {showPassword ? '🙈' : '👁️'}
                  </button>
               </div>

               <button className="btnForSignup" onClick={handleClick}>
                  Sign Up
               </button>
               <Link to={'/login'}>
                  <p style={{ textAlign: 'start', marginLeft: '30.6%' }}>
                     Already have an account?
                  </p>
               </Link>
            </div>
         </div>
      </div>
   );
};

export default Register;
