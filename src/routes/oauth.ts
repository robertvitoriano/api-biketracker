import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import { Router } from "express";
import { loginOAuthUseCase } from "../domain/user/useCases/LoginOAuthUseCase";

const googleOAuthRouter = Router();

passport.use(
  new Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, cb) {
      await loginOAuthUseCase.execute(profile);
    }
  )
);

googleOAuthRouter.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

googleOAuthRouter.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);

export default googleOAuthRouter;
