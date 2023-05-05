import { useState } from "react";
import "./getOtp.css";
import axios from 'axios';

export default function GetOtp() {
  const [mobileNumber, setMobileNumber] = useState('');
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  function triggerOtp() {
    if(mobileNumber < 999999999 || mobileNumber >= 10000000000){
      alert('Invalid mobile number!!!');
      console.error('Invalid mobile number!!!');
      return;
    }
    axios.post('https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP', {
      mobile: mobileNumber
    })
    .then(function (response) {
      setMobileNumber('');
      alert('Successfully delivered the otp!!!');
      console.log(response);
    })
    .catch(function (error) {
      alert('Please retry, something went wrong!!!');
      console.log(error);
    });

    if(modal) {
      document.body.classList.add('active-modal')
    } else {
      document.body.classList.remove('active-modal')
    }
  }

  return (
    <>
      <br />
      <br />
      <form onSubmit={e => e.preventDefault()} noValidate autoComplete="off">
        <input
          type="number"
          placeholder='Mobile Number'
          validation={{
            required: {
              value: true,
              message: 'required',
            },
            minLength: {
              value: 10,
              message: 'min 10 characters',
            },
            maxLength: {
              value: 10,
              message: 'min 10 characters',
            }
          }}
          onChange={e => setMobileNumber(e.target.value)}
          value={mobileNumber}
        />
      </form>
      <br />
      <button type="submit" onClick={triggerOtp}>Click</button>
      <button onClick={toggleModal} className="btn-modal">BLUFF</button>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2>OTP SENT</h2>
            <button className="close-modal" onClick={toggleModal}>X</button>
          </div>
        </div>
      )}
    </>
  );
}
