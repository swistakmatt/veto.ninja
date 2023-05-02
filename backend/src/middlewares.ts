import { Application } from "express";

const express = require("express");
const morgan = require("morgan");
const path = require("path");
const fs = require("fs");

const configureExpressMiddlewares = (app: Application) => {
  app.use(express.json());

  const accessLogStream = fs.createWriteStream(
    path.join(__dirname, "access.log"),
    { flags: "a" }
  );

  app.use(morgan("combined", { stream: accessLogStream }));
};

export default configureExpressMiddlewares;
