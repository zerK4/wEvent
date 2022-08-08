export default {
  name: "user",
  title: "User",
  type: "document",
  fields: [
    {
      type: "string",
      name: "userName",
      title: "User Name",
    },
    {
      type: "string",
      name: "role",
      title: "Role in wedding",
    },
    {
      type: "boolean",
      name: "darkMode",
      title: "Dark Mode",
    },
    {
      type: "string",
      name: "email",
      title: "Email",
    },
    {
      type: "string",
      name: "phone",
      title: "Phone Number",
    },
    {
      type: "reference",
      name: "wCode",
      to: { type: "wedding" },
    },
    {
      type: "string",
      name: "token",
      title: "Token",
    },

    {
      name: "profileImage",
      title: "Profile Image",
      type: "file",
      options: {
        hotspot: true,
      },
    },
  ],
};
