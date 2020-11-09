const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const fs = require("fs");
const cors = require("cors");
const { ApolloServer, gql } = require("apollo-server-express");
const resolvers = require("./graphql/resolvers");

const app = express();

const typeDefs = gql(
  fs.readFileSync("./graphql/schema.graphql", { encoding: "utf8" })
);

const pathGraph = "/graphql";
const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app, pathGraph });

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
