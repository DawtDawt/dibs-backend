const schema = require("../schemas");

function getStore(request, response) {
    let ret = {
        store_id: 0,
        store: {},
        reservations: [],
        reviews: [],
        barbers: [],
    };
    const store_id = request.params.store_id;

    const storeQuery = schema.Store.findOne({ store_id }).exec();
    const reviewQuery = schema.Review.findOne({ store_id }).exec();
    const reservationQuery = schema.Reservation.findOne({ store_id }).exec();
    const barberQuery = schema.Barber.findOne({ store_ids: { $in: store_id } }).exec();

    storeQuery
        .then((res) => {
            if (res === null) {
                return Promise.reject(
                    "/query/customer/getStore: No stores found with given store_id"
                );
            }
            ret.store_id = res.store_id;
            ret.store = res;
            return reviewQuery;
        })
        .then((res) => {
            ret.reviews = res;
            return reservationQuery;
        })
        .then((res) => {
            ret.reservations = res;
            return barberQuery;
        })
        .then((res) => {
            ret.barbers = res;
            return response.status(200).send(ret);
        })
        .catch((error) => {
            console.log(error);
            return response.status(404).send(error);
        });
}

function searchStores(request, response) {
    let param = {};
    let body = {
        $and: [],
    };
    let resCount = 0;
    if (request.query.hasOwnProperty("store")) {
        body.name = "/" + request.query.store + "/";
    }
    if (request.query.hasOwnProperty("city")) {
        body.city = request.query.city;
    }
    if (request.query.hasOwnProperty("services")) {
        const services = request.query.services.split(",");
        body.services = { "$all": services };
    }
    if (request.query.hasOwnProperty("rating")) {
        body.rating = { "$gte": Number(request.query.rating) };
    }
    if (request.query.hasOwnProperty("price")) {
        let priceArr = [];
        const prices = request.query.price.split(",");
        for (let i = 0; i < prices.length; i++) {
            priceArr.push({ price: Number(prices[i]) });
        }
        body.$and = body.$and.concat({ $or: priceArr });
    }
    if (request.query.hasOwnProperty("neighbourhoods")) {
        const neighbourhoodArr = [];
        const neighbourhoods = request.query.neighbourhoods.split(",");
        for (let i = 0; i < neighbourhoods.length; i++) {
            neighbourhoodArr.push({ neighbourhood: neighbourhoods[i] });
        }

        body.$and = body.$and.concat({ $or: neighbourhoodArr });
    }
    if (request.query.hasOwnProperty("startIndex")) {
        param.skip = Number(request.query.startIndex);
    }

    if (body.$and.length === 0) {
        delete body.$and;
    }

    param.limit = Number(request.params.count);

    const countQuery = schema.Store.find(body, { pictures: { $slice: 1 } }).exec();
    const storeQuery = schema.Store.find(body, { pictures: { $slice: 1 } }, param).exec();

    countQuery
        .then((res) => {
            if (res === []) {
                return Promise.reject(
                    "/query/customer/searchStore: No stores found with given params"
                );
            }
            resCount = res.length;
            return storeQuery;
        })
        .then((res) => {
            const ret = [];
            for (let i = 0; i < res.length; i++) {
                ret.push({
                    store_id: res[i].store_id,
                    rating: res[i].rating,
                    price: res[i].price,
                    services: res[i].services,
                    address: res[i].address,
                    name: res[i].name,
                    city: res[i].city,
                    province: res[i].province,
                    neighbourhood: res[i].neighbourhood,
                    picture: res[i].pictures[0],
                });
            }

            return response.status(200).send({
                count: resCount,
                stores: ret,
            });
        })
        .catch((error) => {
            console.log(error);
            return response.status(404).send(error);
        });
}

function getNeighbourhoods(request, response) {
    const limit = request.query.limit;
    delete request.query.limit;
    const query = schema.Store.aggregate([
        { $match: request.query },
        {
            $group: {
                _id: "$neighbourhood",
            },
        },
        { $limit: Number(limit) },
    ]);
    query
        .then((res) => {
            const neighbourhoods = res
                .map((elem) => {
                    return elem._id;
                })
                .sort();
            return response.status(200).send(neighbourhoods);
        })
        .catch((err) => {
            return response.status(404).send(err);
        });
}

function getReviews(request, response) {
    const user_id = request.params.user_id;

    const reviewQuery = schema.Review.find({
        user_id,
    }).exec();

    reviewQuery
        .then((reviews) => {
            if (reviews === []) {
                return Promise.reject(
                    "/query/customer/getReviews: No reviews found with given user_id"
                );
            }
            return response.status(200).send({ reviews });
        })
        .catch((error) => {
            console.log(error);
            return response.status(404).send(error);
        });
}

function registerReview(request, response) {
    const user_id = request.body.user_id;
    const store_id = request.body.store_id;
    const barber_id = request.body.barber_id;
    const storeQuery = schema.Store.findOne({ store_id }).exec();
    const barberQuery = schema.Barber.findOne({ barber_id }).exec();
    const userQuery = schema.User.findOne({ user_id }).exec();
    let doc;

    storeQuery
        .then((res) => {
            if (res === null) {
                return Promise.reject(
                    "/query/customer/registerReview: No stores found with given store_id"
                );
            }
            request.body.store_name = res.name;
            return barberQuery;
        })
        .then((res) => {
            if (res === null) {
                return Promise.reject(
                    "/query/customer/registerReview: No barber found with given barber_id"
                );
            }
            request.body.barber_name = res.name;
            return userQuery;
        })
        .then((res) => {
            if (res === null) {
                return Promise.reject(
                    "/query/customer/registerReview: No user found with given user_id"
                );
            }
            request.body.user_name = res.first_name + " " + res.last_name;
            request.body.date = new Date();
            doc = new schema.Review(request.body);
            return doc.save();
        })
        .then(() => {
            return response.status(200).send({
                review_id: doc.review_id,
            });
        })
        .catch((error) => {
            console.log(error);
            return response.status(500).send(error);
        });
}

function updateReview(request, response) {
    const review_id = request.body.review_id;
    delete request.body.review_id;
    const reviewQuery = schema.Review.findOneAndUpdate({ review_id }, request.body).exec();

    reviewQuery
        .then(() => {
            return response.status(200).send({ review_id });
        })
        .catch((error) => {
            console.log(error);
            return response.status(500).send(error);
        });
}

function deleteReview(request, response) {
    const review_id = request.params.reivew_id;
    const reviewQuery = schema.Review.findOneAndDelete({ review_id }).exec();

    reviewQuery
        .then(() => {
            return response.status(200).send({ review_id });
        })
        .catch((error) => {
            console.log(error);
            return response.status(500).send(error);
        });
}

function getReservations(request, response) {
    const user_id = request.params.user_id;
    let body = {};
    if (request.query.hasOwnProperty("from")) {
        body.from = { "$gte": ISODate(request.query.from) };
    }
    if (request.query.hasOwnProperty("to")) {
        body.to = { "$lte": ISODate(request.query.to) };
    }
    body.user_id = user_id;

    const reservationQuery = schema.Reservation.find(body).exec();

    reservationQuery
        .then((reservations) => {
            if (reservations === []) {
                return Promise.reject(
                    "/query/customer/getReservations: No stores found with given store_id"
                );
            }
            return response.status(200).send({ reservations });
        })
        .catch((error) => {
            console.log(error);
            return response.status(500).send(error);
        });
}

function registerReservation(request, response) {
    const user_id = request.body.user_id;
    const store_id = request.body.store_id;
    const barber_id = request.body.barber_id;
    request.body.from = ISODate(request.body.from);
    request.body.to = from;

    const storeQuery = schema.Store.findOne({ store_id }).exec();
    const userQuery = schema.User.findOne({ user_id }).exec();
    const barberQuery = schema.Barber.findOne({ barber_id }).exec();

    storeQuery
        .then((res) => {
            if (res === null) {
                return Promise.reject(
                    "/query/customer/registerReservation: No stores found with given store_id"
                );
            }
            request.body.store_name = res.name;
            return userQuery;
        })
        .then((res) => {
            if (res === null) {
                return Promise.reject(
                    "/query/customer/registerReservation: No user found with given user_id"
                );
            }
            request.body.user_name = res.name;
            return barberQuery;
        })
        .then((res) => {
            if (res === null) {
                return Promise.reject(
                    "/query/customer/registerReservation: No barber found with given barber_id"
                );
            }
            request.body.barber_name = res.name;
            for (let i = 0; i < res.services.length; i++) {
                if (res.services[i].service === service) {
                    to += res.services[i].duration * 1000 * 60;
                }
                break;
            }
            const doc = new schema.Reservation(request.body);
            return doc.save();
        })
        .then(() => {
            return response
                .status(200)
                .send({ reservation_id: doc.reservation_id, to: doc.to.toJSON() });
        })
        .catch((error) => {
            console.log(error);
            return response.status(500).send(error);
        });
}

function deleteReservation(request, response) {
    const reservation_id = request.params.reservation_id;

    const reservationQuery = schema.Reservation.deleteOne({ reservation_id }).exec();

    reservationQuery
        .then(() => {
            return response.status(200).send({ reservation_id });
        })
        .catch((error) => {
            console.log(error);
            return response.status(500).send(error);
        });
}

module.exports = {
    getStore,
    searchStores,
    getNeighbourhoods,
    getReviews,
    registerReview,
    updateReview,
    deleteReview,
    getReservations,
    registerReservation,
    deleteReservation,
};
