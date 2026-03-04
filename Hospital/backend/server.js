import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import {clerkMiddleware} from "@clerk/express"
import { connectDB } from './config/db.js';
import doctorRouter from './routes/doctorRouter.js';
import serviceRouter from './routes/serviceRouter.js';
import appointmentRouter from './routes/appointmentRouter.js';
import serviceAppointmentRouter from './routes/serviceAppointmentRouter.js';
const app = express()
const PORT = process.env.PORT || 4000;
console.log(process.env.CLOUDINARY_API_SECRET);

const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",

]

app.use(cors({
    origin:function(origin,callback){
        if(!origin)return callback(null,true);
        if(allowedOrigins.includes(origin)){
            return callback(null,true)
        }
        return callback(new Error("not allowed by cors:"))
    },
    credentials:true,
    methods : ["GET","POST","PUT","DELETE",'OPTIONS'],
    allowedHeaders:["Content-Type","Authorization"]
}))
app.use(express.json({limit : "20mb"}))
app.use(clerkMiddleware())
app.use(express.urlencoded({limit : "20mb",extended:true}))

app.use('/api/doctors',doctorRouter)
app.use("/api/services",serviceRouter)
app.use("/api/appointments",appointmentRouter)
app.use("/api/service-appointments",serviceAppointmentRouter)
connectDB()

app.get('/',(req,res) => {
    res.send('hello jagan!')
})
app.listen(PORT,() => {
console.log(`server is running on http://localhost:${PORT}`)
})
    
