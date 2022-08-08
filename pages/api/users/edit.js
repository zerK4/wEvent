import { client } from "../../../utils/client";
import { guestQuery } from "../../../utils/queries";
import { v4 } from "uuid";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    const { wId, userId, name, location, phone, confirmation } = req.body;
    const query = guestQuery(wId, userId);
    const data = await client
      .patch(query)
      .set({
        mName: name,
        phone: phone,
        location: location,
        confirmed: confirmation,
      })
      .commit();
    res.status(201).json(data);
  }
}
