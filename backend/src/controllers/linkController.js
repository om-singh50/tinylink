import { pool } from "../config/db.js";

const CODE_REGEX = /^[A-Za-z0-9]{6,8}$/;

function generateCode(length = 6) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// CREATE LINK
export const createLink = async (req, res) => {
  try {
    const { url } = req.body;
    let { code } = req.body;

    if (!url) return res.status(400).json({ error: "URL is required" });

    // If no custom code, auto-generate
    if (!code) {
      // generate until unique (with a small limit to avoid infinite loop)
      let trials = 0;
      do {
        code = generateCode(6);
        const existing = await pool.query("SELECT 1 FROM links WHERE code=$1", [
          code,
        ]);
        if (existing.rowCount === 0) break;
        trials++;
      } while (trials < 5);
    }

    // validate final code
    if (!CODE_REGEX.test(code)) {
      return res.status(400).json({ error: "Invalid code format" });
    }

    // check duplicate
    const existing = await pool.query("SELECT 1 FROM links WHERE code=$1", [
      code,
    ]);
    if (existing.rowCount > 0) {
      return res.status(409).json({ error: "Code already exists" });
    }

    const insert = await pool.query(
      "INSERT INTO links (code, url) VALUES ($1, $2) RETURNING *",
      [code, url]
    );

    return res.status(201).json(insert.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// LIST ALL LINKS
export const getLinks = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM links ORDER BY created_at");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// GET SINGLE CODE STATS
export const getLinkStats = async (req, res) => {
  try {
    const { code } = req.params;
    const result = await pool.query("SELECT * FROM links WHERE code=$1", [
      code,
    ]);

    if (result.rowCount === 0)
      return res.status(404).json({ error: "Code not found" });

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// DELETE LINK
export const deleteLink = async (req, res) => {
  try {
    const { code } = req.params;

    await pool.query("DELETE FROM links WHERE code=$1", [code]);

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
