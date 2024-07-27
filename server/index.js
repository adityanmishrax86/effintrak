require("dotenv").config(); // Secures variables
const app = require("./utils/app"); // Backend App (server)
const mongo = require("./utils/mongo"); // MongoDB (database)
const { PORT } = require("./constants");
const authRoutes = require("./routes/auth");
const budgetRoutes = require("./routes/budget");
const userRoutes = require("./routes/user");
const analyticsRoutes = require("./routes/analytics");

async function bootstrap() {
  await mongo.connect();

  app.get("/", (req, res) => res.status(200).json({ message: "Hello World!" }));
  app.get("/healthz", (req, res) => res.status(200).send());
  app.use("/auth", authRoutes);
  app.use("/budget", budgetRoutes);
  app.use("/user", userRoutes);
  app.use("/analytics", analyticsRoutes);

  app.listen(PORT, () => {
    console.log(`✅ Server is listening on port: ${PORT}`);
  });
}

bootstrap();
