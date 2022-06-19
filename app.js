const express = require("express");
const connectDB = require("./db/connect");
const path = require("path");
require('dotenv').config()

const app = express();

// middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')))
const notFound = require("./middleware/not-found")
const errorHandlerMiddleware = require("./middleware/error.handler")

//routes
const taskRoutes = require("./routes/tasks.router");

app.use("/api/v1/tasks", taskRoutes);
app.use(notFound)
app.use(errorHandlerMiddleware)
const Port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    // spin up server if connection is successful
    app.listen(Port, () => {
      console.log(
        `DB connection is successful. Server is listening on port ${Port}`
      );
    });
  } catch (error) {
    console.log("Error with connecting to DB: ", error);
  }
};// end start

start()
