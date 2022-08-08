import { client } from "../../../utils/client";
import { wCode } from "../../../utils/queries";

export default async function handler(req, res) {
  if (req.method == "POST") {
    const code = req.body.wCode;
    const query = wCode(code);
    const data = await client.fetch(query);
    if (data.length !== 0) {
      res.status(200).json(data);
    } else {
      res.status(200).json("nf");
    }
  }
}
