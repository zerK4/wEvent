export default {
  name: "member",
  title: "Member",
  type: "document",
  fields: [
    {
      type: "string",
      name: "mName",
      title: "Member Name",
    },
    {
      type: "reference",
      name: "wCode",
      title: "Event",
      to: { type: "wedding" },
    },
    {
      type: "string",
      name: "phone",
      title: "Phone Number",
    },
    {
      type: "boolean",
      name: "confirmed",
      title: "Confirmation?",
    },
    {
      type: "boolean",
      name: "provided",
      title: "Invitation provided?",
    },
    {
      type: "string",
      name: "location",
      title: "Location",
    },
  ],
};
