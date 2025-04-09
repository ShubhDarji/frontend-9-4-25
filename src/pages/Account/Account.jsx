// src/pages/Account/Account.jsx

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to /account/profile by default
    navigate("profile");
  }, [navigate]);

  return null;
};

export default Account;