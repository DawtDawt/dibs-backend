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
                return Promise.reject("/query/customer/getStore: No stores found with given store_id");
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
                return Promise.reject("/query/customer/searchStore: No stores found with given params");
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
                return Promise.reject("/query/customer/getReviews: No reviews found with given user_id");
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
                return Promise.reject("/query/customer/registerReview: No stores found with given store_id");
            }
            request.body.store_name = res.name;
            return barberQuery;
        })
        .then((res) => {
            if (res === null) {
                return Promise.reject("/query/customer/registerReview: No barber found with given barber_id");
            }
            request.body.barber_name = res.name;
            return userQuery;
        })
        .then((res) => {
            if (res === null) {
                return Promise.reject("/query/customer/registerReview: No user found with given user_id");
            }
            request.body.user_name = res.first_name + " " + res.last_name;
            request.body.date = new Date();
            doc = new schema.Review(request.body);
            return doc.save();
        })
        .then(() => {
            return schema.Review.find({ store_id }).exec();
        })
        .then((res) => {
            let count = 0;
            let ratings = 0;
            for (let review of res) {
                ratings += review.rating;
                count++;
            }
            const rating = ratings / count;
            return schema.Store.findOneAndUpdate({ store_id }, { rating }).exec();
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
    const review_id = request.params.review_id;
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

function getAvailability(request, response) {
    // DEBUG
    request.query.date = new Date("2020-07-24T18:00:00.000Z");
    // END
    const day_of_week = request.query.date.getDay();
    let body = { store_ids: { $in: [request.query.store_id] } };
    if (request.body.hasOwnProperty("barber_id")) {
        body.barber_id = request.body.barber_id;
    }
    let ret = [];

    const barberQuery = schema.Barber.find(body).exec();
    const storeQuery = schema.Store.findOne({ store_id: request.query.store_id }).exec();

    barberQuery
        .then((res) => {
            if (res === null) {
                return Promise.reject("/query/customer/getAvailability: No barbers found with given barber_id and/or store_id");
            }

            for (let barber of res) {
                let service_check = false;
                let service_duration;
                for (let entry of barber.services) {
                    if (entry.service === request.query.service) {
                        service_check = true;
                    }
                    service_duration = entry.duration;
                }
                if (service_check && barber.schedule[day_of_week].isOpen) {
                    let barber_from = new Date(request.query.date);
                    let barber_to = new Date(request.query.date);

                    barber_from.setHours(barber.schedule[day_of_week].from.slice(0, 2));
                    barber_from.setMinutes(barber.schedule[day_of_week].from.slice(2, 4));
                    barber_from.setSeconds("0");
                    barber_to.setHours(barber.schedule[day_of_week].to.slice(0, 2));
                    barber_to.setMinutes(barber.schedule[day_of_week].to.slice(2, 4));
                    barber_to.setSeconds("0");

                    ret.push({
                        barber_id: barber.barber_id,
                        barber_name: barber.name,
                        picture: barber.picture,
                        available_time: [{ from: barber_from, to: barber_to }],
                        duration: service_duration,
                    });
                }
            }

            if (ret.length === 0) {
                return Promise.reject("/query/customer/getAvailability: Store barbers doesn't offer given service or isn't free during this day");
            }

            delete request.query.service;
            return storeQuery;
        })
        .then((res) => {
            let store_from = new Date(request.query.date);
            let store_to = new Date(request.query.date);

            if (res === null) {
                return Promise.reject("/query/customer/getAvailability: No stores found with given store_id");
            }
            if (!res.hours[day_of_week].isOpen) {
                return Promise.reject("/query/customer/getAvailability: Store is closed on given day");
            }

            store_from.setHours(res.hours[day_of_week].from.slice(0, 2));
            store_from.setMinutes(res.hours[day_of_week].from.slice(2, 4));
            store_from.setSeconds("0");
            store_to.setHours(res.hours[day_of_week].to.slice(0, 2));
            store_to.setMinutes(res.hours[day_of_week].to.slice(2, 4));
            store_to.setSeconds("0");
            delete request.query.date;

            let body = {
                $and: [
                    request.query,
                    {
                        $or: [
                            {
                                $and: [{ from: { $gte: store_from } }, { from: { $lte: store_to } }],
                            },
                            { $and: [{ to: { $gte: store_from } }, { to: { $lte: store_to } }] },
                            { $and: [{ from: { $lte: store_from } }, { to: { $gte: store_to } }] },
                        ],
                    },
                ],
            };

            return schema.Reservation.find(body).exec();
        })
        .then((res) => {
            for (let reservation of res) {
                // Reclean reservation times
                reservation.from.setSeconds("0");
                reservation.to.setSeconds("0");
                for (let barber_obj of ret) {
                    if (reservation.barber_id === barber_obj.barber_id) {
                        console.log("enter on barber_id: " + barber_obj.barber_id);
                        for (let i = barber_obj.available_time.length - 1; i >= 0; i--) {
                            const free_time_frame = barber_obj.available_time[i];
                            console.log(free_time_frame);
                            // Duplicate check and Equal conflict check
                            if (free_time_frame.from === free_time_frame.to) {
                                barber_obj.available_time.splice(i, 1);
                                continue;
                            }
                            if (free_time_frame.from === reservation.from && reservation.to === free_time_frame) {
                                barber_obj.available_time.splice(i, 1);
                                break;
                            }
                            // Encapsulate check (reservation in time_frame)
                            if (free_time_frame.from <= reservation.from && reservation.to <= free_time_frame.to) {
                                console.log("Encapsulate check (reservation in time_frame)");
                                if (free_time_frame.from === reservation.from) {
                                    free_time_frame.from = new Date(reservation.to);
                                } else if (free_time_frame.to === reservation.to) {
                                    free_time_frame.to = new Date(reservation.from);
                                } else {
                                    barber_obj.available_time.push({ from: new Date(reservation.to), to: new Date(free_time_frame.to) });
                                    free_time_frame.to = new Date(reservation.from);
                                }
                                break;
                            }
                            // Encapsulate check (time_frame in reservation)
                            if (reservation.from <= free_time_frame.from && free_time_frame.to <= reservation.to) {
                                console.log("Encapsulate check (time_frame in reservation)");
                                barber_obj.available_time.splice(i, 1);
                                continue;
                            }
                            // time_frame.to in reservation
                            if (reservation.from <= free_time_frame.to && free_time_frame.to <= reservation.to) {
                                console.log("time_frame.to in reservation");
                                free_time_frame.to = new Date(reservation.from);
                                continue;
                            }
                            // time_frame.from in reservation
                            if (reservation.from <= free_time_frame.from && free_time_frame.from <= reservation.to) {
                                console.log("time_frame.from in reservation");
                                free_time_frame.from = new Date(reservation.to);
                                continue;
                            }
                            // Otherwise no conflict
                        }
                    }
                }
            }

            console.log(ret[0].available_time);
            console.log(ret[1].available_time);

            for (let i = ret.length - 1; i >= 0; i--) {
                const barber_obj = ret[i];
                let barber_time_available = false;
                for (let j = barber_obj.available_time.length - 1; j >= 0; j--) {
                    const free_time_frame = barber_obj.available_time[j];
                    let more_time_available = true;
                    let accumulator = 0;
                    while (more_time_available) {
                        const time_from = new Date(free_time_frame.from);
                        time_from.setMinutes(time_from.getMinutes() + accumulator);
                        const time_to = new Date(time_from);
                        console.log(free_time_frame);
                        console.log(time_from);
                        time_to.setMinutes(time_to.getMinutes() + barber_obj.duration);
                        if (time_to > free_time_frame.to) {
                            barber_obj.available_time.splice(j, 1);
                            more_time_available = false;
                        } else {
                            barber_obj.available_time.push({ from: time_from, to: time_to });
                            barber_time_available = true;
                        }
                        accumulator += 15;
                    }
                }
                if (!barber_time_available) {
                    ret.splice(i, 1);
                }
            }

            if (ret.length === 0) {
                return Promise.reject("/query/customer/getAvailability: No times available for given parameters");
            }

            return response.status(200).send(ret);
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
        body.from = { "$gte": request.query.from };
    }
    if (request.query.hasOwnProperty("to")) {
        body.to = { "$lte": request.query.to };
    }
    body.user_id = user_id;

    const reservationQuery = schema.Reservation.find(body).exec();

    reservationQuery
        .then((reservations) => {
            if (reservations === []) {
                return Promise.reject("/query/customer/getReservations: No stores found with given store_id");
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
    request.body.to = new Date(from);

    const storeQuery = schema.Store.findOne({ store_id }).exec();
    const userQuery = schema.User.findOne({ user_id }).exec();
    const barberQuery = schema.Barber.findOne({ barber_id }).exec();

    storeQuery
        .then((res) => {
            if (res === null) {
                return Promise.reject("/query/customer/registerReservation: No stores found with given store_id");
            }
            request.body.store_name = res.name;
            return userQuery;
        })
        .then((res) => {
            if (res === null) {
                return Promise.reject("/query/customer/registerReservation: No user found with given user_id");
            }
            request.body.user_name = res.name;
            return barberQuery;
        })
        .then((res) => {
            if (res === null) {
                return Promise.reject("/query/customer/registerReservation: No barber found with given barber_id");
            }
            request.body.barber_name = res.name;
            for (let i = 0; i < res.services.length; i++) {
                if (res.services[i].service === service) {
                    request.body.to.setMinutes(request.body.to.getMinute() + res.services[i].duration);
                }
                break;
            }
            const doc = new schema.Reservation(request.body);
            return doc.save();
        })
        .then(() => {
            return response.status(200).send({ reservation_id: doc.reservation_id, to: doc.to.toJSON() });
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
    getAvailability,
    getReservations,
    registerReservation,
    deleteReservation,
};
