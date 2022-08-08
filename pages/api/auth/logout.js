export default async function handler(req, res) {
  if (req.method == "GET") {
    res.status(201).json(null);
  }
}
