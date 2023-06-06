// const cookieParser = require("cookie-parser");
// const csrf = require("csurf");
// const bodyParser = require("body-parser");
// const express = require("express");
// const admin = require("firebase-admin");
// const path = require('path');

// const serviceAccount = require("./codinglab-web-firebase-adminsdk-u7js2-94cf764dea.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://codinglab-web-default-rtdb.firebaseio.com"
// });

// const csrfMiddleware = csrf({ cookie: true });

// const PORT = process.env.PORT || 3000;
// const app = express();

// // app.use(cors())

// app.use(express.static("public"));
// app.use(bodyParser.json());
// app.use(cookieParser());


// app.get("/videos", function (req, res) {
//   const sessionCookie = req.cookies.session || "";
  
  
//   admin
//     .auth()
//     .verifySessionCookie(sessionCookie, true /** checkRevoked */)
//     .then((userData) => {
//       console.log("Logged in:", userData.email)
//       res.sendFile(path.join(__dirname+"/public/videos.html"));
//     })
//     .catch((error) => {
//       res.redirect("/login");
//     });
// });

// app.post("/sessionLogin", (req, res) => {
//   const idToken = req.body.idToken.toString();

//   const expiresIn = 60 * 60 * 24 * 5 * 1000;

//   admin
//     .auth()
//     .createSessionCookie(idToken, { expiresIn })
//     .then(
//       (sessionCookie) => {
//         const options = { maxAge: expiresIn, httpOnly: true };
//         res.cookie("session", sessionCookie, options);
//         res.end(JSON.stringify({ status: "success" }));
//       },
//       (error) => {
//         res.status(401).send("UNAUTHORIZED REQUEST!");
//       }
//     );
// });

// app.get("/sessionLogout", (req, res) => {
//   res.clearCookie("session");
//   res.redirect("/login");
// });


// app.get("/login", function (req, res) {
//   res.sendFile(path.join(__dirname+"/public/login.html"));
// });

// app.get("/about", function (req, res) {
//   console.log("its working")
//   res.sendFile(path.join(__dirname+"/public/about.html"));
// });

// app.get("/syllabus", function (req, res) {
//   res.sendFile(path.join(__dirname+"/public/syllabus.html"));
// });

// app.get("/contact", function (req, res) {
//   res.sendFile(path.join(__dirname+"/public/contact.html"));
// });

// app.get("/gallery", function (req, res) {
//   res.sendFile(path.join(__dirname+"/public/gallery.html"));
// });

// app.get("/signup", function (req, res) {
//   res.sendFile(path.join(__dirname+"/public/signup.html"));
// });


// app.get("/", function (req, res) {
//   res.sendFile(path.join(__dirname+"/public/home.html"));
// });

// app.get('*', function(req, res) {
//   res.redirect('/');
// });

// app.listen(PORT, () => {
//   console.log(`Listening on http://localhost:${PORT}`);
// });





const cookieParser = require("cookie-parser");
const csrf = require("csurf");
const bodyParser = require("body-parser");
const express = require("express");
const admin = require("firebase-admin");
const path = require('path');

const serviceAccount = require("./learnfinance-9aec7-firebase-adminsdk-so995-337b2cb4c6.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://learnfinance-9aec7-default-rtdb.asia-southeast1.firebasedatabase.app"
});

const csrfMiddleware = csrf({ cookie: true });

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(cookieParser());

// Set the public directory
app.set('public', path.join(__dirname, 'public'));
app.set('view engine', 'html');

app.get("/videos", function (req, res) {
  const sessionCookie = req.cookies.session || "";

  admin
    .auth()
    .verifySessionCookie(sessionCookie, true /** checkRevoked */)
    .then((userData) => {
      console.log("Logged in:", userData.email);
      res.sendFile(path.join(__dirname, "views", "videos.html"));
    })
    .catch((error) => {
      res.redirect("/login");
    });
});

app.post("/sessionLogin", (req, res) => {
  const idToken = req.body.idToken.toString();
  const expiresIn = 60 * 60 * 24 * 1  * 1000;

  admin
    .auth()
    .createSessionCookie(idToken, { expiresIn })
    .then(
      (sessionCookie) => {
        const options = { maxAge: expiresIn, httpOnly: true };
        res.cookie("session", sessionCookie, options);
        res.end(JSON.stringify({ status: "success" }));
      },
      (error) => {
        res.status(401).send("UNAUTHORIZED REQUEST!");
      }
    );
});

//clear cookie
app.get("/clearSession", function (req, res) {
  res.clearCookie("session");
  res.sendStatus(200);
});


app.get("/sessionLogout", (req, res) => {
  res.clearCookie("session");
  res.redirect("/");
});

app.get("/login", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.get("/about", function (req, res) {
  console.log("its working");
  res.sendFile(path.join(__dirname, "public", "about.html"));
});

app.get("/syllabus", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "syllabus.html"));
});

app.get("/contact", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "contact.html"));
});

app.get("/gallery", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "gallery.html"));
});

app.get("/signup", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "signup.html"));
});

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get('*', function(req, res) {
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
