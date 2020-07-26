const schema = require("../schemas");
const nodeGeocoder = require("node-geocoder");
require("dotenv").config();

const options = {
    provider: "google",
    apiKey: process.env.GEOCODE_API,
    formatter: null,
};
const geocoder = nodeGeocoder(options);

function getStore(request, response) {
    let ret = [];

    const storeQuery = schema.Store.find(request.query).exec();

    storeQuery
        .then((res) => {
            let promises = [];

            if (res.length === 0) {
                console.log("/query/owner/getStore: No stores found with given params");
                return Promise.reject("/query/owner/getStore: No stores found with given params");
            }
            for (let store of res) {
                ret.push({
                    store_id: store.store_id,
                    store: store,
                    reviews: [],
                    reservations: [],
                    barbers: [],
                });
                promises.push(schema.Review.find({ store_id: store.store_id }).exec());
            }
            return Promise.all(promises);
        })
        .then((res) => {
            let promises = [];

            for (let reviews of res) {
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
            return Promise.all(promises);
        })
        .then((res) => {
            let promises = [];

            for (let reservations of res) {
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
            return Promise.all(promises);
        })
        .then((res) => {
            for (let barbers of res) {
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
        })
        .catch((error) => {
            console.log(error);
            return response.status(404).send(error);
        });
}

function registerStore(request, response) {
    const geocode = geocoder.geocode({
        address: request.body.address,
    });
    let doc;

    request.body.lat = 0;
    request.body.lon = 0;
    request.body.rating = 0;
    request.body.barber_ids = [];

    geocode
        .then((res) => {
            console.log(res);
            request.body.lat = res[0].latitude;
            request.body.lon = res[0].longitude;
            doc = new schema.Store(request.body);
            return doc.save();
        })
        .then(() => {
            return response.status(200).send({ store_id: doc.store_id });
        })
        .catch((error) => {
            console.log(error);
            return response.status(500).send(error);
        });
}

function deleteStore(request, response) {
    let ret = {
        store_ids: [],
        barber_ids: [],
    };

    const storeQuery = schema.Store.find(request.query).exec();

    storeQuery
        .then((res) => {
            if (res.length === 0) {
                console.log("/query/owner/deleteStore: No stores found with given params");
                return Promise.reject("/query/owner/deleteStore: No stores found with given params");
            }
            for (let store of res) {
                ret.store_ids.push(store.store_id);
            }
            return schema.Store.deleteMany({ store_id: ret.store_ids }).exec();
        })
        .then(() => {
            return schema.Review.deleteMany({ store_id: ret.store_ids }).exec();
        })
        .then(() => {
            return schema.Reservation.deleteMany({ store_id: ret.store_ids }).exec();
        })
        .then(() => {
            return schema.Barber.updateMany({ store_ids: { $in: ret.store_ids } }, { $pullAll: { store_ids: ret.store_ids } }).exec();
        })
        .then(() => {
            return schema.Barber.find({ store_ids: [] }).exec();
        })
        .then((res) => {
            for (let barber of res) {
                ret.barber_ids.push(barber.barber_id);
            }
            return schema.Barber.deleteMany({ store_ids: [] }).exec();
        })
        .then(() => {
            return response.status(200).send(ret);
        })
        .catch((error) => {
            console.log(error);
            return response.status(500).send(error);
        });
}

function getBarber(request, response) {
    let ret = [];

    if (request.query.hasOwnProperty("store_id")) {
        request.query.store_ids = { $in: [request.query.store_id] };
        delete request.query.store_id;
    }

    const barberQuery = schema.Barber.find(request.query).exec();

    barberQuery
        .then((res) => {
            let promises = [];

            if (res.length === 0) {
                return Promise.reject("/query/owner/getBarber: No barbers found with given params");
            }
            for (let barber of res) {
                ret.push({
                    barber_id: barber.barber_id,
                    barber: barber,
                    reviews: [],
                    reservations: [],
                    stores: [],
                });
                promises.push(schema.Review.find({ barber_id: barber.barber_id }).exec());
            }
            return Promise.all(promises);
        })
        .then((res) => {
            let promises = [];

            for (let reviews of res) {
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

            return Promise.all(promises);
        })
        .then((res) => {
            let promises = [];

            for (let reservations of res) {
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
            return Promise.all(promises);
        })
        .then((res) => {
            for (let stores of res) {
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
        })
        .catch((error) => {
            console.log(error);
            return response.status(404).send(error);
        });
}

function registerBarber(request, response) {
    const doc = new schema.Barber(request.body);
    doc.save()
        .then(() => {
            let body = [];

            for (let store_id of doc.store_ids) {
                body.push({ store_id: store_id });
            }

            const storeQuery = schema.Store.updateMany({ $or: body }, { $push: { barber_ids: doc.barber_id } }).exec();

            return storeQuery;
        })
        .then(() => {
            return response.status(200).send({ barber_id: doc.barber_id });
        })
        .catch((error) => {
            console.log(error);
            return response.status(500).send(error);
        });
}

function deleteBarber(request, response) {
    let ret = {
        barber_ids: [],
    };

    if (request.query.hasOwnProperty("store_id")) {
        request.query.store_ids = { $in: [request.query.store_id] };
        delete request.query.store_id;
    }

    const barberQuery = schema.Barber.find(request.query).exec();

    barberQuery
        .then((res) => {
            if (res.length === 0) {
                console.log("/query/owner/deleteBarber: No barbers found with given params");
                return Promise.reject("/query/owner/deleteBarber: No barbers found with given params");
            }
            for (let barber of res) {
                ret.barber_ids.push(barber.barber_id);
            }
            return schema.Barber.deleteMany({ barber_id: ret.barber_ids }).exec();
        })
        .then(() => {
            return schema.Review.deleteMany({ barber_id: ret.barber_ids }).exec();
        })
        .then(() => {
            return schema.Reservation.deleteMany({ barber_id: ret.barber_ids }).exec();
        })
        .then(() => {
            return schema.Store.updateMany({ barber_ids: { $in: ret.barber_ids } }, { $pullAll: { barber_ids: ret.barber_ids } }).exec();
        })
        .then(() => {
            return response.status(200).send(ret);
        })
        .catch((error) => {
            console.log(error);
            return response.status(500).send(error);
        });
}

module.exports = {
    getStore,
    registerStore,
    deleteStore,
    getBarber,
    registerBarber,
    deleteBarber,
};
