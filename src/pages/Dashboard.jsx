import React from "react";
import { Row, Col, Card, Statistic, Typography } from "antd";
import { Column, Line } from "@ant-design/plots";

const { Title } = Typography;

const Dashboard = () => {
  // Blog domains
  const domainData = [
    { domain: "Tech Blog", posts: 320 },
    { domain: "Travel Blog", posts: 240 },
    { domain: "Food Blog", posts: 180 },
    { domain: "Business Blog", posts: 290 },
    { domain: "Lifestyle Blog", posts: 210 },
  ];

  // Monthly growth
  const monthlyGrowth = [
    { month: "Jan", posts: 120 },
    { month: "Feb", posts: 145 },
    { month: "Mar", posts: 180 },
    { month: "Apr", posts: 230 },
    { month: "May", posts: 270 },
    { month: "Jun", posts: 320 },
    { month: "Jul", posts: 390 },
    { month: "Aug", posts: 450 },
  ];

  // Improvement %
  const improvementData = [
    { month: "Jan", improvement: 2 },
    { month: "Feb", improvement: 5 },
    { month: "Mar", improvement: 8 },
    { month: "Apr", improvement: 12 },
    { month: "May", improvement: 18 },
    { month: "Jun", improvement: 25 },
    { month: "Jul", improvement: 31 },
    { month: "Aug", improvement: 38 },
  ];

  const totalPosts = domainData.reduce((sum, item) => sum + item.posts, 0);

  const domainChartConfig = {
    data: domainData,
    xField: "domain",
    yField: "posts",
    color: "#1677ff",
    label: {
      position: "top",
    },
    autoFit: true,
  };

  const growthChartConfig = {
    data: monthlyGrowth,
    xField: "month",
    yField: "posts",
    smooth: true,
    point: {
      size: 5,
      shape: "circle",
    },
    color: "#52c41a",
    autoFit: true,
  };

  const improvementChartConfig = {
    data: improvementData,
    xField: "month",
    yField: "improvement",
    smooth: true,
    point: {
      size: 5,
    },
    color: "#fa8c16",
    autoFit: true,
  };

  return (
    <>
      <div
        className="dashboard-page"
        style={{
          minHeight: "100vh",
          padding: "24px",
          background:
            "linear-gradient(135deg, #f5f7fb 0%, #f8fafc 50%, #eef7ff 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative background elements */}
        <div
          style={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 260,
            height: 260,
            borderRadius: "50%",
            background:
              "linear-gradient(135deg, rgba(22,119,255,0.10), rgba(0,180,216,0.02))",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "absolute",
            bottom: -120,
            left: -100,
            width: 280,
            height: 280,
            borderRadius: "50%",
            background:
              "linear-gradient(135deg, rgba(82,196,26,0.06), rgba(22,119,255,0.02))",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: 1600,
            margin: "0 auto",
          }}
        >
          {/* =====================================================
              DASHBOARD HEADER
          ===================================================== */}
          <div
            style={{
              background: "rgba(255,255,255,0.92)",
              border: "1px solid #e8edf3",
              borderRadius: 18,
              padding: "20px 24px",
              marginBottom: 20,
              boxShadow: "0 8px 25px rgba(15,23,42,0.05)",
              backdropFilter: "blur(10px)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 16,
                flexWrap: "wrap",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 5,
                  }}
                >
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: 12,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      fontSize: 20,
                      fontWeight: 700,
                      background:
                        "linear-gradient(135deg, #1677ff 0%, #00b4d8 100%)",
                      boxShadow: "0 7px 18px rgba(22,119,255,0.22)",
                    }}
                  >
                    D
                  </div>

                  <Title
                    level={2}
                    style={{
                      margin: 0,
                      fontWeight: 700,
                      color: "#111827",
                      fontSize: 26,
                    }}
                  >
                    Dashboard
                  </Title>
                </div>

                <Typography.Text
                  style={{
                    color: "#667085",
                    fontSize: 13,
                  }}
                >
                  Monitor your blog publishing activity and performance.
                </Typography.Text>
              </div>

              <div
                style={{
                  padding: "8px 13px",
                  borderRadius: 20,
                  background: "#f0fdf4",
                  border: "1px solid #dcfce7",
                  color: "#16a34a",
                  fontSize: 12,
                  fontWeight: 600,
                }}
              >
                ● System Active
              </div>
            </div>
          </div>

          {/* =====================================================
              STATS CARDS
          ===================================================== */}
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={8}>
              <Card
                className="dashboard-stat-card"
                bordered={false}
                style={{
                  borderRadius: 16,
                  border: "1px solid #e8edf3",
                  boxShadow: "0 7px 22px rgba(15,23,42,0.05)",
                  overflow: "hidden",
                  position: "relative",
                  height: "100%",
                }}
                styles={{
                  body: {
                    padding: 20,
                  },
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    right: -25,
                    top: -25,
                    width: 90,
                    height: 90,
                    borderRadius: "50%",
                    background: "rgba(22,119,255,0.08)",
                  }}
                />

                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#667085",
                    marginBottom: 8,
                  }}
                >
                  TOTAL BLOG POSTS
                </div>

                <Statistic
                  value={totalPosts}
                  valueStyle={{
                    fontSize: 30,
                    fontWeight: 700,
                    color: "#1677ff",
                  }}
                />

                <div
                  style={{
                    marginTop: 7,
                    fontSize: 12,
                    color: "#98a2b3",
                  }}
                >
                  Across all managed domains
                </div>
              </Card>
            </Col>

            <Col xs={24} sm={12} md={8}>
              <Card
                className="dashboard-stat-card"
                bordered={false}
                style={{
                  borderRadius: 16,
                  border: "1px solid #e8edf3",
                  boxShadow: "0 7px 22px rgba(15,23,42,0.05)",
                  overflow: "hidden",
                  position: "relative",
                  height: "100%",
                }}
                styles={{
                  body: {
                    padding: 20,
                  },
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    right: -25,
                    top: -25,
                    width: 90,
                    height: 90,
                    borderRadius: "50%",
                    background: "rgba(82,196,26,0.08)",
                  }}
                />

                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#667085",
                    marginBottom: 8,
                  }}
                >
                  DOMAINS MANAGED
                </div>

                <Statistic
                  value={5}
                  valueStyle={{
                    fontSize: 30,
                    fontWeight: 700,
                    color: "#52c41a",
                  }}
                />

                <div
                  style={{
                    marginTop: 7,
                    fontSize: 12,
                    color: "#98a2b3",
                  }}
                >
                  Active publishing environments
                </div>
              </Card>
            </Col>

            <Col xs={24} sm={12} md={8}>
              <Card
                className="dashboard-stat-card"
                bordered={false}
                style={{
                  borderRadius: 16,
                  border: "1px solid #e8edf3",
                  boxShadow: "0 7px 22px rgba(15,23,42,0.05)",
                  overflow: "hidden",
                  position: "relative",
                  height: "100%",
                }}
                styles={{
                  body: {
                    padding: 20,
                  },
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    right: -25,
                    top: -25,
                    width: 90,
                    height: 90,
                    borderRadius: "50%",
                    background: "rgba(250,140,22,0.09)",
                  }}
                />

                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#667085",
                    marginBottom: 8,
                  }}
                >
                  GROWTH RATE
                </div>

                <Statistic
                  value={38}
                  suffix="%"
                  valueStyle={{
                    fontSize: 30,
                    fontWeight: 700,
                    color: "#fa8c16",
                  }}
                />

                <div
                  style={{
                    marginTop: 7,
                    fontSize: 12,
                    color: "#98a2b3",
                  }}
                >
                  Publishing improvement
                </div>
              </Card>
            </Col>
          </Row>

          {/* =====================================================
              CHARTS
          ===================================================== */}
          <Row gutter={[18, 18]} style={{ marginTop: 20 }}>
            <Col xs={24} lg={12}>
              <Card
                className="dashboard-chart-card"
                bordered={false}
                title={
                  <div>
                    <div
                      style={{
                        fontSize: 15,
                        fontWeight: 700,
                        color: "#111827",
                      }}
                    >
                      Posts Across 5 Domains
                    </div>

                    <div
                      style={{
                        fontSize: 11,
                        color: "#98a2b3",
                        marginTop: 2,
                        fontWeight: 400,
                      }}
                    >
                      Distribution by blog domain
                    </div>
                  </div>
                }
                style={{
                  borderRadius: 16,
                  border: "1px solid #e8edf3",
                  boxShadow: "0 7px 22px rgba(15,23,42,0.05)",
                  height: "100%",
                }}
                styles={{
                  header: {
                    padding: "17px 20px",
                    borderBottom: "1px solid #f0f2f5",
                  },
                  body: {
                    padding: "20px",
                  },
                }}
              >
                <div
                  style={{
                    width: "100%",
                    overflowX: "auto",
                    minHeight: 300,
                  }}
                >
                  <Column {...domainChartConfig} />
                </div>
              </Card>
            </Col>

            <Col xs={24} lg={12}>
              <Card
                className="dashboard-chart-card"
                bordered={false}
                title={
                  <div>
                    <div
                      style={{
                        fontSize: 15,
                        fontWeight: 700,
                        color: "#111827",
                      }}
                    >
                      Monthly Publishing Growth
                    </div>

                    <div
                      style={{
                        fontSize: 11,
                        color: "#98a2b3",
                        marginTop: 2,
                        fontWeight: 400,
                      }}
                    >
                      Posts published over time
                    </div>
                  </div>
                }
                style={{
                  borderRadius: 16,
                  border: "1px solid #e8edf3",
                  boxShadow: "0 7px 22px rgba(15,23,42,0.05)",
                  height: "100%",
                }}
                styles={{
                  header: {
                    padding: "17px 20px",
                    borderBottom: "1px solid #f0f2f5",
                  },
                  body: {
                    padding: "20px",
                  },
                }}
              >
                <div
                  style={{
                    width: "100%",
                    overflowX: "auto",
                    minHeight: 300,
                  }}
                >
                  <Line {...growthChartConfig} />
                </div>
              </Card>
            </Col>

            <Col xs={24} lg={12}>
              <Card
                className="dashboard-chart-card"
                bordered={false}
                title={
                  <div>
                    <div
                      style={{
                        fontSize: 15,
                        fontWeight: 700,
                        color: "#111827",
                      }}
                    >
                      Performance Improvement (%)
                    </div>

                    <div
                      style={{
                        fontSize: 11,
                        color: "#98a2b3",
                        marginTop: 2,
                        fontWeight: 400,
                      }}
                    >
                      Monthly performance trend
                    </div>
                  </div>
                }
                style={{
                  borderRadius: 16,
                  border: "1px solid #e8edf3",
                  boxShadow: "0 7px 22px rgba(15,23,42,0.05)",
                  height: "100%",
                }}
                styles={{
                  header: {
                    padding: "17px 20px",
                    borderBottom: "1px solid #f0f2f5",
                  },
                  body: {
                    padding: "20px",
                  },
                }}
              >
                <div
                  style={{
                    width: "100%",
                    overflowX: "auto",
                    minHeight: 300,
                  }}
                >
                  <Line {...improvementChartConfig} />
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </div>

      <style>
        {`
          .dashboard-stat-card,
          .dashboard-chart-card {
            transition:
              transform 0.25s ease,
              box-shadow 0.25s ease,
              border-color 0.25s ease;
          }

          .dashboard-stat-card:hover,
          .dashboard-chart-card:hover {
            transform: translateY(-3px);
            box-shadow:
              0 14px 32px rgba(15, 23, 42, 0.09) !important;
            border-color: #dbe5ef !important;
          }

          @media (max-width: 767px) {
            .dashboard-page {
              padding: 12px !important;
            }

            .dashboard-page .ant-typography {
              font-size: 21px !important;
            }
          }

          @media (max-width: 480px) {
            .dashboard-page {
              padding: 8px !important;
            }

            .dashboard-page .ant-card-body {
              padding: 15px !important;
            }
          }
        `}
      </style>
    </>
  );
};

export default Dashboard;