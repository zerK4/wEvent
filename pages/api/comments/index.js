import { client } from "../../../utils/client";
import { v4 } from "uuid";
import { allPostsQuery } from "../../../utils/queries";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { postId, comment, userId, postDate } = req.body;
    const query = allPostsQuery(userId.wCode._ref);
    const data = await client
      .patch(postId)
      .setIfMissing({ comment: [] })
      .insert("after", "comment[-1]", [
        {
          comment: comment,
          _key: v4(),
          postedBy: { _type: "postedBy", _ref: userId._id },
          created: postDate,
        },
      ])
      .commit();
    const posts = await client.fetch(query);
    res.status(200).send(posts);
  }
}
