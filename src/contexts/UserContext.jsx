import { createContext, useContext, useState } from "react";
const UserContext = createContext();
function UserProvider({ children }) {
  const storedUser = localStorage.getItem("user");
  const [user, setUser] = useState(JSON.parse(storedUser));
  let isLoggedIn = user === null || user?.username === "none" ? false : true;
  function setUseLocalStorage(userObj) {
    localStorage.setItem("user", JSON.stringify(userObj));
    setUser(userObj);
  }
  return (
    <UserContext.Provider value={{ isLoggedIn, user, setUseLocalStorage }}>
      {children}
    </UserContext.Provider>
  );
}

function useCurrentUser() {
  const context = useContext(UserContext);
  if (context === undefined)
    throw new Error("UserContext was used outside of the UserProvider");
  return context;
}

export { UserProvider, useCurrentUser };
