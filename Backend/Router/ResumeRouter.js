const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const Aimessage = require("../Service/ai-gemini");
const { VerifyUser } = require("../Middlewares/UserAuth");

const ResumeRouter = express.Router();

const upload = multer({
    storage: multer.memoryStorage(),
    fileFilter: (req, file, cb) => {
        if (file.mimetype === "application/pdf") cb(null, true);
        else cb(new Error("Only PDF files are allowed!"));
    }
});


ResumeRouter.post("/resume", VerifyUser, upload.single("file"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }
        const data = await pdfParse(req.file.buffer);
        const result = await Aimessage(data.text);

        res.status(201).json({ result });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to process PDF" });
    }

});



module.exports = ResumeRouter;