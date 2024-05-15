import GoogleStrategy from 'passport-google-oauth20';
import passport from "passport";
const GOOGLE_CLIENT_ID =
"648191729725-r24qp48h1h3ojuqoh8786g88uunn4n4r.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET = "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";
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      // passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, Done) {
      // const UserCreated = await User.create({
      //   full_name: profile.displayName,

      // });
      // UserCreated.save();
      console.log(profile);
      Done(null, profile);
    }
  )
);
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});
