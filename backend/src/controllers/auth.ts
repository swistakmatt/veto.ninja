import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import User, { IUser } from "../models/User";
// import { ObjectId } from "mongodb";

declare global {
  namespace Express {
    export interface User extends IUser {}
  }
}

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      let user;
      try {
        user = await User.findOne({ email: email });
      } catch (err) {
        return done(err);
      }

      if (!user) {
        return done(null, false, { message: "Incorrect email." });
      }

      let valid;
      try {
        valid = await user.validatePassword(password);
      } catch (err) {
        return done(err);
      }

      if (!valid) {
        return done(null, false, { message: "Incorrect password." });
      }

      return done(null, user);
    }
  )
);

passport.serializeUser(
  (user: IUser, done: (err: Error | null, id?: unknown) => void) => {
    done(null, user._id);
  }
);

passport.deserializeUser(
  async (id: string, done: (err: Error | null, user?: any) => void) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err: any) {
      done(err);
    }
  }
);

export default passport;
