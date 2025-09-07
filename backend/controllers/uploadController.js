const fs = require("fs");
const pdfParse = require("pdf-parse");
const { extractInfoFromGemini } = require("../services/geminiService"); // coming next
const db = require("../db/connect");

exports.handleResumeUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({
          error:
            "No file uploaded or unsupported file type. Please upload a PDF.",
        });
    }
    let pdfBuffer;
    try {
      pdfBuffer = fs.readFileSync(req.file.path);
    } catch (e) {
      return res.status(400).json({ error: "Failed to read uploaded file." });
    }
    let pdfData;
    try {
      pdfData = await pdfParse(pdfBuffer);
    } catch (e) {
      return res
        .status(400)
        .json({ error: "Malformed or unreadable PDF file." });
    }
    const rawText = pdfData.text;
    if (!rawText || rawText.trim().length < 30) {
      return res
        .status(400)
        .json({
          error:
            "The PDF appears to be empty or does not contain enough text to analyze.",
        });
    }
    let analysis;
    try {
      analysis = await extractInfoFromGemini(rawText);
    } catch (e) {
      return res
        .status(500)
        .json({ error: "AI analysis failed. Please try again later." });
    }
    try {
      await db.query(
        `INSERT INTO resumes (name, email, data, filename) VALUES ($1, $2, $3, $4)`,
        [
          analysis.personalDetails.name,
          analysis.personalDetails.email,
          analysis,
          req.file.filename,
        ]
      );
    } catch (e) {
      return res
        .status(500)
        .json({ error: "Failed to save analysis to the database." });
    }
    res.json({ success: true, analysis });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: "Unexpected server error." });
  }
};