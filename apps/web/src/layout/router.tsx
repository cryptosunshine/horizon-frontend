import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";
import Nav from "../components/nav";

// Lazy-loaded components
const Home = lazy(() => import("../pages/home"));
const Deposit = lazy(() => import("../pages/deposit"));
const Withdraw = lazy(() => import("../pages/withdraw"));

const Layout: React.FC = () => {
  return (
    <>
      <Nav />
      <div className="main relative sm:z-[10] pt-[80px]">
        <Outlet />
      </div>
    </>
  );
};

const AppRoutes: React.FC = () => (
  <Router>
    <Suspense fallback={<></>}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/deposit" element={<Deposit />} />
          <Route path="/withdraw" element={<Withdraw />} />
        </Route>
      </Routes>
    </Suspense>
  </Router>
);

export default AppRoutes;
