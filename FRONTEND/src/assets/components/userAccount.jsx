import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserAccount = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Remove token from localStorage immediately
      localStorage.removeItem("token");

      // Optionally include withCredentials if backend sets HttpOnly cookies
      const response = await axios.post("http://localhost:3000/logout");

      console.log("Logout response:", response.data);

      // Redirect user to login page after logout
      navigate("/", { replace: true });
    } catch (error) {
      // Log detailed error information
      if (error.response) {
        console.error("Logout error:", error.response.data);
      } else {
        console.error("Logout error:", error.message);
      }
    }
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default UserAccount;
