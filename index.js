const express = require("express");
require("dotenv").config();
const app = express();
// for using the color property in terminal
const color = require("colors");
const morgan = require("morgan");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoute");
const CategoryRoutes = require("./routes/CategoryRoutes");
const ProductRoute = require("./routes/ProductRoute");

// cores-import
const cors = require("cors");

const PORT = process.env.PORT || 8000;

// middlewares
app.use(cors());
// const allowedOrigins = ["http://localhost:5173", "http://localhost:8000"];
// app.use(
//   cors({
//     origin: function (origin, callback) {
//       // Allow requests with no origin (like mobile apps or curl requests)
//       if (!origin) return callback(null, true);
//       if (allowedOrigins.indexOf(origin) === -1) {
//         const msg =
//           "The CORS policy for this site does not allow access from the specified origin.";
//         return callback(new Error(msg), false);
//       }
//       return callback(null, true);
//     },
//     credentials: true, // This allows sending cookies
//   })
// );
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

// database calling
connectDB();

// all routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", CategoryRoutes);
app.use("/api/v1/products", ProductRoute);

app.get("/", (req, res) => {
  res.send("<h1>Hello this is backend word</h1>");
});
app.listen(PORT, () => [
  console.log(
    `server will be setuped on http://localhost:${PORT}`.bgCyan.white
  ),
]);
