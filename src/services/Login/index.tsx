import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./components/LoginPage";

export const Login = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
};

export default Login;
