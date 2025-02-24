const express = require("express");
const app = express();
const cors = require("cors");
const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");
require("dotenv").config();
const url = require("./config");
const URL = process.env.LINK;
const DB = process.env.DB;
const jwt_secret = process.env.jwt_secret;
const FROM = process.env.FROM;
const PASSWORD = process.env.PASSWORD;
const ACTIVATE_ACCOUNT_URL = process.env.ACTIVATE_ACCOUNT_URL || "https://free-url-shortener.netlify.app/activate-account";
const CORS_ORIGIN = process.env.CORS_ORIGIN || "https://free-url-shortener.netlify.app";

app.use(express.json());
app.use(cors({ origin: CORS_ORIGIN }));

let authenticate = function (request, response, next) {
  if (request.headers.authorization) {
    try {
      let verify = jwt.verify(request.headers.authorization, jwt_secret);
      request.userid = verify.id;
      next();
    } catch (error) {
      response.status(401).json({ message: "Unauthorized" });
    }
  } else {
    response.status(401).json({ message: "Unauthorized" });
  }
};

app.get("/", function (request, response) {
  response.send("Server Running for URL Shortener");
});

app.post("/", async function (request, response) {
  try {
    const connection = await mongoClient.connect(URL);
    const db = connection.db(DB);
    const user = await db.collection("users").findOne({ username: request.body.username });

    if (user) {
      const match = await bcrypt.compare(request.body.password, user.password);
      if (match) {
        const token = jwt.sign({ id: user._id, username: user.username, active: user.active }, jwt_secret);
        response.json({ message: "Successfully Logged In!!", active: user.active, token });
      } else {
        response.status(401).json({ message: "Password is incorrect!!" });
      }
    } else {
      response.status(404).json({ message: "User not found" });
    }
    await connection.close();
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

app.post("/register", async function (request, response) {
  try {
    const connection = await mongoClient.connect(URL);
    const db = connection.db(DB);
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(request.body.password, salt);
    request.body.password = hash;

    let checkUser = await db.collection("users").findOne({ username: request.body.username });
    if (checkUser) {
      response.status(400).json({ message: "Username already exists. Please choose another username" });
      return;
    }

    let emailIDCheck = await db.collection("users").findOne({ email: request.body.email });
    if (emailIDCheck) {
      response.status(400).json({ message: "Email already registered. Please use a different email ID or reset your password" });
      return;
    }

    await db.collection("users").insertOne(request.body);
    await connection.close();

    let mailid = request.body.email;

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: FROM,
        pass: PASSWORD,
      },
    });

    let link = `${ACTIVATE_ACCOUNT_URL}?email=${encodeURIComponent(mailid)}`;
    var mailOptions = {
      from: FROM,
      to: mailid,
      subject: "URL Shortener",
      text: `Please activate the account by clicking this link`,
      html: `<h2>Click the link to activate your account: <a href="${link}">${link}</a></h2>`,
    };

    await transporter.sendMail(mailOptions);
    response.json({ message: "User Registered! Please check the mail and activate the account" });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

app.listen(process.env.PORT || 10000, () => {
  console.log("Server running on port 10000");
});