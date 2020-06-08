function getStoreById(request, response) {

    const store_id = request.params.store_id;
    console.log("getStoreById: store_id: " + store_id);
    return response.status(200).send("ok");
}

function getBarberReservations(request, response) {

    const store_id = request.params.store_id;
    const barber_id = request.params.barber_id;
    console.log("getBarberReservations: store_id: " + store_id);
    console.log("getBarberReservations: barber_id: " + barber_id);
    return response.status(200).send("ok");
}

function searchStore(request, response) {

    const count = request.params.count;
    let body = {};
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
        body.rating = {"$gte": request.query.rating};
    }
    if (request.query.hasOwnProperty("price")) {
        body.price = {"$lte": request.query.price};
    }

    // TODO localize store object and decide on schemas
    console.log("searchStore: count: " + count);
    console.log("searchStore: object: " + body);
    return response.status(200).send("ok");
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