import express from "express";
import { pool } from "../config/db.js";

const router = express.Router();

router.get("/:code", async (req, res) => {
  const { code } = req.params;

  const result = await pool.query("SELECT * FROM links WHERE code=$1", [code]);

  if (result.rowCount === 0)
    return res.status(404).json({ error: "Not found" });

  const link = result.rows[0];

  // update click count
  await pool.query(
    "UPDATE links SET clicks=clicks+1, last_clicked=NOW() WHERE code=$1",
    [code]
  );

  return res.redirect(302, link.url);
});

export default router;
