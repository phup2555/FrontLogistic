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
        <Route path="/" element={<Login />} />
        <Route
          path="/Dashboard"
          element={
            <MainLayout>
              <Dashboard />
            </MainLayout>
          }
        />
        <Route
          path="/In"
          element={
            <MainLayout>
              <StockIn />
            </MainLayout>
          }
        />

        <Route
          path="/Report"
          element={
            <MainLayout>
              <Report />
            </MainLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
