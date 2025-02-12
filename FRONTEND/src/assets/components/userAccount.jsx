import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserAccount = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/logout",
        {},
        { withCredentials: true }
      );

      console.log("Logout response:", response.data);

      navigate("/", { replace: true });
    } catch (error) {
      if (error.response) {
        console.error("Logout error:");
      } else {
        console.error("Logout error:");
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
