import express from "express";
import router from "./routes/router";
import "./db/conn";

const app = express();
app.use(express.json())
app.use("/api/v1", router);

export default app;
