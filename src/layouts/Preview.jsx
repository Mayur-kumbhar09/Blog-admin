import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import {
  Layout,
  Card,
  Typography,
  Tabs,
  Avatar,
  Tag,
  Space,
  Button,
  Badge,
  Divider,
  Row,
  Col,
} from "antd";

import { EyeOutlined } from "@ant-design/icons";
import DOMPurify from "dompurify";
import "antd/dist/reset.css";

import { useLocation } from "react-router-dom";
const { Header, Sider, Content } = Layout;

const { Title, Paragraph, Text } = Typography;

/* =========================================================
   THEMES
========================================================= */

const themes = {
  light: {
    background: "#f5f7fb",
    card: "#ffffff",
    text: "#111827",
    border: "#e5e7eb",
    sidebar: "#fafafa",
  },

  dark: {
    background: "#111827",
    card: "#1f2937",
    text: "#ffffff",
    border: "#374151",
    sidebar: "#18212f",
  },
};

/* =========================================================
   STATIC DATA
========================================================= */
/* =========================================================
   MAIN COMPONENT
========================================================= */

const Preview = () => {
  const [postData, setPostData] = useState("");
  const [images, setImages] = useState([]);
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [imgRes, postRes] = await Promise.all([
          axios.get("http://localhost:5000/api/upload"),
          axios.get("http://localhost:5000/api/save-content"),
        ]);

        const images = imgRes?.data?.images ?? [];

        // Extract actual content object
        const postData = postRes?.data?.data ?? {};

        // console.log("Backend Response:", postRes.data);
        // console.log("Post Data:", postData);

        const lastImage = images.length > 0 ? images[0] : null;

        // console.log("Latest Image:", lastImage);

        setPostData({
          title: postData.heading || "React Dashboard Preview System",
          subtitle: postData.subHeading || "Dynamic Blog Layout Builder",
          image: lastImage?.url || "",
          content: postData.content || "Sample Content Data....",

          // Existing fields
          author: postData.author || "John Doe",
          category: postData.category || "React UI",

          // New fields
          status: postData.status || "draft",
          publishTime: postData.publishTime || "",
          visibility: postData.visibility || "Public",

          // Metadata
          updatedAt: postData.updatedAt || null,
        });
      } catch (error) {
        console.error(
          "Failed to fetch preview data:",
          error.response?.data || error.message,
        );
      }
    };

    fetchAllData();
  }, []);
  if (!postData) {
    return <div>Loading preview...</div>;
  }
  const location = useLocation();

  // ✅ ALWAYS CALL HOOKS FIRST
  const state = location.state;

  // const post = useMemo(() => postData, []);
  const post = postData;
  // console.log("Post data:- ", post);
  // ❌ conditional logic AFTER hooks
  if (!state) {
    return <div>No preview data received</div>;
  }

  const { sidebar, template, themeMode } = state;
  const currentTheme = themes?.[themeMode] || themes.light;
  // console.log("the sidebar inside the Preview: ", sidebar);
  // console.log("the template inside the Preview: ", template);
  // console.log("the themeMode inside the Preview: ", themeMode);

  return (
    <Layout
      style={{
        minHeight: "100vh",
        background: currentTheme.background,
      }}
    >
      {/* HEADER */}

      <Header
        style={{
          background: currentTheme.card,
          borderBottom: `1px solid ${currentTheme.border}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingInline: 24,
        }}
      >
        <Space>
          <EyeOutlined />

          <Title
            level={4}
            style={{
              margin: 0,
              color: currentTheme.text,
            }}
          >
            Live Preview
          </Title>
        </Space>

        <Button type="primary">Export Layout</Button>
      </Header>

      {/* CONTENT */}

      <Content style={{ padding: 24 }}>
        <PostRenderer
          sidebar={sidebar}
          template={template}
          post={post}
          currentTheme={currentTheme}
        />
      </Content>
    </Layout>
  );
};

/* =========================================================
   POST RENDERER
========================================================= */

function PostRenderer({ sidebar, template, post, currentTheme }) {
  const showLeft = sidebar === "left" || sidebar === "both";

  const showRight = sidebar === "right" || sidebar === "both";

  return (
    <Layout
      style={{
        borderRadius: 20,
        overflow: "hidden",
        background: currentTheme.card,
        border: `1px solid ${currentTheme.border}`,
        minHeight: 700,
      }}
    >
      {/* LEFT SIDEBAR */}

      {showLeft && (
        <CustomSidebar position="left" currentTheme={currentTheme} />
      )}

      {/* MAIN CONTENT */}

      <Content
        style={{
          flex: 1,
          padding: 30,
          background: currentTheme.card,
        }}
      >
        <PostTemplate
          template={template}
          post={post}
          currentTheme={currentTheme}
        />
      </Content>

      {/* RIGHT SIDEBAR */}

      {showRight && (
        <CustomSidebar position="right" currentTheme={currentTheme} />
      )}
    </Layout>
  );
}

/* =========================================================
   SIDEBAR
========================================================= */

function CustomSidebar({ currentTheme, position }) {
  return (
    <Sider
      width={260}
      theme="light"
      style={{
        background: currentTheme.sidebar,
        padding: 20,

        borderLeft:
          position === "right" ? `1px solid ${currentTheme.border}` : "none",

        borderRight:
          position === "left" ? `1px solid ${currentTheme.border}` : "none",
      }}
    >
      <Space direction="vertical" style={{ width: "100%" }}>
        {/* RECENT POSTS */}

        <Card size="small" style={{ borderRadius: 14 }}>
          <Title level={5}>Recent Posts</Title>

          <Space wrap>
            <Tag color="blue">React</Tag>

            <Tag color="purple">Dashboard</Tag>

            <Tag color="green">UI Builder</Tag>
          </Space>
        </Card>

        {/* CATEGORIES */}

        <Card size="small" style={{ borderRadius: 14 }}>
          <Title level={5}>Categories</Title>

          <Tabs
            size="small"
            items={[
              {
                key: "1",
                label: "Design",
                children: "Modern layouts",
              },

              {
                key: "2",
                label: "Code",
                children: "React templates",
              },
            ]}
          />
        </Card>

        {/* STATUS */}

        <Card size="small" style={{ borderRadius: 14 }}>
          <Space align="center">
            <Badge status="processing" />

            <Text>Live Preview Active</Text>
          </Space>
        </Card>
      </Space>
    </Sider>
  );
}

/* =========================================================
   POST TEMPLATE
========================================================= */

function PostTemplate({ template, post, currentTheme }) {
  const cardStyle = {
    borderRadius: 20,

    overflow: "hidden",

    background: currentTheme.card,

    border: `1px solid ${currentTheme.border}`,
  };

  const textStyle = {
    color: currentTheme.text,
    fontSize: 16,
  };

  const titleStyle = {
    color: currentTheme.text,
    marginTop: 16,
  };
  const subTitleStyle = {
    color: currentTheme.text,
    marginTop: 16,
    fontSize: 19,
    fontStyle: "italic",
    fontWeight: "bold",
  };
  const renderContent = () => {
    return post.content
      .split("\n")
      .map((line, index) => <p key={index}>{line}</p>);
  };

  /* DEFAULT */
  if (template === 1) {
    return (
      <Card bordered={false} style={cardStyle}>
        <img
          src={post.image}
          alt={post.title}
          style={{
            width: "100%",
            height: 350,
            objectFit: "cover",
          }}
        />

        <div style={{ padding: 28 }}>
          <Space wrap style={{ marginBottom: 16 }}>
            <Tag color="blue">{post.category}</Tag>
            <Tag color="green">{post.status}</Tag>
            <Text type="secondary">By {post.author}</Text>
          </Space>

          <Title style={titleStyle}>{post.title}</Title>

          <Title style={subTitleStyle}>{post.subtitle}</Title>

          {renderContent()}
        </div>
      </Card>
    );
  }
  if (template === 2) {
    return (
      <Card bordered={false} style={cardStyle}>
        <div style={{ padding: 30 }}>
          <Space align="center">
            <Avatar size={60}>{post.author?.[0]}</Avatar>

            <div>
              <Text strong>{post.author}</Text>

              <br />

              <Text type="secondary">{post.category}</Text>
            </div>
          </Space>

          <Title level={2}>{post.title}</Title>

          <Title level={4} type="secondary" style={subTitleStyle}>
            {post.subtitle}
          </Title>

          <Space style={{ marginBottom: 20 }}>
            <Tag color="green">{post.status}</Tag>
            <Tag>{post.visibility}</Tag>
          </Space>

          {renderContent()}

          <img
            src={post.image}
            alt={post.title}
            style={{
              width: "100%",
              borderRadius: 18,
              marginTop: 20,
            }}
          />
        </div>
      </Card>
    );
  }
  if (template === 3) {
    return (
      <Card bordered={false} style={cardStyle}>
        <div style={{ position: "relative" }}>
          <img
            src={post.image}
            alt={post.title}
            style={{
              width: "100%",
              height: 420,
              objectFit: "cover",
            }}
          />

          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(0,0,0,.8), transparent)",
              display: "flex",
              alignItems: "flex-end",
              padding: 30,
            }}
          >
            <Title
              style={{
                color: "#fff",
                margin: 0,
              }}
            >
              {post.title}
            </Title>
          </div>
        </div>

        <div style={{ padding: 28 }}>
          <Title level={3} style={subTitleStyle}>{post.subtitle}</Title>

          <Space style={{ marginBottom: 20 }}>
            <Avatar>{post.author?.[0]}</Avatar>

            <Text>{post.content}</Text>

            <Tag color="blue">{post.category}</Tag>
          </Space>

          {renderContent()}
        </div>
      </Card>
    );
  }
  if (template === 4) {
    return (
      <Card bordered={false} style={cardStyle}>
        <Row gutter={24}>
          <Col span={10}>
            <img
              src={post.image}
              alt={post.title}
              style={{
                width: "100%",
                height: 350,
                objectFit: "cover",
                borderRadius: 12,
              }}
            />
          </Col>

          <Col span={14}>
            <Tag color="purple">{post.category}</Tag>

            <Title>{post.title}</Title>

            <Title level={4} type="secondary" style={subTitleStyle}>
              {post.subtitle}
            </Title>

            <Paragraph>{post.content}</Paragraph>

            <Divider />

            <Space>
              <Avatar>{post.author?.[0]}</Avatar>

              <Text>{post.author}</Text>
            </Space>
          </Col>
        </Row>
      </Card>
    );
  }
  if (template === 5) {
    return (
      <Card bordered={false} style={cardStyle}>
        <Tag color="red">BREAKING</Tag>

        <Title>{post.title}</Title>

        <Title level={4} type="secondary" style={subTitleStyle}>
          {post.subtitle}
        </Title>

        <img
          src={post.image}
          alt={post.title}
          style={{
            width: "100%",
            borderRadius: 12,
            marginBottom: 20,
          }}
        />

        {renderContent()}
      </Card>
    );
  }
  if (template === 6) {
    return (
      <Card bordered={false} style={cardStyle}>
        <Space>
          <Avatar size={48}>{post.author?.[0]}</Avatar>

          <div>
            <Text strong>{post.author}</Text>

            <br />

            <Text type="secondary">{post.category}</Text>
          </div>
        </Space>

        <Title style={{ marginTop: 20 }}>{post.title}</Title>

        <Title level={4} type="secondary" style={subTitleStyle}>
          {post.subtitle}
        </Title>

        <img
          src={post.image}
          alt={post.title}
          style={{
            width: "100%",
            marginTop: 20,
            borderRadius: 10,
          }}
        />

        <div style={{ marginTop: 20 }}>{renderContent()}</div>
      </Card>
    );
  }
  if (template === 7) {
    return (
      <Card bordered={false} style={cardStyle}>
        <img
          src={post.image}
          alt={post.title}
          style={{
            width: "100%",
            height: 500,
            objectFit: "cover",
          }}
        />

        <div style={{ padding: 40 }}>
          <Tag color="cyan">{post.category}</Tag>

          <Title level={1}>{post.title}</Title>

          <Paragraph
            style={subTitleStyle}
          >
            {post.subtitle}
          </Paragraph>

          <Divider />

          <Space>
            <Avatar>{post.author?.[0]}</Avatar>

            <Text>{post.author}</Text>
          </Space>

          <Divider />

          {renderContent()}
        </div>
      </Card>
    );
  }

  return (
    <Card bordered={false} style={cardStyle}>
      <img
        src={post.image}
        alt={post.title}
        style={{
          width: "100%",
          height: 300,
          objectFit: "cover",
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
        }}
      />

      <div style={{ padding: 28 }}>
        <Space wrap style={{ marginBottom: 16 }}>
          <Tag color="magenta">{post.category}</Tag>

          <Tag
            color={
              post.status === "publish"
                ? "green"
                : post.status === "future"
                  ? "orange"
                  : "default"
            }
          >
            {post.status}
          </Tag>

          <Tag color="blue">{post.visibility}</Tag>
        </Space>

        <Title style={titleStyle}>{post.title}</Title>

        <Title style={subTitleStyle}>{post.subtitle}</Title>

        <Space
          style={{
            marginBottom: 20,
          }}
        >
          <Avatar>{post.author?.[0]?.toUpperCase()}</Avatar>

          <div>
            <Text strong>{post.author}</Text>

            <br />

            <Text type="secondary">
              {post.updatedAt
                ? new Date(post.updatedAt).toLocaleDateString()
                : "Recently Updated"}
            </Text>
          </div>
        </Space>

        {post.publishTime && (
          <div style={{ marginBottom: 20 }}>
            <Text type="secondary">
              Publish Time: {new Date(post.publishTime).toLocaleString()}
            </Text>
          </div>
        )}

        <Divider />

        {post.content
          ?.split("\n")
          .filter((paragraph) => paragraph.trim())
          .map((paragraph, index) => (
            <Paragraph key={index} style={textStyle}>
              {paragraph}
            </Paragraph>
          ))}
      </div>
    </Card>
  );
}

export default Preview;
