import React from "react";
import {
  Row,
  Col,
  Input,
  Button,
  Typography,
  Card,
  Space,
  Divider,
} from "antd";

import {
  FacebookFilled,
  InstagramOutlined,
  TwitterOutlined,
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  SendOutlined,
  MessageOutlined,
  GlobalOutlined,
} from "@ant-design/icons";

const { TextArea } = Input;
const { Title, Paragraph, Text } = Typography;

const Contact = () => {
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
          HERO HEADER
      ====================================================== */}

      <div
        style={{
          position: "relative",
          overflow: "hidden",
          marginBottom: 25,
          padding: "28px 30px",
          borderRadius: 18,
          background:
            "linear-gradient(135deg, #ffffff 0%, #f5f7ff 55%, #eef4ff 100%)",
          border: "1px solid #e7ebf3",
          boxShadow: "0 8px 30px rgba(15, 23, 42, 0.05)",
        }}
      >
        {/* Decorative circles */}

        <div
          style={{
            position: "absolute",
            width: 220,
            height: 220,
            borderRadius: "50%",
            right: -90,
            top: -130,
            background: "rgba(79, 70, 229, 0.055)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "absolute",
            width: 120,
            height: 120,
            borderRadius: "50%",
            right: 110,
            bottom: -80,
            background: "rgba(37, 99, 235, 0.045)",
            pointerEvents: "none",
          }}
        />

        <Space
          align="start"
          size={15}
          style={{ position: "relative", zIndex: 1 }}
        >
          <div
            style={{
              width: 52,
              height: 52,
              flexShrink: 0,
              borderRadius: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: 23,
              background:
                "linear-gradient(135deg, #4f46e5, #2563eb)",
              boxShadow:
                "0 10px 22px rgba(79, 70, 229, 0.24)",
            }}
          >
            <MessageOutlined />
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
              Contact Us
            </Title>

            <Paragraph
              style={{
                margin: "5px 0 0",
                maxWidth: 620,
                color: "#7b8496",
                fontSize: 13,
              }}
            >
              Have a question or need assistance? Send us a message and
              our team will get back to you as soon as possible.
            </Paragraph>
          </div>
        </Space>
      </div>

      {/* =====================================================
          CONTACT SECTION
      ====================================================== */}

      <Row gutter={[22, 22]} align="stretch">
        {/* ===================================================
            LEFT — CONTACT FORM
        ==================================================== */}

        <Col xs={24} lg={16}>
          <Card
            bordered={false}
            style={{
              height: "100%",
              borderRadius: 17,
              border: "1px solid #e8ecf3",
              boxShadow:
                "0 8px 30px rgba(15, 23, 42, 0.055)",
              overflow: "hidden",
            }}
            bodyStyle={{
              padding: 0,
            }}
          >
            {/* Form Header */}

            <div
              style={{
                padding: "21px 23px",
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
                    fontSize: 17,
                  }}
                >
                  <SendOutlined />
                </div>

                <div>
                  <Text
                    strong
                    style={{
                      display: "block",
                      fontSize: 14,
                      color: "#263247",
                    }}
                  >
                    Send us a message
                  </Text>

                  <Text
                    style={{
                      display: "block",
                      marginTop: 2,
                      color: "#98a1b2",
                      fontSize: 11,
                    }}
                  >
                    Fill in the details below
                  </Text>
                </div>
              </Space>
            </div>

            {/* Form */}

            <div
              style={{
                padding: 23,
              }}
            >
              <Row gutter={[16, 18]}>
                {/* First Name */}

                <Col xs={24} md={12}>
                  <div style={{ marginBottom: 6 }}>
                    <Text
                      strong
                      style={{
                        fontSize: 11,
                        color: "#596579",
                      }}
                    >
                      FIRST NAME
                    </Text>
                  </div>

                  <Input
                    size="large"
                    placeholder="Enter first name"
                    style={{
                      borderRadius: 9,
                      height: 43,
                    }}
                  />
                </Col>

                {/* Last Name */}

                <Col xs={24} md={12}>
                  <div style={{ marginBottom: 6 }}>
                    <Text
                      strong
                      style={{
                        fontSize: 11,
                        color: "#596579",
                      }}
                    >
                      LAST NAME
                    </Text>
                  </div>

                  <Input
                    size="large"
                    placeholder="Enter last name"
                    style={{
                      borderRadius: 9,
                      height: 43,
                    }}
                  />
                </Col>

                {/* Email */}

                <Col span={24}>
                  <div style={{ marginBottom: 6 }}>
                    <Text
                      strong
                      style={{
                        fontSize: 11,
                        color: "#596579",
                      }}
                    >
                      EMAIL ADDRESS
                    </Text>
                  </div>

                  <Input
                    size="large"
                    prefix={
                      <MailOutlined
                        style={{ color: "#9aa4b5" }}
                      />
                    }
                    placeholder="Enter your email address"
                    style={{
                      borderRadius: 9,
                      height: 43,
                    }}
                  />
                </Col>

                {/* Phone */}

                <Col span={24}>
                  <div style={{ marginBottom: 6 }}>
                    <Text
                      strong
                      style={{
                        fontSize: 11,
                        color: "#596579",
                      }}
                    >
                      PHONE NUMBER
                    </Text>
                  </div>

                  <Input
                    size="large"
                    prefix={
                      <PhoneOutlined
                        style={{ color: "#9aa4b5" }}
                      />
                    }
                    placeholder="Enter your phone number"
                    style={{
                      borderRadius: 9,
                      height: 43,
                    }}
                  />
                </Col>

                {/* Message */}

                <Col span={24}>
                  <div style={{ marginBottom: 6 }}>
                    <Text
                      strong
                      style={{
                        fontSize: 11,
                        color: "#596579",
                      }}
                    >
                      MESSAGE
                    </Text>
                  </div>

                  <TextArea
                    rows={5}
                    placeholder="Write your message here..."
                    style={{
                      borderRadius: 9,
                      resize: "vertical",
                    }}
                  />
                </Col>

                {/* Submit */}

                <Col span={24}>
                  <Button
                    type="primary"
                    size="large"
                    icon={<SendOutlined />}
                    className="contact-submit-btn"
                    style={{
                      width: "100%",
                      height: 45,
                      borderRadius: 9,
                      border: "none",
                      fontWeight: 650,
                      background:
                        "linear-gradient(135deg, #4f46e5, #2563eb)",
                      boxShadow:
                        "0 8px 18px rgba(79, 70, 229, 0.22)",
                    }}
                  >
                    Send Message
                  </Button>
                </Col>
              </Row>
            </div>
          </Card>
        </Col>

        {/* ===================================================
            RIGHT — GET IN TOUCH
        ==================================================== */}

        <Col xs={24} lg={8}>
          <Card
            bordered={false}
            style={{
              height: "100%",
              minHeight: 430,
              borderRadius: 17,
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,.12)",
              background:
                "linear-gradient(145deg, #171d38 0%, #202a52 55%, #263b70 100%)",
              boxShadow:
                "0 15px 40px rgba(15, 23, 42, 0.15)",
              position: "relative",
            }}
            bodyStyle={{
              padding: 0,
              height: "100%",
            }}
          >
            {/* Background graphics */}

            <div
              style={{
                position: "absolute",
                width: 200,
                height: 200,
                borderRadius: "50%",
                right: -80,
                top: -70,
                background: "rgba(99, 102, 241, 0.16)",
              }}
            />

            <div
              style={{
                position: "absolute",
                width: 130,
                height: 130,
                borderRadius: "50%",
                left: -70,
                bottom: -50,
                background: "rgba(6, 182, 212, 0.08)",
              }}
            />

            <div
              style={{
                position: "relative",
                zIndex: 1,
                padding: 25,
              }}
            >
              {/* Icon */}

              <div
                style={{
                  width: 47,
                  height: 47,
                  borderRadius: 13,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(255,255,255,.11)",
                  border:
                    "1px solid rgba(255,255,255,.12)",
                  color: "#fff",
                  fontSize: 20,
                  marginBottom: 17,
                }}
              >
                <GlobalOutlined />
              </div>

              <Title
                level={4}
                style={{
                  margin: 0,
                  color: "#fff",
                  fontWeight: 700,
                }}
              >
                Get In Touch
              </Title>

              <Paragraph
                style={{
                  marginTop: 7,
                  marginBottom: 23,
                  color: "rgba(255,255,255,.62)",
                  fontSize: 12,
                  lineHeight: 1.7,
                }}
              >
                We're always happy to hear from you. Reach out using
                any of the contact details below.
              </Paragraph>

              <Divider
                style={{
                  margin: "0 0 20px",
                  borderColor: "rgba(255,255,255,.12)",
                }}
              />

              {/* Contact Items */}

              <Space
                direction="vertical"
                size={17}
                style={{ width: "100%" }}
              >
                {/* Phone */}

                <div
                  style={{
                    display: "flex",
                    gap: 12,
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      flexShrink: 0,
                      borderRadius: 10,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "rgba(255,255,255,.1)",
                      color: "#fff",
                    }}
                  >
                    <PhoneOutlined />
                  </div>

                  <div>
                    <Text
                      style={{
                        display: "block",
                        color: "rgba(255,255,255,.45)",
                        fontSize: 10,
                        marginBottom: 3,
                      }}
                    >
                      PHONE
                    </Text>

                    <a
                      href="tel:+918009054294"
                      style={{
                        color: "#fff",
                        fontSize: 12,
                        textDecoration: "none",
                      }}
                    >
                      +91 8009 054294
                    </a>
                  </div>
                </div>

                {/* Email */}

                <div
                  style={{
                    display: "flex",
                    gap: 12,
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      flexShrink: 0,
                      borderRadius: 10,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "rgba(255,255,255,.1)",
                      color: "#fff",
                    }}
                  >
                    <MailOutlined />
                  </div>

                  <div style={{ minWidth: 0 }}>
                    <Text
                      style={{
                        display: "block",
                        color: "rgba(255,255,255,.45)",
                        fontSize: 10,
                        marginBottom: 3,
                      }}
                    >
                      EMAIL
                    </Text>

                    <a
                      href="mailto:info@flightmantra.com"
                      style={{
                        color: "#fff",
                        fontSize: 12,
                        textDecoration: "none",
                        wordBreak: "break-word",
                      }}
                    >
                      info@flightmantra.com
                    </a>
                  </div>
                </div>

                {/* Location */}

                <div
                  style={{
                    display: "flex",
                    gap: 12,
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      flexShrink: 0,
                      borderRadius: 10,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "rgba(255,255,255,.1)",
                      color: "#fff",
                    }}
                  >
                    <EnvironmentOutlined />
                  </div>

                  <div>
                    <Text
                      style={{
                        display: "block",
                        color: "rgba(255,255,255,.45)",
                        fontSize: 10,
                        marginBottom: 3,
                      }}
                    >
                      SERVICE AREA
                    </Text>

                    <Text
                      style={{
                        color: "#fff",
                        fontSize: 11.5,
                        lineHeight: 1.6,
                      }}
                    >
                      1000+ Travel partners and 65+ Service city
                      across India, USA, Canada & UAE
                    </Text>
                  </div>
                </div>
              </Space>

              <Divider
                style={{
                  margin: "23px 0 18px",
                  borderColor: "rgba(255,255,255,.12)",
                }}
              />

              {/* Social */}

              <div>
                <Text
                  style={{
                    display: "block",
                    color: "rgba(255,255,255,.5)",
                    fontSize: 10,
                    marginBottom: 10,
                    letterSpacing: ".5px",
                  }}
                >
                  FOLLOW US
                </Text>

                <Space size={9}>
                  <a
                    href="#"
                    aria-label="Facebook"
                    style={{
                      width: 35,
                      height: 35,
                      borderRadius: 9,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      background: "rgba(255,255,255,.1)",
                      fontSize: 15,
                      transition: "all .2s ease",
                    }}
                  >
                    <FacebookFilled />
                  </a>

                  <a
                    href="#"
                    aria-label="Instagram"
                    style={{
                      width: 35,
                      height: 35,
                      borderRadius: 9,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      background: "rgba(255,255,255,.1)",
                      fontSize: 15,
                      transition: "all .2s ease",
                    }}
                  >
                    <InstagramOutlined />
                  </a>

                  <a
                    href="#"
                    aria-label="Twitter"
                    style={{
                      width: 35,
                      height: 35,
                      borderRadius: 9,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      background: "rgba(255,255,255,.1)",
                      fontSize: 15,
                      transition: "all .2s ease",
                    }}
                  >
                    <TwitterOutlined />
                  </a>
                </Space>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* =====================================================
          GOOGLE MAP
      ====================================================== */}

      <Card
        bordered={false}
        style={{
          marginTop: 22,
          borderRadius: 17,
          border: "1px solid #e8ecf3",
          boxShadow:
            "0 8px 30px rgba(15, 23, 42, 0.055)",
          overflow: "hidden",
        }}
        bodyStyle={{
          padding: 0,
        }}
      >
        {/* Map Header */}

        <div
          style={{
            padding: "19px 23px",
            background:
              "linear-gradient(90deg, #ffffff, #fafbff)",
            borderBottom: "1px solid #eef1f6",
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
                fontSize: 17,
              }}
            >
              <EnvironmentOutlined />
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
                Find Us on Google Map
              </Text>

              <Text
                style={{
                  display: "block",
                  marginTop: 2,
                  color: "#98a1b2",
                  fontSize: 11,
                }}
              >
                Visit our office or contact us through the details
                above.
              </Text>
            </div>
          </Space>
        </div>

        {/* Map */}

        <div
          style={{
            width: "100%",
            height: 450,
            background: "#eef1f5",
          }}
        >
          <iframe
            title="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d471220.5631094339!2d88.04952462217592!3d22.6757520733225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f882db4908f667%3A0x43e330e68f6c2cbc!2sKolkata%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1596988408134!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{
              border: 0,
              display: "block",
            }}
            loading="lazy"
            allowFullScreen
          />
        </div>
      </Card>

      {/* =====================================================
          RESPONSIVE STYLE
      ====================================================== */}

      <style>
        {`
          .contact-submit-btn {
            transition: all .25s ease !important;
          }

          .contact-submit-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 11px 25px rgba(79, 70, 229, .30) !important;
          }

          @media (max-width: 767px) {
            .contact-submit-btn {
              height: 43px !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Contact;

