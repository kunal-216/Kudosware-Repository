import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./config/db.js";
import userRouter from "./routes/userRoutes.js";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
const corsOptions = {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}
app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user",userRouter);
app.use("/images",express.static('image_uploads'))
app.use("/resume",express.static('resume_uploads'))

app.use("/",(req,res)=>{
    res.send("Hello from server");
})

app.listen(PORT,()=>{
    console.log(`Server is running at http://localhost:${PORT}`);
})