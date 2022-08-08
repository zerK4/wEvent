export default {
  name: "wedding",
  title: "Wedding",
  type: "document",
  fields: [
    {
      type: "string",
      name: "wCode",
      title: "Wedding Code",
    },
    {
      type: "string",
      name: "wName",
      title: "Wedding name",
    },
    {
      type: "date",
      name: "wDate",
      title: "Event Date",
    },
    {
      type: "array",
      name: "wCore",
      title: "Wedding core Members",
      of: [
        {
          type: "reference",
          to: [{ type: "user" }],
        },
      ],
    },
    {
      name: "image",
      title: "Image",
      type: "file",
      options: {
        hotspot: true,
      },
    },
    {
      name: "posts",
      title: "Posts",
      type: "array",
      of: [{ type: "post" }],
    },
  ],
};
