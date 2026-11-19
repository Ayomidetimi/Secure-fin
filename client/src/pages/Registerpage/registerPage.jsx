import eyeIcon from '../../assets/eye-solid-full.svg';
import eyeSlash from '../../assets/eye-slash-icon.png';
import { useState } from "react";
import './registerPage.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

function RegisterPage () {
  const [showPassword, setShowpassword] = useState(false);
  const [showPassword2, setShowpassword2] = useState(false);

  const [ userName, setUserName ] = useState();
  const [ email, setEmail ] = useState();
  const [ password, setpassword ] = useState();
  const [ password2, setPassword2 ] = useState();


  const passwordVisible = ()=> {
    setShowpassword(!showPassword);
  };

  const passwordVisible2 = ()=> {
    setShowpassword2(!showPassword2);
  };


  function handleSubmit(e) {
    e.preventDefault();

    console.log("Register button clicked");
    axios.post('http://localhost:3000/auth/register', {
      userName: userName,
      email: email,
      password: password,
      password2: password2,
    }).then((response)=> {
      console.log(response.data)
    }).catch((err) => {
      console.log(err)
    })

  }
  return(
    <form className="register-page" onSubmit={handleSubmit}
    
    >
        <div className="register-name-section">
          <label htmlFor="name"   className="register-name-label"
          >
            Full name
          </label>
          <input 
            className="register-name-input"   
            type="text" 
            placeholder="Enter your full name" 
            onChange={(e)=> setUserName(e.target.value)}
            required
            autoComplete="name"
          />
        </div>

        <div className="register-email-section">
          <label htmlFor="Email" className="register-email-label">
            Email Address
          </label>
          <input 
            className="register-email-input" 
            type="email" 
            placeholder="you@example.com" 
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete='email'
          />
        </div>
        
        <div className="create-password-section">
          <label htmlFor="create-password"       className="register-password-label">
            Password
          </label>
          <input 
            className="register-password-input" 
            type={showPassword? "password" : "text"} 
            placeholder="Enter your password" 
            onChange={(e) => setpassword(e.target.value)}
            required
            autoComplete='password'
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
            onChange={(e) => setPassword2(e.target.value)}
            required
            autoComplete='password'
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

       
        <button className="register-button" type="submit"
        onClick={() => console.log("Button clicked")}
        >
          Create Account
        </button>
        
      </form>
  )
}

export default RegisterPage;