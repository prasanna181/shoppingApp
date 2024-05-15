import User from "../model/user.js";
import signupLogin from "../model/signupLogin.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Token from "../model/token.js";
import dotenv from "dotenv";
import otpGenerator from "otp-generator";
import nodemailer from "nodemailer";
import user from "../model/token.js";
import payment from "../model/payment.js";
import stripe from "stripe";
const stripeVal = stripe(process.env.STRIPE_PRIVATE_KEY);
dotenv.config();
/// get card details
export const Menvalues = async (req, res) => {
  try {
    const data = await User.find();
    // console.log(data);
    return res.status(200).json({ success: true, data: data });
  } catch (error) {
    // console.log(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

//// get brands and categories details
export const AllUniqueData = async (req, res) => {
  var ans = {};
  try {
    const BrandsData = await User.aggregate([
      { $group: { _id: "$Brands", counter: { $sum: 1 } } },
    ]);
    const Categories = await User.aggregate([
      { $group: { _id: ["$CategoryType", "$Category"], counter: { $sum: 1 } } },
    ]);
    ans = {
      Brands: BrandsData,
      Categories: Categories,
    };
    // console.log(ans);
    return res.status(200).json({ success: true, data: ans });
  } catch (error) {
    return res.status(500).json({ success: false, error: error });
  }
};

export const ProductLike = async (req, res) => {
  const str = JSON.stringify(req.body);
  const idval = str.split(":")[1];
  // console.log(idval);
  const id = idval.substring(0, idval.length - 3);
  try {
    const userData = await User.find({ _id: Object(id) });
    var oldValue = userData[0].Likes;
    //  console.log(oldValue,userData)
    const r = await User.findByIdAndUpdate(id, { Likes: oldValue + 1 });
    // console.log(r);
    return res.status(200).json({ success: true, Response: r });
  } catch (error) {
    return res.status(500).json({ success: false, error: error });
  }
};
export const IncreaseViewProduct = async (req, res) => {
  const str = JSON.stringify(req.body);
  // console.log(str);
  const idval = str.split(":")[1];
  // console.log(idval);
  const id = idval.substring(0, idval.length - 3);
  try {
    const userData = await User.find({ _id: id });
    var oldValue = userData[0].Views;
    //  console.log(oldValue,userData)
    const r = await User.findByIdAndUpdate(id, { Views: oldValue + 1 });
    return res.status(200).json({ success: true, Response: r });
  } catch (error) {
    return res.status(500).json({ success: false, error: error });
  }
};

export const Suggestion = async (req, res) => {
  const str = JSON.stringify(req.body);
  const idval = str.split(":")[1];
  // console.log(idval);
  const id = idval.substring(0, idval.length - 3);
  try {
    const UserData = await User.findById({ _id: id });

    const Categories = UserData.Category;
    // console.log(Categories)
    const data = await User.find({ Category: Categories })
      .sort({ Views: -1 })
      .limit(10);

    return res.json({ data: data });
  } catch (error) {
    return res.json({ error: error });
  }
};

export const MenMostLikeProduct = async (req, res) => {
  try {
    const data = await User.find().sort({ Likes: -1, Views: -1 }).limit(10);
    // console.log(data);
    return res.json({ status: 200, data: data });
  } catch (error) {
    return res.json({ status: 500, Message: "Internal Server Error" });
  }
};
export const sendMail = async (data, product) => {
  // console.log(product);

  var h = "";
  h = `
  <table>
  <thead>
  <tr>
 <th>Category</th>
 <th>Brands</th>
 <th>Price</th>
 <th>Discount</th>
 <th>Discounted_Price</th>
 </tr>
  </thead>
  <tbody>`;
  let totalAmount = 0;
  {
    product.forEach((ele) => {
      h += `<tr>`;
      h += `<td>${ele.Category}</td>`;
      h += `<td>${ele.Brands}</td>`;
      h += ` <td>${ele.Discount}</td>`;
      h += `  <td>${ele.Price}</td>`;
      h += ` <td>${ele.Discounted_Price}</td>`;
      totalAmount += ele.Discounted_Price;
      h += ` </tr>`;
    });
  }
  h += `
<tr>
<td colspan="5">Total Amount = ${totalAmount}</td>
</tr>  
</tbody>
</table>
`;

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "prasannaraghav18@gmail.com", // TODO: your gmail account
      pass: "wdlk xszk xhsw yhbr", // TODO: your gmail password
    },
  });
  //  console.log("step 1 cleaRED");

  // Step 2

  let mailOptions = {
    to: ["shakshamneekhra96@gmail.com", `${data.email}`], // TODO: email sender
    from: `${data.email}`, // TODO: email receiver
    subject: "ONLINE SHOPPING",
    html: `${h}`,
  };
  //  console.log("SECOND step cleared");

  // Step 3
  transporter.sendMail(mailOptions, async (err, data) => {
    if (err) {
      // console.log(err)
      return res.json({ err: err });
    }
    //  console.log("mail send to " );
    return;
  });
};

export const Signup = async (req, res) => {
  try {
    const hashpassword = await bcrypt.hash(req.body.password, 10);
    const userExist = await signupLogin.find({ email: req.body.email });
    if (userExist.length !== 0) {
      return res.json({ success: false, response: "Email Already Exist!" });
    }
    // console.log(req.body.mobileno);
    const mobileExist = await signupLogin.find({ mobileno: req.body.mobileno });
    if (mobileExist.length !== 0) {
      return res.json({
        success: false,
        response: "Mobile no. Already Exist!",
      });
    }

    const user = {
      name: req.body.name,
      email: req.body.email,
      mobileno: req.body.mobileno,
      password: hashpassword,
    };

    const newUser = new signupLogin(user); // validating from our schema
    await newUser.save(); //saving object into database
    // sendMail(req.body.email);
    return res.json({ success: true });
  } catch (error) {
    return res.json({ success: false, error: error });
  }
};
export const Login = async (req, res) => {
  try {
    let userData = await signupLogin.find({ email: req.body.email });
    const password = await req.body.password;
    if (userData.length === 0) {
      return res.json({ success: false, response: "Email Id Does not Exist" });
    }

    const match = await bcrypt.compare(password, userData[0].password);
    if (match) {
      const accesstoken = jwt.sign(
        userData[0].toJSON(),
        process.env.ACCESS_SECRET_KEY,
        { expiresIn: "15m" }
      );
      const refreshtoken = jwt.sign(
        userData[0].toJSON(),
        process.env.REFRESH_SECRET_KEY
      );
      const newToken = new Token({
        token: refreshtoken,
        email: req.body.email,
      });
      await newToken.save();
      return res.json({
        success: true,
        response: userData[0],
        accesstoken: accesstoken,
        refreshtoken: refreshtoken,
      });
    } else {
      return res.json({ success: false, response: "Password Incorrect" });
    }
  } catch (error) {
    // console.log(error);
    return res.json({ success: false, error: "Internal Server Error" });
  }
};

export const addWishlist = async (req, res) => {
  try {
    const userID = req.body.userid;
    const productID = req.body.productid;
    const userData = await signupLogin.findByIdAndUpdate(userID, {
      $push: { Wishlist: productID },
    });
    // const productData=await User.find({_id:productID});

    return res.json({ success: true, response: userData });
  } catch (error) {
    // console.log(error);
    return res.json({ success: false, error: error });
  }
};

export const removeWishlist = async (req, res) => {
  try {
    const userID = req.body.userid;
    const productID = req.body.productid;
    const userData = await signupLogin.find({ _id: userID });

    const res = await signupLogin.findByIdAndUpdate(userID, {
      $pull: { Wishlist: `${productID}` },
    });

    // signupLogin.update(
    //     { _id:userID },
    //     { $pull: { Wishlist: { $in:productID } } }
    // )
  } catch (error) {
    // console.log(error);
    return res.json({ success: false, error: error });
  }
};

export const AddToCart = async (req, res) => {
  try {
    const userID = req.body.userData;
    // console.log(req.body);
    const product = req.body.productData;
    const userData = await signupLogin.findByIdAndUpdate(userID, {
      $push: { addtocart: product },
    });
    return res.json({ success: true, response: "userData" });
  } catch (error) {
    // console.log(error);
    return res.json({ success: false, error: error });
  }
};

export const CheckUserAccessToken = async (req, res) => {
  const token = req.body.token;
  // const email=req.body.email;
  try {
    const exits = await Token.find({ token: `${token}` });

    if (exits.length !== 0) {
      const userEmail = exits[0].email;
      const user = await signupLogin.find({ email: userEmail });

      return res.json({
        success: true,
        userdata: user,
        response: "Access Granted!",
      });
    } else {
      return res.json({ success: false, response: "Invalid Token" });
    }
  } catch (error) {
    return res.json({ success: false, error: "Internal server Error" });
  }
};

export const Saveforlater = async (req, res) => {
  try {
    const userID = req.body.userData;

    const product = req.body.productData;
    const userData = await signupLogin.findByIdAndUpdate(userID, {
      $push: { saveForLater: product },
    });
    return res.json({ success: true, response: userData });
  } catch (error) {
    // console.log(error);
    return res.json({ success: false, error: error });
  }
};

export const getCartData = async (req, res) => {
  try {
    const userID = req.body.id;

    const userData = await signupLogin.findById({ _id: userID });

    const result = {
      saveForLater: userData.saveForLater,
      cart: userData.addtocart,
    };
    return res.json({ success: true, response: result });
  } catch (error) {
    // console.log(error);
    return res.json({ success: false, error: error });
  }
};

export const removeSaveData = async (req, res) => {
  try {
    const userID = req.body.userData;
    const removeId = req.body.productData;
    const res = await signupLogin.findByIdAndUpdate(userID, {
      $pull: { saveForLater: { _id: `${removeId}` } },
    });

    return res.json({ success: true, response: "SuccessFully Remove" });
  } catch (error) {
    // console.log(error);
    return res.json({ success: false, error: error });
  }
};

export const removefromcart = async (req, res) => {
  console.log();
  const userID = req.body.userData;
  const removeID = req.body.productData;
  // console.log(userID, removeID);
  try {
    const res = await signupLogin.findByIdAndUpdate(userID, {
      $pull: { addtocart: { _id: `${removeID}` } },
    });
    // console.log(res);
    return res.json({
      success: true,
      response: "Successfully removed from cart.",
    });
  } catch (error) {
    return res.json({ success: false, error: error });
  }
};

export const addcontactinfo = async (req, res) => {
  const complete = req.body;
  const data = complete.data;

  const product = complete.product;
  console.log("hugufydt", product);
  const products = [];
  const productIds = [];
  if (product) {
    product.forEach((ele) => {
      productIds.push(ele._id);
      let amount = ele.Price * (ele.Discount / 100);

      amount = Math.round(amount);
      const obj = {
        Category: ele.Category,
        Brands: ele.Brands,
        Discount: ele.Discount,
        Price: ele.Price,
        Discounted_Price: amount,
      };
      products.push(obj);
    });
  }
  console.log(products);
  //  string date=new Date();
  const newData = {
    name: data.name,
    email: data.email,
    address: "2123658465",
    number: data.mobileno,
    order: productIds,
  };

  try {
    const newUser = new payment(newData);
    await newUser.save();
    // sendMail(data, products);
    return res.json({ success: true, response: "contact info added..." });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, error: error });
  }
};

export const getwishlist = async (req, res) => {
  const productIds = req.body;
  // console.log(productIds)
  try {
    const productdetail = await User.find({ _id: productIds });
    // console.log(productdetail);
    return res.json({ success: true, data: productdetail });
  } catch (error) {
    return res.json({ success: false, error: error });
  }
};

export const changeuserdata = async (req, res) => {
  const userdata = req.body;
  // console.log(userdata);
  try {
    const data = await signupLogin.findByIdAndUpdate(userdata.id, {
      name: userdata.name,
      email: userdata.email,
      mobileno: userdata.mobileno,
    });

    return res.json({ success: true });
  } catch (error) {
    return res.json({ success: false, error: error });
  }
};

export const getorder = async (req, res) => {
  const edata = req.body.email;

  try {
    console.log(edata);
    const paydata = await payment.find({ email: edata });
    console.log(paydata);
    const orders = [];
    const temp = {};
    paydata.forEach((data) => {
      data.order.forEach((ele) => {
        orders.push(ele);
      });
      temp[data.createdAt] = data.order;
    });
    const products = await User.find({ _id: orders });
    const result = {
      data: products,
      date: temp,
    };
    return res.json({ success: true, data: result });
  } catch (error) {
    return res.json({ success: false, error: error });
  }
};

const storeItems = new Map([
  [1, { priceIncents: 10, name: "Learn React Today" }],
  [2, { priceIncents: 80, name: "Learn css today" }],
]);
const DiscountAmount = (original, discount) => {
  let amount = original * (discount / 100);
  amount = Math.round(amount);
  return original - amount;
};

export const checkOUT = async (req, res) => {
  console.log("..........inside payment");
  console.log(req.body);
  const product = req.body.product;

  try {
    // const a=5;

    const session = await stripeVal.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",

      line_items: product.map((item) => {
        return {
          price_data: {
            currency: "INR",
            product_data: {
              name: item.Category + item.Brands,
            },
            unit_amount: DiscountAmount(item.Price, item.Discount) * 100,
          },
          quantity: 1,
        };
      }),

      success_url: "http://localhost:3000/Success",
      cancel_url: "http://localhost:3000/cancel",

      // success_url: `${process.env.SERVER_URL}/Success`,
      // cancel_url: `${process.env.SERVER_URL}/cancel`,
    });
    return res.json({ success: true, url: session.url });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: e.message });
  }
};

export const getTshirtData = async (req, res) => {
  try {
    const products = await User.find({ Category: "T-Shirts" });
    // console.log(products);
    return res.json({ success: true, data: products });
  } catch (error) {
    return res.json({ success: false, error: error });
  }
};

export const customTshirtPay = async (req, res) => {
  console.log(req.body, "........inside customPay");
  const item = req.body.tshirt;
  try {
    // const a=5;

    const session = await stripeVal.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",

      line_items: [
        {
          price_data: {
            currency: "INR",
            product_data: {
              name: item.Category + item.Brands,
            },
            unit_amount:
              DiscountAmount(item.Price, item.Discount) * 100 +
              req.body.customCharge,
          },
          quantity: 1,
        },
      ],

      success_url: "http://localhost:3000/Success",
      cancel_url: "http://localhost:3000/cancel",

      // success_url: `${process.env.SERVER_URL}/Success`,
      // cancel_url: `${process.env.SERVER_URL}/cancel`,
    });
    return res.json({ success: true, url: session.url });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: e.message });
  }
};

export const adminAddItem = async (req, res) => {
  try {
    // const {
    //   Category,
    //   Brands,
    //   Price,
    //   Size,
    //   Discount,
    //   Color,
    //   CategoryType,
    //   Images,
    // } = req.body;
    // console.log(req.body);
    const newItem = new User(req.body); // validating from our schema
    await newItem.save(); //saving object into database
    // sendMail(req.body.email);

    return res.json({ success: true });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, error: error });
  }
};
export const adminUpdateItem = async (req, res) => {
  console.log(req.body, ".........from admin update");
  try {
    const r = await User.findByIdAndUpdate(req.body.pid, {
      Category: req.body.Category,
      Brands: req.body.Brands,
      Price: req.body.Price,
      Size: req.body.Size,
      Discount: req.body.Discount,
      Color: req.body.Color,
      CategoryType: req.body.CategoryType,
      Image: req.body.Image,
    });

    return res.json({ success: true, response: r });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, error: error });
  }
};

export const adminDeleteItem = async (req, res) => {
  console.log(req.body, ".........from admin delete");
  const id = req.body[0];
  console.log("id:", id);
  try {
    const r = await User.findByIdAndDelete(id);
    return res.json({ success: true, response: r });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, error: error });
  }
};
