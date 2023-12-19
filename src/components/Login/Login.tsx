/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-console */
import '../../styles/Login.css';
import { useState } from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth, db } from "../../firebase/config"
import { Navbar } from 'components/Navbar';
import { Sidebar } from 'components/Sidebar';
import { SuccessLogin } from 'components/PopUp/SuccessLogin';
import { LoginFailed } from 'components/PopUp/LoginFailed';
import ReCAPTCHA from 'react-google-recaptcha';
import { loginUser } from '../../firebase/user';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [error, setError] = useState(false);
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);

  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const navigate = useNavigate();

  const handleCaptchaChange = (value: string | null) => {
    setCaptchaValue(value);
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
  
      if (!user.emailVerified) {
        console.warn('User email is not verified. Please check your email for a verification link.');
        return { success: false, message: 'Email not verified. Please check your email for a verification link.' };
      }
  
      const userDocRef = doc(db, 'userData', user.uid);
      const userDocSnapshot = await getDoc(userDocRef);
  
      if (!userDocSnapshot.exists()) {
        const userData = {
          uid: user.uid,
          displayName: user.displayName || '',
          email: user.email || '',
          photoURL: user.photoURL || '',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
  
        await setDoc(userDocRef, userData);
      }
      console.log('User signed in with Google:', user);
      navigate('/');
      return { success: true, message: 'Login successful', userData: user };
    } catch (error) {
      console.error('Google Sign-In error:', error);
      return { success: false, message: 'Google Sign-In failed' };
    }
  };

  const handleSingIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (captchaValue) {
      const loginData = {
        email,
        password,
      };

      try {
        const loginResult = await loginUser(auth, loginData);

        if (loginResult.success) {
          setShowSuccessPopup(true);
          console.log('User data:', loginResult.userData);
        } else {
          if (loginResult.message === 'Email not verified. Please check your email for a verification link.') {
            setErrorMessages([loginResult.message]);
          } else {
            setError(true);
            console.error(loginResult.message);
          }
        }
      } catch (error) {
        console.error('Error during login:', error);
      }

      console.log('Email:', email);
      console.log('Password:', password);
    } else {
      console.error('Captcha not completed');
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = e.target.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inputText.trim())) {
      setEmailError('Invalid email address');
    } else {
      setEmailError(null);
    }
    setEmail(inputText);
  };
  
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = e.target.value;
    if (inputText.length < 6) {
      setPasswordError('Password must be at least 6 characters');
    } else {
      setPasswordError(null);
    }
    setPassword(inputText);
  };

  const validateForm = () => {
    setEmailError(null);
    setPasswordError(null);

    let isValid = true;

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setEmailError('Invalid email address');
      isValid = false;
    }

    // Validate password
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    }

    return isValid;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Perform form validation
    const isFormValid = validateForm();

    if (isFormValid && captchaValue) {
      handleSingIn(e);
    } else {
      setErrorMessages([]);

      if (!isFormValid) {
        setErrorMessages([
          emailError || '',
          passwordError || '',
        ].filter(Boolean) as string[]);
      }

      if (errorMessages.length > 0) {
        console.log('Error messages:', errorMessages);
      }  

    }
  };

  return (
    <>
      <Sidebar contentId="side-bar" isOpen={false} toggleSidebar={() => {}} />
      <Navbar />
      <div className='login-container'>
        <form className="login-form" onSubmit={handleSingIn}>
          <p className="login-text">Login</p>
          <div className='login__items'>
            <div className='login__email-container'>
              <label htmlFor="email" className='login-label'>Email</label>
              {emailError && <div className="error-message small-error">{emailError}</div>}
              <div className='login-button'>
                <input
                  type="email"
                  id="email"
                  placeholder='Your email'
                  className={`login-email ${emailError ? 'error' : ''}`}
                  value={email}
                  onChange={handleEmailChange}
                  required
                  />
              </div>
            </div>
            <div className='login__pw-container'>
              <label htmlFor="password" className='login-label'>Password</label>
              {passwordError && <div className="error-message small-error">{passwordError}</div>}
              <div className='login-button'>
              <input
                 type="password"
                 id="password"
                 placeholder='Your password'
                 className={`login-password ${passwordError ? 'error' : ''}`}
                 value={password}
                 onChange={handlePasswordChange}
                 required
                />
              </div>
              <p className='login__forgot-pw'>Forgot password ?</p>  
            </div>
          </div> 
          <div className='login__wrapper'>
          <ReCAPTCHA
        sitekey="6LcFGicpAAAAAE8KhHQrMTrUsrhv9bQH4wsbojpx"
        onChange={handleCaptchaChange}
      />
            <button type="submit" className='login__btn-login' onClick={handleSubmit}>LOGIN</button>
            <div className='login__or-container'>
              <p className='login-or'>or</p>
            </div>
            <button className="login__btn-login-google" onClick={handleGoogleSignIn}>
              <img src={'images/google-logo.png'} alt='logo-google' className='login__google-logo'/>
              Continue with Google
            </button>
            <div className='login__to-signup'>
                <p>{"If you don't have an account, please "}
                <a href='/register' className='login__click-here'>click here</a> to Sign Up</p> 
            </div>  
          </div>  
        </form>
      </div>
      {error && <LoginFailed/>}
      {showSuccessPopup && <SuccessLogin />}
    </>
  );
};