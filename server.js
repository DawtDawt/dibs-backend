const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const cookieParser = require("cookie-parser");
const owner = require("./query/owner");
const customer = require("./query/customer");
const auth = require("./query/auth");
const init = require("./boot");
require("dotenv").config();

/* Set to true if fake data is needed */
let populate = false;

/* Init Mongoose */

const mongooseOptions = {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
    // [TW] unique compound index not working, need to debug
    autoIndex: true,
    keepAlive: true,
};
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || `mongodb://localhost:27017/dibs`, mongooseOptions);

/* Test Mongoose Connection */

const db = mongoose.connection;
db.on("error", console.error.bind(console, "/server.mongoose: error connecting to db"));
db.once("open", function () {
    console.log("/server.mongoose: db connected");
});

global.mongoose = mongoose;

/* Init Express */

const app = express();

const allowCrossDomain = function (req, res, next) {
    if (process.env.NODE_ENV && process.env.NODE_ENV.toLowerCase() !== "production") {
        res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    }
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Origin", "https://dibs-vancouver.herokuapp.com");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    next();
};
app.use(allowCrossDomain);

app.use(express.static(path.join(__dirname, "../dibs-frontend/build")));
app.use(express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(bodyParser.json());
app.use(cookieParser());


/* Init Fake Data */

try {
    if (populate) {
        init.init();
    }
} catch (error) {
    console.error(error);
}

/* Endpoints */

/* Owner */

app.get("/api/owner/store", owner.getStore);

app.post("/api/owner/store", owner.registerStore);

app.put("/api/owner/store", owner.updateStore);

app.delete("/api/owner/store", owner.deleteStore);

app.get("/api/owner/barber", owner.getBarber);

app.post("/api/owner/barber", owner.registerBarber);

app.put("/api/owner/store", owner.updateBarber);

app.delete("/api/owner/barber", owner.deleteBarber);

/* Customer */

app.get("/api/customer/store/:store_id", customer.getStore);

app.get("/api/customer/store/search/:count", customer.searchStores);

app.get("/api/customer/neighbourhoods/", customer.getNeighbourhoods);

app.get("/api/customer/review/:user_id", customer.getReviews);

app.post("/api/customer/review", customer.registerReview);

app.put("/api/customer/review", customer.updateReview);

app.delete("/api/customer/review/:review_id", customer.deleteReview);

app.get("/api/customer/availability", customer.getAvailability);

app.get("/api/customer/reservation/:user_id", customer.getReservations);

app.post("/api/customer/reservation", customer.registerReservation);

app.delete("/api/customer/reservation/:reservation_id", customer.deleteReservation);

/* Authentication */
app.post("/api/auth/signin/", auth.signIn);

app.get("/api/auth/signout/", auth.signOut);

app.post("/api/auth/signup/", auth.signUp);

// Anything that doesn't match the above, send back the index.html file
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/../dibs-frontend/build/index.html"));
});

/* Thread */

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("/server/app running on port %d", PORT);
});
