export default {
  name: "contract",
  title: "Contract",
  type: "document",
  fields: [
    {
      type: "string",
      name: "supplier",
      title: "Supplier Name",
    },
    {
      type: "reference",
      name: "wCode",
      title: "Event Code",
      to: { type: "wedding" },
    },
    {
      type: "string",
      name: "service",
      title: "Service offered",
    },
    {
      type: "string",
      name: "cNumber",
      title: "Contract number",
    },
    {
      type: "string",
      name: "cPhone",
      title: "Supplier Phone Number",
    },
    {
      type: "string",
      name: "cEmail",
      title: "Supplier email address",
    },
    {
      type: "string",
      name: "price",
      title: "Service price",
    },
    {
      type: "file",
      name: "contractFile",
      title: "Contract document",
    },
  ],
};
