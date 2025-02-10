import { useEffect, useState } from "react";
import UserAccount from "../components/userAccount";
import Login from "./login";

const Account = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    const validateUser = () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
      }
    };
    validateUser();
  });
  return <section>{isLoggedIn ? <UserAccount /> : <Login />}</section>;
};

export default Account;
