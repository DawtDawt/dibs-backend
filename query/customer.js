const constant = require("../constants");
const mongoose = require("mongoose");
const schema = require("../schemas");

function getStoreById(request, response) {
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
        return response.status(404);
    });
}

function getBarberReservations(request, response) {
    const store_id = request.params.store_id;
    const barber_id = request.params.barber_id;

    const reservationQuery = schema.Reservation.find({
        storeID: store_id,
        barberID: barber_id
    }).exec();
    
    let ret = {
        schedule: []
    };
    reservationQuery.then((res) => {
        for (let i = 0; i < res.length; i++) {
            ret.schedule[i] = {from: res[i].from, to: res[i].to};
        }
        return response.status(200).send(ret);
    }).catch(error => {
        console.log(error);
        return response.status(404);
    })
}

function searchStore(request, response) {
    let param = {};
    let body = {};
    let resCount = 0;
    // Initialize local constants
    if (request.query.hasOwnProperty("store")) {
        body.store = "/" + request.query.store + "/";
    }
    if (request.query.hasOwnProperty("city")) {
        body.city = request.query.city;
    }
    if (request.query.hasOwnProperty("services")) {
        body.services = {"$all": request.query.services};
    }
    if (request.query.hasOwnProperty("rating")) {
        body.rating = {"$gte": Number(request.query.rating)};
    }
    if (request.query.hasOwnProperty("price")) {
        let priceArr = [];
        for (let i = 0; i < request.query.price.length; i++) {
            priceArr.push({price: Number(request.query.price[i])});
        }
        body.$or = priceArr;
    }
    if (request.query.hasOwnProperty("startIndex")) {
        param.skip = Number(request.query.startIndex);
    }
    param.limit = Number(request.params.count);

    const countQuery = schema.Store.find(body).exec();
    const storeQuery = schema.Store.find(body, {}, param).exec();

    countQuery.then(res => {
        if (res === []) {
            return Promise.reject("/query/customer/searchStore: No stores found with given params");
        }
        resCount = res.length;
        return storeQuery;
    }).then(res => {
        console.log(res);
        let ret = [];
        for (let i = 0; i < res.length; i++) {
            ret.push({
                store_id: res[i].storeID, 
                // TODO picture
                rating: res[i].rating,
                price: res[i].price,
                services: res[i].services
            })
        }
        return response.status(200).send({
            count: resCount,
            stores: ret
        })
    }).catch(error => {
        console.log(error);
        return response.status(404);
    })
}

function getReviews(request, response) {

    const user_id = request.params.user_id;
    console.log("getReviews: user_id: " + user_id);
    return response.status(200).send("ok");
}

function setReview(request, response) {

    const user_id = request.body.user_id;
    const store_id = request.body.store_id;
    const barber_id = request.body.barber_id;
    const review = request.body.review;
    const rating = request.body.rating;

    console.log("setReview: user_id: " + user_id);
    return response.status(200).send("ok");
}

function getReservations(request, response) {

    const user_id = request.params.user_id;
    let body = {};
    // Initialize local constants
    if (request.query.hasOwnProperty("start_time")) {
        body.start_time = {"$gte": new Date(request.query.start_time)};
    }
    if (request.query.hasOwnProperty("end_time")) {
        body.end_time = {"$lte": new Date(request.query.end_time)};
    }

    console.log("getReservations: user_id: " + user_id);
    return response.status(200).send("ok");
}

function setReservation(request, response) {

    const user_id = request.body.user_id;
    const store_id = request.body.store_id;
    const barber_id = request.body.barber_id;
    const start_time = request.body.start_time;
    const service = request.body.service;

    console.log("setReservation: start_time: " + user_id);
    return response.status(200).send("ok");
}

function removeReservation(request, response) {

    const reservation_id = request.params.reservation_id;

    console.log("removeReservation: reservation_id: " + reservation_id);
    return response.status(200).send("ok");
}

module.exports = {
    getStoreById,
    getBarberReservations,
    searchStore,
    getReviews,
    setReview,
    getReservations,
    setReservation,
    removeReservation,
}