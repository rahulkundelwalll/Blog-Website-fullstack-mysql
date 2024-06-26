import express from "express";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import PostRoutes from "./routes/posts.js";
import cookieParser from 'cookie-parser';
import multer from "multer";
import cors from 'cors';
import 'dotenv/config';

const app = express()
app.use(express.json())
app.use(cookieParser());
app.use(cors({
	credentials: true
}));
app.use("/api/auth",authRoutes)
app.use("/api/users",userRoutes)
app.use("/api/posts",PostRoutes)


app.use(cookieParser());
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), function (req, res) {
  const file = req.file;
  res.status(200).json(file.filename);
});

app.get("/test",(req,res)=>{
    res.json("it works")
})


app.listen(process.env.PORT,()=>{
  console.log(`Server is running on ${process.env.PORT}`)
})