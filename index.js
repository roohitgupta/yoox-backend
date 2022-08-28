const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
const { updateUser, deleteUser, getUser, getAllUser } = require("./routes/user");
const { register, login } = require("./routes/auth");
const { createProduct } = require("./routes/product");
const cors = require("cors");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./routes/verifyToken");

const authRouter = express.Router();
const userRouter = express.Router();
const productRouter = express.Router();

app.use(cors());
dotenv.config();
app.use(express.json());


mongoose
    .connect(process.env.MONGO_URL)
    .then(()=>console.log("mongoDB connection Successfull!!"))
    .catch((error)=>console.log(error)
);

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



app.listen(process.env.PORT || 5000, ()=>{
    console.log("Backend server is running at port 5000");
});