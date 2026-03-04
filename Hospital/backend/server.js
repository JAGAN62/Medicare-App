import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import {clerkMiddleware} from "@clerk/express"
import { connectDB } from './config/db.js';
import doctorRouter from './routes/doctorRouter.js';
import serviceRouter from './routes/serviceRouter.js';
import appointmentRouter from './routes/appointmentRouter.js';
import serviceAppointmentRouter from './routes/serviceAppointmentRouter.js';

const app = express();
const PORT = process.env.PORT || 4000;

const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    // ✅ Add your Vercel URLs after deploying
    "medicare-p6g63628f-mamanduru-jagans-projects.vercel.app",
    "medicare-admin-otp5yo0af-mamanduru-jagans-projects.vercel.app",
]

app.use(cors({
    origin: function(origin, callback) {
        // ✅ Allow no-origin requests (Render health checks, Postman)
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json({ limit: "20mb" }));
app.use(clerkMiddleware());
app.use(express.urlencoded({ limit: "20mb", extended: true }));

app.use('/api/doctors', doctorRouter);
app.use("/api/services", serviceRouter);
app.use("/api/appointments", appointmentRouter);
app.use("/api/service-appointments", serviceAppointmentRouter);

connectDB();

// ✅ Health check route for Render
app.get('/', (req, res) => {
    res.status(200).send('Medicare API is running!');
});

// ✅ Listen on 0.0.0.0 — required for Render
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});