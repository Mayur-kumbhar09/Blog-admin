const router = require("express").Router();

// In-memory storage
let storedContent = {
  heading: "",
  subHeading: "",
  content: "",
  status: "",
  publishTime: "",
  updatedAt: null,
};

router.post("/", (req, res) => {
  try {
    console.log("\n===== RECEIVED FROM FRONTEND =====");
    console.log(req.body);

    storedContent = {
      ...req.body,
      updatedAt: new Date(),
    };

    console.log("\n===== STORED CONTENT =====");
    console.log(storedContent);

    res.status(200).json({
      success: true,
      message: "Content saved successfully",
      data: storedContent,
    });
  } catch (error) {
    console.error("Save Content Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to save content",
      error: error.message,
    });
  }
});

router.get("/", (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: storedContent,
    });
  } catch (error) {
    console.error("Get Content Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch content",
      error: error.message,
    });
  }
});

module.exports = router;