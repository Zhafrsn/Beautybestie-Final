/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { MainLayout } from "layout";
import ProfileComp from "components/Profile/ProfileComp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { getAuth } from "firebase/auth";
import { getUserData, updateProfilePicture, updateUserData } from "../firebase/profile";
import Avatar from "components/customAvatar/avatar";
import { storage } from "../firebase/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const profileItems = [
  { label: 'Profile', href: '/profile', icon: <FontAwesomeIcon icon={faUserCircle} /> },
];

const Profile: React.FC = () => {
  const auth = getAuth();
  const [user, setUser] = useState<any>(null);
  const [isEditMode, setIsEditMode] = useState<boolean>(true);
  const [originalUserData, setOriginalUserData] = useState<any>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (auth.currentUser) {
        const userData = await getUserData(auth, auth.currentUser.uid);
        setUser(userData);
        setOriginalUserData(userData);
      }
    };

    fetchUserData();
  }, [auth.currentUser]);

  const handleProfilePictureChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file && auth.currentUser) {
      const storageRef = ref(storage, `profilePictures/${auth.currentUser.uid}/${file.name}`);
    
      try {
        await uploadBytes(storageRef, file);

        const downloadURL = await getDownloadURL(storageRef);

        await updateProfilePicture(auth, auth.currentUser.uid, downloadURL);
      
        setUser({ ...user, photoURL: downloadURL });
      } catch (error) {
        console.error('Error updating profile picture:', error);
      }
    }
  };

  const handleCancelButtonClick = () => {
    setUser(originalUserData);
    setIsEditMode(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser: any) => ({ ...prevUser, [name]: value }));
  };

  const handleSaveButtonClick = async () => {
    try {
      console.log("Saving user data...");
      if (auth.currentUser) {
        await updateUserData(auth, auth.currentUser.uid, user);
        setOriginalUserData(user);
        setIsEditMode(false);
        console.log("User data saved successfully.");
      }
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };
  
    return (
      <MainLayout>
       <div className="profile__container">
        <ProfileComp/>
        <div className="profile__cont">
          <div className="profile__container2">
            <p className="profile__title">BeautyBestie</p>
            </div>
          <div className="profile-user">
            <div className="profile__picture">
              <Avatar
                  src={user?.photoURL}
                  name={user?.displayName}
                  size="100px"
                  bordered
                />
              <label htmlFor="profilePictureInput" className="profile__icon-container">
                  <FontAwesomeIcon icon={faPlus} className="profile__icon" />
              </label>
              <input
                type="file"
                id="profilePictureInput"
                accept="image/*"
                onChange={handleProfilePictureChange}
                style={{ display: "none" }}
              />
            </div>
            <div className="profile__container3">
              <p className="profile__name">{user?.displayName}</p>
              <p className="profile__email">{user?.email}</p>
            </div>
          </div>
         <div className="profile__container4">
            <div className="profile__input">
              <div className="profile__container-sub1">
                <p className="profile__atribute">Name</p>
                  <input
                    name={user?.displayName}
                    type="text"
                    className="profile__input-input"
                    placeholder="name"
                    defaultValue={user?.displayName || ''}
                    onChange={handleInputChange}
                    disabled={!isEditMode}
                  />
              </div>
              <div className="profile__container-sub1">
                <p className="profile__atribute">Email</p>
                  <input 
                    name={user?.email}
                    type="text"
                    className="profile__input-input"
                    placeholder="email"
                    defaultValue={user?.email || ''}
                    onChange={handleInputChange}
                    disabled={!isEditMode}
                />
              </div>
            </div>
           <div className="profile__input">
            <div className="profile__container-sub1">
             <p className="profile__atribute">Phone Number</p>
             <input 
                    name={user?.phoneNumber}
                    type="tel"
                    className="profile__input-input"
                    placeholder="phone number"
                    defaultValue={user?.phoneNumber || ''}
                    onChange={handleInputChange}
                    pattern="[0-9]*"
                    disabled={!isEditMode}
                  />
            </div>
            <div className="profile__container-sub1">
             <p className="profile__atribute">Date of Birth</p>
              <input
                type="date"
                className="profile__input-input"
                    placeholder="mm/dd/yy"
                    value={user?.dateOfBrith}
                    onChange={handleInputChange}
                    disabled={!isEditMode}
              />
            </div>
           </div>
           <div className="profile__input">
            <div className="profile__container-sub1">
             <p className="profile__atribute">Address</p>
                <p className="profile__input-input">ini isinya alamat yang di set sebagai alamat utama</p>
            </div>
            <div className="profile__container-sub1">
             <p className="profile__atribute">Password</p>
                  <input
                    type="password"
                    className="profile__input-input"
                    placeholder="old password"
                    value={user?.password}
                    onChange={handleInputChange}
                    disabled={!isEditMode}
                  />
                  <input
                    type="password"
                    className="profile__input-input"
                    placeholder="new password"
                    onChange={handleInputChange}
                    disabled={!isEditMode}
                  />
            </div>
           </div>
           <div className="profile__input">
            <div className="profile__container-sub1">
              <button
                    className="profile__button1"
                    style={{ backgroundColor: isEditMode ? 'white' : 'white' }}
                    onClick={handleCancelButtonClick}
                    disabled={!isEditMode}
              >
              <span className="profile__button-text">Cancel</span>
             </button>
            </div>
            <div className="profile__container-sub1">
                  <button
                    className="profile__button2"
                    style={{ backgroundColor: isEditMode ? 'gray' : 'pink' }} 
                    onClick={handleSaveButtonClick}
                    disabled={!isEditMode}
                  >
              <span className="profile__button-text" >Save</span>
             </button>
          </div>
          </div>
         </div>
        </div>
       </div>
      </MainLayout>
    );
  };
  
  export default Profile;