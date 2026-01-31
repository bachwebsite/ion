export default async function handler(req, res) {
  const url = req.query.url;
  if (!url) return res.status(400).send("Missing url");

  try {
    const r = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    });

    const contentType = r.headers.get("content-type") || "text/plain";
    res.setHeader("Content-Type", contentType);
    res.setHeader("Access-Control-Allow-Origin", "*");

    const buffer = await r.arrayBuffer();
    res.send(Buffer.from(buffer));
  } catch (e) {
    res.status(500).send(String(e));
  }
}
