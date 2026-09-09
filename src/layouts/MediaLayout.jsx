import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  Row,
  Col,
  Card,
  Input,
  Button,
  message,
  Typography,
  Spin,
  Popconfirm,
  Space,
  Badge,
  Empty,
} from "antd";
import {
  UploadOutlined,
  SearchOutlined,
  DeleteOutlined,
  PictureOutlined,
  CloudUploadOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";

const { Search } = Input;
const { Title, Text } = Typography;

const MediaLayout = () => {
  const fileInputRef = useRef(null);

  const [images, setImages] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [hoveredImage, setHoveredImage] = useState(null);

  // ==============================
  // Fetch Images
  // ==============================
  const fetchImages = async () => {
    try {
      setLoading(true);

      const res = await axios.get("http://localhost:5000/api/upload");

      setImages(res.data.images || []);
    } catch (error) {
      console.error(error);
      message.error("Failed to load images");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // ==============================
  // Upload Image
  // ==============================
  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      message.error("Please select an image file");
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("image", file);

      console.log("data from the media section....", formData);

      const res = await axios.post(
        "http://localhost:5000/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      message.success("Image uploaded successfully");

      await fetchImages();

      e.target.value = "";
    } catch (error) {
      console.error(error);
      message.error("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  // ==============================
  // Search Filter
  // ==============================
  const updatedImages = images.map((item) => ({
    ...item,
    filename: decodeURIComponent(
      item.filename.split("/").pop().replace(/^\d+-/, ""),
    ),
  }));

  const filteredImages = updatedImages.filter((item) =>
    item.filename.toLowerCase().includes(searchText.toLowerCase()),
  );

  console.log("The filtered image is below_", filteredImages);

  // ==============================
  // Delete Image
  // ==============================
  const handleDelete = async (filename) => {
    try {
      console.log("Deleting filename:", filename);

      const url = `http://localhost:5000/api/upload/${encodeURIComponent(
        filename,
      )}`;

      console.log("DELETE URL:", url);

      const response = await axios.delete(url);

      console.log("Delete response:", response.data);

      await fetchImages();

      message.success("Image deleted successfully");
    } catch (error) {
      console.error("Delete status:", error.response?.status);
      console.error("Delete response:", error.response?.data);
      console.error("Delete message:", error.message);

      message.error("Failed to delete image");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "28px",
        background:
          "linear-gradient(135deg, #f7f9fc 0%, #eef3f9 50%, #f8fafc 100%)",
      }}
    >
      {/* =====================================================
          PAGE HEADER
      ===================================================== */}
      <Card
        bordered={false}
        style={{
          marginBottom: 24,
          borderRadius: 20,
          overflow: "hidden",
          background:
            "linear-gradient(135deg, #0f172a 0%, #1e3a8a 55%, #2563eb 100%)",
          boxShadow: "0 14px 40px rgba(15, 23, 42, 0.16)",
          position: "relative",
        }}
        styles={{
          body: {
            padding: 0,
          },
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: "absolute",
            width: 180,
            height: 180,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.07)",
            right: 80,
            top: -100,
          }}
        />

        <div
          style={{
            position: "absolute",
            width: 130,
            height: 130,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.05)",
            right: -40,
            bottom: -70,
          }}
        />

        <div
          className="media-header"
          style={{
            position: "relative",
            zIndex: 1,
            padding: "28px 30px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 20,
          }}
        >
          {/* Header title */}
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                width: 58,
                height: 58,
                borderRadius: 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(255,255,255,0.14)",
                border: "1px solid rgba(255,255,255,0.18)",
                backdropFilter: "blur(8px)",
              }}
            >
              <PictureOutlined
                style={{
                  fontSize: 28,
                  color: "#fff",
                }}
              />
            </div>

            <div>
              <Title
                level={2}
                style={{
                  margin: 0,
                  color: "#fff",
                  fontWeight: 700,
                  letterSpacing: "-0.5px",
                }}
              >
                Media Library
              </Title>

              <Text
                style={{
                  color: "rgba(255,255,255,0.72)",
                  fontSize: 14,
                }}
              >
                Manage and organize your uploaded images
              </Text>
            </div>
          </div>

          {/* Image counter */}
          <div
            style={{
              padding: "10px 16px",
              borderRadius: 14,
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              gap: 9,
              whiteSpace: "nowrap",
            }}
          >
            <AppstoreOutlined />
            <span style={{ fontWeight: 600 }}>
              {filteredImages.length} Images
            </span>
          </div>
        </div>
      </Card>

      {/* =====================================================
          TOOLBAR
      ===================================================== */}
      <Card
        bordered={false}
        style={{
          borderRadius: 18,
          marginBottom: 24,
          boxShadow: "0 8px 30px rgba(15, 23, 42, 0.07)",
        }}
        styles={{
          body: {
            padding: "18px 20px",
          },
        }}
      >
        <div
          className="media-toolbar"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
          }}
        >
          {/* Search */}
          <div
            style={{
              flex: 1,
              maxWidth: 420,
            }}
          >
            <Input
              placeholder="Search images by filename..."
              allowClear
              size="large"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              prefix={
                <SearchOutlined
                  style={{
                    color: "#64748b",
                    fontSize: 17,
                  }}
                />
              }
              style={{
                borderRadius: 12,
                height: 48,
              }}
            />
          </div>

          {/* Upload */}
          <div>
            <Button
              type="primary"
              size="large"
              icon={<CloudUploadOutlined />}
              loading={uploading}
              onClick={() => fileInputRef.current?.click()}
              style={{
                height: 48,
                padding: "0 22px",
                borderRadius: 12,
                fontWeight: 600,
                border: "none",
                boxShadow: "0 7px 18px rgba(22, 119, 255, 0.25)",
              }}
            >
              {uploading ? "Uploading..." : "Add Image"}
            </Button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </div>
        </div>
      </Card>

      {/* =====================================================
          CONTENT
      ===================================================== */}
      <Card
        bordered={false}
        style={{
          borderRadius: 20,
          boxShadow: "0 8px 30px rgba(15, 23, 42, 0.07)",
          minHeight: 350,
        }}
        styles={{
          body: {
            padding: 22,
          },
        }}
      >
        {/* Gallery heading */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 20,
            gap: 12,
          }}
        >
          <div>
            <Title
              level={4}
              style={{
                margin: 0,
                color: "#0f172a",
              }}
            >
              Your Images
            </Title>

            <Text
              type="secondary"
              style={{
                fontSize: 13,
              }}
            >
              {searchText
                ? `Showing results for "${searchText}"`
                : "All uploaded media"}
            </Text>
          </div>

          <Badge
            count={filteredImages.length}
            overflowCount={999}
            showZero
            style={{
              boxShadow: "none",
            }}
          />
        </div>

        {/* =====================================================
            LOADING
        ===================================================== */}
        {loading ? (
          <div
            style={{
              minHeight: 320,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <Spin size="large" />

            <Text type="secondary">Loading media library...</Text>
          </div>
        ) : (
          <Row gutter={[20, 20]}>
            {filteredImages.length > 0 ? (
              filteredImages.map((item, index) => (
                <Col
                  xs={24}
                  sm={12}
                  md={8}
                  lg={6}
                  xl={4}
                  xxl={4}
                  key={index}
                >
                  <Card
                    hoverable
                    bordered={false}
                    style={{
                      borderRadius: 16,
                      overflow: "hidden",
                      height: "100%",
                      background: "#fff",
                      boxShadow:
                        hoveredImage === item.filename
                          ? "0 16px 35px rgba(15, 23, 42, 0.14)"
                          : "0 5px 18px rgba(15, 23, 42, 0.07)",
                      transform:
                        hoveredImage === item.filename
                          ? "translateY(-4px)"
                          : "translateY(0)",
                      transition:
                        "transform 0.25s ease, box-shadow 0.25s ease",
                    }}
                    styles={{
                      body: {
                        padding: 13,
                      },
                    }}
                    cover={
                      <div
                        style={{
                          position: "relative",
                          overflow: "hidden",
                          background: "#e2e8f0",
                        }}
                        onMouseEnter={() =>
                          setHoveredImage(item.filename)
                        }
                        onMouseLeave={() => setHoveredImage(null)}
                      >
                        <img
                          src={item.url}
                          alt={item.filename}
                          style={{
                            width: "100%",
                            height: 185,
                            objectFit: "cover",
                            display: "block",
                            transition: "transform 0.4s ease",
                            transform:
                              hoveredImage === item.filename
                                ? "scale(1.06)"
                                : "scale(1)",
                          }}
                        />

                        {/* Image number */}
                        <div
                          style={{
                            position: "absolute",
                            top: 10,
                            left: 10,
                            padding: "4px 9px",
                            borderRadius: 8,
                            background: "rgba(15,23,42,0.7)",
                            backdropFilter: "blur(6px)",
                            color: "#fff",
                            fontSize: 11,
                            fontWeight: 600,
                          }}
                        >
                          #{index + 1}
                        </div>

                        {/* Hover overlay */}
                        <div
                          style={{
                            position: "absolute",
                            inset: 0,
                            background:
                              "linear-gradient(to top, rgba(15,23,42,0.72), rgba(15,23,42,0.15))",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "flex-end",
                            paddingBottom: 16,
                            opacity:
                              hoveredImage === item.filename ? 1 : 0,
                            transition: "opacity 0.25s ease",
                          }}
                        >
                          <Popconfirm
                            title="Delete Image"
                            description="Are you sure you want to delete this image?"
                            onConfirm={() =>
                              handleDelete(item.filename)
                            }
                            okText="Delete"
                            cancelText="Cancel"
                            okButtonProps={{
                              danger: true,
                            }}
                          >
                            <Button
                              danger
                              type="primary"
                              size="middle"
                              icon={<DeleteOutlined />}
                              style={{
                                borderRadius: 10,
                                fontWeight: 600,
                                boxShadow:
                                  "0 8px 20px rgba(0,0,0,0.2)",
                              }}
                            >
                              Delete
                            </Button>
                          </Popconfirm>
                        </div>
                      </div>
                    }
                  >
                    <div
                      style={{
                        minWidth: 0,
                      }}
                    >
                      <Text
                        strong
                        ellipsis={{
                          tooltip: item.filename,
                        }}
                        style={{
                          display: "block",
                          fontSize: 14,
                          color: "#1e293b",
                          marginBottom: 5,
                        }}
                      >
                        {item.filename}
                      </Text>

                      <Space size={6}>
                        <PictureOutlined
                          style={{
                            color: "#1677ff",
                            fontSize: 12,
                          }}
                        />

                        <Text
                          type="secondary"
                          style={{
                            fontSize: 12,
                          }}
                        >
                          Uploaded Image
                        </Text>
                      </Space>
                    </div>
                  </Card>
                </Col>
              ))
            ) : (
              <Col span={24}>
                <div
                  style={{
                    minHeight: 300,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 30,
                  }}
                >
                  <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description={
                      <div>
                        <Text
                          strong
                          style={{
                            display: "block",
                            color: "#334155",
                            marginBottom: 4,
                          }}
                        >
                          No images found
                        </Text>

                        <Text type="secondary">
                          {searchText
                            ? "Try searching with a different filename."
                            : "Upload an image to start building your media library."}
                        </Text>
                      </div>
                    }
                  />
                </div>
              </Col>
            )}
          </Row>
        )}
      </Card>

      {/* =====================================================
          RESPONSIVE STYLES
      ===================================================== */}
      <style>
        {`
          .media-header {
            min-height: 110px;
          }

          @media (max-width: 768px) {
            .media-header {
              align-items: flex-start !important;
              flex-direction: column !important;
            }

            .media-toolbar {
              flex-direction: column !important;
              align-items: stretch !important;
            }

            .media-toolbar > div {
              max-width: 100% !important;
              width: 100% !important;
            }

            .media-toolbar button {
              width: 100%;
            }
          }

          @media (max-width: 576px) {
            .media-header {
              padding: 22px !important;
            }

            .media-header h2 {
              font-size: 24px !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default MediaLayout;
