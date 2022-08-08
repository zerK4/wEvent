import { client } from "../../../utils/client";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { wCode, name, cNumber, service, phone, email, price, file } =
      req.body;
    const document = {
      _type: "contract",
      supplier: name,
      wCode: {
        _key: wCode,
        _type: "reference",
        _ref: wCode,
      },
      contractFile: {
        asset: {
          _type: "reference",
          _ref: file?._id,
        },
      },
      service: service,
      cNumber: cNumber,
      cPhone: phone,
      cEmail: email,
      price: price,
    };
    const data = await client.create(document);
    console.log(data);
    res.status(200).json(data);
  }
}
