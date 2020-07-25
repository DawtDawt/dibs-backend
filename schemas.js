const constant = require("./constants");
const mongoose = require("mongoose");
const autoincrement = require("mongoose-sequence")(mongoose);

const userSchema = new mongoose.Schema({
    user_id: {
        type: Number,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: [constant.CUSTOMER, constant.OWNER],
        required: true,
    },
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
    },
    phone_number: {
        type: String,
        required: true,
    },
});

const storeSchema = new mongoose.Schema({
    store_id: {
        type: Number,
        unique: true,
    },
    owner_id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    province: {
        type: String,
        enum: constant.PROVINCES,
        required: true,
    },
    neighbourhood: {
        type: String,
        required: true,
    },
    description: String,
    price: {
        type: Number,
        min: 1,
        max: 3,
        required: true,
    },
    lat: {
        type: String,
        required: true,
    },
    lon: {
        type: String,
        required: true,
    },
    website: String,
    phone_number: String,
    pictures: [String],
    rating: Number,
    services: [
        {
            type: String,
            enum: constant.SERVICES,
        },
    ],
    hours: [
        {
            isOpen: Boolean,
            from: String,
            to: String,
        },
    ],
    barber_ids: [Number],
});

const barberSchema = new mongoose.Schema({
    barber_id: {
        type: Number,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: String,
    picture: String,
    store_ids: [Number],
    services: [
        {
            service: {
                type: String,
                enum: constant.SERVICES,
                required: true,
            },
            duration: {
                type: Number,
                min: 0,
                required: true,
            },
        },
    ],
    schedule: [
        {
            from: String,
            to: String,
        },
    ],
});

const reviewSchema = new mongoose.Schema({
    review_id: {
        type: Number,
        unique: true,
    },
    store_id: {
        type: Number,
        required: true,
    },
    store_name: {
        type: String,
        required: true,
    },
    barber_id: {
        type: Number,
        required: true,
    },
    barber_name: {
        type: String,
        required: true,
    },
    user_id: {
        type: Number,
        required: true,
    },
    user_name: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true,
    },
    service: {
        type: String,
        enum: constant.SERVICES,
        required: true,
    },
    review: String,
});

const reservationSchema = new mongoose.Schema({
    reservation_id: {
        type: Number,
        unique: true,
    },
    user_id: {
        type: Number,
        required: true,
    },
    user_name: {
        type: String,
        required: true,
    },
    barber_id: {
        type: Number,
        required: true,
    },
    barber_name: {
        type: String,
        required: true,
    },
    store_id: {
        type: Number,
        required: true,
    },
    store_name: {
        type: String,
        required: true,
    },
    service: {
        type: String,
        enum: constant.SERVICES,
        required: true,
    },
    to: {
        type: Date,
        required: true,
    },
    from: {
        type: Date,
        required: true,
    },
});

userSchema.plugin(autoincrement, { inc_field: "user_id" });
storeSchema.plugin(autoincrement, { inc_field: "store_id" });
barberSchema.plugin(autoincrement, { inc_field: "barber_id" });
reviewSchema.plugin(autoincrement, { inc_field: "review_id" });
reservationSchema.plugin(autoincrement, { inc_field: "reservation_id" });
const User = mongoose.model("User", userSchema);
const Store = mongoose.model("Store", storeSchema);
const Barber = mongoose.model("Barber", barberSchema);
const Review = mongoose.model("Review", reviewSchema);
const Reservation = mongoose.model("Reservation", reservationSchema);

module.exports = {
    User,
    Store,
    Barber,
    Review,
    Reservation,
};
