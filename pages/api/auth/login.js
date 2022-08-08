import jwt from "jsonwebtoken";
import { client } from "../../../utils/client";
import { loginQuery } from "../../../utils/queries";

export default async function handler(req, res) {
  if (req.method == "POST") {
    if (!req.body) {
      res.statusCode = 404;
      res.end("Error");
      return;
    }
    const { email, password } = req.body;
    const query = loginQuery(email);
    const data = await client.fetch(query);
    if (data[0]) {
      const token = data[0].token;
      const decoded = jwt.decode(token);
      if (decoded.password === password) {
        res.status(201).json(data);
      } else {
        res.status(200).json("pwd");
      }
    } else {
      res.status(200).json("null");
    }
  }
}
