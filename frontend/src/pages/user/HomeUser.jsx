import { Route } from "react-router-dom";
import React from "react";
import CheckTokenExp from "../../utils/CheckTokenExp";
import { Routes } from "react-router-dom";
import DashboardU from "./DashboardU";
import NavbarAuthorized from "../../components/NavbarAuth/NavbarAuthorized";
import MyDocs from "./myDocs/MyDocs";

function HomeUser() {
  return (
    <>
      <NavbarAuthorized />
      <CheckTokenExp />
      <Routes>
        <Route path="/dashboard" element={<DashboardU />} />
        <Route path="/mydocuments" element={<MyDocs />} />
      </Routes>
    </>
  );
}

export default HomeUser;
