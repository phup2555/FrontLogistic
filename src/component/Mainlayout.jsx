import React, { useState, useEffect } from "react";
import { Layout, Menu, Grid, Button } from "antd";

import { checkAdmin } from "../utils/roleHelper";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";

const { Sider, Content } = Layout;
const { useBreakpoint } = Grid;

export default function MainLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [mobileView, setMobileView] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const screens = useBreakpoint();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const isMobile = !screens.md;
    setMobileView(isMobile);
    if (!isMobile) {
      setCollapsed(false);
      setSidebarVisible(false);
    }
  }, [screens]);

  const userMenu = [
    { key: "/in", label: "ພັດສະດຸ", onClick: () => navigate("/in") },
  ];

  const adminMenu = [
    {
      key: "/dashboard",
      label: "ໜ້າຫຼັກ",
      onClick: () => navigate("/Dashboard"),
    },
    ...userMenu,
    { key: "/Report", label: "ລາຍງານ", onClick: () => navigate("/Report") },
  ];

  const siderWidth = 250;
  const siderCollapsedWidth = 80;

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {mobileView && sidebarVisible && (
        <div
          onClick={() => setSidebarVisible(false)}
          className="fixed inset-0 bg-black opacity-40 z-40"
        />
      )}

      <Sider
        collapsible={!mobileView}
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        width={siderWidth}
        collapsedWidth={mobileView ? 0 : siderCollapsedWidth}
        trigger={null}
        style={{
          background: "#928E85",
          position: mobileView ? "fixed" : "relative",
          zIndex: 50,
          height: "100vh",
          overflow: "auto",
          left: mobileView ? (sidebarVisible ? 0 : "-100%") : 0,
          transition: "all 0.3s",
        }}
      >
        <div className="text-center text-lg font-semibold p-4 truncate">
          LOGISTIC
        </div>

        <Menu
          theme="light"
          mode="inline"
          style={{
            borderRight: 0,
            background: "#928E85",
            color: "#000000",
            paddingBottom: "60px",
          }}
          selectedKeys={[location.pathname]}
          items={checkAdmin() ? adminMenu : userMenu}
          onClick={() => {
            if (mobileView) setSidebarVisible(false);
          }}
        />
        <div className="absolute bottom-2 left-0 w-full flex justify-center p-2">
          <button
            onClick={() => {
              navigate("/");
              localStorage.clear();
            }}
            className="
   group relative w-full py-5
    text-white font-semibold
    rounded-xl 
    overflow-hidden
    shadow-md hover:shadow-lg
  "
          >
            <span
              className="
      absolute inset-0
      bg-gradient-to-r from-[#85837d] to-[#6e6c65]
      transition-opacity duration-300
      group-hover:opacity-0
    "
            />
            <span
              className="
      absolute inset-0
      bg-gradient-to-r from-[#6e6c65] to-[#59574e]
      opacity-0
      transition-opacity duration-300
      group-hover:opacity-100
    "
            />
            <span className="relative z-10 text-xl">Logout</span>
          </button>
        </div>
      </Sider>

      <Layout
        style={{
          marginLeft: mobileView ? 0 : 2 ? 8 : 200,
          transition: "margin-left 0.3s",
        }}
      >
        {mobileView && (
          <header className="bg-white p-2 flex items-center shadow-sm">
            <Button
              type="text"
              icon={
                sidebarVisible ? (
                  <CloseOutlined style={{ fontSize: 20, color: "#374151" }} />
                ) : (
                  <MenuOutlined style={{ fontSize: 20, color: "#374151" }} />
                )
              }
              onClick={() => setSidebarVisible(!sidebarVisible)}
              className="mr-2"
            />

            <span className="font-semibold text-lg text-gray-700">
              LOGISTIC
            </span>
          </header>
        )}

        <Content
          style={{
            marginTop: "4px",
            marginBottom: "4px",
            marginRight: "8px",
            padding: 24,
            background: "#E8E9EB",
            minHeight: "calc(100vh - 56px)",
            borderRadius: 8,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
