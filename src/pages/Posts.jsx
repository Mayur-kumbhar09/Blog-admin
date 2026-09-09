import React, { useMemo, useState } from "react";
import {
  Button,
  Table,
  Typography,
  Select,
  Space,
  DatePicker,
  Card,
  Row,
  Col,
  Tag,
  Divider,
  Tooltip,
} from "antd";

import {
  FilterOutlined,
  ReloadOutlined,
  CalendarOutlined,
  AppstoreOutlined,
  FileTextOutlined,
  DownOutlined,
  CheckOutlined,
} from "@ant-design/icons";

import { columns, data, items } from "../data/tableData";
import PostNavigator from "./PostNavigator";
import dayjs from "dayjs";

const { Option, OptGroup } = Select;
const { Title, Text } = Typography;

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    // console.log("Selected rows:", selectedRows);
  },
};

// ============================================================
// CATEGORY OPTIONS
// ============================================================

const categoryOptions = [...new Set(data.map((item) => item.categories))]
  .filter(Boolean)
  .map((cat) => ({
    value: cat,
    label: cat,
  }));

// ============================================================
// FORMAT OPTIONS
// ============================================================

const formatOptions = [
  ...new Set(data.map((item) => item.format || "Standard")),
].map((fmt) => ({
  value: fmt,
  label: fmt,
}));

const Posts = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedFormat, setSelectedFormat] = useState(null);
  const [filteredData, setFilteredData] = useState(data);

  // ============================================================
  // FILTER
  // ============================================================

  const handleApply = () => {
    let newData = [...data];

    if (selectedDate) {
      newData = newData.filter(
        (item) =>
          dayjs(item.date, "YYYY/MM/DD at hh:mm a").format("YYYY/MM/DD") ===
          dayjs(selectedDate).format("YYYY/MM/DD"),
      );
    }

    if (selectedCategory) {
      newData = newData.filter(
        (item) => item.categories === selectedCategory,
      );
    }

    if (selectedFormat) {
      newData = newData.filter(
        (item) => (item.format || "Standard") === selectedFormat,
      );
    }

    setFilteredData(newData);
  };

  // ============================================================
  // RESET FILTERS
  // ============================================================

  const handleReset = () => {
    setSelectedDate(null);
    setSelectedCategory(null);
    setSelectedFormat(null);
    setFilteredData(data);
  };

  // ============================================================
  // ACTIVE FILTER COUNT
  // ============================================================

  const activeFilterCount = useMemo(() => {
    return [
      selectedDate,
      selectedCategory,
      selectedFormat,
    ].filter(Boolean).length;
  }, [selectedDate, selectedCategory, selectedFormat]);

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100%",
        paddingBottom: 30,
      }}
    >
      {/* ======================================================
          PAGE HEADER
      ======================================================= */}

      <div
        style={{
          marginBottom: 22,
          padding: "22px 24px",
          borderRadius: 16,
          background:
            "linear-gradient(135deg, #ffffff 0%, #f8faff 55%, #f1f5ff 100%)",
          border: "1px solid #e8ecf5",
          boxShadow: "0 8px 30px rgba(15, 23, 42, 0.05)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative background */}

        <div
          style={{
            position: "absolute",
            width: 180,
            height: 180,
            borderRadius: "50%",
            background: "rgba(79, 70, 229, 0.05)",
            right: -70,
            top: -100,
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "absolute",
            width: 100,
            height: 100,
            borderRadius: "50%",
            background: "rgba(37, 99, 235, 0.04)",
            right: 100,
            bottom: -70,
            pointerEvents: "none",
          }}
        />

        <Row
          gutter={[20, 16]}
          align="middle"
          justify="space-between"
        >
          <Col xs={24} md={16}>
            <Space
              align="start"
              size={14}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 13,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  background:
                    "linear-gradient(135deg, #4f46e5, #2563eb)",
                  color: "#fff",
                  fontSize: 22,
                  boxShadow: "0 8px 18px rgba(79, 70, 229, 0.25)",
                }}
              >
                <FileTextOutlined />
              </div>

              <div>
                <Title
                  level={3}
                  style={{
                    margin: 0,
                    color: "#172033",
                    fontWeight: 750,
                    letterSpacing: "-0.5px",
                  }}
                >
                  Posts
                </Title>

                <Text
                  style={{
                    display: "block",
                    marginTop: 4,
                    color: "#7b8496",
                    fontSize: 13,
                  }}
                >
                  Manage, filter and organize your published content
                </Text>
              </div>
            </Space>
          </Col>

          <Col xs={24} md="auto">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "9px 13px",
                borderRadius: 11,
                background: "#fff",
                border: "1px solid #e7eaf2",
                boxShadow: "0 4px 12px rgba(15, 23, 42, 0.04)",
              }}
            >
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#eef2ff",
                  color: "#4f46e5",
                }}
              >
                <AppstoreOutlined />
              </div>

              <div>
                <Text
                  style={{
                    display: "block",
                    fontSize: 10,
                    color: "#94a3b8",
                    lineHeight: 1.1,
                  }}
                >
                  Total Posts
                </Text>

                <Text
                  strong
                  style={{
                    display: "block",
                    marginTop: 3,
                    color: "#1e293b",
                    fontSize: 15,
                    lineHeight: 1,
                  }}
                >
                  {data.length}
                </Text>
              </div>
            </div>
          </Col>
        </Row>
      </div>

      {/* ======================================================
          POST NAVIGATOR
      ======================================================= */}

      <div
        style={{
          marginBottom: 20,
          padding: "0 3px",
        }}
      >
        <PostNavigator />
      </div>

      {/* ======================================================
          FILTER CARD
      ======================================================= */}

      <Card
        bordered={false}
        style={{
          marginBottom: 20,
          borderRadius: 15,
          border: "1px solid #e9edf5",
          boxShadow: "0 7px 25px rgba(15, 23, 42, 0.045)",
        }}
        bodyStyle={{
          padding: 0,
        }}
      >
        {/* Filter Header */}

        <div
          style={{
            padding: "15px 18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            flexWrap: "wrap",
            borderBottom: "1px solid #f0f2f7",
            background:
              "linear-gradient(90deg, #ffffff, #fafbff)",
            borderRadius: "15px 15px 0 0",
          }}
        >
          <Space size={9}>
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
              <FilterOutlined />
            </div>

            <div>
              <Text
                strong
                style={{
                  display: "block",
                  color: "#263247",
                  fontSize: 13,
                  lineHeight: 1.2,
                }}
              >
                Filter Posts
              </Text>

              <Text
                style={{
                  display: "block",
                  marginTop: 2,
                  color: "#98a1b2",
                  fontSize: 11,
                }}
              >
                Refine your post list
              </Text>
            </div>

            {activeFilterCount > 0 && (
              <Tag
                icon={<CheckOutlined />}
                style={{
                  marginLeft: 3,
                  border: "none",
                  borderRadius: 20,
                  background: "#eef2ff",
                  color: "#4f46e5",
                  fontSize: 10,
                  fontWeight: 600,
                }}
              >
                {activeFilterCount} Active
              </Tag>
            )}
          </Space>

          <Tooltip title="Reset all filters">
            <Button
              type="text"
              icon={<ReloadOutlined />}
              onClick={handleReset}
              disabled={activeFilterCount === 0}
              style={{
                color:
                  activeFilterCount > 0 ? "#4f46e5" : "#b0b7c5",
                fontSize: 12,
                fontWeight: 600,
              }}
            >
              Reset
            </Button>
          </Tooltip>
        </div>

        {/* Filter Body */}

        <div
          style={{
            padding: 18,
          }}
        >
          <Row gutter={[12, 12]}>
            {/* Bulk Actions */}

            <Col xs={24} sm={12} lg={6}>
              <Text
                style={{
                  display: "block",
                  marginBottom: 6,
                  fontSize: 11,
                  color: "#7c8799",
                  fontWeight: 600,
                }}
              >
                BULK ACTIONS
              </Text>

              <Select
                defaultValue="-1"
                style={{ width: "100%" }}
                size="large"
                suffixIcon={<DownOutlined />}
                popupMatchSelectWidth={false}
              >
                {items.map((item) =>
                  item.children ? (
                    <OptGroup
                      key={item.value}
                      label={item.label}
                    >
                      {item.children.map((child) => (
                        <Option
                          key={child.value}
                          value={child.value}
                        >
                          {child.label}
                        </Option>
                      ))}
                    </OptGroup>
                  ) : (
                    <Option
                      key={item.value}
                      value={item.value}
                    >
                      {item.label}
                    </Option>
                  ),
                )}
              </Select>
            </Col>

            {/* Date */}

            <Col xs={24} sm={12} lg={5}>
              <Text
                style={{
                  display: "block",
                  marginBottom: 6,
                  fontSize: 11,
                  color: "#7c8799",
                  fontWeight: 600,
                }}
              >
                PUBLISH DATE
              </Text>

              <DatePicker
                value={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                format="YYYY/MM/DD"
                placeholder="All dates"
                size="large"
                suffixIcon={<CalendarOutlined />}
                style={{
                  width: "100%",
                }}
              />
            </Col>

            {/* Category */}

            <Col xs={24} sm={12} lg={5}>
              <Text
                style={{
                  display: "block",
                  marginBottom: 6,
                  fontSize: 11,
                  color: "#7c8799",
                  fontWeight: 600,
                }}
              >
                CATEGORY
              </Text>

              <Select
                value={selectedCategory}
                onChange={setSelectedCategory}
                placeholder="All Categories"
                allowClear
                showSearch
                size="large"
                style={{
                  width: "100%",
                }}
                options={categoryOptions}
                optionFilterProp="label"
              />
            </Col>

            {/* Format */}

            <Col xs={24} sm={12} lg={5}>
              <Text
                style={{
                  display: "block",
                  marginBottom: 6,
                  fontSize: 11,
                  color: "#7c8799",
                  fontWeight: 600,
                }}
              >
                FORMAT
              </Text>

              <Select
                value={selectedFormat}
                onChange={setSelectedFormat}
                placeholder="All formats"
                allowClear
                size="large"
                style={{
                  width: "100%",
                }}
                options={formatOptions}
              />
            </Col>

            {/* Apply */}

            <Col xs={24} lg={3}>
              <Text
                style={{
                  display: "block",
                  marginBottom: 6,
                  fontSize: 11,
                  color: "transparent",
                  userSelect: "none",
                }}
              >
                ACTION
              </Text>

              <Button
                type="primary"
                size="large"
                icon={<FilterOutlined />}
                onClick={handleApply}
                style={{
                  width: "100%",
                  height: 40,
                  borderRadius: 8,
                  border: "none",
                  fontWeight: 650,
                  background:
                    "linear-gradient(135deg, #4f46e5, #2563eb)",
                  boxShadow:
                    "0 6px 15px rgba(79, 70, 229, 0.22)",
                }}
              >
                Filter
              </Button>
            </Col>
          </Row>
        </div>
      </Card>

      {/* ======================================================
          TABLE HEADER
      ======================================================= */}

      <div
        style={{
          marginBottom: 10,
          padding: "0 3px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 10,
          flexWrap: "wrap",
        }}
      >
        <Space size={8}>
          <Text
            strong
            style={{
              fontSize: 14,
              color: "#263247",
            }}
          >
            All Posts
          </Text>

          <Tag
            style={{
              margin: 0,
              border: "none",
              borderRadius: 20,
              background: "#f1f5f9",
              color: "#64748b",
              fontSize: 10,
              fontWeight: 650,
            }}
          >
            {filteredData.length} results
          </Tag>
        </Space>

        {activeFilterCount > 0 && (
          <Text
            style={{
              color: "#64748b",
              fontSize: 11,
            }}
          >
            Filters applied
          </Text>
        )}
      </div>

      {/* ======================================================
          TABLE
      ======================================================= */}

      <Card
        bordered={false}
        style={{
          borderRadius: 15,
          border: "1px solid #e9edf5",
          overflow: "hidden",
          boxShadow: "0 8px 28px rgba(15, 23, 42, 0.05)",
        }}
        bodyStyle={{
          padding: 0,
        }}
      >
        <Table
          rowSelection={{ ...rowSelection }}
          columns={columns}
          dataSource={filteredData}
          pagination={{
            pageSize: 5,
            showSizeChanger: true,
            pageSizeOptions: ["5", "10", "20"],
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} posts`,
          }}
          scroll={{ x: 1000 }}
          size="middle"
        />
      </Card>
    </div>
  );
};

export default Posts;

