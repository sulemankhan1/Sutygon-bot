const express = require("express");
const app = express();

const connectDB = require("./config/db");
connectDB();


// Middlewares
app.use(express.json({ extended: false }));

// Routes
app.use("/api/users", require("./routes/api/user"));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server Running on port: ${port}`));
