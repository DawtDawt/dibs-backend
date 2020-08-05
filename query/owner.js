const schema = require("../schemas");
const nodeGeocoder = require("node-geocoder");
require("dotenv").config();

const options = {
    provider: "google",
    apiKey: process.env.GEOCODE_API,
    formatter: null,
};
const geocoder = nodeGeocoder(options);

async function getStore(request, response) {
    let ret = [];
    let promises = [];

    try {
        const store_results = await schema.Store.find(request.query).exec();

        promises = [];
        if (store_results.length === 0) {
            console.log("/query/owner/getStore: No stores found with given params");
            throw "/query/owner/getStore: No stores found with given params";
        }
        for (let store of store_results) {
            ret.push({
                store_id: store.store_id,
                store: store,
                reviews: [],
                reservations: [],
                barbers: [],
            });
            promises.push(schema.Review.find({ store_id: store.store_id }).exec());
        }
        const review_results = await Promise.all(promises);

        promises = [];
        for (let reviews of review_results) {
            if (reviews.length === 0) {
                break;
            }
            for (let entry of ret) {
                if (entry.store_id === reviews[0].store_id) {
                    entry.reviews = reviews;
                    break;
                }
            }
        }
        for (let entry of ret) {
            promises.push(schema.Reservation.find({ store_id: entry.store_id }).exec());
        }
        const reservation_results = await Promise.all(promises);

        promises = [];
        for (let reservations of reservation_results) {
            if (reservations.length === 0) {
                break;
            }
            for (let entry of ret) {
                if (entry.store_id === reservations[0].store_id) {
                    entry.reservations = reservations;
                    break;
                }
            }
        }
        for (let entry of ret) {
            promises.push(schema.Barber.find({ store_ids: { $in: [entry.store_id] } }));
        }
        const barber_results = await Promise.all(promises);

        for (let barbers of barber_results) {
            if (barbers.length === 0) {
                break;
            }
            for (let entry of ret) {
                let check = true;
                for (let barber of barbers) {
                    if (!barber.store_ids.includes(entry.store_id)) {
                        check = false;
                        break;
                    }
                }
                if (check) {
                    entry.barbers = barbers;
                    break;
                }
            }
        }

        return response.status(200).send(ret);
    } catch (error) {
        console.log(error);
        return response.status(500).send(error);
    }
}

async function registerStore(request, response) {
    let doc;
    request.body.lat = 0;
    request.body.lon = 0;
    request.body.rating = 0;
    request.body.barber_ids = [];

    try {
        const geocode_result = await geocoder.geocode({
            address: request.body.address + " " + request.body.city,
        });

        request.body.lat = geocode_result[0].latitude;
        request.body.lon = geocode_result[0].longitude;
        doc = new schema.Store(request.body);
        await doc.save();

        return response.status(200).send({ store_id: doc.store_id });
    } catch (error) {
        console.log(error);
        return response.status(500).send(error);
    }
}

// for future use
async function updateStore(request, response) {
    const store_id = request.body.store_id;
    delete request.body.store_id;

    try {
        const store_result = await schema.Store.findOne({ store_id }).exec();

        if (store_result.length === 0) {
            throw "/query/owner/updateStore: No stores found with given params";
        }
        let body = {};
        if (request.body.hasOwnProperty("address")) {
            body.address = request.body.address;
        } else {
            body.address = store_result.address;
        }
        if (request.body.hasOwnProperty("city")) {
            body.city = request.body.city;
        } else {
            body.city = store_result.city;
        }
        const geocode_result = await geocoder.geocode({
            address: body.address,
            city: body.city,
        });

        request.body.lat = geocode_result[0].latitude;
        request.body.lon = geocode_result[0].longitude;
        await schema.Store.findOneAndUpdate({ store_id }, request.body).exec();

        return response.status(200).send({ store_id });
    } catch (error) {
        console.log(error);
        return response.status(500).send(error);
    }
}

async function deleteStore(request, response) {
    let ret = {
        store_ids: [],
        barber_ids: [],
    };

    try {
        const store_results = await schema.Store.find(request.query).exec();

        if (store_results.length === 0) {
            console.log("/query/owner/deleteStore: No stores found with given params");
            throw "/query/owner/deleteStore: No stores found with given params";
        }
        for (let store of store_results) {
            ret.store_ids.push(store.store_id);
        }
        await schema.Store.deleteMany({ store_id: ret.store_ids }).exec();
        await schema.Review.deleteMany({ store_id: ret.store_ids }).exec();
        await schema.Reservation.deleteMany({ store_id: ret.store_ids }).exec();
        await schema.Barber.updateMany({ store_ids: { $in: ret.store_ids } }, { $pullAll: { store_ids: ret.store_ids } }).exec();
        const barber_results = await schema.Barber.find({ store_ids: [] }).exec();

        for (let barber of barber_results) {
            ret.barber_ids.push(barber.barber_id);
        }
        await schema.Barber.deleteMany({ store_ids: [] }).exec();

        return response.status(200).send(ret);
    } catch (error) {
        console.log(error);
        return response.status(500).send(error);
    }
}

async function getBarber(request, response) {
    let ret = [];
    let promises = [];

    if (request.query.hasOwnProperty("store_id")) {
        request.query.store_ids = { $in: [request.query.store_id] };
        delete request.query.store_id;
    }

    try {
        const barber_results = await schema.Barber.find(request.query).exec();

        promises = [];
        if (barber_results.length === 0) {
            throw "/query/owner/getBarber: No barbers found with given params";
        }
        for (let barber of barber_results) {
            ret.push({
                barber_id: barber.barber_id,
                barber: barber,
                reviews: [],
                reservations: [],
                stores: [],
            });
            promises.push(schema.Review.find({ barber_id: barber.barber_id }).exec());
        }
        const review_results = await Promise.all(promises);

        promises = [];
        for (let reviews of review_results) {
            if (reviews.length === 0) {
                break;
            }
            for (let entry of ret) {
                if (entry.barber_id === reviews[0].barber_id) {
                    entry.reviews = reviews;
                    break;
                }
            }
        }
        for (let entry of ret) {
            promises.push(schema.Reservation.find({ barber_id: entry.barber_id }).exec());
        }
        const reservation_results = await Promise.all(promises);

        promises = [];
        for (let reservations of reservation_results) {
            if (reservations.length === 0) {
                break;
            }
            for (let entry of ret) {
                if (entry.barber_id === reservations[0].barber_id) {
                    entry.reservations = reservations;
                    break;
                }
            }
        }
        for (let entry of ret) {
            promises.push(schema.Store.find({ barber_ids: { $in: [entry.barber_id] } }));
        }
        const store_results = await Promise.all(promises);

        for (let stores of store_results) {
            if (stores.length === 0) {
                break;
            }
            for (let entry of ret) {
                let check = true;
                for (let store of stores) {
                    if (!store.barber_ids.includes(entry.barber_id)) {
                        check = false;
                        break;
                    }
                }
                if (check) {
                    entry.stores = stores;
                    break;
                }
            }
        }

        return response.status(200).send(ret);
    } catch (error) {
        console.log(error);
        return response.status(500).send(error);
    }
}

async function registerBarber(request, response) {
    let body = [];

    try {
        const doc = new schema.Barber(request.body);
        await doc.save();

        for (let store_id of doc.store_ids) {
            body.push({ store_id: store_id });
        }

        await schema.Store.updateMany({ $or: body }, { $push: { barber_ids: doc.barber_id } }).exec();

        return response.status(200).send({ barber_id: doc.barber_id });
    } catch (error) {
        console.log(error);
        return response.status(500).send(error);
    }
}

// for future use
async function updateBarber(request, response) {
    const barber_id = request.body.barber_id;
    delete request.body.barber_id;

    try {
        const store_result = await schema.Barber.findOne({ barber_id }).exec();

        if (store_result.length === 0) {
            throw "/query/owner/updateBarber: No barbers found with given params";
        }
        await schema.Barber.findOneAndUpdate({ barber_id }, request.body).exec();

        return response.status(200).send({ barber_id });
    } catch (error) {
        console.log(error);
        return response.status(500).send(error);
    }
}

async function deleteBarber(request, response) {
    let ret = {
        barber_ids: [],
    };

    if (request.query.hasOwnProperty("store_id")) {
        request.query.store_ids = { $in: [request.query.store_id] };
        delete request.query.store_id;
    }

    try {
        const barber_results = await schema.Barber.find(request.query).exec();

        if (barber_results.length === 0) {
            console.log("/query/owner/deleteBarber: No barbers found with given params");
            throw "/query/owner/deleteBarber: No barbers found with given params";
        }
        for (let barber of barber_results) {
            ret.barber_ids.push(barber.barber_id);
        }
        await schema.Barber.deleteMany({ barber_id: ret.barber_ids }).exec();
        await schema.Review.deleteMany({ barber_id: ret.barber_ids }).exec();
        await schema.Reservation.deleteMany({ barber_id: ret.barber_ids }).exec();
        await schema.Store.updateMany({ barber_ids: { $in: ret.barber_ids } }, { $pullAll: { barber_ids: ret.barber_ids } }).exec();

        return response.status(200).send(ret);
    } catch (error) {
        console.log(error);
        return response.status(500).send(error);
    }
}

module.exports = {
    getStore,
    registerStore,
    updateStore,
    deleteStore,
    getBarber,
    registerBarber,
    updateBarber,
    deleteBarber,
};
