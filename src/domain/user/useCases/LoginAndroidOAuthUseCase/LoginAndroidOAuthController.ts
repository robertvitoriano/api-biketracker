import { Response, Request } from "express";
import { LoginAndroidOAuthUseCase } from "./LoginAndroidOAuthUseCase";

class LoginAndroidOAuthController {
  constructor(private loginAndroidOAuthUseCase: LoginAndroidOAuthUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { googleToken } = request.body;
    try {
      const { user, token } = await this.loginAndroidOAuthUseCase.execute({
        googleToken,
      });
      return response
        .status(201)
        .json({ message: "Successfully logged in", data: { user, token } });
    } catch (error) {
      response.status(500).send({
        errorMessage: error.message,
      });
    }
  }
}

export { LoginAndroidOAuthController };
