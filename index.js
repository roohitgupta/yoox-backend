const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
const { updateUser, deleteUser, getUser, getAllUser } = require("./routes/user");
const { register, login } = require("./routes/auth");
const cors = require("cors");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./routes/verifyToken");

const authRouter = express.Router();

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

app.use("/api/users", userRoute);
userRouter.put("/:id", verifyTokenAndAuthorization, updateUser);
userRouter.put("/:id", verifyTokenAndAuthorization, deleteUser);
userRouter.put("/:id", verifyTokenAndAdmin, getUser);
userRouter.put("/", verifyTokenAndAdmin, getAllUser);



app.listen(process.env.PORT || 5000, ()=>{
    console.log("Backend server is running at port 5000");
});