const express = require("express");
const graphqlHTTP = require("express-graphql");
const { GraphQLSchema } = require("graphql");
const schema = "./schema/schema";

// initial app
var app = express();

// add graphql middleware
app.use(
  "/graphql",
  graphqlHTTP({
    schema
  })
);

// reserve port
app.listen(4000, () => {
  console.log("listening for requests on port 4000 ");
});
