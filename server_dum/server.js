require("dotenv").config();
const express = require("express");
const connectDb = require("./utils/db");
const app = express();
const cors = require("cors");
const userRoutes = require("./routes/auth_router");
const adminRoutes = require("./routes/admin_routes");

const errorMiddleware = require("./middlewares/error_middleware");
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use("/api/auth", userRoutes);
app.use("/api/admin", adminRoutes);

app.use(errorMiddleware);

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`server running at port :${PORT}`);
  });
});
