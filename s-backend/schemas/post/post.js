export default {
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    {
      type: "text",
      name: "content",
      title: "Post content",
    },
    {
      type: "string",
      name: "created",
      title: "Created",
    },
    {
      type: "reference",
      name: "wCode",
      title: "Wedding code",
      to: { type: "wedding" },
    },
    {
      type: "reference",
      name: "postedBy",
      title: "Posted By",
      to: { type: "user" },
    },
    {
      type: "array",
      name: "topic",
      title: "Topic",
      of: [{ type: "topic" }],
    },
    {
      type: "array",
      name: "comment",
      title: "Comments",
      of: [{ type: "comment" }],
    },
    {
      name: "image",
      title: "Image",
      type: "object",
      fields: [
        {
          name: "img",
          type: "file",
          options: {
            hotspot: true,
          },
        },
        {
          name: "fileType",
          type: "string",
        },
      ],
    },
  ],
};
