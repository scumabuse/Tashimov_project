import multer from "multer";
import path from "path";
import fs from "fs";
const modelStorage = multer.diskStorage({
    destination(req, file, cb) {
        const dir = path.join("uploads", "models");
        fs.mkdirSync(dir, { recursive: true });
        cb(null, dir);
    },
    filename(req, file, cb) {
        const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, unique + path.extname(file.originalname));
    },
});
const previewsStorage = multer.diskStorage({
    destination(req, file, cb) {
        const dir = path.join("uploads", "previews");
        fs.mkdirSync(dir, { recursive: true });
        cb(null, dir);
    },
    filename(req, file, cb) {
        const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, unique + path.extname(file.originalname));
    },
});
export const uploadFields = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            // Depending on fieldname, choose folder
            const dir = file.fieldname === "file" ? path.join("uploads", "models") : path.join("uploads", "previews");
            fs.mkdirSync(dir, { recursive: true });
            cb(null, dir);
        },
        filename(req, file, cb) {
            const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
            cb(null, unique + path.extname(file.originalname));
        },
    }),
    limits: {
        fileSize: 100 * 1024 * 1024 // 100 MB max file
    },
});
