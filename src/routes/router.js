import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
  res.send({
    message: "Api is OK"
  })
});

export default router