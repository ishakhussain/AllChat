import React, { useRef, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";
import { auth } from "../firebase";

// See if we are successfully getting data from the context
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

const Chats = () => {
  const history = useHistory();

  // this will populate the user variable
  const { user } = useAuth();
  const { loading, setLoading } = useState(true);

  const handleLogout = async () => {
    await auth.signOut();

    history.push("/");
  };

  // also want users to have an image, so create a function to handle images
  const getFile = async (url) => {
    const response = await fetch(url);

    // blobs are images or any other type of file that needs to be transferred over in binary format. The blob contains the image
    const data = await response.blob();

    return new File([data], "userPhoto.jpg", { type: "image/jpeg" });
  };

  useEffect(() => {
    // If there is no user, push the user back to login
    if (!user) {
      history.push("/");

      return;
    }

    // Trying to get the user that has already been created
    axios
      .get("https://api.chatengine.io/users/me", {
        headers: {
          "project-id": "8f5ccb89-61e7-4b1d-8a57-d828314aff0c",
          // user data is coming from useAuth context
          "user-name": user.email,
          "user-secret": user.uid,
        },
      })

      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        let formdata = new FormData();
        formdata.append("email", user.email);
        formdata.append("username", user.email);
        formdata.append("secret", user.uid);

        // call the getFile function
        getFile(user.photoURL).then((avatar) => {
          formdata.append("avatar", avatar, avatar.name);

          // creating a new user
          // post request is usually used when you want to create documents
          axios
            .post("https://api.chatengine.io/users", formdata, {
              headers: {
                "private-key": "0a752628-e176-4b86-93c9-0018774ca171",
              },
            })
            // if user creation is successful, call .then
            .then(() => setLoading(false))
            // if user creation is not successful, then call .catch and console.log the error
            .catch((error) => console.log(error));
        });
      });
  }, [user, history]);

  if (!user || loading) return "Loading...";

  return (
    <div className="chats-page">
      <div className="nav-bar">
        <div className="logo-tab">AllChat</div>
        <div onClick={handleLogout} className="logout-tab">
          Logout
        </div>
      </div>

      <ChatEngine
        height="calc(100vh-66px)"
        projectID="8f5ccb89-61e7-4b1d-8a57-d828314aff0c"
        userName={user.email}
        userSecret={user.uid}
      />
    </div>
  );
};

export default Chats;
