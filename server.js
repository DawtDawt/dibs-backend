const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
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
    if (process.env.NODE_ENV === "production") {
        res.header("Access-Control-Allow-Origin", process.env.origin);
    } else {
        res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    }
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    next();
};
app.use(allowCrossDomain);
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

app.get("/", (request, response) => {
    response.status(200).send("ok");
});

/* Owner */

app.get("/api/owner/store/:store_id", owner.getStoreById);

app.get("/api/owner/barber/:store_id/:barber_id", owner.getBarberReservations);

app.post("/api/owner/barber", owner.registerBarber);

app.post("/api/owner/store", owner.registerStore);

/* Customer */

app.get("/api/customer/store/:store_id", customer.getStoreById);

app.get("/api/customer/barber/:store_id/:barber_id", customer.getBarberReservations);

app.get("/api/customer/store/search/:count", customer.searchStore);

app.get("/api/customer/reviews/:user_id", customer.getReviews);

app.post("/api/customer/reviews", customer.setReview);

app.get("/api/customer/reservations/:user_id", customer.getReservations);

app.post("/api/customer/reservations", customer.setReservation);

app.delete("/api/customer/reservations/:reservation_id", customer.removeReservation);

/* Authentication */
app.post("/api/auth/signin/", auth.signIn);

app.get("/api/auth/signout/", auth.verifyJWT, auth.signOut);

app.post("/api/auth/signup/", auth.signUp);

/* Thread */

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("/server/app running on port %d", PORT);
});
