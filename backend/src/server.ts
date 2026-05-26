import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import "dotenv/config";
// import path from "path";
import { clerkMiddleware } from "@clerk/express";

import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
// import { migrate } from "drizzle-orm/node-postgres/migrator";
import { db } from "./db/index.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(clerkMiddleware());

app.use(morgan("dev"));
app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN,
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // parses form data (like HTML forms).

app.get("/api/health", (_req, res) => {
  res.json({
    message:
      "Welcome to Productify API - Powered by PostgreSQL, Drizzle ORM & Clerk Auth",
    endpoints: {
      users: "/api/users",
      products: "/api/products",
      comments: "/api/comments",
    },
  });
});

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/comments", commentRoutes);

// if (process.env.NODE_ENV === "production") {
//   const __dirname = path.resolve();

//   // serve static files from frontend/dist
//   app.use(express.static(path.join(__dirname, "../frontend/dist")));

//   // handle SPA routing - send all non-API routes to index.html - react app
//   app.get("/{*any}", (req, res) => {
//     res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
//   });
// }

// app.listen(PORT, () => console.log(`server running on port ${PORT}`));

async function startServer() {
  // if (process.env.NODE_ENV !== "production") {
  //   // Automatically run pending migrations on startup
  //   console.log("🔄 Running database migrations...");
  //   await migrate(db, { migrationsFolder: "./drizzle" });
  //   console.log("✅ Migrations complete!");
  // }

  try {
    await db.execute("SELECT 1");
    console.log("Database connected successfully!");

    app.listen(PORT, () => {
      console.log(`🚀 Server spinning up on port ${PORT}`);
    });
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1); // Exit if connection is critical
  }
}

startServer().catch((err) => {
  console.error("❌ Server failed to start:", err);
});
