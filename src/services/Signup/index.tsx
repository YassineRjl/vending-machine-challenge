import { Route, Routes } from "react-router-dom";
import { SignupPage } from "./components/SignupPage";

export const Signup = () => {
  return (
    <Routes>
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  );
};

export default Signup;
