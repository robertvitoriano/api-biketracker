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

googleOAuthRouter.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

googleOAuthRouter.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    res.redirect(process.env.CLIENT_URL);
  }
);

export default googleOAuthRouter;
