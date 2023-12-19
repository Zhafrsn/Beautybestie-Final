import { faLock, faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import ReCAPTCHA from 'react-google-recaptcha';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { auth } from "../../firebase/config"
import { useNavigate } from 'react-router-dom';


import '../../styles/Admin/LoginAdmin.css';

export const LoginAdmin: React.FC = () => {
    const [error, setError] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
  
    const handleSingIn = (e: React.FormEvent) => {
      e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
          .then(() => {
            navigate('/Dashboard');
          }).catch(() => {
              setError(true);
              alert('Login Failed');
          })
        console.log('Email:', email);
        console.log('Password:', password);
    };

    return (
        <>
        <div className="loginAdmin-container">
            <form className="loginAdmin-form" onSubmit={handleSingIn}>
                <h1 className="loginAdmin-title">Login</h1>
                <div className="loginAdmin-items">
                    <div className="loginAdmin-button">
                        <FontAwesomeIcon icon={faUser} />
                        <input
                            type="email"
                            id="email"
                            className="login-email"
                            placeholder='Enter your email'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="loginAdmin-button">
                        <FontAwesomeIcon icon={faLock} />
                        <input
                            type='password'
                            id="password"
                            className="login-password"
                            placeholder='Enter your password'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required 
                        />
                    </div>
                    </div>
                    <button type="submit" className='loginAdmin__login-btn'>LOGIN</button>
            </form>
        </div>
    </>
    )
}