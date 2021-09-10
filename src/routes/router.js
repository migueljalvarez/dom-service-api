import { Router } from "express";
import UserController from "../controllers/users";
import ProfileController from "../controllers/profiles";
import ServiceController from "../controllers/services";
import CategoryController from "../controllers/categories";
import AuthController from "../controllers/auth";

const router = Router();

router.get("/", (req, res) => {
  res.send({
    message: "Api is OK",
  });
});

// Auth
router.post("/signup", UserController.create);
router.post("/login", AuthController.auth, AuthController.login)

// Users
router.get("/users/:id?", UserController.find);
router.patch("/users/:id/restore", UserController.restore);
router.patch("/users/:id", UserController.patch);
router.delete("/users/:id", UserController.deleteOne);

// Profiles
router.get("/profiles/:id?", ProfileController.find);
router.patch("/profiles/:id", ProfileController.patch);

// Services
router.post("/services", ServiceController.create);
router.get("/services/:id?", ServiceController.find);
router.patch("/services/:id/restore", ServiceController.restore);
router.patch("/services/:id", ServiceController.patch);
router.delete("/services/:id", ServiceController.deleteOne);

// Categories
router.post("/categories", CategoryController.create);
router.get("/categories/:id?", CategoryController.find);
router.patch("/categories/:id/restore", CategoryController.restore);
router.patch("/categories/:id", CategoryController.patch);
router.delete("/categories/:id", CategoryController.deleteOne);

export default router;
