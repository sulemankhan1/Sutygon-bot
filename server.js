const express = require("express");
const app = express();

const connectDB = require("./config/db");
connectDB();


// Middlewares
app.use(express.json({ extended: false }));

// Routes
app.use("/api/dashboard", require("./routes/api/dashboard"));
app.use("/api/users", require("./routes/api/user"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/inventory", require("./routes/api/inventory"));
app.use("/api/products", require("./routes/api/product"));
app.use("/api/customers", require("./routes/api/customer"));
app.use("/api/orders", require("./routes/api/orders"));
app.use("/api/appointments", require("./routes/api/fittingappointments"));
app.use("/api/rentedproducts", require("./routes/api/rentaproduct"));
app.use("/api/reports", require("./routes/api/report"));



const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server Running on port: ${port}`));
