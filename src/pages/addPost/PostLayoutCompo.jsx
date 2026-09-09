import React from "react";
import { Layout, Card, Row, Col, Typography, Radio, Space } from "antd";

import {
  AppstoreOutlined,
  LeftOutlined,
  RightOutlined,
  ColumnWidthOutlined,
} from "@ant-design/icons";

import { useDispatch, useSelector } from "react-redux";
import { setSidebar, setTemplate } from "../../store/postSlice";

const { Sider } = Layout;
const { Title, Text } = Typography;

const sidebarLayouts = [
  { id: "none", label: "No Sidebar", icon: <AppstoreOutlined /> },
  { id: "left", label: "Left Sidebar", icon: <LeftOutlined /> },
  { id: "right", label: "Right Sidebar", icon: <RightOutlined /> },
  { id: "both", label: "Both Sidebar", icon: <ColumnWidthOutlined /> },
];

const templates = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  name: `Style ${i + 1}`,
}));

const PostLayoutCompo = ({ themeMode }) => {
  const dispatch = useDispatch();

  const { sidebar, template } = useSelector((state) => state.post);

  return (
    <Sider
      width="100%"
      theme={themeMode}
      style={{
        padding: 10,
        overflow: "auto",
      }}
    >
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        
        {/* SIDEBAR */}
        <Card bordered={false} style={{ borderRadius: 16 }}>
          <Title level={5}>Sidebar Layout</Title>

          <Radio.Group
            value={sidebar}
            onChange={(e) => dispatch(setSidebar(e.target.value))}
            style={{ width: "100%" }}
          >
            <Row gutter={[12, 12]}>
              {sidebarLayouts.map((item) => (
                <Col key={item.id} xs={12} md={12}>
                  <Radio.Button
                    value={item.id}
                    style={{
                      width: "100%",
                      height: 56,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Space>
                      {item.icon}
                      {item.label}
                    </Space>
                  </Radio.Button>
                </Col>
              ))}
            </Row>
          </Radio.Group>
        </Card>

        {/* TEMPLATES */}
        <Card bordered={false} style={{ borderRadius: 16, margin:"10px 0px" }} >
          <Title level={5}>Templates</Title>

          <Row gutter={[12, 12]} >
            {templates.map((item) => (
              <Col key={item.id} xs={12} lg={4} md={4} sm={6}>
                <Card
                  hoverable
                  size="small"
                  onClick={() => dispatch(setTemplate(item.id))}
                  style={{
                    cursor: "pointer",
                    borderRadius: 14,
                    textAlign: "center",
                    border:
                      template === item.id
                        ? "2px solid #003580"
                        : "1px solid #f0f0f0",
                  }}
                  bodyStyle={{ padding: 10 }}
                  cover={
                    <div style={{ padding: 12, background: "#f1f1f1" }}>
                      <div
                        style={{
                          height: 80,
                          borderRadius: 10,
                          background:
                            "linear-gradient(135deg,#1677ff,#69b1ff)",
                          marginBottom: 10,
                        }}
                      />

                      <div
                        style={{
                          height: 8,
                          width: "70%",
                          background: "#d9d9d9",
                          borderRadius: 999,
                          marginBottom: 8,
                        }}
                      />

                      <div
                        style={{
                          height: 8,
                          width: "100%",
                          background: "#e5e7eb",
                          borderRadius: 999,
                          marginBottom: 8,
                        }}
                      />

                      <div
                        style={{
                          height: 8,
                          width: "50%",
                          background: "#e5e7eb",
                          borderRadius: 999,
                        }}
                      />
                    </div>
                  }
                >
                  <Text strong>{item.name}</Text>
                </Card>
              </Col>
            ))}
          </Row>
        </Card>

      </Space>
    </Sider>
  );
};

export default PostLayoutCompo;