import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import header from '../assets/header.png';
import body from '../assets/capital.png';
import Loader from '../components/loader/Loader';
import { MdKeyboardArrowRight } from 'react-icons/md';
import './login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_APP_BASE_URL}/user/login`, {
        username,
        password,
      });

      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      alert('Login successful!');
      navigate('/account');
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Invalid credentials, please try again');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {
        loading ? <Loader /> : ''
      }
      <main className="login-main">
        <img src={header} alt="Header" className="login-header-img" />
        <div className="login-container">
          <div className="login-inner-container">
            <form className="login-form" onSubmit={handleLogin}>
              <div className="login-form-group">
                <label htmlFor="username" className="login-label">Username</label>
                <div className="input-bx">
                  <img height={24} src="https://www.capitalone.com/assets/shell/images/icons/ui-lined-user.svg" alt="username" />
                  <input
                    type="text"
                    id="username"
                    name="username"
                    className="login-input"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  /><br />
                </div>
                <div className="login-form-options">
                  <div className='login-remember-me-bx'>
                    <input type="checkbox" name="remember-me" className="login-checkbox" />
                    <label className="login-remember-me-label">Remember me</label>
                  </div>
                </div>
              </div>

              <div className="login-form-group">
                <label htmlFor="password" className="login-label">Password</label>
                <div className="input-bx">
                  <img height={24} src="https://www.capitalone.com/assets/shell/images/icons/ui-lined-lock.svg" alt="password" />
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="login-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  /><br />
                </div>
                <div className="login-form-options">
                  <div className="login-help-links">
                    <a href="/forgot-username" className="login-forgot-link">Forgot username or password?</a>
                  </div>
                </div>
              </div>
              <div className='login-form-group'>
                <label htmlFor="" style={{ color: "#f0f0f0" }}>.</label>
                <button type="submit" className="login-sign-in-button">Sign in</button> <br />
                <div className="login-form-options">
                  <div className="login-help-links">
                    <a href="/setup-access" className="login-setup-link">Set up online access</a>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <img src={body} alt="header" className="login-body-img" />
      </main>
    </>
  );
}

export default Login;