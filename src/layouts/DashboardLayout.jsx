import React, { useState, useEffect } from "react";
import {
  Layout,
  Menu,
  ConfigProvider,
  Button,
  Drawer,
  Typography,
  Avatar,
  Divider,
  Tooltip,
  Badge,
  Grid,
  theme,
} from "antd";

import Dashboard from "../pages/Dashboard";
import Posts from "../pages/Posts";
import AddPost from "../pages/addPost/AddPost";
import MediaLayout from "./MediaLayout";
import CategoryLayout from "./CategoryLayout";
import Contact from "../pages/Contact";
import Profile from "../pages/profile/Profile";

import api from "../services/api";

import {
  DashboardOutlined,
  PushpinOutlined,
  PictureOutlined,
  CopyOutlined,
  QuestionCircleOutlined,
  MessageOutlined,
  MailOutlined,
  UserOutlined,
  ToolOutlined,
  EllipsisOutlined,
  LogoutOutlined,
  AppstoreOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";

import { useNavigate } from "react-router-dom";

const { Sider, Content } = Layout;
const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

// ============================================================
// ALL MENU ITEMS
// ============================================================

const allItems = [
  {
    key: "dashboard",
    icon: <DashboardOutlined />,
    label: "Dashboard",
  },

  {
    key: "post",
    icon: <PushpinOutlined />,
    label: "Post",
    children: [
      {
        key: "allPost",
        label: "All Posts",
      },
      {
        key: "addNew",
        label: "Add New",
      },
      {
        key: "categories",
        label: "Categories",
      },
    ],
  },

  {
    key: "media",
    icon: <PictureOutlined />,
    label: "Media",
  },

  // ADMIN ONLY
  {
    key: "pages",
    icon: <CopyOutlined />,
    label: "Pages",
  },

  {
    key: "faq",
    icon: <QuestionCircleOutlined />,
    label: "FAQ",
  },

  {
    key: "comment",
    icon: <MessageOutlined />,
    label: "Comments",
  },

  {
    key: "tools",
    icon: <ToolOutlined />,
    label: "Tools",
  },

  // COMMON
  {
    key: "contact",
    icon: <MailOutlined />,
    label: "Contact",
  },

  {
    key: "profile",
    icon: <UserOutlined />,
    label: "Profile",
  },

  {
    key: "logout",
    icon: <LogoutOutlined />,
    label: "Logout",
    danger: true,
  },
];

// ============================================================
// CONTENT MAP
// ============================================================

const contentMap = {
  dashboard: <Dashboard />,
  allPost: <Posts />,
  addNew: <AddPost />,
  categories: <CategoryLayout />,
  media: <MediaLayout />,
  contact: <Contact />,
  pages: <div>Pages Page</div>,
  faq: <div>FAQ Page</div>,
  comment: <div>Comments Page</div>,
  profile: <Profile />,
  tools: <div>Tools Page</div>,
};

// ============================================================
// DASHBOARD LAYOUT
// ============================================================

const DashboardLayout = () => {
  const [role, setRole] = useState();
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const screens = useBreakpoint();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [selectedKey, setSelectedKey] = useState("dashboard");

  // ==========================================================
  // GET ROLE FROM LOGIN
  // ==========================================================

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const response = await api.get("/auth/me");

        setRole(response.data.role);
      } catch (error) {
        console.error(error);
      }
    };

    getCurrentUser();
  }, []);

  // ==========================================================
  // MENU VISIBILITY BASED ON ROLE
  // ==========================================================

  const menuItems =
    role === "admin"
      ? allItems
      : allItems.filter((item) =>
          [
            "dashboard",
            "post",
            "media",
            "contact",
            "profile",
            "logout",
          ].includes(item.key),
        );

  // ==========================================================
  // MENU CLICK
  // ==========================================================

  const handleMenuClick = (e) => {
    setSelectedKey(e.key);

    if (e.key === "logout") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      navigate("/", {
        replace: true,
      });

      return;
    }

    console.log("key of selectedKey is ...:", selectedKey);
  };

  // ==========================================================
  // RESPONSIVE
  // ==========================================================

  const isXs = screens.xs && !screens.sm;
  const isSm = screens.sm && !screens.md;
  const isMd = screens.md && !screens.lg;
  const isLg = screens.lg && !screens.xl;
  const isXl = screens.xl;

  const siderWidth = screens.xxl
    ? 300
    : screens.xl
      ? 280
      : screens.lg
        ? 240
        : screens.md
          ? "100%"
          : 0;

  const showDrawerMenu = !screens.lg;

  // ==========================================================
  // SIDEBAR CONTENT
  // ==========================================================

  const sidebarContent = (
    <>
      {/* ======================================================
          LOGO / BRAND
      ====================================================== */}

      <div
        style={{
          height: 78,
          padding: "0 20px",
          display: "flex",
          alignItems: "center",
          gap: 13,
        }}
      >
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background:
              "linear-gradient(135deg, #1677ff 0%, #4f46e5 100%)",
            boxShadow: "0 8px 18px rgba(22,119,255,0.22)",
            flexShrink: 0,
          }}
        >
          <AppstoreOutlined
            style={{
              color: "#fff",
              fontSize: 21,
            }}
          />
        </div>

        <div style={{ minWidth: 0 }}>
          <Title
            level={4}
            style={{
              margin: 0,
              color: "#0f172a",
              fontWeight: 750,
              lineHeight: 1.1,
              letterSpacing: "-0.4px",
            }}
          >
            Blog Admin
          </Title>

          <Text
            style={{
              fontSize: 11,
              color: "#94a3b8",
            }}
          >
            Content Management
          </Text>
        </div>
      </div>

      <Divider
        style={{
          margin: "0 16px 12px",
          width: "calc(100% - 32px)",
        }}
      />

      {/* ======================================================
          USER / ROLE
      ====================================================== */}

      <div
        style={{
          margin: "0 14px 14px",
          padding: "12px",
          borderRadius: 14,
          background:
            "linear-gradient(135deg, #f8fafc 0%, #eff6ff 100%)",
          border: "1px solid #e2e8f0",
          display: "flex",
          alignItems: "center",
          gap: 11,
        }}
      >
        <Badge
          dot
          color="#22c55e"
          offset={[-2, 29]}
        >
          <Avatar
            size={38}
            icon={<UserOutlined />}
            style={{
              background:
                "linear-gradient(135deg, #dbeafe, #e0e7ff)",
              color: "#2563eb",
            }}
          />
        </Badge>

        <div style={{ minWidth: 0 }}>
          <Text
            strong
            style={{
              display: "block",
              fontSize: 13,
              color: "#1e293b",
            }}
          >
            {role === "admin" ? "Administrator" : "User"}
          </Text>

          <Text
            type="secondary"
            style={{
              fontSize: 11,
            }}
          >
            {role || "Loading..."}
          </Text>
        </div>
      </div>

      {/* ======================================================
          NAVIGATION LABEL
      ====================================================== */}

      <div
        style={{
          padding: "0 22px 8px",
          color: "#94a3b8",
          fontSize: 10,
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "1px",
        }}
      >
        Main Menu
      </div>

      {/* ======================================================
          MENU
      ====================================================== */}

      <Menu
        mode="inline"
        items={menuItems}
        selectedKeys={[selectedKey]}
        onClick={(e) => {
          handleMenuClick(e);

          if (showDrawerMenu) {
            setOpen(false);
          }
        }}
        style={{
          borderRight: 0,
          background: "transparent",
          padding: "0 10px",
        }}
      />

      {/* ======================================================
          SIDEBAR FOOTER
      ====================================================== */}

      <div
        style={{
          position: "absolute",
          bottom: 16,
          left: 14,
          right: 14,
          padding: "11px 13px",
          borderRadius: 12,
          background: "#f8fafc",
          border: "1px solid #e2e8f0",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "#22c55e",
              boxShadow: "0 0 0 4px rgba(34,197,94,0.12)",
            }}
          />

          <Text
            style={{
              fontSize: 11,
              color: "#64748b",
            }}
          >
            System Online
          </Text>
        </div>
      </div>
    </>
  );

  return (
    <Layout
      style={{
        minHeight: "100vh",
        width: "100%",
        background: "#f8fafc",
      }}
    >
      {/* ======================================================
          DESKTOP SIDEBAR
      ====================================================== */}

      {!showDrawerMenu && (
        <Sider
          width={siderWidth}
          trigger={null}
          style={{
            background: "#fff",
            borderRight: "1px solid #e2e8f0",
            position: "sticky",
            top: 0,
            left: 0,
            height: "100vh",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              position: "relative",
            }}
          >
            <ConfigProvider
              theme={{
                components: {
                  Menu: {
                    itemHeight: 45,
                    itemBorderRadius: 10,
                    itemMarginInline: 0,
                    itemMarginBlock: 4,

                    itemColor: "#64748b",
                    itemHoverColor: "#2563eb",
                    itemHoverBg: "#eff6ff",

                    itemSelectedColor: "#2563eb",
                    itemSelectedBg: "#eaf2ff",

                    subMenuItemBg: "#fff",
                    subMenuItemSelectedColor: "#2563eb",

                    iconSize: 17,
                    groupTitleColor: "#94a3b8",
                  },
                },
              }}
            >
              {sidebarContent}
            </ConfigProvider>
          </div>
        </Sider>
      )}

      {/* ======================================================
          MOBILE / TABLET TOP BAR
      ====================================================== */}

      {showDrawerMenu && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            height: 64,
            zIndex: 999,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 14px",
            background: "rgba(255,255,255,0.92)",
            backdropFilter: "blur(12px)",
            borderBottom: "1px solid #e2e8f0",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background:
                  "linear-gradient(135deg, #1677ff, #4f46e5)",
              }}
            >
              <AppstoreOutlined
                style={{
                  color: "#fff",
                  fontSize: 18,
                }}
              />
            </div>

            <Text
              strong
              style={{
                fontSize: 16,
                color: "#0f172a",
              }}
            >
              Blog Admin
            </Text>
          </div>

          <Tooltip title="Open menu">
            <Button
              type="primary"
              shape="circle"
              icon={
                open ? (
                  <MenuFoldOutlined />
                ) : (
                  <MenuUnfoldOutlined />
                )
              }
              onClick={() => setOpen(true)}
              style={{
                border: "none",
                boxShadow:
                  "0 6px 16px rgba(22,119,255,0.22)",
              }}
            />
          </Tooltip>
        </div>
      )}

      {/* ======================================================
          MOBILE DRAWER
      ====================================================== */}

      <Drawer
        title={null}
        placement="left"
        open={open}
        onClose={() => setOpen(false)}
        width={285}
        styles={{
          body: {
            padding: 0,
            overflow: "hidden",
          },
        }}
      >
        <div
          style={{
            height: "100%",
            minHeight: "100%",
            position: "relative",
            background: "#fff",
          }}
        >
          <ConfigProvider
            theme={{
              components: {
                Menu: {
                  itemHeight: 45,
                  itemBorderRadius: 10,
                  itemColor: "#64748b",
                  itemHoverColor: "#2563eb",
                  itemHoverBg: "#eff6ff",
                  itemSelectedColor: "#2563eb",
                  itemSelectedBg: "#eaf2ff",
                  subMenuItemBg: "#fff",
                  iconSize: 17,
                },
              },
            }}
          >
            {sidebarContent}
          </ConfigProvider>
        </div>
      </Drawer>

      {/* ======================================================
          MAIN CONTENT
      ====================================================== */}

      <Layout
        style={{
          minWidth: 0,
          background: "#f8fafc",
        }}
      >
        <Content
          style={{
            minHeight: "100vh",
            paddingTop: showDrawerMenu ? 64 : 0,
            background:
              "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
          }}
        >
          {/* Content wrapper */}
          <div
            style={{
              width: "100%",
              minHeight: "100%",
              padding:
                isXs
                  ? "10px"
                  : isSm
                    ? "14px"
                    : isMd
                      ? "18px"
                      : "24px",
            }}
          >
            {/* Page context bar */}
            <div
              className="dashboard-context-bar"
              style={{
                marginBottom: 18,
                padding: "12px 16px",
                borderRadius: 14,
                background: "rgba(255,255,255,0.82)",
                border: "1px solid #e2e8f0",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 9,
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "#2563eb",
                    boxShadow:
                      "0 0 0 4px rgba(37,99,235,0.1)",
                  }}
                />

                <Text
                  style={{
                    fontSize: 12,
                    color: "#64748b",
                  }}
                >
                  {selectedKey === "dashboard"
                    ? "Dashboard"
                    : selectedKey === "allPost"
                      ? "Posts / All Posts"
                      : selectedKey === "addNew"
                        ? "Posts / Add New"
                        : selectedKey === "categories"
                          ? "Posts / Categories"
                          : selectedKey.charAt(0).toUpperCase() +
                            selectedKey.slice(1)}
                </Text>
              </div>

              <Text
                type="secondary"
                style={{
                  fontSize: 11,
                }}
              >
                {role === "admin"
                  ? "Administrator"
                  : "User"}
              </Text>
            </div>

            {/* ==================================================
                SELECTED PAGE
            ================================================== */}

            <div
              style={{
                width: "100%",
                minHeight: 280,
              }}
            >
              {contentMap[selectedKey] || <Dashboard />}
            </div>
          </div>
        </Content>
      </Layout>

      {/* ======================================================
          RESPONSIVE CSS
      ====================================================== */}

      <style>
        {`
          .ant-menu-light .ant-menu-item-selected {
            font-weight: 600;
          }

          .ant-menu-light .ant-menu-submenu-title {
            font-weight: 500;
          }

          .ant-menu-light .ant-menu-item {
            transition:
              background 0.2s ease,
              color 0.2s ease,
              transform 0.2s ease;
          }

          .ant-menu-light .ant-menu-item:hover {
            transform: translateX(2px);
          }

          .ant-menu-submenu-title {
            transition:
              background 0.2s ease,
              color 0.2s ease;
          }

          .dashboard-context-bar {
            backdrop-filter: blur(10px);
          }

          @media (max-width: 768px) {
            .dashboard-context-bar {
              margin-bottom: 12px !important;
            }
          }

          @media (max-width: 576px) {
            .dashboard-context-bar {
              padding: 10px 12px !important;
            }

            .dashboard-context-bar > div:last-child {
              display: none;
            }
          }
        `}
      </style>
    </Layout>
  );
};

export default DashboardLayout;
