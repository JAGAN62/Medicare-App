import express from 'express';
import { clerkMiddleware,requireAuth } from '@clerk/express';

import { cancelServiceAppointment, confirmSevicePayment, createServiceAppointment, getServiceAppointment, getServiceAppointmentById, getServiceAppointmentByPatient, getServiceAppointmentStats, updateServiceAppointment } from '../controllers/serviceAppointmentController.js';

const serviceAppointmentRouter = express.Router()
serviceAppointmentRouter.get('/',getServiceAppointment);
serviceAppointmentRouter.get('/confirm',confirmSevicePayment);
serviceAppointmentRouter.get('/stats/summary',getServiceAppointmentStats);
serviceAppointmentRouter.post('/',clerkMiddleware(),requireAuth(),createServiceAppointment);
serviceAppointmentRouter.get('/me',clerkMiddleware(),requireAuth(),getServiceAppointmentByPatient)
serviceAppointmentRouter.get("/:id",getServiceAppointmentById)
serviceAppointmentRouter.put("/:id",updateServiceAppointment)
serviceAppointmentRouter.post('/:id/cancel',cancelServiceAppointment)

export default serviceAppointmentRouter;
