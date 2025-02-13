import { Route } from "react-router-dom";
import React from "react";
import CheckTokenExp from "../../utils/CheckTokenExp";
import { Routes } from "react-router-dom";
import NavbarAuthorized from "../../components/NavbarAuth/NavbarAuthorized";
import DashboardT from "./DashboardT";
import AllDocuments from "./AllDocs/AllDocuments";
import SideBarTranslator from "../../components/SideBarTranslator/SideBarTranslator";
import NotFound from "../../components/NotFound/NotFound";


function HomeTranslator() {
  return (
    <div className="min-h-screen">
      <NavbarAuthorized />
      <div className="flex gap-3 pt-16">
        <SideBarTranslator />
        <CheckTokenExp />
        <main className="flex-1 p-6 md:p-8">
          <Routes>
            <Route path="/dashboard" element={<DashboardT />} />
            <Route path="/allDocuments" element={<AllDocuments />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default HomeTranslator;
