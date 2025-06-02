import { Router } from "express";
import { createRecordHandler, getAllRecordsHandler, getRecordsByCategoryHandler, getRecordsByDistrictHandler, getUserWiseRecordsHandler, updateRecordHandler } from "../controllers/record.controller";
import isAuthenticated from "../middlewares/isAuthenticated.middleware";
import isAdmin from "../middlewares/isAdmin.middleware";

const router = Router();

router.post("/create", isAuthenticated, createRecordHandler);
router.get("/all", [isAuthenticated, isAdmin], getAllRecordsHandler);
router.get("/", isAuthenticated, getUserWiseRecordsHandler);
router.get("/:district", isAuthenticated, getRecordsByDistrictHandler);
router.get("/cat/:category", isAuthenticated, getRecordsByCategoryHandler);
router.patch("/update/:id", isAuthenticated, updateRecordHandler );

export default router;