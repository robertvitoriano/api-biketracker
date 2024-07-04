import { Router, Response, Request } from "express";
import { loginController } from "./../domain/user/useCases/LoginUseCase";
import { createUserController } from "./../domain/user/useCases/CreateUserUseCase";
import { recoverPasswordController } from "./../domain/user/useCases/RecoverPassworsUseCase";
import { beginPasswordRecoveryController } from "../domain/user/useCases/BeginPasswordRecoveryUseCase";
import { getProfileController } from "../domain/user/useCases/GetProfile";
import userController from "./../controllers/user";
import auth from "../middleware/auth";
import { updateUserController } from "../domain/user/useCases/UpdateUserUseCase";

const userRouter = Router();
//Sign LOG IN
userRouter.post("/users", (request: Request, response: Response) =>
  createUserController.handle(request, response)
);
userRouter.post("/users/login", (request: Request, response: Response) =>
  loginController.handle(request, response)
);
userRouter.get("/users/me", auth, (request, response) =>
  getProfileController.handle(request, response)
);
userRouter.get("/users", userController.index);
userRouter.post("/users/logout", userController.logout);
userRouter.patch("/users", (request: Request, response: Response) =>
  updateUserController.handle(request, response)
);

userRouter.patch(
  "/users/begin-password-recovery",
  (request: Request, response: Response) =>
    beginPasswordRecoveryController.handle(request, response)
);

userRouter.patch(
  "/users/recover-password",
  (request: Request, response: Response) =>
    recoverPasswordController.handle(request, response)
);

export default userRouter;
