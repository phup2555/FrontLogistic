import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./component/Mainlayout";
import Dashboard from "./page/Dashboard";
import StockIn from "./page/StockIn";
import Report from "./page/Report";
import Login from "./page/Login";
import WarehouseMap from "./page/LocationMap";
import Main from "./page/Main";
import ProtectedRoute from "./utils/routeGuard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/Login" element={<Login />} />

        <Route
          element={
            <ProtectedRoute allowRoles={["LogisAdminnn", "UserLogistic"]} />
          }
        >
          <Route element={<MainLayout />}>
            <Route path="/In" element={<StockIn />} />
            <Route path="/WarehouseMap" element={<WarehouseMap />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute allowRoles={["LogisAdminnn"]} />}>
          <Route element={<MainLayout />}>
            <Route path="/Report" element={<Report />} />
            <Route path="/Dashboard" element={<Dashboard />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
