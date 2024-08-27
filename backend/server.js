import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./config/db.js";
import userRouter from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
const corsOptions = {
    origin: process.env.FRONTEND_URI,
    credentials: true,
}
app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});


app.use("/api/user",userRouter);
app.use("/images",express.static('image_uploads'))
app.use("/resume",express.static('resume_uploads'))

app.use("/",(req,res)=>{
    res.send("Hello from server");
})

app.listen(PORT,()=>{
    console.log(`Server is running at http://localhost:${PORT}`);
})