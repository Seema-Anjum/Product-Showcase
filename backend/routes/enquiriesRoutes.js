import express from "express";
import db from "../db/database.js";

const router = express.Router();

// POST /api/enquiries
router.post("/", (req, res) => {
  try {
    const { product_id, name, email, phone, message } = req.body;
    if (!product_id || !name || !email ||!phone || !message)
      return res.status(400).json({ success: false, message: "All fields are required" });

    const stmt = db.prepare(`
      INSERT INTO enquiries (product_id, name, email, phone,  message)
      VALUES (?, ?, ?, ?, ?)
    `);
    const info = stmt.run(product_id, name, email, phone, message);
    res.json({ success: true, message: "Enquiry submitted", enquiry_id: info.lastInsertRowid });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to submit enquiry" });
  }
});

// GET /api/enquiries
router.get("/", (req, res) => {
  try {
    const enquiries = db.prepare("SELECT * FROM enquiries ORDER BY created_at DESC").all();
    res.json({ success: true, data: enquiries });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to fetch enquiries" });
  }
});

export default router;
