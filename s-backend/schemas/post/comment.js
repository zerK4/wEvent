export default {
  name: "comment",
  title: "comment",
  type: "document",
  fields: [
    {
      type: "string",
      title: "Comment",
      name: "comment",
    },
    {
      type: "string",
      title: "Created",
      name: "created",
    },
    {
      type: "reference",
      name: "postedBy",
      title: "Posted By",
      to: { type: "user" },
    },
  ],
};
