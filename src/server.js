const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");

// Handling Uncaught exceptions - like - console.log(youtube);
// process.on("uncaughtException", (err) => {
//   console.log(`Error: ${err.message}`);
//   console.log("Shutting down the server due to Uncaught Exception");
//   process.exit(1);
// });

//  Config
dotenv.config({ path: "src/config/config.env" });

// Connect to database
connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(`server is working on http://localhost:${process.env.PORT}`);
});

// Unhandle Promise Rejection
//           event
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to Unhandlead Promise Rejection");

  // Close the server
  server.close(() => {
    process.exit(1);
  });
});
