import { Auth, updateProfile } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "./config";

interface UserData {
  uid: string;
  displayName: string;
  email: string;
  phoneNumber: string;
  photoURL: string;
  dateOfBirth: Date;
  createdAt: string;
  updatedAt: string;
}
  
  export const updateProfilePicture = async (auth: Auth, uid: string, photoURL: string): Promise<void> => {
    try {
      if (!auth.currentUser) {
        throw new Error('User is not authenticated.');
      }
  
      const userDocRef = doc(db, 'userData', uid);
      await updateDoc(userDocRef, { photoURL });
  
      await updateProfile(auth.currentUser, { photoURL: photoURL });
    } catch (error) {
      console.error('Error updating profile picture:', error);
      throw error; 
    }
  };  
  
  export const getUserData = async (auth: Auth, uid: string): Promise<UserData | null> => {
    try {
      const userDocRef = doc(db, 'userData', uid);
      const userDocSnapshot = await getDoc(userDocRef);
  
      if (userDocSnapshot.exists()) {
        return userDocSnapshot.data() as UserData;
      }
  
      return null;
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error; 
    }
};
  
export const updateUserData = async (auth: Auth, uid: string, userData: UserData): Promise<void> => {
  try {
    if (!auth.currentUser) {
      throw new Error('User is not authenticated.');
    }

    const userDataToUpdate = {
      uid: userData.uid,
      displayName: userData.displayName,
      photoURL: userData.photoURL,
      email: userData.email,
      phoneNumber: userData.phoneNumber,
      dateOfBirth: userData.dateOfBirth,
      createdAt: userData.createdAt,
      updatedAt: userData.updatedAt,
    };

    const userDocRef = doc(db, 'userData', uid);
    await updateDoc(userDocRef, userDataToUpdate);

    await updateProfile(auth.currentUser, userDataToUpdate);

    console.log('User data updated successfully.');
  } catch (error) {
    console.error('Error updating user data:', error);
    throw error; 
  }
};