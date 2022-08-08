import { client } from "../../../utils/client";
import { allPostsQuery } from "../../../utils/queries";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const wCode = req.body.wCode;
    const query = allPostsQuery(wCode);
    const data = await client.fetch(query);
    res.status(200).json(data);
  } else if (req.method === "DELETE") {
    const id = req.body.source;
    const data = client.delete({
      query: `*[_type == 'post' && _id == '${id}']`,
    });
    res.status(201).json(data);
  }
}
