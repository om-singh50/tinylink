import express from "express";
import cors from "cors";
import linkRoutes from "./routes/linkRoutes.js";
import redirectRoute from "./routes/redirectRoute.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/healthz", (req, res) => {
  res.status(200).json({ ok: true, version: "1.0" });
});


app.use("/api/links", linkRoutes);
app.use("/", redirectRoute);

export default app;
