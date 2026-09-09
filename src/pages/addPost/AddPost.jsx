import React, { useState } from "react";
import { Layout, theme, Grid } from "antd";

import { useSelector } from "react-redux";

import FormCompo from "./FormCompo";
import PostLayoutCompo from "./PostLayoutCompo";
import SideBarComp from "../../layouts/SideBarComp";

const { useBreakpoint } = Grid;

const themes = {
  light: {
    background: "#f5f7fb",
    border: "#e5e7eb",
  },

  dark: {
    background: "#111827",
    border: "#374151",
  },
};

const { Header, Sider, Content } = Layout;

const AddPost = () => {
  // const [themeMode, setThemeMode]= useState("light");
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // const { themeMode } = useSelector((state) => state.post);
  const themeMode = "light";

  // console.log("current theme mode:- ", themeMode);
  const currentTheme = themes[themeMode];

  const screens = useBreakpoint();

  const isMobile = !screens.md;
  const isTablet = screens.md && !screens.lg;

  return (
    <>
      <Layout
        style={{
          minHeight: "100vh",
          flexDirection: screens.md || screens.lg ? "row" : "column",
          width: "100%",
          background: currentTheme.background,
        }}
      >
        <Layout
          style={{
            width: screens.md ? "100%" : "100%",
            minHeight: "100vh",
            background: currentTheme.background,
          }}
        >
          <Header
            style={{
              padding: 0,
              background: "rgba(255, 255, 255, 0.96)",
              height: "auto",
              width: "100%",
              borderBottom: `1px solid ${currentTheme.border}`,
              boxShadow: "0 4px 18px rgba(15, 23, 42, 0.05)",
              position: "relative",
              zIndex: 2,
            }}
          >
            <FormCompo />

            <Content
              style={{
                background: currentTheme.background,
                width: "100%",
                padding: screens.xs
                  ? 8
                  : screens.sm
                  ? 12
                  : screens.md
                  ? 16
                  : 24,
                position: "relative",
              }}
            >
              {/* Decorative background */}
              <div
                style={{
                  position: "absolute",
                  top: -70,
                  right: -70,
                  width: isMobile ? 140 : 220,
                  height: isMobile ? 140 : 220,
                  borderRadius: "50%",
                  background:
                    "linear-gradient(135deg, rgba(0,119,182,0.08), rgba(0,180,216,0.02))",
                  pointerEvents: "none",
                }}
              />

              <div
                style={{
                  position: "absolute",
                  bottom: -60,
                  left: -60,
                  width: isMobile ? 120 : 180,
                  height: isMobile ? 120 : 180,
                  borderRadius: "50%",
                  background:
                    "linear-gradient(135deg, rgba(99,102,241,0.05), rgba(168,85,247,0.02))",
                  pointerEvents: "none",
                }}
              />

              {/* Editor container */}
              <div
                style={{
                  position: "relative",
                  zIndex: 1,
                  width: "100%",
                  background: "#ffffff",
                  border: `1px solid ${currentTheme.border}`,
                  borderRadius: isMobile ? 12 : 18,
                  overflow: "hidden",
                  boxShadow:
                    "0 10px 30px rgba(15, 23, 42, 0.06), 0 2px 8px rgba(15, 23, 42, 0.03)",
                }}
              >
                <PostLayoutCompo themeMode={themeMode} />
              </div>
            </Content>
          </Header>
        </Layout>

        <Sider
          width={screens.lg ? 320 : screens.md ? 250 : "100%"}
          style={{
            background: colorBgContainer,
            borderLeft: screens.lg
              ? `1px solid ${currentTheme.border}`
              : "none",
            boxShadow: screens.lg
              ? "-5px 0 20px rgba(15, 23, 42, 0.04)"
              : "none",
            position: "relative",
            zIndex: 3,
          }}
        >
          <div
            style={{
              minHeight: screens.lg ? "100vh" : "auto",
              background:
                "linear-gradient(180deg, #ffffff 0%, #fafbff 100%)",
            }}
          >
            <SideBarComp />
          </div>
        </Sider>
      </Layout>

      <style>
        {`
          /* ==========================================
             EDITOR CARD
          ========================================== */

          .add-post-editor-card {
            transition: all 0.25s ease;
          }

          /* ==========================================
             MOBILE
          ========================================== */

          @media (max-width: 767px) {
            .ant-layout-header {
              min-height: 60px;
            }

            .ant-layout-content {
              padding: 8px !important;
            }
          }

          /* ==========================================
             SMALL MOBILE
          ========================================== */

          @media (max-width: 480px) {
            .ant-layout-content {
              padding: 6px !important;
            }
          }

          /* ==========================================
             TABLET
          ========================================== */

          @media (min-width: 768px) and (max-width: 991px) {
            .ant-layout-sider {
              width: 100% !important;
              max-width: 100% !important;
              min-width: 100% !important;
            }
          }
        `}
      </style>
    </>
  );
};

export default AddPost;
