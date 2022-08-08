// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator";

// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type";
import postedBy from "./postedBy";
import user from "./user";
import wedding from "./wedding";
import member from "./member";
import post from "./post/post";
import topic from "./post/topic";
import comment from "./post/comment";
import contract from "./contract";

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: "default",
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    postedBy,
    user,
    wedding,
    member,
    post,
    topic,
    comment,
    contract,
  ]),
});
