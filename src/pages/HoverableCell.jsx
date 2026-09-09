import React, { useState } from "react";
import {
  Typography,
  Popover,
  Space,
  Button,
  message,
} from "antd";

import {
  EditOutlined,
  FormOutlined,
  DeleteOutlined,
  FileTextOutlined,
  RightOutlined,
} from "@ant-design/icons";

import { useNavigate } from "react-router-dom";

import { usePost } from "./PostContext";
import QuickEditPost from "./QuickEditPost";

const { Text } = Typography;

const HoverableCell = ({ text, record }) => {
  const navigate = useNavigate();

  const { trashNews, draftNews } = usePost();

  const [quickEdit, setQuickEdit] = useState(false);
  const [hovered, setHovered] = useState(false);

  // Get post key safely
  const postKey = record?.key;

  // Common validation
  const validatePost = () => {
    if (!postKey) {
      message.error("Post key not found");
      return false;
    }

    return true;
  };

  // Quick Edit
  const handleQuickEdit = () => {
    if (!record?.key) {
      message.error("Post key not found");
      return;
    }

    setQuickEdit(true);
  };

  // Full Edit
  const handleEdit = () => {
    console.log("Record before navigate:", record);

    if (!record) {
      console.log("❌ record is undefined");
      return;
    }

    if (!validatePost()) return;

    navigate("/posts/add", {
      state: {
        news: record,
        mode: "edit",
      },
    });
  };

  // Move to Trash
  const handleTrash = () => {
    if (!validatePost()) return;

    trashNews(postKey);

    message.success("Post moved to Trash");
  };

  // Move to Draft
  const handleDraft = () => {
    if (!validatePost()) return;

    draftNews(postKey);

    message.success("Post moved to Draft");
  };

  // Close Quick Edit
  const handleQuickEditClose = () => {
    setQuickEdit(false);
  };

  // Quick Edit screen
  if (quickEdit) {
    return (
      <QuickEditPost
        record={record}
        onClose={handleQuickEditClose}
      />
    );
  }

  // Popover actions
  const actions = [
    {
      label: "Edit",
      description: "Open full editor",
      icon: <EditOutlined />,
      onClick: handleEdit,
      className: "edit",
    },
    {
      label: "Quick Edit",
      description: "Update basic details",
      icon: <FormOutlined />,
      onClick: handleQuickEdit,
      className: "quick",
    },
    {
      label: "Draft",
      description: "Move post to drafts",
      icon: <FileTextOutlined />,
      onClick: handleDraft,
      className: "draft",
    },
    {
      label: "Trash",
      description: "Move post to trash",
      icon: <DeleteOutlined />,
      onClick: handleTrash,
      danger: true,
      className: "trash",
    },
  ];

  const popoverContent = (
    <div
      style={{
        width: 210,
        padding: 5,
      }}
    >
      {/* Popover Header */}
      <div
        style={{
          padding: "8px 10px 10px",
          marginBottom: 4,
          borderBottom: "1px solid #f0f0f0",
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
              width: 28,
              height: 28,
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background:
                "linear-gradient(135deg, #eef2ff, #dbeafe)",
              color: "#4f46e5",
            }}
          >
            <FormOutlined />
          </div>

          <div>
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: "#172033",
                lineHeight: 1.2,
              }}
            >
              Post Actions
            </div>

            <div
              style={{
                fontSize: 10,
                color: "#94a3b8",
                marginTop: 2,
              }}
            >
              Manage this post
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <Space
        direction="vertical"
        size={3}
        style={{
          width: "100%",
        }}
      >
        {actions.map(
          ({
            label,
            description,
            icon,
            onClick,
            danger,
            className,
          }) => (
            <Button
              key={label}
              type="text"
              danger={danger}
              onClick={onClick}
              className={`post-action-${className}`} 
              style={{
                width: "100%",
                height: 47,
                padding: "5px 9px",
                borderRadius: 9,
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                textAlign: "left",
                transition:
                  "all .22s cubic-bezier(.22,1,.36,1)",
              }}
              onMouseEnter={(event) => {
                event.currentTarget.style.transform =
                  "translateX(3px)";

                if (danger) {
                  event.currentTarget.style.background =
                    "#fff1f0";
                } else {
                  event.currentTarget.style.background =
                    "#f5f7ff";
                }
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.transform =
                  "translateX(0)";
                event.currentTarget.style.background =
                  "transparent";
              }}
            >
              {/* Icon */}
              <span
                style={{
                  width: 31,
                  height: 31,
                  flexShrink: 0,
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",

                  background: danger
                    ? "#fff1f0"
                    : "#f0f3ff",

                  color: danger
                    ? "#ff4d4f"
                    : "#4f46e5",

                  fontSize: 14,

                  transition:
                    "all .22s ease",
                }}
              >
                {icon}
              </span>

              {/* Text */}
              <span
                style={{
                  marginLeft: 9,
                  flex: 1,
                  minWidth: 0,
                }}
              >
                <span
                  style={{
                    display: "block",
                    fontSize: 12,
                    lineHeight: 1.25,
                    fontWeight: 700,

                    color: danger
                      ? "#cf1322"
                      : "#334155",
                  }}
                >
                  {label}
                </span>

                <span
                  style={{
                    display: "block",
                    fontSize: 9.5,
                    lineHeight: 1.25,
                    color: "#94a3b8",
                    marginTop: 2,
                  }}
                >
                  {description}
                </span>
              </span>

              {/* Arrow */}
              <RightOutlined
                style={{
                  fontSize: 9,
                  color: danger
                    ? "#ff7875"
                    : "#a5b4fc",
                  marginRight: 2,
                }}
              />
            </Button>
          )
        )}
      </Space>
    </div>
  );

  return (
    <Popover
      content={popoverContent}
      trigger="hover"
      placement="bottomLeft"
      mouseEnterDelay={0.08}
      mouseLeaveDelay={0.12}
      overlayInnerStyle={{
        padding: 0,
        borderRadius: 14,
        overflow: "hidden",
        border: "1px solid rgba(99,102,241,.10)",
        boxShadow:
          "0 18px 50px rgba(15,23,42,.14)",
      }}
      arrow={{
        pointAtCenter: true,
      }}
    >
      <span
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: "relative",
          display: "inline-flex",
          alignItems: "center",
          maxWidth: "100%",
          cursor: "pointer",
          padding: "3px 5px",
          margin: "-3px -5px",
          borderRadius: 7,

          transition:
            "all .25s cubic-bezier(.22,1,.36,1)",

          background: hovered
            ? "rgba(99,102,241,.055)"
            : "transparent",

          transform: hovered
            ? "translateY(-1px)"
            : "translateY(0)",
        }}
      >
        {/* Small decorative indicator */}
        <span
          style={{
            position: "absolute",
            left: 0,
            bottom: -1,
            width: hovered ? "100%" : "0%",
            height: 2,
            borderRadius: 10,

            background:
              "linear-gradient(90deg, #4f46e5, #2563eb, #06b6d4)",

            transition:
              "width .3s cubic-bezier(.22,1,.36,1)",
          }}
        />

        {/* Post title */}
        <Text
          strong
          ellipsis={{
            tooltip: text,
          }}
          style={{
            position: "relative",
            zIndex: 1,

            maxWidth: "100%",

            cursor: "pointer",

            fontSize: 13,

            fontWeight: 650,

            color: hovered
              ? "#4f46e5"
              : "#1e293b",

            letterSpacing: "-.1px",

            transition:
              "color .22s ease",
          }}
        >
          {text}
        </Text>

        {/* Hover edit indicator */}
        <span
          style={{
            width: hovered ? 20 : 0,
            opacity: hovered ? 1 : 0,
            overflow: "hidden",

            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            marginLeft: hovered ? 6 : 0,

            color: "#6366f1",
            fontSize: 11,

            transition:
              "all .25s cubic-bezier(.22,1,.36,1)",
          }}
        >
          <EditOutlined />
        </span>
      </span>
    </Popover>
  );
};

export default HoverableCell;
