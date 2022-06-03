import { Router } from "express";
import {
  insertProduct,
  updateProduct,
  selectProducts,
  selectProduct,
  deleteProduct,
} from "./controller/Product.js";

const router = Router();

router.get("/all/products", selectProducts);
router.get("/select/product/:id", selectProduct);
router.post("/create/product", insertProduct);
router.put("/edit/product/", updateProduct);
router.delete("/delete/product", deleteProduct);

export default router;
