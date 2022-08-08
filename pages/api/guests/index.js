import { client } from "../../../utils/client";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { wCode, name, location, phone, confirmation, provided } = req.body;
    const document = {
      _type: "member",
      wCode: {
        _type: "reference",
        _ref: wCode,
      },
      mName: name,
      location: location,
      phone: phone,
      confirmed: confirmation,
      provided: provided,
    };
    const data = await client.create(document);
    res.status(200).json(data);
  } else if (req.method === "DELETE") {
    const id = req.body.source;
    const data = client.delete({
      query: `*[_type == 'member' && _id == '${id}']`,
    });
    res.status(201).json(data);
  }
}
