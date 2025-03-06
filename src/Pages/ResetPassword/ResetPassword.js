import { useState } from 'react';
import { useLocation } from 'react-router-dom';

const ResetPassword = () => {
   const location = useLocation();
   const code = location.search.split('?')[1];
   // console.log(code);
   console.log('code', code);

   const [password, setPassword] = useState('');
   console.log('password', password);
   
   const handleClick = async (e) => {
      e.preventDefault();
      await fetch(`http://localhost:5000/api/user/reset/password?${code}`, {
         method: 'PUT',
         headers: {
            'Content-Type': 'application/JSON',
         },
         body: JSON.stringify({ password }),
      })
         .then((data) => {
            alert('Your password has been reset successfully');
            window.location.reload(true);
         })
         .catch((err) => {
            alert('Fail to reset password', err);
         });
   };

   return (
      <div
         style={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
         }}
      >
         <div
            style={{
               width: '25%',
               padding: '20px',
               margin: 'auto',
               backgroundColor: 'black',
               borderRadius: '10px',
            }}
         >
            <p style={{ color: 'white' }}>Enter your new password</p>
            <form style={{ display: 'flex', flexDirection: 'column' }}>
               <input
                  type="password"
                  placeholder="**************"
                  style={{
                     flex: 1,
                     minWidth: '40px',
                     margin: '10px 0px',
                     padding: '10px',
                     borderRadius: '10px',
                  }}
                  onChange={(e) => {
                     setPassword(e.target.value);
                  }}
               />
               <button
                  style={{
                     width: '40%',
                     margin: '10px 0px',
                     padding: '10px',
                     borderRadius: '10px',
                     backgroundColor: 'white',
                     color: 'black',
                     border: 'none',
                     cursor: 'pointer',
                  }}
                  onClick={handleClick}
               >
                  Set Password
               </button>
            </form>
         </div>
      </div>
   );
};

export default ResetPassword;
