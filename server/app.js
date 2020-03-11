const express = require("express");
const graphqlHTTP = require("express-graphql");

// initial app
var app = express();

// add graphql middleware
app.use(
  "/graphql",
  graphqlHTTP({
    // schema: schema,
    graphiql: true
  })
);

// reserve port
app.listen(4000, () => {
  console.log("listening for requests on port 4000 ");
});
