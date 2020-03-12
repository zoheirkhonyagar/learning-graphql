const express = require("express");
const cors = require("cors");
const graphqlHTTP = require("express-graphql");
const { schema } = require("./schema/schema");
const mongoose = require("mongoose");

// initial app
var app = express();

// add cors middleware
app.use(cors());

// connect mongoose to mongodb
mongoose.connect("mongodb://localhost/learn-graphql");
mongoose.connection.once("open", () => {
  console.log("connected to db");
});

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
