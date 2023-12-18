import express from "express";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import PostRoutes from "./routes/posts.js";
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express()
app.use(express.json())
app.use(cookieParser());
app.use(cors({
	origin: 'http://localhost:5173',
	credentials: true
}));
app.use("/api/auth",authRoutes)
app.use("/api/users",userRoutes)
app.use("/api/posts",PostRoutes)

app.get("/test",(req,res)=>{
    res.json("it works")
})


app.listen(8800,()=>{
    console.log("connected");
})