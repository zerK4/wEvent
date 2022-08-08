import { client } from "../../../utils/client";
import { oneGuestQuery } from "../../../utils/queries";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const userId = req.body.id;
    const query = oneGuestQuery(userId);
    const data = await client.fetch(query);
    res.status(200).json(data);
  }
}
