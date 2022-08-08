import { client } from "../../../utils/client";
import { guestQuery } from "../../../utils/queries";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const wCode = req.body.wCode;
    const query = guestQuery(wCode);
    const data = await client.fetch(query);
    res.status(200).json(data);
  }
}
