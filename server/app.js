const express = require("express");
const graphqlHTTP = require("express-graphql");
const { schema } = require("./schema/schema");

// initial app
var app = express();

// add graphql middleware
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

// reserve port
app.listen(4000, () => {
  console.log("listening for requests on port 4000 ");
});
