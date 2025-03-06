import { Link } from 'react-router-dom';
import './login.css';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { login } from '../../Components/ReduxContainer/apiCall';

const Login = () => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   const dispatch = useDispatch();
   const { isFetching, error } = useSelector((state) => state.user);

   const handleClick = (e) => {
      e.preventDefault();
      login(dispatch, { email, password });
   };
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
               <p className="createAccountText">Login account</p>
               <input
                  id="email"
                  type="text"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="inputText"
               />
               <input
                  id="password"
                  type="text"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="inputText"
               />
               <button className="btnForSignup" onClick={handleClick}>
                  Login
               </button>
               <Link to={'/forgot/password'}>
                  <p style={{ textAlign: 'start', marginLeft: '30.6%' }}>
                     Forgot Password?
                  </p>
               </Link>
               <Link to={'/signup'}>
                  <p style={{ textAlign: 'start', marginLeft: '30.6%' }}>
                     Create New Account?
                  </p>
               </Link>
            </div>
         </div>
      </div>
   );
};
export default Login;
