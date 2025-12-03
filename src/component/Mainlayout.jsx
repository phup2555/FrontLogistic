import React, { useState, useEffect } from "react";
import { Layout, Menu, Grid, Button } from "antd";
import { TbReportSearch } from "react-icons/tb";
import {
  DashboardOutlined,
  UploadOutlined,
  MenuOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { FiBox } from "react-icons/fi";

const { Sider, Content } = Layout;
const { useBreakpoint } = Grid;

export default function MainLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [mobileView, setMobileView] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const screens = useBreakpoint();

  useEffect(() => {
    const isMobile = !screens.md;
    setMobileView(isMobile);
    if (!isMobile) {
      setCollapsed(false);
      setSidebarVisible(false);
    }
  }, [screens]);

  const menuItems = [
    {
      key: "/dashboard",
      icon: <DashboardOutlined />,
      label: "ໜ້າຫຼັກ",
      onClick: () => navigate("/"),
    },
    // {
    //   key: "sub1",
    //   icon: <UploadOutlined />,
    //   label: "ຈັດການ",
    //   children: [
    //     {
    //       key: "/in",
    //       label: "ຂາເຂົ້າ",
    //       onClick: () => navigate("/in"),
    //     },
    //     {
    //       key: "/out",
    //       label: "ຂາອອກ",
    //       onClick: () => navigate("/out"),
    //     },
    //   ],
    // },
    {
      key: "/in",
      icon: <FiBox />,
      label: "ພັດສະດຸ",
      onClick: () => navigate("/in"),
    },
    {
      key: "/Report",
      icon: <TbReportSearch />,
      label: "ລາຍງານ",
      onClick: () => navigate("/Report"),
    },
  ];

  const siderWidth = 250;
  const siderCollapsedWidth = 80;

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
            paddingBottom: "60px", // กันให้เมนูไม่ทับปุ่มด้านล่าง
          }}
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={() => {
            if (mobileView) setSidebarVisible(false);
          }}
        />

        {/* ⭐ ปุ่มเปิด–ปิดแบบ FIXED ที่ด้านล่าง ⭐ */}
        <div
          onClick={() => setCollapsed(!collapsed)}
          className="absolute bottom-0 left-0 w-full p-3 bg-[#A9A9A9] text-black text-xl flex justify-center cursor-pointer border-t border-gray-400"
          style={{ position: "absolute" }}
        >
          {collapsed ? <MenuOutlined /> : <CloseOutlined />}
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
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
