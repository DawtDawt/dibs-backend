const constant = require("../constants");
const mongoose = require("mongoose");
const schema = require("../schemas");

function getStoreById(request, response) {
    // TODO add statistics
    const store_id = request.params.store_id;

    const storeQuery = schema.Store.findOne({
        id: store_id
    }).exec();

    const reviewQuery = schema.Review.find({
        storeID: store_id
    }).exec();

    let ret = {
        store: {},
        reviews: []
    };
    storeQuery.then(res => {
        if (res === null) {
            return Promise.reject("/query/customer/getStoreById: No stores found with given store_id");
        }
        ret.store = res;
        return reviewQuery;
    }).then(res => {
        ret.reviews = res;
        return response.status(200).send(ret);
    }).catch(error => {
        console.log(error);
        return response.status(404).send(error);
    });
}

function getBarberReservations(request, response) {
    const store_id = request.params.store_id;
    const barber_id = request.params.barber_id;

    const reservationQuery = schema.Reservation.find({ storeID: store_id, barberID: barber_id }).exec();

    reservationQuery.then(reservations => {
        if (reservations === []) {
            return Promise.reject("/query/customer/getReservations: No stores found with given store_id");
        }
        return response.status(200).send({ reservations: reservations });
    }).catch(error => {
        console.log(error);
        return response.status(500).send(error);
    });
}

function registerBarber(request, response) {
    const name = request.body.name;
    const description = request.body.description;
    const picture = request.body.picture;
    const services = request.body.services;
    const id = name + picture % 32;

    const entry = {
        id: id,
        name: name,
        description: description,
        picture: picture,
        storeIDs: [],
        services: services,
        schedule: []
    }
    const doc = new schema.Barber(entry);
    return doc.save().then(() => {
        return response.status(200).send({ barber_id: id });
    }).catch(error => {
        console.log(error);
        return response.status(500).send(error);
    });
}

function registerStore(request, response) {
    const name = request.body.name;
    const address = request.body.address;
    const city = request.body.city;
    const province = request.body.province;
    const description = request.body.description;
    const price = request.body.price;
    const lat = request.body.lat;
    const lon = request.body.lon;
    const website = request.body.website;
    const phone_number = request.body.phone_number;
    const pictures = request.body.pictures;
    const services = request.body.services;
    const hours = request.body.hours;
    const barbers = request.body.barbers;
    const id = name + lat + lon;

    const entry = {
        id: id,
        name: name,
        address: address,
        city: city,
        province: province,
        description: description,
        price: price,
        lat: lat,
        lon: lon,
        website: website,
        phoneNumber: phone_number,
        pictures: pictures,
        rating: 0,
        services: services,
        hours: hours,
        barberIDs: barbers
    };
    const doc = new schema.Store(entry);
    return doc.save().then(() => {
        return response.status(200).send({ store_id: id });
    }).catch(error => {
        console.log(error);
        return response.status(500).send(error);
    });
}

module.exports = {
    getStoreById,
    getBarberReservations,
    registerBarber,
    registerStore,
}