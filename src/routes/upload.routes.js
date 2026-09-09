const router = require("express").Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");

// =====================================================
// UPLOAD DIRECTORY
// =====================================================

// Always use the same upload directory everywhere
const uploadDir = path.join(process.cwd(), "uploads");

console.log("📁 Upload directory:", uploadDir);

// Create uploads folder if it doesn't exist
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// =====================================================
// MULTER CONFIGURATION
// =====================================================

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;

    cb(null, uniqueName.replace(/^\d+-/, ""));
  },
});

const upload = multer({ storage });

// =====================================================
// POST: Upload Image
// =====================================================

router.post("/", upload.single("image"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: "No file uploaded",
      });
    }

    console.log("✅ Uploaded file:", req.file.filename);
    console.log("📁 Saved at:", req.file.path);

    const imageUrl = `http://localhost:5000/uploads/${encodeURIComponent(
      req.file.filename
    )}`;

    return res.status(200).json({
      success: true,
      filename: req.file.filename,
      imageUrl,
    });
  } catch (error) {
    console.error("❌ UPLOAD ERROR:", error);

    return res.status(500).json({
      success: false,
      error: "Upload failed",
    });
  }
});

// =====================================================
// GET: List Uploaded Images
// =====================================================

router.get("/", (req, res) => {
  try {
    console.log("📂 Reading upload directory:", uploadDir);

    if (!fs.existsSync(uploadDir)) {
      return res.json({
        success: true,
        images: [],
      });
    }

    fs.readdir(uploadDir, (err, files) => {
      if (err) {
        console.error("❌ Read directory error:", err);

        return res.status(500).json({
          success: false,
          error: "Unable to read upload directory",
        });
      }

      const sorted = files
        .map((file) => ({
          filename: file,
          url: `http://localhost:5000/uploads/${encodeURIComponent(file)}`,
        }))
        .sort((a, b) => b.filename.localeCompare(a.filename));

      return res.status(200).json({
        success: true,
        images: sorted,
      });
    });
  } catch (error) {
    console.error("❌ GET ERROR:", error);

    return res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
});

// =====================================================
// DELETE: Delete Image
// DELETE /api/upload/:filename
// =====================================================

router.delete("/:filename", (req, res) => {
  try {
    // Express already decodes the route parameter
    const filename = req.params.filename;

    // console.log("\n=================================");
    // console.log("🗑️ DELETE REQUEST");
    // console.log("Filename:", filename);
    // console.log("Upload directory:", uploadDir);

    // -------------------------------------------------
    // Security: only allow filename, not paths
    // -------------------------------------------------

    const safeFilename = path.basename(filename).replace(/^\d+-/, "");
    // console.log("safe file name: ", safeFilename)

    // IMPORTANT:
    // Use uploadDir here.
    // Do NOT use process.cwd() again.
    const filePath = path.join(uploadDir, safeFilename);

    console.log("File path:", filePath);

    // -------------------------------------------------
    // Check file exists
    // -------------------------------------------------

    if (!fs.existsSync(filePath)) {
      console.log("❌ File does not exist");

      // Show files currently available for debugging
      try {
        const availableFiles = fs.readdirSync(uploadDir).replace(/^\d+-/, "");

        console.log("Available files:");
        console.log(availableFiles);

        return res.status(404).json({
          success: false,
          message: "File not found",
          requestedFile: safeFilename,
          filePath,
          availableFiles,
        });
      } catch (readError) {
        return res.status(404).json({
          success: false,
          message: "File not found",
          requestedFile: safeFilename,
          filePath,
        });
      }
    }

    // -------------------------------------------------
    // Delete file
    // -------------------------------------------------

    fs.unlinkSync(filePath);

    console.log("✅ File deleted successfully:", safeFilename);
    console.log("=================================\n");

    return res.status(200).json({
      success: true,
      message: "Image deleted successfully",
      filename: safeFilename,
    });
  } catch (error) {
    console.error("❌ DELETE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete image",
      error: error.message,
    });
  }
});

module.exports = router;