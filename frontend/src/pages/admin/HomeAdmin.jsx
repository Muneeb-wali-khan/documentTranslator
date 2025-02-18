import { Route } from "react-router-dom";
import React from "react";
import CheckTokenExp from "../../utils/CheckTokenExp";
import { Routes } from "react-router-dom";
import NavbarAuthorized from "../../components/NavbarAuth/NavbarAuthorized";
import DashBoardA from "./DashBoardA";
import SideBarAdmin from "../../components/SideBarAdmin/SideBarAdmin";
import AllUsers from "./AllUsers/AllUsers";
import NotFound from "../../components/NotFound/NotFound";
import Profile from "../../components/Profile/Profile";
import HistoryLogs from "./HistoryLogs/HistoryLogs";
function HomeAdmin() {
  return (
    <div className="min-h-screen">
      <NavbarAuthorized />
      <div className="flex gap-3 pt-16">
        <SideBarAdmin />
        <CheckTokenExp />
        <main className="flex-1 p-6 md:p-8">
          <Routes>
            <Route path="/dashboard" element={<DashBoardA />} />
            <Route path="/allUsers" element={<AllUsers />} />
            <Route path="/historylogs" element={<HistoryLogs />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default HomeAdmin;

