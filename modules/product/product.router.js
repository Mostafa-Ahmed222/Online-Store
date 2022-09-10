import { Router } from "express";
import {
  addProduct,
  allProducts,
  deleteProduct,
  getById,
  getProductById,
  searchProductOfUser,
  updateProduct,
} from "./controller/product.js";
const router = Router();
router.post("/product", addProduct);
router.get("/product", allProducts);
router.get("/product/:id",getProductById);
router.get("/products/search/:id", searchProductOfUser);
router.get("/products/:id", getById);
router.delete("/product/:id", deleteProduct);
router.put("/product/:id", updateProduct);

export default router;
