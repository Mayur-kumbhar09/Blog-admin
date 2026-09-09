const express = require("express");
const router = express.Router();

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

router.post("/", (req, res) => {
  try {
    console.log("========== Incoming Request ==========");
    console.log("Request Body:", req.body);

    const { server } = req.body;

    // Validate request
    if (!server) {
      return res.status(400).json({
        success: false,
        message: "Server is required.",
      });
    }

    // Find server
    const selectedServer = servers.find(
      (item) => item.value === server
    );

    if (!selectedServer) {
      return res.status(404).json({
        success: false,
        message: "Invalid server selected.",
      });
    }

    console.log("Selected Server:", selectedServer);

    return res.status(200).json({
      success: true,
      message: "Server selected successfully.",
      data: selectedServer,
    });
  } catch (error) {
    console.error("Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

module.exports = router;