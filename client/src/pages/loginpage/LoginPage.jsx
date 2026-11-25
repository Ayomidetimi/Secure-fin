import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css';
import eyeIcon from '../../assets/eye-solid-full.svg'
import eyeSlash from '../../assets/eye-slash-icon.png'
import { useState } from 'react';
import Axios from 'axios'


function LoginPage() {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();


  const [showPassword, setShowpassword] = useState(true)
  const passwordVisible = () => {
    setShowpassword(!showPassword)
  }

  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault();
    Axios.post('http://localhost:3000/auth/login', {
      email: email,
      password: password
    },
      {
        withCredentials: true
      }
    ).then((response) => {
      if (response.data.status === "success") {
        navigate("/dashboard");
      }
    }).catch((err) => {
      console.error(err)
    })

  }

  return (
    <form className="login-page" onSubmit={handleSubmit}>

      <div className="email-section">
        <label htmlFor="Email" className="email-label">
          Email Address
        </label>
        <input
          className="email-input"
          type="email"
          placeholder="you@example.com"
          autoComplete='email'
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="password-section">
        <label htmlFor="password" className="password-label">
          Password
        </label>
        <input
          className="password-input"
          type={showPassword ? "password" : "text"}
          autoComplete='current password'
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
        <img
          src={
            showPassword ?
              eyeSlash : eyeIcon
          }
          className="password-icon"
          onClick={passwordVisible}
        />
      </div>

      <div className="forget-container-link">
        <Link
          className="forget-link"
          to='/'>
          Forget Password?
        </Link>
      </div>


      <button type="submit" className="login-button">
        Login
      </button>


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