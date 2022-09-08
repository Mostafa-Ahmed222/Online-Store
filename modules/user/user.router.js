import { Router } from "express";
import {
  addUsers,
  deleteUser,
  getAllUsers,
  getuser,
  searchUser,
  signin,
  softDelete,
  upateUser,
} from "./controller/user.js";
const router = Router()
router.get("/", getuser);
router.get("/users", getAllUsers);
router.post("/users", addUsers);
router.post("/signin", signin);
router.delete("/users/:id", deleteUser);
router.patch("/users/:id", upateUser)
router.get("/users/search", searchUser)
router.post("/users/delete/:id", softDelete)

export default router;
