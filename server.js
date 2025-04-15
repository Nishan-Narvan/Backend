const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const contactRoutes = require("./routes/contactRoutes"); 
const userRoutes = require("./routes/userRoutes"); // 👈 Import your routes
const errorHandler = require("./middleware/errorHandler");

dotenv.config(); 
// Loading .env file first

connectDB(); 
// connecting to mongoDb — ye sabse pehle hona chahiye

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
// This tells express app to parse incoming JSON data from requests like post ,put----incoming data from client in JSON format POST,PUT request -- this middleware helps read it 
// Middleware to parse JSON body

// Mount user routes at /api/users
app.use("/api/users", userRoutes);

// 👇 Mounting the routes
app.use("/api/contacts", contactRoutes);

app.get("/", (req,res)=>{
    res.send("API is running...");
});
// This is known as defining a route on the server ---ki handling get request to the "/" path--ye response diya jaye.

app.use(errorHandler);
// Ye hamesha sabse last me hona chahiye --- this handles all uncaught errors in one place

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
});
// This is just syntax for starting a server to listen on the given port variable value
