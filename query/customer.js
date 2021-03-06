const schema = require("../schemas");

async function getStore(request, response) {
    const noPictures = request.query.noPictures;
    let ret = {
        store_id: 0,
        store: {},
        reviews: [],
        reservations: [],
        barbers: [],
    };

    try {
        const store_result = await schema.Store.findOne({ store_id: request.params.store_id }).exec();
        if (store_result === null) {
            throw "/query/customer/getStore: No stores found with given store_id";
        }
        if (noPictures) {
            store_result.pictures = null;
        }
        ret.store_id = store_result.store_id;
        ret.store = store_result;

        const review_results = await schema.Review.find({ store_id: request.params.store_id }).exec();
        ret.reviews = review_results;

        const reservation_results = await schema.Reservation.find({ store_id: request.params.store_id }).exec();
        ret.reservations = reservation_results;

        const barber_results = await schema.Barber.find({ store_ids: { "$in": [request.params.store_id] } }).exec();
        ret.barbers = barber_results;

        return response.status(200).send(ret);
    } catch (error) {
        console.log(error);
        return response.status(500).send(error);
    }
}

async function searchStores(request, response) {
    let ret = {
        count: 0,
        stores: [],
    };
    const store_body = {};
    let day_of_week, time_desired, min_time_desired, max_time_desired;
    let param = { limit: Number(request.params.count), skip: 0 };
    if (request.query.hasOwnProperty("string")) {
        store_body.name = {
            "$regex": String(request.query.string),
            "$options": "i",
        };
    }
    if (request.query.hasOwnProperty("city")) {
        store_body.city = request.query.city;
    }
    if (request.query.hasOwnProperty("services")) {
        const services = request.query.services.split(",");
        store_body.services = { "$all": services };
    }
    if (request.query.hasOwnProperty("rating")) {
        store_body.rating = { "$gte": Number(request.query.rating) };
    }
    if (request.query.hasOwnProperty("price")) {
        const prices = request.query.price.split(",");
        store_body.price = { "$in": prices };
    }
    if (request.query.hasOwnProperty("startIndex")) {
        param.skip = Number(request.query.startIndex);
    }
    if (request.query.hasOwnProperty("neighbourhoods")) {
        const neighbourhoods = request.query.neighbourhoods.split(",");
        store_body.neighbourhood = { "$in": neighbourhoods };
    }
    if (request.query.hasOwnProperty("date")) {
        day_of_week = getDayOfWeek(new Date(request.query.date).getDay());
    }
    if (!request.query.hasOwnProperty("time_frame")) {
        request.query.time_frame = 0;
    }
    if (request.query.hasOwnProperty("time")) {
        time_desired = new Date(request.query.date);
        time_desired.setHours(new Date(request.query.time).getHours());
        time_desired.setMinutes(new Date(request.query.time).getMinutes());
        time_desired.setSeconds("0");
        min_time_desired = new Date(time_desired);
        max_time_desired = new Date(time_desired);
        min_time_desired.setMinutes(time_desired.getMinutes() - Number(request.query.time_frame));
        max_time_desired.setMinutes(time_desired.getMinutes() + Number(request.query.time_frame));
    }

    try {
        const store_results = await schema.Store.find(store_body, { pictures: { "$slice": 1 } }).exec();
        for (const store of store_results) {
            ret.stores.push({
                store_id: store.store_id,
                rating: store.rating,
                price: store.price,
                services: store.services,
                address: store.address,
                name: store.name,
                city: store.city,
                province: store.province,
                neighbourhood: store.neighbourhood,
                picture: store.pictures[0],
                available_time: [],
            });
        }
        if (ret.stores.length === 0) {
            throw "/query/customer/searchStores: No stores found with given params";
        }
        if (!request.query.hasOwnProperty("date")) {
            ret.count = ret.stores.length;
            ret.stores = ret.stores.slice(param.skip, param.skip + param.limit);
            return response.status(200).send(ret);
        }
        for (let i = store_results.length - 1; i >= 0; i--) {
            if (!store_results[i].hours[day_of_week].isOpen) {
                ret.stores.splice(i, 1);
            }
        }
        if (request.query.hasOwnProperty("date") && !request.query.hasOwnProperty("time")) {
            ret.count = ret.stores.length;
            ret.stores = ret.stores.slice(param.skip, param.skip + param.limit);
            return response.status(200).send(ret);
        }

        const promises = [];
        for (const store of ret.stores) {
            let temp_services = store.services;
            if (request.query.hasOwnProperty("services")) {
                temp_services = request.query.services;
            }
            const query = getAvailabilityHelper(store.store_id, new Date(request.query.date), store.services, null) //
                .then((barber_results) => {
                    if (barber_results.length === 0) {
                        return;
                    }
                    for (const barber of barber_results) {
                        for (const time_slot of barber.available_time) {
                            if (min_time_desired <= time_slot.from && time_slot.from <= max_time_desired) {
                                store.available_time.push({
                                    barber_id: barber.barber_id,
                                    barber_name: barber.barber_name,
                                    from: time_slot.from,
                                    to: time_slot.to,
                                });
                            }
                        }
                    }
                });
            promises.push(query);
        }
        await Promise.all(promises);

        for (let i = ret.stores.length - 1; i >= 0; i--) {
            if (ret.stores[i].available_time.length === 0) {
                ret.stores.splice(i, 1);
            }
        }

        ret.count = ret.stores.length;
        ret.stores = ret.stores.slice(param.skip, param.skip + param.limit);
        return response.status(200).send(ret);
    } catch (error) {
        console.log(error);
        return response.status(500).send(error);
    }
}

async function getNeighbourhoods(request, response) {
    const limit = request.query.limit;

    try {
        const aggregate_results = await schema.Store.aggregate([
            {
                "$group": {
                    _id: "$neighbourhood",
                },
            },
            { "$limit": Number(limit) },
        ]).exec();
        const neighbourhoods = aggregate_results
            .map((elem) => {
                return elem._id;
            })
            .sort();

        return response.status(200).send(neighbourhoods);
    } catch (error) {
        console.log(error);
        return response.status(500).send(error);
    }
}

async function getReviews(request, response) {
    let ret = {};

    try {
        const review_results = await schema.Review.find({ user_id: request.params.user_id }).exec();
        if (review_results.length === 0) {
            throw "/query/customer/getReviews: No reviews found with given user_id";
        }
        ret.reviews = review_results;

        return response.status(200).send(ret);
    } catch (error) {
        console.log(error);
        return response.status(500).send(error);
    }
}

async function registerReview(request, response) {
    let ret = {};

    try {
        const store_result = await schema.Store.findOne({ store_id: request.body.store_id }).exec();
        if (store_result === null) {
            throw "/query/customer/registerReview: No stores found with given store_id";
        }
        request.body.store_name = store_result.name;

        const barber_result = await schema.Barber.findOne({ barber_id: request.body.barber_id }).exec();
        if (barber_result === null) {
            throw "/query/customer/registerReview: No barber found with given barber_id";
        }
        request.body.barber_name = barber_result.name;

        const user_result = await schema.User.findOne({ user_id: request.body.user_id }).exec();
        if (user_result === null) {
            throw "/query/customer/registerReview: No user found with given user_id";
        }
        request.body.user_name = user_result.first_name + " " + user_result.last_name;
        request.body.date = new Date();
        const doc = new schema.Review(request.body);

        await doc.save();
        ret.review = doc.review_id;

        const review_results = await schema.Review.find({ store_id: request.body.store_id }).exec();
        const sum_of_ratings = review_results.reduce((review1, review2) => {
            return review1.rating + review2.rating;
        });
        const overall_rating = Math.ceil(sum_of_ratings / review_results.length);

        await schema.Store.findOneAndUpdate({ store_id: request.body.store_id }, { overall_rating }).exec();
        await schema.Reservation.findOneAndUpdate({ reservation_id: request.body.reservation_id }, { reviewed: true }).exec();

        return response.status(200).send(ret);
    } catch (error) {
        console.log(error);
        return response.status(500).send(error);
    }
}

// for future use
async function updateReview(request, response) {
    let ret = { review_id: request.body.review_id };
    delete request.body.review_id;

    try {
        await schema.Review.findOneAndUpdate({ review_id: ret.review_id }, request.body).exec();

        return response.status(200).send(ret);
    } catch (error) {
        console.log(error);
        return response.status(500).send(error);
    }
}

async function deleteReview(request, response) {
    let ret = { review_id: request.params.review_id };

    try {
        await schema.Review.findOneAndDelete({ review_id: request.params.review_id }).exec();

        return response.status(200).send(ret);
    } catch (error) {
        console.log(error);
        return response.status(500).send(error);
    }
}

async function getAvailability(request, response) {
    let ret = [];
    let barber_id = null;
    if (request.query.hasOwnProperty("barber_id")) {
        barber_id = request.query.barber_id;
    }
    let services = [request.query.service];

    try {
        ret = await getAvailabilityHelper(request.query.store_id, new Date(request.query.date), services, barber_id);

        return response.status(200).send(ret);
    } catch (error) {
        console.log(error);
        return response.status(500).send(error);
    }
}

async function getAvailabilityHelper(store_id, date, services, barber_id) {
    let ret = [];
    const day_of_week = getDayOfWeek(date.getDay());
    const barber_body = { store_ids: { "$in": [store_id] } };
    let reservation_body = { store_id };
    if (barber_id !== null) {
        barber_body.barber_id = barber_id;
        reservation_body.barber_id = barber_id;
    }

    try {
        const barber_results = await schema.Barber.find(barber_body).exec();
        if (barber_results.length === 0) {
            throw "/query/customer/getAvailability: No barbers found with given barber_id and/or store_id";
        }
        for (const barber of barber_results) {
            let service_duration = 0;
            for (const entry of barber.services) {
                for (const service of services) {
                    if (entry.service === service) {
                        if (service_duration === 0 || service_duration > entry.duration) {
                            service_duration = entry.duration;
                        }
                    }
                }
            }
            if (service_duration && barber.schedule[day_of_week].isOpen) {
                const barber_from = new Date(date);
                const barber_to = new Date(date);

                barber_from.setHours(barber.schedule[day_of_week].from.slice(0, 2));
                barber_from.setMinutes(barber.schedule[day_of_week].from.slice(2, 4));
                barber_from.setSeconds("0");
                barber_to.setHours(barber.schedule[day_of_week].to.slice(0, 2));
                barber_to.setMinutes(barber.schedule[day_of_week].to.slice(2, 4));
                barber_to.setSeconds("0");
                ret.push({
                    store_id,
                    barber_id: barber.barber_id,
                    barber_name: barber.name,
                    picture: barber.picture,
                    available_time: [{ from: barber_from, to: barber_to }],
                    duration: service_duration,
                });
            }
        }
        if (ret.length === 0) {
            return [];
        }

        const store_result = await schema.Store.findOne({ store_id }).exec();
        const store_from = new Date(date);
        const store_to = new Date(date);
        if (store_result === null) {
            throw "/query/customer/getAvailability: No stores found with given store_id";
        }
        if (!store_result.hours[day_of_week].isOpen) {
            return [];
        }
        store_from.setHours(store_result.hours[day_of_week].from.slice(0, 2));
        store_from.setMinutes(store_result.hours[day_of_week].from.slice(2, 4));
        store_from.setSeconds("0");
        store_to.setHours(store_result.hours[day_of_week].to.slice(0, 2));
        store_to.setMinutes(store_result.hours[day_of_week].to.slice(2, 4));
        store_to.setSeconds("0");
        reservation_body = {
            "$and": [
                reservation_body,
                {
                    "$or": [
                        {
                            "$and": [{ from: { "$gte": store_from } }, { from: { "$lte": store_to } }],
                        },
                        { "$and": [{ to: { "$gte": store_from } }, { to: { "$lte": store_to } }] },
                        { "$and": [{ from: { "$lte": store_from } }, { to: { "$gte": store_to } }] },
                    ],
                },
            ],
        };

        const reservation_results = await schema.Reservation.find(reservation_body).exec();
        for (const reservation of reservation_results) {
            // Reclean reservation times
            reservation.from.setSeconds("0");
            reservation.to.setSeconds("0");
            for (const barber of ret) {
                if (reservation.barber_id === barber.barber_id) {
                    for (let i = barber.available_time.length - 1; i >= 0; i--) {
                        const free_time_frame = barber.available_time[i];
                        // Duplicate check and Equal conflict check
                        if (free_time_frame.from === free_time_frame.to) {
                            barber.available_time.splice(i, 1);
                            continue;
                        }
                        if (free_time_frame.from === reservation.from && reservation.to === free_time_frame) {
                            barber.available_time.splice(i, 1);
                            break;
                        }
                        // Encapsulate check (reservation in time_frame)
                        if (free_time_frame.from <= reservation.from && reservation.to <= free_time_frame.to) {
                            if (free_time_frame.from === reservation.from) {
                                free_time_frame.from = new Date(reservation.to);
                            } else if (free_time_frame.to === reservation.to) {
                                free_time_frame.to = new Date(reservation.from);
                            } else {
                                barber.available_time.push({ from: new Date(reservation.to), to: new Date(free_time_frame.to) });
                                free_time_frame.to = new Date(reservation.from);
                            }
                            break;
                        }
                        // Encapsulate check (time_frame in reservation)
                        if (reservation.from <= free_time_frame.from && free_time_frame.to <= reservation.to) {
                            barber.available_time.splice(i, 1);
                            continue;
                        }
                        // time_frame.to in reservation
                        if (reservation.from <= free_time_frame.to && free_time_frame.to <= reservation.to) {
                            free_time_frame.to = new Date(reservation.from);
                            continue;
                        }
                        // time_frame.from in reservation
                        if (reservation.from <= free_time_frame.from && free_time_frame.from <= reservation.to) {
                            free_time_frame.from = new Date(reservation.to);
                            continue;
                        }
                        // Otherwise no conflict
                    }
                }
            }
        }
        for (let i = ret.length - 1; i >= 0; i--) {
            const barber = ret[i];
            let barber_time_available = false;
            for (let j = barber.available_time.length - 1; j >= 0; j--) {
                const free_time_frame = barber.available_time[j];
                let more_time_available = true;
                let accumulator = 0;
                while (more_time_available) {
                    const time_from = new Date(free_time_frame.from);
                    time_from.setMinutes(time_from.getMinutes() + accumulator);
                    const time_to = new Date(time_from);
                    time_to.setMinutes(time_to.getMinutes() + barber.duration);
                    if (time_to > free_time_frame.to) {
                        barber.available_time.splice(j, 1);
                        more_time_available = false;
                    } else {
                        barber.available_time.push({ from: time_from, to: time_to });
                        barber_time_available = true;
                    }
                    accumulator += 15;
                }
            }
            if (!barber_time_available) {
                ret.splice(i, 1);
            }
        }

        return ret;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getReservations(request, response) {
    let ret = {};
    const reservation_body = {
        user_id: request.params.user_id,
    };
    if (request.query.hasOwnProperty("from")) {
        reservation_body.from = { "$gte": request.query.from };
    }
    if (request.query.hasOwnProperty("to")) {
        reservation_body.to = { "$lte": request.query.to };
    }

    try {
        const reservation_results = await schema.Reservation.find(reservation_body).exec();
        ret.reservations = reservation_results;

        return response.status(200).send(ret);
    } catch (error) {
        console.log(error);
        return response.status(500).send(error);
    }
}

async function registerReservation(request, response) {
    let ret = {
        reservation_id: 0,
        to: new Date(),
    };
    request.body.from = new Date(request.body.from);
    request.body.to = new Date(request.body.from);

    try {
        const store_result = await schema.Store.findOne({ store_id: request.body.store_id }).exec();
        if (store_result === null) {
            throw "/query/customer/registerReservation: No stores found with given store_id";
        }
        request.body.store_name = store_result.name;

        const user_result = await schema.User.findOne({ user_id: request.body.user_id }).exec();
        if (user_result === null) {
            throw "/query/customer/registerReservation: No user found with given user_id";
        }
        request.body.user_name = user_result.first_name + " " + user_result.last_name;

        const barber_result = await schema.Barber.findOne({ barber_id: request.body.barber_id }).exec();
        if (barber_result === null) {
            throw "/query/customer/registerReservation: No barber found with given barber_id";
        }
        request.body.barber_name = barber_result.name;
        for (const service of barber_result.services) {
            if (service.service === request.body.service) {
                request.body.to.setMinutes(request.body.to.getMinutes() + service.duration);
                break;
            }
        }
        request.body.reviewed = false;
        const doc = new schema.Reservation(request.body);

        await doc.save();
        ret.reservation_id = doc.reservation_id;
        ret.to = doc.to;

        return response.status(200).send(ret);
    } catch (error) {
        console.log(error);
        return response.status(500).send(error);
    }
}

async function deleteReservation(request, response) {
    let ret = { reservation_id: request.params.reservation_id };

    try {
        await schema.Reservation.deleteOne(ret).exec();

        return response.status(200).send(ret);
    } catch (error) {
        console.log(error);
        return response.status(500).send(error);
    }
}

function getDayOfWeek(index) {
    let mondayStart = index - 1;
    // this is really sunday
    if (mondayStart === -1) mondayStart = 6;
    return mondayStart;
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
