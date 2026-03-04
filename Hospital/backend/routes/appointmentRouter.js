import express from "express";
import {clerkMiddleware,requireAuth} from "@clerk/express";
import {cancelAppointment, confirmPayment, createAppointment, getAppointmentByPatient, getAppointments, getAppointmentsByDoctor, getRegisterdUserCount, getStats, updateAppointment} from "../controllers/appointmentController.js";

const appointmentRouter = express.Router();

appointmentRouter.get("/",getAppointments);
appointmentRouter.get("/confirm",confirmPayment)

// appointmentRouter.get("/confirm", clerkMiddleware(), requireAuth(), confirmPayment);

appointmentRouter.get("/stats/summary",getStats)

appointmentRouter.post('/',clerkMiddleware(),requireAuth(),createAppointment);
appointmentRouter.get('/me',clerkMiddleware(),requireAuth(),getAppointmentByPatient);

appointmentRouter.get("/doctor/:doctorId",getAppointmentsByDoctor);

appointmentRouter.get("/:id/cancel",cancelAppointment)
appointmentRouter.get("/patients/count",getRegisterdUserCount)
appointmentRouter.put('/:id',updateAppointment)

export default appointmentRouter;