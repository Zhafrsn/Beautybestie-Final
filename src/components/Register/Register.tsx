/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useState } from 'react';
import { Navbar } from "../Navbar/Navbar";
import '../../styles/Register.css';
import { Sidebar } from 'components/Sidebar';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth, db } from "../../firebase/config"
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import { registerUser } from '../../firebase/user';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export const Register: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);

  // State variables for input validation
  const [fullNameError, setFullNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [phoneNumberError, setPhoneNumberError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);

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

  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = e.target.value;
    if (inputText.trim() === '') {
      setFullNameError('Full name is required');
    } else {
      setFullNameError(null);
    }
    setFullName(inputText);
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

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = e.target.value;
    const phoneRegex = /^[0-9]*$/;
  
    if (!phoneRegex.test(inputText)) {
      setPhoneNumberError('Invalid phone number. Please enter digits only.');
    } else {
      setPhoneNumberError(null);
      setPhoneNumber(inputText);
    }
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

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = e.target.value;
    if (inputText !== password) {
      setConfirmPasswordError('Passwords do not match');
    } else {
      setConfirmPasswordError(null);
    }
    setConfirmPassword(inputText);
  };

  const validateForm = () => {
    // Reset error messages
    setFullNameError(null);
    setEmailError(null);
    setPhoneNumberError(null);
    setPasswordError(null);
    setConfirmPasswordError(null);

    let isValid = true;

    // Validate full name
    if (fullName.trim() === '') {
      setFullNameError('Full name is required');
      isValid = false;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setEmailError('Invalid email address');
      isValid = false;
    }

    // Validate phone number (you can customize the validation logic)
    const phoneRegex = /^[0-9]+$/;
    if (!phoneRegex.test(phoneNumber.trim()) || phoneNumber.trim().length !== 12) {
      setPhoneNumberError('Invalid phone number');
      isValid = false;
    }

    // Validate password
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    }

    // Validate confirm password
    if (confirmPassword !== password) {
      setConfirmPasswordError('Passwords do not match');
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isFormValid = validateForm();

    if (isFormValid && captchaValue) {
      handleSignUp(e);
    } else {
      setErrorMessages([]);

      if (!isFormValid) {
        setErrorMessages([
          fullNameError || '',
          emailError || '',
          phoneNumberError || '',
          passwordError || '',
          confirmPasswordError || '',
        ].filter(Boolean) as string[]);
      }

      if (errorMessages.length > 0) {
        console.log('Error messages:', errorMessages);
      }  

    }
  };

  const [checked, setChecked] = useState(true);
  const [checked2, setChecked2] = useState(false);

  const handleChange = (event: {
    preventDefault: unknown;
    target: {
      id: string;
      checked: boolean;
    };
  }) => {
    const isChecked = event.target.checked;

    if (event.target.id === "myCheckbox1") {
      setChecked(isChecked);
    } else if (event.target.id === "myCheckbox2") {
      setChecked2(isChecked);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (captchaValue) {
      const registrationData = {
        email,
        password,
        confirmPassword,
        fullName,
        phoneNumber,
      };
  
      const registrationResult = await registerUser(auth, registrationData);
  
      if (registrationResult.success) {
        console.log(registrationResult.message);
        alert(registrationResult.message);
        navigate('/login');
      } else {
        console.error(registrationResult.message);
        alert(registrationResult.message);
      }
    } else {
      console.error('Captcha not completed');
    }
  };

  return (
    <><Sidebar contentId="side-bar" isOpen={false} toggleSidebar={() => {}} />
      <Navbar />
      <div className="signup-container">
      <form className='signup-form' onSubmit={handleSubmit}>
        <p className='signup-header'>Sign Up</p>
        <div className='signup-input-items'>
          <div className='signup__inputs-container'>
            <label htmlFor="fullName" className='signup-label'>Full Name</label>
            {fullNameError && <div className="error-message small-error">{fullNameError}</div>}
            <div className='signup-button'>
              <input
                type="text"
                id="fullName"
                placeholder='Your full name'
                className={`signup-input ${fullNameError ? 'error' : ''}`}
                value={fullName}
                onChange={handleFullNameChange}
                required
              />
            </div>
          </div>
          <div className='signup__inputs-container'>
            <label htmlFor="email" className='signup-label'>Email</label>
            {emailError && <div className="error-message small-error">{emailError}</div>}
            <div className='signup-button'>
              <input
                type="email"
                id="email"
                placeholder='Your email'
                className={`signup-input ${emailError ? 'error' : ''}`}
                value={email}
                onChange={handleEmailChange}
                required
                />
            </div>
          </div>
          <div className='signup__inputs-container'>
            <label htmlFor="phoneNumber" className='signup-label'>Phone Number</label>
            {phoneNumberError && <div className="error-message small-error">{phoneNumberError}</div>}
            <div className='signup-button'>
              <input
                type="text"
                id="phoneNumber"
                placeholder='Your phone number'
                className={`signup-input ${phoneNumberError ? 'error' : ''}`}
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                required
                />
            </div>
          </div>
          <div className='signup__inputs-container'>
            <label htmlFor="password" className='signup-label'>Password</label>
            {passwordError && <div className="error-message small-error">{passwordError}</div>}
            <div className='signup-button'>
              <input
                 type="password"
                 id="password"
                 placeholder='Your password'
                 className={`signup-input ${passwordError ? 'error' : ''}`}
                 value={password}
                 onChange={handlePasswordChange}
                 required
                />
            </div>
          </div>
          <div className='signup__inputs-container'>
            <label htmlFor="confirmPassword" className='signup-label'>Confirm Password</label>
              {confirmPasswordError && <div className="error-message small-error">{confirmPasswordError}</div>}
              <div className='signup-button'>
              <input
                type="password"
                id="confirmPassword"
                placeholder='Confirm your password'
                className={`signup-input ${confirmPasswordError ? 'error' : ''}`}
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
                />
            </div>
            <div className='signup-checkbox-wrapper'>
                <div className='signup-checkbox'>
                  <input
                    type="checkbox"
                    id='myCheckbox1'
                    className='checkbox'
                    checked={checked}
                    onChange={handleChange}
                  />
                  <p>By signing up, I agree to the <a className='signup-tc' href='/t&c'>terms and conditions</a></p>
                </div>
                <div className='signup-checkbox'>
                  <input
                    type="checkbox"
                    id='myCheckbox2'
                    className='checkbox'
                    checked={checked2}
                    onChange={handleChange}
                  />
                  <p>I agree to receive information and commersial offers from Beautybestie</p>
                </div>
          </div>
        </div>
        </div>
          <div className='signup__wrapper'>
          <ReCAPTCHA
        sitekey="6LcFGicpAAAAAE8KhHQrMTrUsrhv9bQH4wsbojpx"
        onChange={handleCaptchaChange}
      />
          <button type="submit" className='signup__btn-signup'>SIGN UP</button>
          <div className='signup__or-container'>
            <p className='signup-or'>or</p>
          </div>
            <button
              className="signup__btn-signup-google"
              onClick={handleGoogleSignIn}
            >
            <img src={'images/google-logo.png'} alt='logo-google' className='signup__google-logo'/>
            Continue with Google
          </button>
          <div className='signup__to-login'>
              <p>Already have an account?
              <a href='/login' className='signup__login'> LOGIN</a></p> 
          </div> 
        </div>  
      </form>
    </div></>
  );
};
