import { client } from "../../../utils/client";
import { allUsersQuery } from "../../../utils/queries";
import { oneGuestQuery } from "../../../utils/queries";
import { v4 } from "uuid";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const query = allUsersQuery();
    const data = await client.fetch(query);
    res.status(200).json(data);
  } else if (req.method === "PUT") {
    const { userId, name, location, phone, confirmation, invited } = req.body;
    const query = oneGuestQuery(userId);
    const data = await client
      .patch({ query: `*[_type == 'member' && _id == '${userId}']` })
      .set({
        mName: name,
        phone: phone,
        location: location,
        confirmed: confirmation,
        provided: invited,
      })
      .commit();
    res.status(201).json(data);
  }
}
