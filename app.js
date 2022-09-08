/* 
Name : Mostafa Ahmed Mohamed Salah Eldin
Group : C38 Saturday 10Am Node.js
Assignment : 4 
*/
import express from "express";
import userRouter from "./modules/user/user.router.js";
import productRouter from "./modules/product/product.router.js";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());
app.use(userRouter);
app.use(productRouter);
app.get("*", (req, res, next) => {
  res.json({ message: "404 Not Found" });
});
app.listen(3000, () => {
  console.log("running........");
});
