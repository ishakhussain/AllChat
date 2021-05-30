// The purpose of AuthContext is to create a user context to manage all of our user information

// useContext => accepts a context object and reutrns the current context value for that context.
// useState => returns a stateful value, and a function to update it.
// useEffect => accepts a function that contains important code.
import React, { useContext, useState, useEffect } from "react";

// useHistory => provides access to the history prop in React Router.
import { useHistory } from "react-router-dom";
import { auth } from "../firebase";

// Now that all the imports are ready, the context can now be created
const AuthContext = React.createContext();

// Now create a function to export the entire context

export const useAuth = () => useContext(AuthContext);
// So the const AuthContext was created and passed into useContext react hook.
// When useAuth is called, access to the populated AuthContext will be granted.

// AuthProvider to manage the user's data
// Whenever AuthProvider is used, react children is also used. React children is going to render all the JSX that is passed through the AuthProvider.
export const AuthProvider = ({ children }) => {
  // set up loading states
  // At the start, the loading is set to true.
  const [loading, setLoading] = useState(true);

  // user object is equal to useState, which at the start can be set as an empty object.
  // initially the user can be set to null, so that the Chats page does not open at first.
  const [user, setUser] = useState(null);

  // Now call the useHistory hook coming from react-router-dom
  const history = useHistory();

  // Set up useEffect which is a function that sets up another callback function as its first parameter.
  // useEffect also accepts a second parameter called a dependency array or dependency list
  // when the dependency array changes, then this whole callback function will be recalled.
  // We want to call the useEffect whenever the user object changes and the history changes. So whenever we re-navigate or add a user.
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
      // setLoading can be set to false because loading is no longer required
      setLoading(false);

      if (user) history.push("/chats");
      // this will re-navigate us to the chat application only if we have the user.
    });
  }, [user, history]);

  // whenever you're working with odd value context, you need one value object.
  const value = { user };

  return (
    <AuthContext.Provider value={value}>
      {/* Inside the context, show the children components if loading is not occuring*/}
      {/* If statement - if not loading, then show children */}

      {/* The && syntax means if the first condition is true, then do this. */}
      {!loading && children}
    </AuthContext.Provider>
  );
};
