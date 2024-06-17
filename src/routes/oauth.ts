import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import { Router } from "express";
import { loginOAuthUseCase } from "../domain/user/useCases/LoginOAuthUseCase";
import { loginAndroidOAuthController } from "../domain/user/useCases/LoginAndroidOAuthUseCase";

const oauthRouter = Router();

passport.use(
  new Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ["profile", "email"],
    },
    async function (accessToken, refreshToken, profile, cb) {
      const loginResponse = await loginOAuthUseCase.execute(profile);
      cb(null, loginResponse);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

oauthRouter.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

oauthRouter.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    //@ts-ignore
    const { token } = res.req.user;

    res.redirect(`${process.env.CLIENT_URL}?token=${token}`);
  }
);
oauthRouter.post("/auth/google-android", (request, response) =>
  loginAndroidOAuthController.handle(request, response)
);
export default oauthRouter;
