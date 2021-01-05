const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");

const PORT = 3000;

const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/accounts', {
       useNewUrlParser: true,
       useUnifiedTopology: true,
       useCreateIndex: true,
       useFindAndModify: false
});

// routes
app.use(require("../../../../Accounts/routes/api.js.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});

// mongodb+srv://griffmike167:Irish4528@cluster0.pp5ya.mongodb.net/accounts?retryWrites=true&w=majority