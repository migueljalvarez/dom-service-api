import { Router } from "express";
import CategoryController from "../controllers/categories";

const router = Router();

router.get("/", (req, res) => {
  res.send({
    message: "Api is OK",
  });
});

router.post("/category", CategoryController.create);
router.get("/category/:id?", CategoryController.find);
router.patch("/category/:id/restore", CategoryController.restore);
router.patch("/category/:id", CategoryController.patch);
router.delete("/category/:id", CategoryController.deleteOne);

export default router;
