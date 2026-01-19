import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { bpm } = req.body;

  if (!bpm) {
    return res.status(400).json({ error: "Missing BPM" });
  }

  try {
    await sql`
      INSERT INTO heart_rate (bpm)
      VALUES (${bpm})
    `;

    res.status(200).json({ success: true, bpm });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
