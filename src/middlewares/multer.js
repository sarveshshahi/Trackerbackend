import multer from "multer"
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/temp')
    },
    filename: function (req, file, cb) {

        cb(null, file.originalname)
    }
})

export const upload = multer({ 
    storage, 
})


// import multer from "multer";
// import fs from "fs";
// import path from "path";

// // Ensure upload directory exists
// const uploadDir = "./public/temp";
// if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir, { recursive: true });
// }

// // Multer Storage Configuration
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, uploadDir);
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
//         const ext = path.extname(file.originalname);
//         const baseName = path.basename(file.originalname, ext);
//         cb(null, `${baseName}-${uniqueSuffix}${ext}`);
//     }
// });

// // File Type Validation
// const fileFilter = (req, file, cb) => {
//     const allowedTypes = ["image/jpeg", "image/png", "image/gif", "application/pdf"];
//     if (allowedTypes.includes(file.mimetype)) {
//         cb(null, true);
//     } else {
//         cb(new Error("Invalid file type. Only images and PDFs are allowed."), false);
//     }
// };

// // Multer Upload Middleware
// export const upload = multer({ 
//     storage,
//     fileFilter,
//     limits: { fileSize: 5 * 1024 * 1024 } // 5MB max file size
// });
