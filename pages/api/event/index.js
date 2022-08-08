import { client } from "../../../utils/client";
import { currentEventQuery } from "../../../utils/queries";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const eventId = req.body.eventId;
    const query = currentEventQuery(eventId);
    const data = await client.fetch(query);
    res.status(200).json(data);
  }
}
