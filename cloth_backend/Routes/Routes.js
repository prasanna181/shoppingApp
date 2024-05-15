import express from "express";
import passport from "passport";
import "./passport.js";
// const bodyParser=require('body-parser');
import {
  Menvalues,
  AllUniqueData,
  ProductLike,
  IncreaseViewProduct,
  Suggestion,
  Signup,
  Login,
  addWishlist,
  removeWishlist,
  AddToCart,
  CheckUserAccessToken,
  Saveforlater,
  getCartData,
  removeSaveData,
  removefromcart,
  addcontactinfo,
  MenMostLikeProduct,
  getwishlist,
  changeuserdata,
  getorder,
  checkOUT,
  getTshirtData,
  adminAddItem,
  customTshirtPay,
  adminUpdateItem,
  adminDeleteItem,
} from "../user-controller/user-controller.js";
// import { authenticateToken } from "../user-controller/jwt-controller.js";
const router = express.Router();

// const urlEncodedBodyParser=bodyParser.urlencoded({extended:false});
const CLIENT_URL = "http://localhost:3000/";
router.get("/Men", Menvalues);
router.get("/getAllUniqueData", AllUniqueData);
router.post("/productLike", ProductLike);
router.post("/increaseViewProduct", IncreaseViewProduct);
router.post("/Suggest", Suggestion);
router.post("/signup", Signup);
router.post("/login", Login);
router.post("/addtoCart", AddToCart);
router.post("/checktoken", CheckUserAccessToken);
router.post("/saveforlater", Saveforlater);
router.post("/getAllCartData", getCartData);
router.post("/removeFromSaveLater", removeSaveData);
router.post("/removefromcart", removefromcart);
router.get("/mostLikeMensProduct", MenMostLikeProduct);
// router.get(
//   "/google/",
//   passport.authenticate("google", { scope: ["gender", "profile"] })
// );
// router.get(
//   "/google/callback",
//   passport.authenticate("google", {
//     successRedirect: CLIENT_URL,
//     failureRedirect: "/login/failed",
//   })
// );

router.post("/userAddingwishlist", addWishlist);
router.post("/userRemovewishlist", removeWishlist);

router.post("/Payment", addcontactinfo);

router.post("/wishlist", getwishlist);
router.post("/profile", changeuserdata);
router.post("/order", getorder);
router.post("/create-checkout-session", checkOUT);
router.get("/gettshirtdata", getTshirtData);
router.post("/addclothitem", adminAddItem);
router.post("/customisepayment", customTshirtPay);
router.post("/updateclothitem", adminUpdateItem);
router.post("/deleteclothitem", adminDeleteItem);
export default router;
