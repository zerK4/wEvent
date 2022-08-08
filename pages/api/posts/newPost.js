import { client } from "../../../utils/client";
import { allPostsQuery } from "../../../utils/queries";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { wCode, user, upload, content, postDate, fileType } = req.body;
    const document = {
      _type: "post",
      content: content,
      wCode: {
        _key: wCode,
        _type: "reference",
        _ref: wCode,
      },
      postedBy: {
        _key: user,
        _type: "reference",
        _ref: user,
      },
      image: {
        img: {
          type: "file",
          asset: {
            _type: "reference",
            _ref: upload?._id,
          },
        },
        fileType: fileType,
      },
      created: postDate,
    };
    const data = await client.create(document);
    console.log(data);
    res.status(200).json(data);
  }
}
