const mongoose = require('mongoose');

const StoreSchema = new mongoose.Schema({
    id: String,
    name: String,
    address: String,
    city: String,
    province: {
        type: String,
        enum: [
            "AB",
            "BC",
            "MB",
            "NB",
            "NL",
            "NT",
            "NS",
            "NU",
            "ON",
            "PE",
            "QC",
            "SK",
            "YK",
        ]
    },
    description: String,
    servicesOffered: [{
        type: String,
        enum: [
            "Haircut",
            "Shaving",
            "Hair color",
            "Eyebrows",
            "Nails",
        ]
    }],
    price: {
        type: Number,
        min: 0,
        max: 4
    },
    website: String,
    phoneNumber: String,
    photos: [{ data: Buffer, contentType: String }],
    hours: [{ isOpen: Boolean, from: String, to: String }],
});

const StoreModel = mongoose.model('StoreModel', StoreSchema);

module.exports = {
    StoreModel
};