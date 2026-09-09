import React, { useRef, useState } from "react";
import {
  Layout,
  Typography,
  Button,
  Divider,
  Select,
  Modal,
  message,
} from "antd";

import {
  MoreOutlined,
  PictureOutlined,
  UploadOutlined,
  DeleteOutlined,
  SwapOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { setImage } from "../store/postSlice";

const { Sider } = Layout;
const { Text } = Typography;
const { Option } = Select;

const PostPublish = () => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  // ✅ ONLY SOURCE OF TRUTH
  const imgUrl = useSelector((state) => state.post.image);

  const [uploading, setUploading] = useState(false);
  const [publishTime, setPublishTime] = useState("");
  const [postStatus, setPostStatus] = useState("draft");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeField, setActiveField] = useState(null);

  const [values, setValues] = useState({
    discussion: "Pings only",
    format: "Standard",
    author: "John Doe",
    category: "Technology",
    visibility: "Public",
  });

  const fields = [
    {
      key: "discussion",
      label: "Discussion",
      options: ["Pings only", "All messages", "Mentions only"],
    },
    {
      key: "format",
      label: "Format",
      options: ["Standard", "Compact", "Detailed"],
    },
    {
      key: "author",
      label: "Author",
      options: [
        "John Doe",
        "Jane Smith",
        "Michael Johnson",
        "Emily Davis",
        "David Wilson",
        "Sarah Brown",
        "Chris Taylor",
        "Olivia White",
        "James Anderson",
        "Sophia Martin",
      ],
    },
    {
      key: "category",
      label: "Category",
      options: [
        "Technology",
        "Business",
        "Cybersecurity",
        "AI & ML",
        "Finance",
        "Marketing",
        "Health",
        "Education",
        "Sports",
        "Lifestyle",
      ],
    },
    {
      key: "visibility",
      label: "Visibility",
      options: ["Public", "Private", "Protected"],
    },
  ];

  const activeConfig = fields.find((field) => field.key === activeField);

  // ================= UPLOAD =================
  const handleImageUpload = async (file) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      message.error("Only image files allowed");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);

      const res = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      // console.log("UPLOAD RESPONSE:", data);

      if (data?.imageUrl) {
        dispatch(setImage(data.imageUrl)); // ✅ SAVE IN REDUX
        message.success("Image uploaded successfully");
      } else {
        message.error("Upload failed");
      }
    } catch (err) {
      console.error(err);
      message.error("Upload error");
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (file) handleImageUpload(file);
    try {
      const payload = {
        heading,
        subHeading,
        content,
        status: postStatus,
        publishTime,
        ...values,
      };

      console.log("Sending payload:", payload);

      const response = await axios.post(
        "http://localhost:5000/api/save-content",
        payload,
      );

      console.log("Saved:", response.data);
    } catch (error) {
      console.error("Save failed:", error.response?.data || error.message);
    }
  };

  const handleRemove = () => {
    dispatch(setImage(""));
  };

  const handleReplace = () => {
    fileInputRef.current?.click();
  };

  // ================= STATUS =================
  React.useEffect(() => {
    if (!publishTime) return;

    const selected = new Date(publishTime).getTime();
    const now = Date.now();

    setPostStatus(selected <= now ? "publish" : "future");
  }, [publishTime]);

  // ================= UI =================
  return (
    <Sider
      width="100%"
      style={{
        background: "#fff",
        borderLeft: "1px solid #eee",
        height: "100%",
        overflow: "auto",
      }}
    >
      <div style={{ padding: 16 }}>
        {/* HEADER */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: 10 }}>
            <PictureOutlined />
            <Text strong>No title</Text>
          </div>
          <MoreOutlined />
        </div>

        <Divider />

        {/* INPUT */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />

        {/* IMAGE PREVIEW */}
        {!imgUrl ? (
          <Button
            icon={<UploadOutlined />}
            loading={uploading}
            onClick={() => fileInputRef.current.click()}
            style={{ width: "100%" }}
          >
            Set featured image
          </Button>
        ) : (
          <div>
            <img
              key={imgUrl} // 🔥 important fix
              src={imgUrl}
              alt="preview"
              style={{
                width: "100%",
                height: 180,
                objectFit: "cover",
                borderRadius: 8,
                border: "1px solid #ddd",
              }}
            />

            <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
              <Button
                icon={<SwapOutlined />}
                onClick={handleReplace}
                style={{ flex: 1 }}
              >
                Replace
              </Button>

              <Button
                danger
                icon={<DeleteOutlined />}
                onClick={handleRemove}
                style={{ flex: 1 }}
              >
                Remove
              </Button>
            </div>
          </div>
        )}

        <Divider />

        {/* STATUS */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Text>Status</Text>
          <Text>
            {postStatus === "publish"
              ? "Published"
              : postStatus === "future"
                ? "Scheduled"
                : "Draft"}
          </Text>
        </div>

        <input
          type="datetime-local"
          value={publishTime}
          onChange={(e) => setPublishTime(e.target.value)}
          style={{ width: "100%", marginTop: 10 }}
        />

        <Divider />

        {/* MODAL FIELDS */}
        {fields.map((field) => (
          <div
            key={field.key}
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            <span>{field.label}</span>
            <span
              style={{ color: "#1677ff", cursor: "pointer" }}
              onClick={() => {
                setActiveField(field.key);
                setIsModalOpen(true);
              }}
            >
              {values[field.key]}
            </span>
          </div>
        ))}

        <Modal
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          onOk={() => setIsModalOpen(false)}
        >
          {activeConfig && (
            <Select
              style={{ width: "100%" }}
              value={values[activeConfig.key]}
              onChange={(value) =>
                setValues((prev) => ({
                  ...prev,
                  [activeConfig.key]: value,
                }))
              }
              options={activeConfig.options.map((option) => ({
                value: option,
                label: option,
              }))}
            />
          )}
        </Modal>
      </div>
    </Sider>
  );
};

export default PostPublish;
