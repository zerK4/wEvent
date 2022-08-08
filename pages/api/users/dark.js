import { client } from "../../../utils/client";
import { userQuery } from "../../../utils/queries";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    const { id, mode } = req.body;
    const query = userQuery(id);
    console.log(id, mode);
    const data = await client
      .patch(id)
      .set({
        darkMode: mode,
      })
      .commit();
    res.status(201).json(data);
  }
}
