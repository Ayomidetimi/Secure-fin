import { Link } from 'react-router-dom';
import './LoginPage.css';
import eyeIcon from '../assets/eye-solid-full.svg'
import eyeSlash from '../assets/eye-slash-icon.png'
import { useState } from 'react';


function LoginPage() {

  const [ showPassword, setShowpassword] = useState(true)
  const passwordVisible = ()=> {
    setShowpassword(!showPassword)
  }
  return (
    
      <form className="login-page">

        <div className="email-section">
          <label htmlFor="Email" className="email-label">
            Email Address
          </label>
          <input className="email-input" type="email" placeholder="you@example.com" />
        </div>
        
        <div className="password-section">
          <label htmlFor="password"       className="password-label">
            Password
          </label>
          <input 
            className="password-input" 
            type={showPassword? "password" : "text"} 
            placeholder="Enter your password" 
          />
          <img 
            src={
              showPassword? 
              eyeSlash : eyeIcon 
            } 
            className="password-icon" 
            onClick={passwordVisible}
          />
        </div>
        
        <div    className="forget-container-link">
          <Link 
            className="forget-link"
            to='/'>
            Forget Password?
          </Link>
        </div>

        <Link 
          to="/dashboard"
          className="login-link"
        >
          <div className="login-button">
            Login
          </div>
        </Link>
        
        <div className="register-link-container">
          Don't have an account?
          <span>
            <Link 
              to="/register"
              className="register-link"
            >
              Register
            </Link>
          </span>
        </div>

        
      </form>
  );
}

export default LoginPage;