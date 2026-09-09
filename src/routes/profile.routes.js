const router = require("express").Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");

// Upload folder location
const uploadDir = path.join(__dirname, "../../../profileimg"); 

// Create folder if it doesn't exist
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, {
        recursive: true,
    });
}

// Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },

    filename: (req, file, cb) => {
        const filename =
            Date.now() +
            "-" +
            Math.round(Math.random() * 999999) +
            path.extname(file.originalname); 

        cb(null, filename);
    },
});

// File validation
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Only image files are allowed"), false);
    }
};

// Multer configuration
const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
    },
});

// =======================
// Upload Image
// =======================
router.post("/", upload.single("profileImage"), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No image selected",
            });
        }

        const imageURL = `${req.protocol}://${req.get(
            "host"
        )}/profileimg/${req.file.filename}`;

        res.status(200).json({
            success: true,
            message: "Image uploaded successfully",
            image: {
                filename: req.file.filename,
                url: imageURL,
            },
        });
    } catch (error) {
        console.error("UPLOAD ERROR:", error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
// =======================
// Get Single Image Details
// =======================
router.get("/", (req, res) => {
    try {
        if (!fs.existsSync(uploadDir)) {
            console.error("Directory not found:", uploadDir);
            return res.status(404).send("Upload directory missing");
        }

        const files = fs
            .readdirSync(uploadDir)
            .filter((file) => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
            .sort(
                (a, b) =>
                    fs.statSync(path.join(uploadDir, b)).mtimeMs -
                    fs.statSync(path.join(uploadDir, a)).mtimeMs
            );

        if (files.length === 0) {
            console.log("No files inside uploadDir");
            return res.status(404).send("No images uploaded yet");
        }

        // FIX: Grab index [0] to create a valid string file path
        const latestImagePath = path.join(uploadDir, files[0]);
        console.log("Streaming file path back to client:", latestImagePath);

        return res.sendFile(latestImagePath);

    } catch (error) {
        console.error("GET ROUTE ERROR:", error);
        return res.status(500).send(error.message);
    }
});

// =======================
// Multer Error Handler
// =======================
router.use((error, req, res, next) => {
    console.error("MULTER ERROR:", error);

    res.status(500).json({
        success: false,
        message: error.message,
    });
});

module.exports = router;