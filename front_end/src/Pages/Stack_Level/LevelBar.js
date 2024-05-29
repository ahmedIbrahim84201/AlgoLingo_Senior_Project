import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LevelBar.css";
import { useAuth } from "../Menu/AuthContext";
import { doc, updateDoc, getDoc } from "firebase/firestore"; 
import { db } from "../Menu/firebaseConfig";
import { getAuth } from "firebase/auth";
import { firebaseApp } from "../Menu/firebaseConfig";

function LevelsBar({
  activeButtonIndex,
  pushClicked,
  popClicked,
  peekClicked,
  isEmptyClicked,
  checkResult,
  firstLevelCompleted,
  checkResult2,
}) {
  const navigate = useNavigate();

  const levels = ["prep", 1, 2,3];
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState(null);
  const auth = getAuth(firebaseApp);

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
  }, [currentUser])


  const isUnlocked = (index) => {
  
    if (index === 1) {
      return pushClicked && popClicked && peekClicked && isEmptyClicked || userData?.completedLevels?.FirstLevel;

    }
    else if (index === 2) {
      return checkResult === "Great!" || userData?.completedLevels?.SecondLevel;

    } 
    
    else if (index === 3) {
      return checkResult2 === "Great!" || userData?.completedLevels?.ThirdLevel;

    } 
    else {

      
      return levels.slice(0, index).every((level) => level === "X");
    }
  };

  const handleButtonClick = (index) => {
    if (levels[index] === "prep") {
      navigate("/preperation-level");
    } else if (index === 1) {
      navigate("/preperation-level/first-level");
    } else if (index === 2) {
      navigate("/preperation-level/second-level");
    }
    else if (index === 3) {
      navigate("/preperation-level/third-level");
    }
    else {
      // Handle navigation for other levels
    }
  };

  const renderButtons = () => {
    return levels.map((number, index) => (
      <button
        key={index}
        className={`stack-level-bar-buttons ${
          index === activeButtonIndex ? "active" : ""
        } ${isUnlocked(index) ? "" : "locked"}`}
        onClick={() => handleButtonClick(index)}
        disabled={!isUnlocked(index)}
      >
        {isUnlocked(index) ? number : "X"}
      </button>
    ));
  };

  return (
    <div>
      <h2>Levels</h2>
      <div className="button-bar-stack-level">{renderButtons()}</div>
    </div>
  );
}

export default LevelsBar;
