import { Route } from "react-router-dom";
import React, { lazy, Suspense } from "react";
import { Router, Routes, BrowserRouter } from "react-router-dom";
import Loader from "./components/Loader";
import Login from "./components/Login/Login";
import { Toaster } from "react-hot-toast";

const Home = lazy(() => import("./components/Home/Home"));
const HomeAdmin = lazy(() => import("./pages/admin/HomeAdmin"));
const HomeTranslator = lazy(() => import("./pages/translator/HomeTranslator"));
const HomeUser = lazy(() => import("./pages/user/HomeUser"));
const NotFound = lazy(() => import("./components/NotFound/NotFound"));

export const THEME_COLOR = `#E83D3D`

function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Suspense
        fallback={
          <>
            <Loader />
          </>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/register" element={<Register />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/adminPanel/*" element={<HomeAdmin />} />
          <Route path="/translatorPanel/*" element={<HomeTranslator />} />
          <Route path="/userPanel/*" element={<HomeUser />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
