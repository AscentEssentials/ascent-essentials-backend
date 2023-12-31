import multer from "multer";
import fs from "fs";

export const directoryToStoreImages = "uploads/products/images";

// Create the directory if it doesn't exist
if (!fs.existsSync(directoryToStoreImages)) {
  fs.mkdirSync(directoryToStoreImages, { recursive: true });
}

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, directoryToStoreImages); // Specify the directory to store uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Rename the file to avoid conflicts
  },
});

export const upload = multer({ storage: storage });
