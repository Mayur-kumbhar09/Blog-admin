import React from "react";
import PostPublish from "./PostPublish";
import Sider from "antd/es/layout/Sider";
import {
  Button,
  Divider,
  Tabs,
  Typography,
  Space,
  Card,
} from "antd";

import {
  SaveOutlined,
  SendOutlined,
  FileTextOutlined,
  AppstoreOutlined,
  EditOutlined,
} from "@ant-design/icons";

import { useDispatch, useSelector } from "react-redux";
import { publishPost } from "../store/postSlice";
import { useNavigate } from "react-router-dom";
import BlockTabContent from "../pages/BlockTabContent";

const { Text } = Typography;

const SideBarComp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { sidebar, template } = useSelector(
    (state) => state.post,
  );

  // ==========================================================
  // PUBLISH
  // ==========================================================

  const handlePublish = () => {
    dispatch(publishPost());

    navigate("/post/preview", {
      state: {
        sidebar,
        template,
      },
    });
  };

  // ==========================================================
  // TABS
  // ==========================================================

  const items = [
    {
      key: "1",
      label: (
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: 7,
          }}
        >
          <FileTextOutlined />
          Post
        </span>
      ),
      children: <PostPublish />,
    },
    {
      key: "2",
      label: (
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: 7,
          }}
        >
          <AppstoreOutlined />
          Block
        </span>
      ),
      children: <BlockTabContent />,
    },
  ];

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <Sider
        width="100%"
        style={{
          width: "100%",
          height: "100%",
          background: "transparent",
          padding: 0,
        }}
      >
        {/* ====================================================
            SIDEBAR CONTAINER
        ===================================================== */}

        <Card
          bordered={false}
          style={{
            width: "100%",
            minHeight: "100%",
            borderRadius: 16,
            border: "1px solid #e7ebf3",
            background: "#ffffff",
            boxShadow:
              "0 8px 28px rgba(15, 23, 42, 0.055)",
            overflow: "hidden",
          }}
          bodyStyle={{
            padding: 0,
          }}
        >
          {/* ==================================================
              HEADER
          =================================================== */}

          <div
            style={{
              padding: "17px 18px",
              background:
                "linear-gradient(135deg, #ffffff, #f8faff)",
              borderBottom: "1px solid #edf0f5",
            }}
          >
            <Space size={10}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background:
                    "linear-gradient(135deg, #4f46e5, #2563eb)",
                  color: "#ffffff",
                  fontSize: 16,
                  boxShadow:
                    "0 6px 14px rgba(79, 70, 229, 0.20)",
                }}
              >
                <EditOutlined />
              </div>

              <div>
                <Text
                  strong
                  style={{
                    display: "block",
                    color: "#172033",
                    fontSize: 14,
                    lineHeight: 1.2,
                  }}
                >
                  Post Editor
                </Text>

                <Text
                  style={{
                    display: "block",
                    marginTop: 3,
                    color: "#98a1b2",
                    fontSize: 10.5,
                  }}
                >
                  Create and publish your post
                </Text>
              </div>
            </Space>
          </div>

          {/* ==================================================
              ACTION BUTTONS
          =================================================== */}

          <div
            style={{
              padding: "15px 16px",
              background: "#ffffff",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: 10,
              }}
            >
              {/* Save Draft */}

              <Button
                icon={<SaveOutlined />}
                size="large"
                style={{
                  flex: 1,
                  height: 42,
                  borderRadius: 9,
                  fontSize: 12,
                  fontWeight: 650,
                  color: "#475569",
                  borderColor: "#dfe4ec",
                  background: "#ffffff",
                  transition: "all .22s ease",
                }}
                onMouseEnter={(event) => {
                  event.currentTarget.style.borderColor =
                    "#a5b4fc";
                  event.currentTarget.style.color =
                    "#4f46e5";
                  event.currentTarget.style.background =
                    "#f8faff";
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.borderColor =
                    "#dfe4ec";
                  event.currentTarget.style.color =
                    "#475569";
                  event.currentTarget.style.background =
                    "#ffffff";
                }}
              >
                Save Draft
              </Button>

              {/* Publish */}

              <Button
                onClick={handlePublish}
                type="primary"
                icon={<SendOutlined />}
                size="large"
                style={{
                  flex: 1,
                  height: 42,
                  borderRadius: 9,
                  border: "none",
                  fontSize: 12,
                  fontWeight: 650,
                  background:
                    "linear-gradient(135deg, #4f46e5, #2563eb)",
                  boxShadow:
                    "0 7px 16px rgba(79, 70, 229, 0.22)",
                  transition: "all .22s ease",
                }}
                onMouseEnter={(event) => {
                  event.currentTarget.style.transform =
                    "translateY(-1px)";
                  event.currentTarget.style.boxShadow =
                    "0 10px 22px rgba(79, 70, 229, 0.28)";
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.transform =
                    "translateY(0)";
                  event.currentTarget.style.boxShadow =
                    "0 7px 16px rgba(79, 70, 229, 0.22)";
                }}
              >
                Publish
              </Button>
            </div>
          </div>

          <Divider
            style={{
              margin: 0,
              borderColor: "#edf0f5",
            }}
          />

          {/* ==================================================
              EDITOR TABS
          =================================================== */}

          <div
            style={{
              padding: "0 16px 18px",
            }}
          >
            <Tabs
              defaultActiveKey="1"
              items={items}
              style={{
                width: "100%",
              }}
              tabBarStyle={{
                marginBottom: 15,
              }}
            />
          </div>
        </Card>
      </Sider>

      {/* ======================================================
          RESPONSIVE STYLING
      ======================================================= */}

      <style>
        {`
          .ant-tabs-tab {
            transition: all .2s ease !important;
          }

          .ant-tabs-tab:hover {
            color: #4f46e5 !important;
          }

          .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
            color: #4f46e5 !important;
            font-weight: 650 !important;
          }

          .ant-tabs-ink-bar {
            background: linear-gradient(
              90deg,
              #4f46e5,
              #2563eb
            ) !important;
            height: 3px !important;
            border-radius: 10px !important;
          }

          @media (max-width: 575px) {
            .ant-card-body {
              width: 100%;
            }
          }
        `}
      </style>
    </div>
  );
};

export default SideBarComp;
