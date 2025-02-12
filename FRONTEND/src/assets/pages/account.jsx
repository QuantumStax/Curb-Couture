import { useEffect, useState } from "react";
import UserAccount from "../components/userAccount";
import Login from "./login";

const Account = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const validateUser = async () => {
      try {
        const res = await fetch("http://localhost:3000/validate", {
          method: "GET",
          credentials: "include"
        });
        console.log("response : ", res);
        
        if (res.ok) {
          const data = await res.json();
          console.log("data : ", data);
          if (data.isAuthenticated) {
            setIsLoggedIn(true)
          } else {
            setIsLoggedIn(false)
          }
        } else {
          console.log("Error Authenticating user!!!");
        }
      } catch (error) {
        // 
        console.log(error);
      }
    };
    validateUser();
  }, []);
  return <section>{isLoggedIn ? <UserAccount /> : <Login />}</section>;
};

export default Account;
