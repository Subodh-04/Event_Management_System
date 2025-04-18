require("dotenv").config();

const express = require("express");
const connectDb = require("./utils/db");
const app = express();
app.use(express.json());
const cors = require("cors");
const uRoutes = require("./routes/user_routes");
const userRoutes = require("./routes/auth_router");
const adminRoutes = require("./routes/admin_routes");
const eventRoutes = require("./routes/event_routes");

const errorMiddleware = require("./middlewares/error_middleware");
const PORT = process.env.PORT || 5000;
console.log("Stripe Secret Key:", process.env.STRIPE_SECRET_KEY);

app.use(express.json());
app.use(cors());

app.use("/api/user", uRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/events", eventRoutes);
app.use("/api", require("./routes/payment_routes"));

app.use(errorMiddleware);

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`server running at port :${PORT}`);
  });
});
