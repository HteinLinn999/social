import { useState } from 'react';

const ForgotPassword = () => {
   const [email, setEmail] = useState('');
   const handleClick = async (e) => {
      e.preventDefault();
      await fetch('http://localhost:5000/api/user/forgot/password', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/JSON',
         },
         body: JSON.stringify({ email }),
      })
         .then(() => {
            alert('We sent you a token email');
         })
         .catch((err) => {
            alert('fail to process', err);
         });
   };

   return (
      <div
         style={{
            //browser  ရဲ့  centre တည့်တည့်မှာထားတာ
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
               borderRadius: '10px',
               backgroundColor: 'black',
            }}
         >
            <p style={{ color: 'white' }}>Enter your Email</p>
            <form
               style={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginTop: '20px',
               }}
            >
               <input
                  type="text"
                  style={{
                     flex: 1,
                     minWidth: '40px',
                     margin: '10px 0px',
                     padding: '10px',
                     borderRadius: '10px',
                  }}
                  placeholder="Enter your Email"
                  onChange={(e) => setEmail(e.target.value)}
               />
               <button
                  onClick={handleClick}
                  style={{
                     width: '40%',
                     border: 'none',
                     padding: '10px 20px',
                     backgroundColor: 'white',
                     color: 'black',
                     borderRadius: '10px',
                     margin: '20px 0px',
                     cursor: 'pointer',
                  }}
               >
                  Send
               </button>
            </form>
         </div>
      </div>
   );
};

export default ForgotPassword;
