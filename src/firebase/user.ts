/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    createUserWithEmailAndPassword,
    Auth,
    signInWithEmailAndPassword,
    sendEmailVerification
} from 'firebase/auth';
import { setDoc, doc, getDoc } from 'firebase/firestore';
import { db } from './config';
import { TUser } from 'types/user.type';

interface RegistrationData {
    email: string;
    password: string;
    confirmPassword: string;
    fullName: string;
    phoneNumber: string;
}

interface Result {
    success: boolean;
    message?: string;
    userData?: any;
}

export const registerUser = async (auth: Auth, registrationData: RegistrationData): Promise<Result> => {
    const { email, password, confirmPassword, fullName, phoneNumber } = registrationData;
    
    try {
        if (password !== confirmPassword) {
            return { success: false, message: 'Password and confirm password do not match' };
        }
        
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await sendEmailVerification(userCredential.user);
        
        const user = {
            uid: userCredential.user.uid,
            displayName: fullName,
            email: email,
            photoURL: "",
            phoneNumber: phoneNumber,
            createAt: new Date().toISOString(),
            updateAt: new Date().toISOString(),
        };
        await setDoc(doc(db, 'userData', user.uid), user);
        
        return { success: true, message: 'Registration successful. Verification email' };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Registration failed' };
    }
};

interface LoginData {
    email: string;
    password: string;
}
export const loginUser = async (auth: Auth, loginData: LoginData): Promise<Result> => {
    const { email, password } = loginData;
  
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        if (!user.emailVerified) {
            return { success: false, message: 'Email not verified. Please check your email for a verification link.' };
        }
  
      const userDocRef = doc(db, 'userData', user.uid);
      const userDocSnapshot = await getDoc(userDocRef);
  
      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data() as TUser;
        return { success: true, message: 'Login successful', userData };
      } else {
        return { success: false, message: 'User data not found' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Login failed' };
    }
  };

