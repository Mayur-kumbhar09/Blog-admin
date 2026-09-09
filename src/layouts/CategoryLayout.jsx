import React, { useState } from "react";
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Button,
  Table,
  Space,
  Typography,
  Popconfirm,
  Tag,
  Empty,
} from "antd";
import {
  SearchOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  FolderOutlined,
  AppstoreOutlined,
  TagsOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;
const { TextArea } = Input;

const initialCategories = [
  "Advertising & Promotion",
  "Adtech",
  "Brand Management",
  "Digital Advertising",
  "Digital Marketing",
  "Display & Programmatic Advertising",
  "Mobile Advertising",
  "Mobile Marketing",
  "Native/Content Advertising",
  "Performance Marketing",
  "PPC",
  "PR",
  "Print",
  "Social Advertising",
  "Video Advertising",
  "Commerce & Sales",
  "Affiliate Marketing & Management",
  "Local Marketing",
  "Conversational Intelligence",
  "Demand Generation",
  "Ecommerce",
  "Retail",
  "Marketing Automation",
  "Marketing Technology",
  "SEO",
  "Video Marketing",
  "Customer Experience",
  "CRM",
  "Events",
  "Meetings & Webinars",
  "Influencers",
  "Social Media Marketing",
  "Guest Blogs",
  "News",
  "Research based",
  "Resource Hub",
  "Tech Duolog",
  "Uncategorized",
];

const CategoryLayout = () => {
  const [form] = Form.useForm();

  const [categories, setCategories] = useState(
    initialCategories.map((c, index) => ({
      key: index,
      name: c,
      parent: "None",
    })),
  );

  const [selectedRows, setSelectedRows] = useState([]);
  const [search, setSearch] = useState("");

  const filtered = categories.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()),
  );

  console.log(
    "the data of the categories section",
    categories,
  );

  // =========================================================
  // ADD CATEGORY
  // =========================================================
  const onFinish = (values) => {
    setCategories([
      ...categories,
      {
        key: Date.now(),
        name: values.name,
        parent: values.parent || "None",
      },
    ]);

    form.resetFields();
  };

  // =========================================================
  // TABLE COLUMNS
  // =========================================================
  const columns = [
    {
      title: "Category Name",
      dataIndex: "name",
      key: "name",
      render: (name) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#eff6ff",
              color: "#2563eb",
              flexShrink: 0,
            }}
          >
            <FolderOutlined />
          </div>

          <div style={{ minWidth: 0 }}>
            <Text
              strong
              ellipsis={{
                tooltip: name,
              }}
              style={{
                display: "block",
                color: "#1e293b",
              }}
            >
              {name}
            </Text>

            <Text
              type="secondary"
              style={{
                fontSize: 12,
              }}
            >
              Category
            </Text>
          </div>
        </div>
      ),
    },

    {
      title: "Category",
      dataIndex: "parent",
      key: "category",
      render: (parent) => (
        <Tag
          icon={<TagsOutlined />}
          style={{
            borderRadius: 8,
            padding: "4px 9px",
            margin: 0,
            border: "none",
            background: parent === "None" ? "#f1f5f9" : "#eef2ff",
            color: parent === "None" ? "#64748b" : "#4f46e5",
          }}
        >
          {parent}
        </Tag>
      ),
    },

    {
      title: "Belongs To",
      dataIndex: "parent",
      key: "parent",
      render: (parent) => (
        <Text
          type={parent === "None" ? "secondary" : undefined}
          style={{
            fontSize: 13,
          }}
        >
          {parent}
        </Text>
      ),
    },

    {
      title: "Actions",
      key: "actions",
      width: 180,
      render: (_, record) => (
        <Space size={6}>
          <Button
            size="small"
            icon={<EditOutlined />}
            style={{
              borderRadius: 8,
              fontWeight: 500,
            }}
          >
            Edit
          </Button>

          <Popconfirm
            title="Delete Category?"
            description={`Are you sure you want to delete "${record.name}"?`}
            okText="Delete"
            cancelText="Cancel"
            okButtonProps={{
              danger: true,
            }}
          >
            <Button
              danger
              size="small"
              icon={<DeleteOutlined />}
              style={{
                borderRadius: 8,
                fontWeight: 500,
              }}
            >
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: 28,
        background:
          "linear-gradient(135deg, #f8fafc 0%, #eef4f9 50%, #f8fafc 100%)",
      }}
    >
      {/* =====================================================
          PAGE HEADER
      ===================================================== */}
      <Card
        bordered={false}
        style={{
          borderRadius: 20,
          marginBottom: 24,
          overflow: "hidden",
          position: "relative",
          background:
            "linear-gradient(135deg, #0f172a 0%, #1e3a8a 55%, #2563eb 100%)",
          boxShadow: "0 14px 40px rgba(15, 23, 42, 0.15)",
        }}
        styles={{
          body: {
            padding: 0,
          },
        }}
      >
        {/* Decorative shapes */}
        <div
          style={{
            position: "absolute",
            width: 190,
            height: 190,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.06)",
            right: 70,
            top: -110,
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
          className="category-header"
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
            }}
          >
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
              <AppstoreOutlined
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
                Categories
              </Title>

              <Text
                style={{
                  color: "rgba(255,255,255,0.72)",
                  fontSize: 14,
                }}
              >
                Organize and manage your post categories
              </Text>
            </div>
          </div>

          {/* Total */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 9,
              padding: "10px 16px",
              borderRadius: 14,
              color: "#fff",
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.12)",
              whiteSpace: "nowrap",
            }}
          >
            <TagsOutlined />

            <span
              style={{
                fontWeight: 600,
              }}
            >
              {categories.length} Categories
            </span>
          </div>
        </div>
      </Card>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}
      <Row gutter={[24, 24]} align="stretch">
        {/* ===================================================
            ADD CATEGORY
        =================================================== */}
        <Col xs={24} lg={8} xl={7}>
          <Card
            bordered={false}
            style={{
              height: "100%",
              borderRadius: 18,
              boxShadow:
                "0 8px 30px rgba(15, 23, 42, 0.07)",
            }}
            styles={{
              body: {
                padding: 24,
              },
            }}
          >
            {/* Card header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 13,
                marginBottom: 24,
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#eff6ff",
                  color: "#2563eb",
                }}
              >
                <PlusOutlined
                  style={{
                    fontSize: 19,
                  }}
                />
              </div>

              <div>
                <Title
                  level={4}
                  style={{
                    margin: 0,
                    color: "#0f172a",
                  }}
                >
                  Add Category
                </Title>

                <Text
                  type="secondary"
                  style={{
                    fontSize: 12,
                  }}
                >
                  Create a new category
                </Text>
              </div>
            </div>

            <Form
              layout="vertical"
              form={form}
              onFinish={onFinish}
            >
              <Form.Item
                label={
                  <span style={{ fontWeight: 600 }}>
                    Category Name
                  </span>
                }
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please enter category name",
                  },
                ]}
              >
                <Input
                  size="large"
                  placeholder="Enter category name"
                  prefix={
                    <FolderOutlined
                      style={{
                        color: "#94a3b8",
                      }}
                    />
                  }
                  style={{
                    borderRadius: 10,
                  }}
                />
              </Form.Item>

              <Form.Item
                label={
                  <span style={{ fontWeight: 600 }}>
                    Category Belongs To
                  </span>
                }
                name="parent"
              >
                <Select
                  allowClear
                  size="large"
                  placeholder="Select parent category"
                  options={categories.map((c) => ({
                    label: c.name,
                    value: c.name,
                  }))}
                  style={{
                    width: "100%",
                  }}
                />
              </Form.Item>

              <Form.Item
                label={
                  <span style={{ fontWeight: 600 }}>
                    Category Icon
                  </span>
                }
                name="icon"
              >
                <Input
                  size="large"
                  placeholder="FaUser, MdHome..."
                  prefix={
                    <AppstoreOutlined
                      style={{
                        color: "#94a3b8",
                      }}
                    />
                  }
                  style={{
                    borderRadius: 10,
                  }}
                />
              </Form.Item>

              <Form.Item
                label={
                  <span style={{ fontWeight: 600 }}>
                    Category Bio
                  </span>
                }
                name="bio"
              >
                <TextArea
                  rows={5}
                  placeholder="Write a short description..."
                  style={{
                    borderRadius: 10,
                    resize: "none",
                  }}
                />
              </Form.Item>

              <div
                style={{
                  marginTop: 8,
                  marginBottom: 18,
                  padding: "10px 12px",
                  borderRadius: 10,
                  background: "#f8fafc",
                  display: "flex",
                  gap: 8,
                  alignItems: "flex-start",
                }}
              >
                <InfoCircleOutlined
                  style={{
                    color: "#64748b",
                    marginTop: 2,
                  }}
                />

                <Text
                  type="secondary"
                  style={{
                    fontSize: 12,
                    lineHeight: 1.5,
                  }}
                >
                  Categories help keep your posts organized
                  and easier to discover.
                </Text>
              </div>

              <Button
                block
                type="primary"
                htmlType="submit"
                size="large"
                icon={<PlusOutlined />}
                style={{
                  height: 48,
                  borderRadius: 10,
                  fontWeight: 600,
                  border: "none",
                  boxShadow:
                    "0 7px 18px rgba(22,119,255,0.22)",
                }}
              >
                Add Category
              </Button>
            </Form>
          </Card>
        </Col>

        {/* ===================================================
            CATEGORY LIST
        =================================================== */}
        <Col xs={24} lg={16} xl={17}>
          <Card
            bordered={false}
            style={{
              height: "100%",
              borderRadius: 18,
              boxShadow:
                "0 8px 30px rgba(15, 23, 42, 0.07)",
            }}
            styles={{
              body: {
                padding: 22,
              },
            }}
          >
            {/* List header */}
            <div
              className="category-list-header"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 16,
                marginBottom: 20,
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
                  Category List
                </Title>

                <Text
                  type="secondary"
                  style={{
                    fontSize: 12,
                  }}
                >
                  Manage your existing categories
                </Text>
              </div>

              <Space
                className="category-actions"
                size={10}
              >
                <Input
                  placeholder="Search Category"
                  prefix={
                    <SearchOutlined
                      style={{
                        color: "#64748b",
                      }}
                    />
                  }
                  allowClear
                  size="large"
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  style={{
                    width: 250,
                    borderRadius: 10,
                  }}
                />

                <Button
                  danger
                  size="large"
                  icon={<DeleteOutlined />}
                  disabled={!selectedRows.length}
                  style={{
                    borderRadius: 10,
                  }}
                >
                  Bulk Delete
                </Button>
              </Space>
            </div>

            {/* Search result information */}
            <div
              style={{
                marginBottom: 14,
                padding: "10px 13px",
                borderRadius: 10,
                background: "#f8fafc",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text
                type="secondary"
                style={{
                  fontSize: 13,
                }}
              >
                {search
                  ? `Showing ${filtered.length} result${
                      filtered.length !== 1 ? "s" : ""
                    } for "${search}"`
                  : `Showing all ${categories.length} categories`}
              </Text>

              <Tag
                style={{
                  margin: 0,
                  borderRadius: 7,
                  border: "none",
                  background: "#e0edff",
                  color: "#2563eb",
                  fontWeight: 600,
                }}
              >
                {filtered.length}
              </Tag>
            </div>

            {/* Table */}
            {filtered.length > 0 ? (
              <Table
                rowSelection={{
                  selectedRowKeys: selectedRows,
                  onChange: setSelectedRows,
                }}
                columns={columns}
                dataSource={filtered}
                rowKey="key"
                scroll={{
                  x: 750,
                }}
                pagination={{
                  pageSize: 15,
                  showSizeChanger: true,
                  pageSizeOptions: ["15", "30", "50"],
                  showTotal: (total, range) =>
                    `${range[0]}-${range[1]} of ${total} categories`,
                }}
              />
            ) : (
              <div
                style={{
                  minHeight: 320,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description={
                    <Text type="secondary">
                      No categories found
                    </Text>
                  }
                />
              </div>
            )}
          </Card>
        </Col>
      </Row>

      {/* =====================================================
          RESPONSIVE STYLES
      ===================================================== */}
      <style>
        {`
          .category-header {
            min-height: 110px;
          }

          .ant-table-wrapper {
            overflow-x: auto;
          }

          @media (max-width: 992px) {
            .category-list-header {
              align-items: flex-start !important;
              flex-direction: column !important;
            }

            .category-actions {
              width: 100%;
              display: flex !important;
            }

            .category-actions .ant-input-affix-wrapper {
              flex: 1;
            }
          }

          @media (max-width: 768px) {
            .category-header {
              align-items: flex-start !important;
              flex-direction: column !important;
            }

            .category-actions {
              flex-direction: column !important;
              align-items: stretch !important;
            }

            .category-actions > * {
              width: 100% !important;
            }
          }

          @media (max-width: 576px) {
            .category-header {
              padding: 22px !important;
            }

            .category-header h2 {
              font-size: 24px !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default CategoryLayout;

