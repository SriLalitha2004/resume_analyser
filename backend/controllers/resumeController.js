const db = require("../db/connect");

exports.getAllResumes = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT id, name, email, filename, created_at
      FROM resumes
      ORDER BY created_at DESC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching resumes:", err);
    res.status(500).json({ error: "Failed to fetch resumes" });
  }
};

exports.getResumeById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query(`SELECT * FROM resumes WHERE id = $1`, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Resume not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error fetching resume by ID:", err);
    res.status(500).json({ error: "Failed to fetch resume" });
  }
};