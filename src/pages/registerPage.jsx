import eyeIcon from '../assets/eye-solid-full.svg';
import eyeSlash from '../assets/eye-slash-icon.png';
import { useState } from "react";
import './registerPage.css';
import { Link } from 'react-router-dom';

function RegisterPage () {
  const [showPassword, setShowpassword] = useState(false);

  const [showPassword2, setShowpassword2] = useState(false);


  const passwordVisible = ()=> {
    setShowpassword(!showPassword);
  };

  const passwordVisible2 = ()=> {
    setShowpassword2(!showPassword2);
  };

  return(
    <form className="register-page">

        <div className="register-name-section">
          <label htmlFor="name" className="register-name-label">
            Full name
          </label>
          <input className="register-name-input"   type="text" placeholder="Enter your full name" 
          />
        </div>

        <div className="register-email-section">
          <label htmlFor="Email" className="register-email-label">
            Email Address
          </label>
          <input className="register-email-input" type="email" placeholder="you@example.com" />
        </div>
        
        <div className="create-password-section">
          <label htmlFor="create-password"       className="register-password-label">
            Password
          </label>
          <input 
            className="register-password-input" 
            type={showPassword? "password" : "text"} 
            placeholder="Enter your password" 
          />
          <img 
            src={
              showPassword? 
              eyeSlash : eyeIcon 
            } 
            className="register-password-icon" 
            onClick={passwordVisible}
          />
        </div>
        
        <div  className="confirm-password-section">
          <label htmlFor="confirm-password"       className="password-label">
            Confirm Password
          </label>
          <input 
            className="confirm-password-input" 
            type={showPassword2? "password" : "text"} 
            placeholder="Enter your password" 
          />
          <img 
            src={
              showPassword2? 
              eyeSlash : eyeIcon 
            } 
            className="confirm-password-icon" 
            onClick={passwordVisible2}
          />
        </div>

        <div className="terms-condition-section">
          <span className="terms-checkbox">
            <input type="checkbox"/>
          </span>
            I agree to the 
          <Link 
          className="terms-link"
            to='/'
          >
            Terms & Conditions
          </Link>
        </div>

       
        <div className="register-button">
          Create Account
        </div>
        
      </form>
  )
}

export default RegisterPage;