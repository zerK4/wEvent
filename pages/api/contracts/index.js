import { allContractsQuery } from "../../../utils/queries";
import { client } from "../../../utils/client";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const wCode = req.body.wCode;
    const query = allContractsQuery(wCode);
    const data = await client.fetch(query);
    console.log("sent contracts");
    res.status(201).json(data);
  } else if (req.method === "DELETE") {
    const id = req.body.source;
    const data = client.delete({
      query: `*[_type == 'contract' && _id == '${id}']`,
    });
    res.status(201).json(data);
  }
}
