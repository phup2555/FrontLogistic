import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./component/Mainlayout";
import Dashboard from "./page/Dashboard";
import StockIn from "./page/StockIn";
import Report from "./page/Report";
import Login from "./page/Login";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Login />} />
        <Route element={<MainLayout />}>
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Report" element={<Report />} />
          <Route path="/In" element={<StockIn />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
