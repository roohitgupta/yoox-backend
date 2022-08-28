const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const {
  updateUser,
  deleteUser,
  getUser,
  getAllUser,
} = require("./routes/user");
const { register, login } = require("./routes/auth");
const {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getAllProduct
} = require("./routes/product");
const {
  createCart,
  updateCart,
  deleteCart,
  getCart,
  getAllCart
} = require("./routes/cart");
const {
  createOrder,
  updateOrder,
  deleteOrder,
  getOrder,
  getAllOrder
} = require("./routes/order");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./routes/verifyToken");


const authRouter = express.Router();
const userRouter = express.Router();
const productRouter = express.Router();
const cartRouter = express.Router();
const orderRouter = express.Router();

app.use(cors());
dotenv.config();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("mongoDB connection Successfull!!"))
  .catch((error) => console.log(error));

app.use("/api/auth", authRouter);
authRouter.post("/register", register);
authRouter.post("/login", login);

app.use("/api/users", userRouter);
userRouter.put("/:id", verifyTokenAndAuthorization, updateUser);
userRouter.delete("/:id", verifyTokenAndAuthorization, deleteUser);
userRouter.get("/:id", verifyTokenAndAdmin, getUser);
userRouter.get("/", verifyTokenAndAdmin, getAllUser);

app.use("/api/product", productRouter);
productRouter.post("/", verifyTokenAndAdmin, createProduct);
productRouter.put("/:id", verifyTokenAndAdmin, updateProduct);
productRouter.delete("/:id", verifyTokenAndAdmin, deleteProduct);
productRouter.get("/find/:id", getProduct);
productRouter.get("/", getAllProduct);

app.use("/api/cart", cartRouter);
cartRouter.post("/", verifyToken, createCart);
cartRouter.put("/:id", verifyTokenAndAuthorization, updateCart);
cartRouter.delete("/:id", verifyTokenAndAuthorization, deleteCart);
cartRouter.get("/find/:userId", verifyTokenAndAuthorization, getCart);
cartRouter.get("/", verifyTokenAndAdmin, getAllCart);

app.use("/api/order", orderRouter);
orderRouter.post("/", verifyToken, createOrder);
orderRouter.put("/:id", verifyTokenAndAdmin, updateOrder);
orderRouter.delete("/:id", verifyTokenAndAdmin, deleteOrder);
orderRouter.get("/find/:userId", verifyTokenAndAuthorization, getOrder);
orderRouter.get("/", verifyTokenAndAdmin, getAllOrder);




app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running at port 5000");
});
