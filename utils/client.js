import sanityClient from "@sanity/client";

export const client = sanityClient({
  projectId: "53dzixns",
  dataset: "production",
  useCdn: false,
  apiVersion: "2022-07-21",
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});
