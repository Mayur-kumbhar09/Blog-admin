import { useState } from "react";
import { Form, Input, Button, Card, Typography, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import api from "../services/api";
import Password from "antd/es/input/Password";
import ServerSelect from "./ServerSelect";
import { useNavigate } from "react-router-dom";
import ParticleBackground from "./ParticleBackground";

const { Title } = Typography;

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [showServerModal, setShowServerModal] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    // console.log("login values:- ", values)
    try {
      setLoading(true);

      const r = await api.post("/auth/login", {
        email: values.email,
        password: values.password,
      });

      localStorage.setItem("token", r.data.email);
      // console.log("the login details:- ", localStorage.setItem("token", r.data.token));

      // Set role
      const role = values.email === "admin@gmail.com" ? "admin" : "user";

      localStorage.setItem("role", role);

      message.success("Login successful!");

      // window.location.href = "/dashboard";
      // ["Martech", "AITP", "HRTECH", "FINTECH", "BIJ"].map((data)=>{
      //   if(data === "Martech"){
      //     <h1>MTC is HERE</h1>
      //   }
      // })
      setShowServerModal(true);
    } catch (err) {
      message.error(
        err?.response?.data?.message || "Login failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ParticleBackground>
      <div
        className="login-page"
        style={{
          minHeight: "100vh",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "24px",
          background: "transparent",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative glow */}
        <div
          style={{
            position: "absolute",
            width: 320,
            height: 320,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(0,180,216,0.14), transparent 70%)",
            top: "5%",
            left: "5%",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "absolute",
            width: 380,
            height: 380,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(22,119,255,0.12), transparent 70%)",
            bottom: "-10%",
            right: "-5%",
            pointerEvents: "none",
          }}
        />

        {/* Login Card */}
        <Card
          className="login-card"
          bordered={false}
          style={{
            position: "relative",
            zIndex: 2,
            width: "100%",
            maxWidth: 410,
            borderRadius: 22,
            background: "rgba(255,255,255,0.94)",
            border: "1px solid rgba(255,255,255,0.8)",
            boxShadow:
              "0 25px 70px rgba(15,23,42,0.18), 0 8px 25px rgba(15,23,42,0.08)",
            backdropFilter: "blur(16px)",
            overflow: "hidden",
          }}
          styles={{
            body: {
              padding: "34px 32px 30px",
            },
          }}
        >
          {/* Top gradient line */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 4,
              background:
                "linear-gradient(90deg, #0077b6, #0096c7, #00b4d8)",
            }}
          />

          {/* Logo / Brand */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: 18,
            }}
          >
            <div
              style={{
                width: 58,
                height: 58,
                borderRadius: 17,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background:
                  "linear-gradient(135deg, #0077b6 0%, #0096c7 55%, #00b4d8 100%)",
                color: "#fff",
                fontSize: 25,
                fontWeight: 800,
                boxShadow: "0 10px 25px rgba(0,119,182,0.28)",
              }}
            >
              B
            </div>
          </div>

          {/* Heading */}
          <div
            style={{
              textAlign: "center",
              marginBottom: 28,
            }}
          >
            <Title
              level={3}
              style={{
                margin: 0,
                color: "#111827",
                fontSize: 26,
                fontWeight: 750,
                letterSpacing: "-0.5px",
              }}
            >
              Welcome Back
            </Title>

            <Typography.Text
              style={{
                display: "block",
                marginTop: 7,
                color: "#667085",
                fontSize: 13,
              }}
            >
              Sign in to manage your blog workspace
            </Typography.Text>
          </div>

          <Form
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
          >
            {/* Email */}
            <Form.Item
              label={
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#344054",
                  }}
                >
                  Email
                </span>
              }
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please enter your email",
                },
                {
                  type: "email",
                  message: "Enter a valid email",
                },
              ]}
            >
              <Input
                prefix={
                  <UserOutlined
                    style={{
                      color: "#98a2b3",
                      fontSize: 16,
                    }}
                  />
                }
                placeholder="Enter your email"
                size="large"
                className="login-input"
                style={{
                  height: 48,
                  borderRadius: 11,
                  padding: "0 14px",
                  fontSize: 14,
                  background: "#f9fafb",
                  borderColor: "#e4e7ec",
                }}
              />
            </Form.Item>

            {/* Password */}
            <Form.Item
              label={
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#344054",
                  }}
                >
                  Password
                </span>
              }
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please enter your password",
                },
              ]}
            >
              <Input.Password
                prefix={
                  <LockOutlined
                    style={{
                      color: "#98a2b3",
                      fontSize: 16,
                    }}
                  />
                }
                placeholder="Enter your password"
                size="large"
                className="login-input"
                style={{
                  height: 48,
                  borderRadius: 11,
                  padding: "0 14px",
                  fontSize: 14,
                  background: "#f9fafb",
                  borderColor: "#e4e7ec",
                }}
              />
            </Form.Item>

            {/* Login */}
            <Form.Item style={{ marginBottom: 4, marginTop: 26 }}>
              <Button
                type="primary"
                htmlType="submit"
                block
                size="large"
                loading={loading}
                style={{
                  height: 49,
                  borderRadius: 11,
                  border: "none",
                  fontSize: 14,
                  fontWeight: 650,
                  background:
                    "linear-gradient(135deg, #0077b6 0%, #0096c7 55%, #00b4d8 100%)",
                  boxShadow:
                    "0 9px 22px rgba(0,119,182,0.25)",
                }}
              >
                Login
              </Button>
            </Form.Item>
          </Form>

          {/* Footer */}
          <div
            style={{
              marginTop: 22,
              paddingTop: 16,
              borderTop: "1px solid #eef1f5",
              textAlign: "center",
            }}
          >
            <Typography.Text
              style={{
                fontSize: 11,
                color: "#98a2b3",
              }}
            >
              Secure Blog Management Workspace
            </Typography.Text>
          </div>
        </Card>

        {/* Server Selection */}
        <ServerSelect
          open={showServerModal}
          onFinish={(server) => {
            console.log("Selected Server:", server);

            localStorage.setItem("selectedServer", server);

            setShowServerModal(false);

            navigate("/dashboard");
          }}
        />
      </div>

      <style>
        {`
          .login-card {
            animation: loginCardEnter 0.55s ease-out;
          }

          @keyframes loginCardEnter {
            from {
              opacity: 0;
              transform: translateY(18px) scale(0.98);
            }

            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          .login-input {
            transition:
              border-color 0.2s ease,
              box-shadow 0.2s ease,
              background 0.2s ease;
          }

          .login-input:hover {
            border-color: #7ac7df !important;
            background: #ffffff !important;
          }

          .login-input:focus,
          .login-input.ant-input-affix-wrapper-focused {
            border-color: #0077b6 !important;
            background: #ffffff !important;
            box-shadow:
              0 0 0 3px rgba(0,119,182,0.10) !important;
          }

          .login-card .ant-btn-primary {
            transition:
              transform 0.2s ease,
              box-shadow 0.2s ease;
          }

          .login-card .ant-btn-primary:hover {
            transform: translateY(-2px);
            box-shadow:
              0 13px 28px rgba(0,119,182,0.30) !important;
          }

          .login-card .ant-form-item-label > label {
            color: #344054 !important;
          }

          @media (max-width: 576px) {
            .login-page {
              padding: 16px !important;
            }

            .login-card {
              max-width: 100% !important;
              border-radius: 18px !important;
            }

            .login-card .ant-card-body {
              padding: 28px 22px 24px !important;
            }
          }

          @media (max-width: 380px) {
            .login-page {
              padding: 10px !important;
            }

            .login-card .ant-card-body {
              padding: 24px 18px 20px !important;
            }
          }
        `}
      </style>
    </ParticleBackground>
  );
}

