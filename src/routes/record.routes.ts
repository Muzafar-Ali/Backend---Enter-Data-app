import { Router } from "express";
import { createRecordHandler, getAllRecordsHandler, getRecordsByDistrictHandler, getUserWiseRecordsHandler } from "../controllers/record.controller";
import isAuthenticated from "../middlewares/isAuthenticated.middleware";
import isAdmin from "../middlewares/isAdmin.middleware";

const router = Router();

router.post("/create", isAuthenticated, createRecordHandler);
router.get("/all", [isAuthenticated, isAdmin], getAllRecordsHandler);
router.get("/", isAuthenticated, getUserWiseRecordsHandler);
router.get("/:district", isAuthenticated, getRecordsByDistrictHandler);

export default router;