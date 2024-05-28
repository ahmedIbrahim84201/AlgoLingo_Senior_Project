import React, { useState, useEffect } from "react";
import "./ProfilePage.css";
import { useAuth } from "../Menu/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Menu/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { firebaseApp } from "../Menu/firebaseConfig";

const auth = getAuth(firebaseApp);

const ProfilePage = () => {
  const { currentUser} = useAuth();
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          setUserData(userDocSnap.data());
        } else {
          console.log("User document does not exist");
        }
      }
    };
    fetchUserData();
  }, [currentUser]);

  const handleLogout = () => {
    signOut(auth).then(() => {
      navigate('/');
    }).catch((error) => {
      console.error("Error signing out: ", error);
    });
  };


 
  if (!currentUser) {
    return null;
  }

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      <div className="profile-details">
        <p>{currentUser.email}</p>
        <p>{`First Level: ${userData?.completedLevels?.FirstLevel ? `${userData.points} Points` : "Not Completed"}`}</p>
        <p>{`Second Level: ${userData?.completedLevels?.SecondLevel ? `${userData.points2} Points` : "Not Completed"}`}</p>
        <p>{`Third Level: ${userData?.completedLevels?.ThirdLevel ? `${userData.points3} Points` : "Not Completed"}`}</p>
      </div>
      <button onClick={handleLogout}>Sign Out</button>
    </div>
  );
};

export default ProfilePage;
