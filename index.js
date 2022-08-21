const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const { register, login } = require("./routes/auth");

const authRouter = express.Router();


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



app.listen(process.env.PORT || 5000, ()=>{
    console.log("Backend server is running at port 5000");
})