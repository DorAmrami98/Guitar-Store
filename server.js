const express = require("express");
const session = require("express-session");
const cookieSession = require("cookie-session");
const flash = require("connect-flash");
const nunjucks = require("nunjucks");
const sequelize = require("./database.js");

// models
const User = require("./models/user");
const Guitar = require("./models/guitar");
const Order = require("./models/order");


const PORT = process.env.PORT || 8080;
const app = express();
// I used nunjucks as template engine
nunjucks.configure("views", {
    express: app,
    autoescape: true
});

app.set("view engine", "html");
app.use(express.urlencoded({extended: false}));
app.use(express.json());
// serve static files (css/jss/etc...)
app.use("/assets", express.static(__dirname + "/assets"));
// session & cookie works together
app.use(cookieSession({
  name: "session",
  keys: ["ImwXVBKxxWuKAPs"]
}));
app.use(session({
  secret: "ArtFDCUt18PIy9K",
  resave: false,
  saveUninitialized: false
}));
app.use(flash());

app.use((req, res, next) => {
  app.locals.user = req.session.user;
  app.locals.flash = req.flash();
  next();
});

app.get("/signup", (req, res) => {
  let signup_msg = req.flash("signup_msg");
  res.render("signup.html", {signup_msg});
});

app.post("/signup", (req, res) => {
  const { full_name, email } = req.body;
  // if any user found with this email then redirect to singup page with a warning message
  User.findOne({where: {email}}).then((user) => {
    if(user){
      req.flash("signup_msg", "user already exist with this email!");
      res.redirect("/signup");
    }else{
    // if no user found then create a new user
      User.create({full_name, email}).then(() => {
        req.flash("login_msg", "your account has been created successfully, please login to continue...");
        res.redirect("/login");
      });
    }
  });
});

app.get("/login", (req, res) => {
  let login_msg = req.flash("login_msg");
  res.render("login.html", {login_msg});
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  // if no user found with this email then redirect to login page
  User.findOne({where: {email}}).then((user) => {
    if(!user){
      req.flash("login_msg", "user isn't exist with this email!");
      res.redirect("/login");
    }else{
    // if a user found with this email then redirect to (/home) and start a session with user id
      req.session.user = user.id;
      res.redirect("/");
    }
  });
});

app.get("/logout", (req, res) => {
  // destroy all sessions
  req.session.destroy;
  // clear cookies
  res.clearCookie("session");
  res.clearCookie("session.sig");
  res.redirect("/");
});

app.get("/", (req, res) => {
  res.render("home.html");
});

app.get("/store", async (req, res) => {
  // fetch all guitar data from guitars table then send it to template for render in store
  let data = await Guitar.findAll({});
  res.render("store.html", {data});
});

app.get("/item-view/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const guitar_data = await Guitar.findByPk(id);
    // if there is no guitar found with the id then redirect to home
    if(!guitar_data){
      console.log(`Guitar with id ${id} not found!`);
      res.redirect("/");
    }
    // if guitar id match with any row in the guitar table then render item.html template and pass the data
    res.render("item.html", {guitar_data});
  } catch(error){
    console.error(error.message);
    res.redirect("/");
  }
});

app.post("/purchase", (req, res) => {
  // getting user id & guitar id from req.body
  const {user, guitar} = req.body;
  if(user){
    // if user id not found that means... user wasn't logged when he trying to make purchase
    // if user id was found then create a new row in order table with user & guitar id
    Order.create({UserId: user, GuitarId: guitar}).then(() => {
      console.log("a new order has added into database");
      // 0 means success
      res.send("0");
    });
  }else{
      // 1 means success
    res.send("1");
  }
});


// syncing database.. if models got any changes then it will also update in the database
sequelize.sync().then(() => {
  console.log("database syncing.....");
}).catch((error) => {
  console.log(error);
});
try{
  // connecting with database
  sequelize.authenticate();
  console.log("database connection has been established successfully");
}catch(error){
  console.error("unable to connect database:", error);
}
// make the server run
app.listen(PORT, () => {
  console.log(`server is listening at http://localhost:${PORT}`);
});