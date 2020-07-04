const constant = require("./constants");
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: [constant.CUSTOMER, constant.OWNER],
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
});

const storeSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    province: {
        type: String,
        enum: constant.PROVINCES,
        required: true
    },
    description: String,
    price: {
        type: Number,
        min: 1,
        max: 3,
        required: true
    },
    lat: {
        type: String,
        required: true
    },
    lon: {
        type: String,
        required: true
    },
    website: String,
    phoneNumber: String,
    pictures: [String],
    rating: Number,
    services: [{
        type: String,
        enum: constant.SERVICES
    }],
    hours: {
        type: [{
            isOpen: Boolean,
            from: String,
            to: String
        }],
        validate: [hoursLimit, '{PATH} does not match the hours format'],
        required: true
    },
    barberIDs: {
        type: [{
            type: String,
            unique: true
        }]
    },
});

const barberSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: String,
    picture: String,
    storeIDs: [{
        type: String,
        unique: true
    }],
    services: [{
        service: {
            type: String,
            enum: constant.SERVICES,
            required: true
        },
        duration: {
            type: Number,
            min: 0,
            required: true
        }
    }],
    schedule: [{
        from: {
            type: Date,
            required: true
        },
        to: {
            type: Date,
            required: true
        }
    }]
});

const reviewSchema = new mongoose.Schema({
    storeID: {
        type: String,
        required: true,
        index: true
    },
    barberID: {
        type: String,
        required: true,
        index: true
    },
    customerID: {
        type: String,
        required: true,
        index: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    review: String
});

const reservationSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required: true
    },
    customerID: {
        type: String,
        required: true
    },
    barberID: {
        type: String,
        required: true
    },
    storeID: {
        type: String,
        required: true
    },
    service: {
        type: String,
        enum: constant.SERVICES,
        required: true
    },
    from: {
        type: Date,
        required: true
    },
    to: {
        type: Date,
        required: true
    }
});

function hoursLimit(val) {
    return val.length === constant.DAYSINAWEEK;
};

const User = mongoose.model("User", userSchema);
const Store = mongoose.model("Store", storeSchema);
const Barber = mongoose.model("Barber", barberSchema);
// [TW] unique compound index not working, need to debug
reviewSchema.index({ barberID: 1, customerID: 1 }, { unique: true });
const Review = mongoose.model("Review", reviewSchema);
const Reservation = mongoose.model("Reservation", reservationSchema);

module.exports = {
    User,
    Store,
    Barber,
    Review,
    Reservation,
};