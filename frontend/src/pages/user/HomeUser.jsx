import { Route } from "react-router-dom";
import React from "react";
import CheckTokenExp from "../../utils/CheckTokenExp";
import { Routes } from "react-router-dom";
import DashboardU from "./DashboardU";
import NavbarAuthorized from "../../components/NavbarAuth/NavbarAuthorized";
import MyDocs from "./myDocs/MyDocs";
import Profile from "../../components/Profile/Profile";
import NotFound from "../../components/NotFound/NotFound";

function HomeUser() {
  return (
    <>
      <div className="min-h-screen pt-16">
        <NavbarAuthorized />
        <CheckTokenExp />

        <main className="flex-1 p-6 md:p-8">
          <Routes>
            <Route path="/dashboard" element={<DashboardU />} />
            <Route path="/mydocuments" element={<MyDocs />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default HomeUser;
