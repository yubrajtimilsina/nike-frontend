import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/authSlice";
import { useAppDispatch } from "../../store/hooks";

const Logout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(logout());
    localStorage.removeItem("tokenauth"); // Clear token from local storage
    navigate("/login"); // Redirect to login after logout
  }, [dispatch, navigate]);

  return null;
};

export default Logout;
