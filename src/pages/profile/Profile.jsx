import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Avatar,
  Button,
  Modal,
  Upload,
  Row,
  Col,
  Card,
  Statistic,
  message,
  Typography,
  Space,
  Divider,
  Tag,
} from "antd";

import {
  UserOutlined,
  UploadOutlined,
  SaveOutlined,
  CalendarOutlined,
  FundOutlined,
  BarChartOutlined,
  CameraOutlined,
  MailOutlined,
  IdcardOutlined,
  SafetyCertificateOutlined,
  PictureOutlined,
} from "@ant-design/icons";

import Posts from "../Posts";

const { Title, Text, Paragraph } = Typography;

const API = "http://localhost:5000/api";

// ============================================================
// STATISTICS
// ============================================================

const statistics = [
  {
    title: "Today's News",
    value: 18,
    icon: <CalendarOutlined />,
    color: "#1677ff",
    description: "Published today",
  },
  {
    title: "Monthly News",
    value: 452,
    icon: <FundOutlined />,
    color: "#52c41a",
    description: "Published this month",
  },
  {
    title: "Yearly News",
    value: 5480,
    icon: <BarChartOutlined />,
    color: "#fa8c16",
    description: "Published this year",
  },
];

// ============================================================
// STAT BOX
// ============================================================

const StatBox = ({
  title,
  value,
  icon,
  color,
  description,
}) => {
  return (
    <Card
      bordered={false}
      style={{
        height: "100%",
        borderRadius: 15,
        border: "1px solid #e8ecf3",
        boxShadow:
          "0 7px 25px rgba(15, 23, 42, 0.05)",
        overflow: "hidden",
      }}
      bodyStyle={{
        padding: 0,
      }}
    >
      <div
        style={{
          position: "relative",
          padding: "19px 20px",
          overflow: "hidden",
        }}
      >
        {/* Decorative circle */}

        <div
          style={{
            position: "absolute",
            width: 90,
            height: 90,
            borderRadius: "50%",
            right: -35,
            top: -35,
            background: `${color}0D`,
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 15,
          }}
        >
          <div>
            <Text
              style={{
                display: "block",
                color: "#8b95a7",
                fontSize: 11,
                fontWeight: 550,
              }}
            >
              {title}
            </Text>

            <Statistic
              value={value}
              valueStyle={{
                marginTop: 3,
                color: "#172033",
                fontSize: 27,
                fontWeight: 750,
                lineHeight: 1.15,
              }}
            />

            <Text
              style={{
                display: "block",
                marginTop: 5,
                color: "#a0a8b7",
                fontSize: 10,
              }}
            >
              {description}
            </Text>
          </div>

          <div
            style={{
              width: 46,
              height: 46,
              flexShrink: 0,
              borderRadius: 13,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color,
              background: `${color}12`,
              fontSize: 20,
            }}
          >
            {React.cloneElement(icon, {
              style: {
                color,
              },
            })}
          </div>
        </div>

        {/* Bottom accent */}

        <div
          style={{
            position: "absolute",
            left: 0,
            bottom: 0,
            width: "100%",
            height: 3,
            background: color,
            opacity: 0.75,
          }}
        />
      </div>
    </Card>
  );
};

// ============================================================
// PROFILE
// ============================================================

const Profile = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [name, setName] = useState(
    localStorage.getItem("imageName") || "",
  );

  // ==========================================================
  // FETCH PROFILE IMAGE
  // ==========================================================

  const fetchProfileImage = async () => {
    try {
      const response = await axios.get(
        `${API}/profiledata`,
        {
          responseType: "blob",
        },
      );

      // Validate server response

      if (
        response.data.type === "application/json" ||
        response.data.type === "text/html"
      ) {
        const textError = await response.data.text();

        console.error(
          "Backend sent an error text instead of an image file:",
          textError,
        );

        setProfileImage(null);
        return;
      }

      // Convert blob to local URL

      const objectUrl = URL.createObjectURL(response.data);

      setProfileImage(objectUrl);
    } catch (error) {
      console.error(
        "Image fetch network execution error:",
        error,
      );

      setProfileImage(null);
    }
  };

  // ==========================================================
  // STORE IMAGE NAME
  // ==========================================================

  localStorage.setItem("imageName", name);

  useEffect(() => {
    fetchProfileImage();
  }, []);

  // ==========================================================
  // UPLOAD SETTINGS
  // ==========================================================

  const uploadSettings = {
    beforeUpload: (file) => {
      if (!file.type.startsWith("image/")) {
        message.error("Please select an image.");
        return Upload.LIST_IGNORE;
      }

      setSelectedImage(file);

      setName(
        file.name.replace(/\.[^/.]+$/, ""),
      );

      return false;
    },

    showUploadList: false,
  };

  // ==========================================================
  // DISPLAY IMAGE NAME
  // ==========================================================

  const displayName = profileImage?.filename
    ? decodeURIComponent(
        profileImage.filename
          .split("/")
          .pop()
          .replace(/^\d+-/, "")
          .replace(/\.[^/.]+$/, ""),
      )
    : "";

  // ==========================================================
  // UPLOAD PROFILE IMAGE
  // ==========================================================

  const uploadImage = async () => {
    if (!selectedImage) {
      message.warning("Please select an image.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append(
        "profileImage",
        selectedImage,
      );

      const res = await axios.post(
        `${API}/profiledata`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      message.success("Profile image uploaded.");

      // Refresh avatar

      await fetchProfileImage();

      setOpen(false);
      setSelectedImage(null);
    } catch (error) {
      console.error(error);
      message.error("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  // ==========================================================
  // CLOSE MODAL
  // ==========================================================

  const handleModalClose = () => {
    if (loading) return;

    setOpen(false);
    setSelectedImage(null);
  };

  // ==========================================================
  // UI
  // ==========================================================

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100%",
        paddingBottom: 35,
        background: "#f7f9fc",
      }}
    >
      {/* =====================================================
          PROFILE HEADER
      ====================================================== */}

      <Card
        bordered={false}
        style={{
          marginBottom: 22,
          borderRadius: 18,
          overflow: "hidden",
          border: "1px solid #e7ebf3",
          boxShadow:
            "0 8px 30px rgba(15, 23, 42, 0.055)",
          background:
            "linear-gradient(135deg, #ffffff 0%, #f8faff 55%, #eef4ff 100%)",
        }}
        bodyStyle={{
          padding: 0,
        }}
      >
        {/* Top decorative section */}

        <div
          style={{
            height: 85,
            position: "relative",
            overflow: "hidden",
            background:
              "linear-gradient(120deg, #eef2ff, #f4f7ff, #edf6ff)",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: 220,
              height: 220,
              borderRadius: "50%",
              right: -70,
              top: -150,
              background:
                "rgba(79, 70, 229, 0.09)",
            }}
          />

          <div
            style={{
              position: "absolute",
              width: 130,
              height: 130,
              borderRadius: "50%",
              right: 160,
              top: -80,
              background:
                "rgba(37, 99, 235, 0.06)",
            }}
          />
        </div>

        {/* Profile information */}

        <div
          style={{
            padding: "0 25px 24px",
          }}
        >
          <Row
            gutter={[25, 20]}
            align="middle"
          >
            {/* Avatar */}

            <Col xs={24} sm="auto">
              <div
                style={{
                  position: "relative",
                  width: 145,
                  height: 145,
                  marginTop: -55,
                }}
              >
                <div
                  style={{
                    width: 145,
                    height: 145,
                    padding: 6,
                    borderRadius: "50%",
                    background: "#fff",
                    boxShadow:
                      "0 10px 28px rgba(15, 23, 42, 0.14)",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                      overflow: "hidden",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background:
                        "linear-gradient(135deg, #eef2ff, #f8fafc)",
                      border:
                        "1px solid #e4e8f0",
                    }}
                  >
                    {profileImage ? (
                      <img
                        src={profileImage}
                        alt="Profile"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <UserOutlined
                        style={{
                          fontSize: 54,
                          color: "#a8b1c1",
                        }}
                      />
                    )}
                  </div>
                </div>

                {/* Camera button */}

                <Button
                  type="primary"
                  shape="circle"
                  icon={<CameraOutlined />}
                  onClick={() => setOpen(true)}
                  style={{
                    position: "absolute",
                    right: 4,
                    bottom: 6,
                    width: 40,
                    height: 40,
                    border: "3px solid #fff",
                    background:
                      "linear-gradient(135deg, #4f46e5, #2563eb)",
                    boxShadow:
                      "0 6px 14px rgba(79, 70, 229, 0.28)",
                  }}
                />
              </div>
            </Col>

            {/* User information */}

            <Col
              xs={24}
              sm={12}
              lg={10}
            >
              <div
                style={{
                  paddingTop: 12,
                }}
              >
                <Space
                  size={7}
                  wrap
                  style={{
                    marginBottom: 6,
                  }}
                >
                  <Tag
                    bordered={false}
                    color="blue"
                    style={{
                      margin: 0,
                      borderRadius: 20,
                      fontSize: 10,
                      fontWeight: 650,
                    }}
                  >
                    PROFILE
                  </Tag>

                  <Tag
                    bordered={false}
                    color="green"
                    style={{
                      margin: 0,
                      borderRadius: 20,
                      fontSize: 10,
                      fontWeight: 650,
                    }}
                  >
                    ACTIVE
                  </Tag>
                </Space>

                <Title
                  level={3}
                  style={{
                    margin: 0,
                    color: "#172033",
                    fontWeight: 750,
                    letterSpacing: "-0.5px",
                  }}
                >
                  {name || "Profile User"}
                </Title>

                <Space
                  size={7}
                  style={{
                    marginTop: 7,
                  }}
                >
                  <MailOutlined
                    style={{
                      color: "#8d97a8",
                      fontSize: 13,
                    }}
                  />

                  <Text
                    style={{
                      color: "#7b8496",
                      fontSize: 12,
                    }}
                  >
                    {name
                      ? `${name}@lpcadvisors.com`
                      : "Email not available"}
                  </Text>
                </Space>

                <Space
                  size={7}
                  style={{
                    display: "flex",
                    marginTop: 6,
                  }}
                >
                  <IdcardOutlined
                    style={{
                      color: "#8d97a8",
                      fontSize: 13,
                    }}
                  />

                  <Text
                    style={{
                      color: "#7b8496",
                      fontSize: 12,
                    }}
                  >
                    Employee ID: LPC 1121
                  </Text>
                </Space>
              </div>
            </Col>

            {/* Profile status card */}

            <Col
              xs={24}
              sm={12}
              lg={6}
              style={{
                marginLeft: "auto",
              }}
            >
              <div
                style={{
                  padding: "14px 16px",
                  borderRadius: 12,
                  background: "#fff",
                  border: "1px solid #e8ecf3",
                  boxShadow:
                    "0 5px 16px rgba(15, 23, 42, 0.04)",
                }}
              >
                <Space align="start">
                  <div
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: 9,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "#ecfdf3",
                      color: "#16a34a",
                    }}
                  >
                    <SafetyCertificateOutlined />
                  </div>

                  <div>
                    <Text
                      style={{
                        display: "block",
                        color: "#9aa3b3",
                        fontSize: 10,
                      }}
                    >
                      ACCOUNT STATUS
                    </Text>

                    <Text
                      strong
                      style={{
                        display: "block",
                        marginTop: 3,
                        color: "#15803d",
                        fontSize: 12,
                      }}
                    >
                      Active & Verified
                    </Text>
                  </div>
                </Space>
              </div>
            </Col>
          </Row>
        </div>
      </Card>

      {/* =====================================================
          STATISTICS HEADER
      ====================================================== */}

      <div
        style={{
          marginBottom: 12,
          display: "flex",
          alignItems: "center",
          gap: 9,
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 9,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#eef2ff",
            color: "#4f46e5",
          }}
        >
          <BarChartOutlined />
        </div>

        <div>
          <Text
            strong
            style={{
              display: "block",
              color: "#263247",
              fontSize: 14,
            }}
          >
            News Overview
          </Text>

          <Text
            style={{
              display: "block",
              marginTop: 1,
              color: "#98a1b2",
              fontSize: 10.5,
            }}
          >
            Your publishing activity
          </Text>
        </div>
      </div>

      {/* =====================================================
          STATISTICS
      ====================================================== */}

      <Row
        gutter={[16, 16]}
        style={{
          marginBottom: 28,
        }}
      >
        {statistics.map((item) => (
          <Col
            key={item.title}
            xs={24}
            sm={12}
            lg={8}
          >
            <StatBox {...item} />
          </Col>
        ))}
      </Row>

      {/* =====================================================
          POSTS SECTION
      ====================================================== */}

      <Card
        bordered={false}
        style={{
          borderRadius: 17,
          border: "1px solid #e8ecf3",
          boxShadow:
            "0 8px 30px rgba(15, 23, 42, 0.045)",
          overflow: "hidden",
        }}
        bodyStyle={{
          padding: 0,
        }}
      >
        {/* Posts Header */}

        <div
          style={{
            padding: "18px 20px",
            borderBottom: "1px solid #eef1f6",
            background:
              "linear-gradient(90deg, #ffffff, #fafbff)",
          }}
        >
          <Space size={11}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#eef2ff",
                color: "#4f46e5",
              }}
            >
              <PictureOutlined />
            </div>

            <div>
              <Text
                strong
                style={{
                  display: "block",
                  color: "#263247",
                  fontSize: 14,
                }}
              >
                Posts
              </Text>

              <Text
                style={{
                  display: "block",
                  marginTop: 2,
                  color: "#98a1b2",
                  fontSize: 11,
                }}
              >
                Manage and monitor your published content
              </Text>
            </div>
          </Space>
        </div>

        {/* Existing Posts Component */}

        <div
          style={{
            padding: "4px 20px 20px",
          }}
        >
          <Posts />
        </div>
      </Card>

      {/* =====================================================
          CHANGE PROFILE PICTURE MODAL
      ====================================================== */}

      <Modal
        open={open}
        centered
        footer={null}
        onCancel={handleModalClose}
        width={420}
        styles={{
          content: {
            borderRadius: 16,
            padding: 0,
            overflow: "hidden",
          },
        }}
      >
        {/* Modal Header */}

        <div
          style={{
            padding: "20px 22px",
            background:
              "linear-gradient(135deg, #f8faff, #eef2ff)",
            borderBottom: "1px solid #e7ebf3",
          }}
        >
          <Space size={11}>
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background:
                  "linear-gradient(135deg, #4f46e5, #2563eb)",
                color: "#fff",
                fontSize: 17,
              }}
            >
              <CameraOutlined />
            </div>

            <div>
              <Text
                strong
                style={{
                  display: "block",
                  fontSize: 14,
                  color: "#172033",
                }}
              >
                Change Profile Picture
              </Text>

              <Text
                style={{
                  display: "block",
                  marginTop: 2,
                  fontSize: 10.5,
                  color: "#8b95a7",
                }}
              >
                Upload a new image for your profile
              </Text>
            </div>
          </Space>
        </div>

        {/* Modal Body */}

        <div
          style={{
            padding: 23,
          }}
        >
          {/* Preview */}

          <div
            style={{
              width: 100,
              height: 100,
              margin: "0 auto 20px",
              padding: 4,
              borderRadius: "50%",
              background: "#fff",
              border: "1px solid #e4e8f0",
              boxShadow:
                "0 7px 20px rgba(15, 23, 42, 0.08)",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background:
                  "linear-gradient(135deg, #eef2ff, #f8fafc)",
              }}
            >
              {selectedImage ? (
                <img
                  src={URL.createObjectURL(
                    selectedImage,
                  )}
                  alt="Preview"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : profileImage ? (
                <img
                  src={profileImage}
                  alt="Current profile"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <UserOutlined
                  style={{
                    fontSize: 35,
                    color: "#a8b1c1",
                  }}
                />
              )}
            </div>
          </div>

          {/* Selected file */}

          {selectedImage && (
            <div
              style={{
                marginBottom: 15,
                padding: "9px 12px",
                borderRadius: 9,
                background: "#f8fafc",
                border: "1px solid #e8ecf3",
                textAlign: "center",
              }}
            >
              <Text
                ellipsis
                style={{
                  display: "block",
                  color: "#64748b",
                  fontSize: 11,
                }}
              >
                {selectedImage.name}
              </Text>
            </div>
          )}

          {/* Actions */}

          <Space
            direction="vertical"
            size={10}
            style={{
              width: "100%",
            }}
          >
            <Upload {...uploadSettings}>
              <Button
                block
                size="large"
                icon={<UploadOutlined />}
                style={{
                  height: 43,
                  borderRadius: 9,
                  fontWeight: 600,
                }}
              >
                Select Image
              </Button>
            </Upload>

            <Button
              block
              type="primary"
              size="large"
              icon={<SaveOutlined />}
              loading={loading}
              disabled={!selectedImage}
              onClick={uploadImage}
              style={{
                height: 43,
                borderRadius: 9,
                border: "none",
                fontWeight: 650,
                background:
                  "linear-gradient(135deg, #4f46e5, #2563eb)",
                boxShadow:
                  "0 7px 16px rgba(79, 70, 229, 0.2)",
              }}
            >
              Save Profile Picture
            </Button>
          </Space>
        </div>
      </Modal>
    </div>
  );
};

export default Profile;

