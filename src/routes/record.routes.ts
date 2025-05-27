import { Router } from "express";
import { createRecordHandler } from "../controllers/record.controller";
import isAuthenticated from "../middlewares/isAuthenticated.middleware";

const router = Router();

router.post("/create", isAuthenticated, createRecordHandler)

export default router;