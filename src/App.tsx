import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Dashboard from "./services/Dashboard";
import Login from "./services/Login";
import Signup from "./services/Signup";
import "./App.css";

function App() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    // if authenticated go to dashboard
    if (token) navigate("/dashboard");
    // else go to login or signup
    else navigate("/login");

    // disable the warning, we expect to run this only on token change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <div className="App bg-[#F4F7F7]">
      <Dashboard />
      <Login />
      <Signup />
    </div>
  );
}

export default App;
