import express from "express";
import cors from "cors";
import linkRoutes from "./routes/linkRoutes.js";
import redirectRoute from "./routes/redirectRoute.js";

const app = express();
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://tinylink-backend-uu47.onrender.com"
  ],
  methods: ["GET", "POST", "DELETE"],
  allowedHeaders: ["Content-Type"],
}));
app.use(express.json());

app.get("/healthz", (req, res) => {
  res.status(200).json({ ok: true, version: "1.0" });
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.use("/api/links", linkRoutes);
app.use("/", redirectRoute);

export default app;
