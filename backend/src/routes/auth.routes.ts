import { Router } from "express";
// * 輸出所有方法
import * as authController from "../controllers/auth.controller";
import { validateDto } from '../middlewares/validate.middleware';
import { RegisterDtoSchema } from '../dto/register.dto';
import { LoginDtoSchema } from "../dto/login.dto";

const router = Router();

// 註冊
router.post('/register', validateDto(RegisterDtoSchema), authController.register);
router.post("/login", validateDto(LoginDtoSchema), authController.login);

export default router;
