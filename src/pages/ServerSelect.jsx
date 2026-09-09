import React, { useEffect, useState } from "react";
import { Modal, Select, Typography, Button } from "antd";
import api from "../services/api";

const { Text } = Typography;

const servers = [
  {
    label: "Martech",
    value: "Martech",
    apiUrl: "https://martech.yourdomain.com",
  },
  {
    label: "AITP",
    value: "AITP",
    apiUrl: "https://aitp.yourdomain.com",
  },
  {
    label: "HRTECH",
    value: "HRTECH",
    apiUrl: "https://hrtech.yourdomain.com",
  },
  {
    label: "FINTECH",
    value: "FINTECH",
    apiUrl: "https://fintech.yourdomain.com",
  },
  {
    label: "BIJ",
    value: "BIJ",
    apiUrl: "https://bij.yourdomain.com",
  },
];

const ServerSelect = ({ open, onFinish }) => {
  const [selectedServer, setSelectedServer] = useState();

  useEffect(() => {
    if (!selectedServer) return;

    const fetchServerData = async () => {
      try {
        console.log("Selected Server:", selectedServer);

        const response = await api.post("/serverdata", {
          server: selectedServer,
        });

        console.log(response.data);
      } catch (err) {
        console.log("Status:", err.response?.status);
        console.log("Response:", err.response?.data);
      }
    };

    fetchServerData();
  }, [selectedServer]);

  const handleContinue = () => {
    const server = servers.find((s) => s.value === selectedServer);

    localStorage.setItem("selectedServer", server.value);
    localStorage.setItem("serverUrl", server.apiUrl);

    onFinish(server);
  };

  return (
    <>
      <Modal
        title={
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "4px 0",
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
                background:
                  "linear-gradient(135deg, #0077b6 0%, #00b4d8 100%)",
                color: "#fff",
                fontSize: 20,
                fontWeight: 700,
                boxShadow: "0 6px 15px rgba(0, 119, 182, 0.25)",
              }}
            >
              S
            </div>

            <div>
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  lineHeight: 1.2,
                  color: "#111827",
                }}
              >
                Select Blog Server
              </div>

              <div
                style={{
                  fontSize: 12,
                  fontWeight: 400,
                  color: "#8b95a5",
                  marginTop: 3,
                }}
              >
                Choose your publishing environment
              </div>
            </div>
          </div>
        }
        open={open}
        centered
        closable={false}
        maskClosable={false}
        footer={null}
        width={460}
        styles={{
          content: {
            padding: 0,
            overflow: "hidden",
            borderRadius: 20,
            boxShadow:
              "0 25px 70px rgba(15, 23, 42, 0.18), 0 8px 25px rgba(15, 23, 42, 0.08)",
          },
          header: {
            margin: 0,
            padding: "22px 24px 18px",
            borderBottom: "1px solid #eef1f5",
            background: "#ffffff",
          },
          body: {
            padding: "24px",
            background: "#fafbfc",
          },
        }}
      >
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e8edf3",
            borderRadius: 16,
            padding: 20,
            boxShadow: "0 4px 14px rgba(15, 23, 42, 0.04)",
          }}
        >
          <div
            style={{
              marginBottom: 18,
            }}
          >
            <Text
              style={{
                display: "block",
                fontSize: 14,
                lineHeight: 1.6,
                color: "#667085",
              }}
            >
              Select the server where you want to publish your blog.
            </Text>
          </div>

          <div>
            <div
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "#344054",
                marginBottom: 8,
              }}
            >
              Publishing Server
            </div>

            <Select
              placeholder="Choose a Server"
              style={{
                width: "100%",
                height: 48,
              }}
              options={servers}
              value={selectedServer}
              onChange={setSelectedServer}
              size="large"
              popupMatchSelectWidth
              className="server-select"
            />
          </div>

          {/* Selected server preview */}
          {selectedServer && (
            <div
              style={{
                marginTop: 14,
                padding: "11px 13px",
                borderRadius: 10,
                background: "#f0f9ff",
                border: "1px solid #d7f0fc",
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#16a34a",
                  boxShadow: "0 0 0 4px rgba(22, 163, 74, 0.10)",
                  flexShrink: 0,
                }}
              />

              <div>
                <div
                  style={{
                    fontSize: 11,
                    color: "#667085",
                    marginBottom: 2,
                  }}
                >
                  Selected environment
                </div>

                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#0077b6",
                  }}
                >
                  {selectedServer}
                </div>
              </div>
            </div>
          )}

          <Button
            type="primary"
            block
            style={{
              marginTop: 22,
              height: 48,
              borderRadius: 10,
              fontSize: 14,
              fontWeight: 600,
              border: "none",
              background:
                "linear-gradient(135deg, #0077b6 0%, #0096c7 55%, #00b4d8 100%)",
              boxShadow: "0 7px 18px rgba(0, 119, 182, 0.22)",
            }}
            disabled={!selectedServer}
            onClick={handleContinue}
          >
            Continue
          </Button>
        </div>

        <div
          style={{
            textAlign: "center",
            marginTop: 16,
            fontSize: 11,
            color: "#98a2b3",
          }}
        >
          Your selected server will be used for this session.
        </div>
      </Modal>

      <style>
        {`
          .server-select .ant-select-selector {
            border-radius: 10px !important;
            border-color: #d9e0e8 !important;
            transition: all 0.2s ease !important;
          }

          .server-select:hover .ant-select-selector {
            border-color: #00a6d6 !important;
          }

          .server-select.ant-select-focused .ant-select-selector {
            border-color: #0077b6 !important;
            box-shadow: 0 0 0 3px rgba(0, 119, 182, 0.10) !important;
          }

          .ant-modal-mask {
            backdrop-filter: blur(5px);
          }

          @media (max-width: 576px) {
            .ant-modal {
              max-width: calc(100vw - 24px) !important;
              margin: 12px auto !important;
            }

            .ant-modal-content {
              border-radius: 16px !important;
            }
          }
        `}
      </style>
    </>
  );
};

export default ServerSelect;
