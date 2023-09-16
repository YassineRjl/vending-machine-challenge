import { Route, Routes } from "react-router-dom";
import DashboardPage from "./components/DashboardPage";

export const Dashboard = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<DashboardPage />}></Route>
    </Routes>
  );
};

export default Dashboard;
