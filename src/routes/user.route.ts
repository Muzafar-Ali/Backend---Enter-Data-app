import { Router } from "express";
import { registerUserHandler, userLoginHandler, userLogoutHandler } from "../controllers/user.controller";
import isAuthenticated from "../middlewares/isAuthenticated.middleware";
import isAdmin from "../middlewares/isAdmin.middleware";

const router = Router();

router.post('/create', [isAuthenticated, isAdmin], registerUserHandler);
router.post('/login', userLoginHandler)
router.post('/logout', userLogoutHandler)

export default router;