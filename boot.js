const { users } = require("./data/users");
const { stores } = require("./data/stores");
const { barbers } = require("./data/barbers");
const { makeReviews } = require("./data/reviews");
const { makeReservations, setReservations } = require("./data/reservations");

const schema = require("./schemas");
const mongoose = require("mongoose");

async function deleteDb() {
    try {
        await mongoose.connection.on("connected", function () {
            mongoose.connection.db.dropDatabase();
        });
        console.log("/boot/init: database wiped");
    } catch (error) {
        console.log(error);
    }
}

async function initUsers() {
    try {
        for (const user of users) {
            await new schema.User(user).save();
        }
    } catch (error) {
        console.log(error);
    }
}

async function initStores() {
    try {
        for (const store of stores) {
            await new schema.Store(store).save();
        }
    } catch (error) {
        console.log(error);
    }
}

async function initBarbers() {
    try {
        for (const barber of barbers) {
            await new schema.Barber(barber).save();
        }
    } catch (error) {
        console.log(error);
    }
}

async function initReservations() {
    try {
        const reservations_with_id = [];
        const reservations = await makeReservations();
        for (const reservation of reservations) {
            const doc = await new schema.Reservation(reservation).save();
            reservations_with_id.push(doc);
        }
        await setReservations(reservations_with_id);
    } catch (error) {
        console.log(error);
    }
}

async function initReviews() {
    try {
        const reviews = await makeReviews();
        for (const review of reviews) {
            await new schema.Review(review).save();
            await schema.Reservation.findOneAndUpdate({ reservation_id: review.reservation_id }, { reviewed: true }).exec();
        }
        await updateStoreRatings();
    } catch (error) {
        console.log(error);
    }
}

async function updateStoreRatings() {
    try {
        const store_results = await schema.Store.find().exec();
        for (const store of store_results) {
            const aggregate_reviews = await schema.Review.aggregate([
                { "$match": { store_id: store.store_id } },
                { "$group": { _id: null, average: { "$avg": "$rating" } } },
            ]).exec();
            if (aggregate_reviews.length === 0) {
                await schema.Store.findOneAndUpdate({ store_id: store.store_id }, { rating: 5 });
            } else {
                await schema.Store.findOneAndUpdate({ store_id: store.store_id }, { rating: Math.ceil(aggregate_reviews[0].average) });
            }
        }
    } catch (error) {
        console.log(error);
    }
}

async function init() {
    await deleteDb();
    await initUsers();
    await initStores();
    await initBarbers();
    await initReservations();
    await initReviews();
    console.log("/boot/init: database populated");
}

module.exports = {
    init,
};
