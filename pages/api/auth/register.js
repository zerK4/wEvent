import jwt from "jsonwebtoken";
import { client } from "../../../utils/client";
import { KEY } from "../../../utils/index";

export default async function handler(req, res) {
  if (req.method == "POST") {
    if (!req.body) {
      res.statusCode = 404;
      res.end("Error");
      return;
    }
    const { email, password, userName, phone, role, wCode } = req.body;
    const token = jwt.sign(
      {
        email: email,
        password: password,
      },
      KEY
    );
    const document = {
      _type: "user",
      wCode: wCode,
      userName: userName,
      email: email,
      phone: phone,
      token: token,
      role: role,
    };
    const data = await client.create(document);
    res.status(201).json("Account created!");
  }
}
