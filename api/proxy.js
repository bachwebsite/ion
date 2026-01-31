export default async function handler(req, res) {
  const url = req.query.url;
  if (!url) return res.status(400).send("Missing url");

  const r = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0" }
  });

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "*");

  const contentType = r.headers.get("content-type");
  if (contentType) res.setHeader("Content-Type", contentType);

  const buf = await r.arrayBuffer();
  res.send(Buffer.from(buf));
}
