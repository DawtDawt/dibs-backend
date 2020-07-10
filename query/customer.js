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
        return response.status(404).send(error);
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
        return response.status(404).send(error);
    });
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
        // change frontend api too for price
        let priceArr = [];
        const prices = request.query.price.split(",");
        for (let i = 0; i < prices.length; i++) {
            priceArr.push({ price: Number(prices[i]) });
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
        let ret = [];
        for (let i = 0; i < res.length; i++) {
            // TODO picture
            ret.push({
                store_id: res[i].store_id,
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
        return response.status(404).send(error);
    });
}

function getReviews(request, response) {
    const user_id = request.params.user_id;
    
    const reviewQuery = schema.Review.find({
        customerID: user_id
    }).exec();
    
    reviewQuery.then(reviews => {
        if (reviews === []) {
            return Promise.reject("/query/customer/getReviews: No reviews found with given user_id");
        }
        return response.status(200).send({reviews: reviews})
    }).catch(error => {
        console.log(error);
        return response.status(404).send(error);
    });
}

function setReview(request, response) {
    const user_id = request.body.user_id;
    const store_id = request.body.store_id;
    const barber_id = request.body.barber_id;
    const review = request.body.review;
    const rating = request.body.rating;
    const entry = {
        storeID: store_id,
        barberID: barber_id,
        customerID: user_id,
        rating: rating,
        review: review
    };

    const doc = new schema.Review(entry);
    doc.save().then(() => {
        return response.status(200).send({});
    }).catch(error => {
        console.log(error);
        return response.status(500).send(error);
    });
}

function getReservations(request, response) {
    const user_id = request.params.user_id;
    let body = {};
    // Initialize local constants
    if (request.query.hasOwnProperty("start_time")) {
        body.from = {"$gte": ISODate(request.query.start_time)};
    }
    if (request.query.hasOwnProperty("end_time")) {
        body.to = {"$lte": ISODate(request.query.end_time)};
    }
    body.customerID = user_id;

    const reservationQuery = schema.Reservation.find(body).exec();

    reservationQuery.then(reservations => {
        if (reservations === []) {
            return Promise.reject("/query/customer/getReservations: No stores found with given store_id");
        }
        return response.status(200).send({reservations: reservations});
    }).catch(error => {
        console.log(error);
        return response.status(500).send(error);
    });
}

function setReservation(request, response) {
    const user_id = request.body.user_id;
    const store_id = request.body.store_id;
    const barber_id = request.body.barber_id;
    const start_time = ISODate(request.body.start_time);
    const end_time = start_time;
    const service = request.body.service;
    const id = user_id + barber_id + start_time;

    const barberQuery = schema.Barber.findOne({id: barber_id}).exec();

    barberQuery.then(barber => {
        if (barber === null) {
            return Promise.reject("/query/customer/setReservation: No barber found with given barber_id");
        }
        for (let i = 0; i < barber.services.length; i++) {
            if (barber.services[i].service === service) {
                end_time += barber.services[i].duration * 1000 * 60;
            }
            break;
        }
        return Promise.resolve();
    }).then(() => {
        const entry = {
            storeID: store_id,
            barberID: barber_id,
            customerID: user_id,
            from: start_time,
            service: service,
            id: id,
            to: end_time
        };
        const doc = new schema.Reservation(entry);
        return doc.save().then(() => {
        });
    }).then(() => {
        return response.status(200).send({reservation_id: id, end_time: end_time.toJSON()});
    }).catch(error => {
        console.log(error);
        return response.status(500).send(error);
    });
}

function removeReservation(request, response) {
    const reservation_id = request.params.reservation_id;

    const reservationQuery = schema.Reservation.deleteOne({id: reservation_id}).exec();

    reservationQuery.then(() => {
        return response.status(200).send({});
    }).catch(error => {
        console.log(error);
        return response.status(500).send(error);
    });
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