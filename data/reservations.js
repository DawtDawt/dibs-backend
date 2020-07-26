const constants = require("../constants");
const { stores } = require("./stores");
const { users } = require("./users");
const { barbers } = require("./barbers");

/* Local constants */
const RESERVATIONS_PER_BARBER = 8;

/* Local data */
let reservations = [];

function makeReservations() {
    let ret = [];
    const today = new Date();
    const month = today.getMonth();
    const day = today.getDate();
    const year = today.getFullYear();
    const from_array = [
        new Date(year, month, day, 10, 0, 0, 0),
        new Date(year, month, day + 1, 8, 30, 0, 0),
        new Date(year, month, day + 2, 8, 0, 0, 0),
        new Date(year, month, day - 1, 8, 30, 0, 0),
        new Date(year, month, day - 2, 8, 0, 0, 0),
        new Date(year, month, day, 12, 0, 0, 0),
        new Date(year, month, day + 1, 12, 30, 0, 0),
        new Date(year, month, day + 2, 12, 0, 0, 0),
        new Date(year, month, day - 1, 12, 30, 0, 0),
        new Date(year, month, day - 2, 12, 0, 0, 0),
        new Date(year, month, day, 14, 0, 0, 0),
        new Date(year, month, day + 1, 14, 30, 0, 0),
        new Date(year, month, day + 2, 14, 0, 0, 0),
        new Date(year, month, day - 1, 14, 30, 0, 0),
        new Date(year, month, day - 2, 14, 0, 0, 0),
        new Date(year, month, day, 16, 0, 0, 0),
        new Date(year, month, day + 1, 16, 30, 0, 0),
        new Date(year, month, day + 2, 16, 0, 0, 0),
        new Date(year, month, day - 1, 16, 30, 0, 0),
        new Date(year, month, day - 2, 16, 0, 0, 0),
    ];

    if (reservations.length !== 0) {
        return reservations;
    }

    if (from_array.length < RESERVATIONS_PER_BARBER) {
        console.log("/data/reservations: Reservations per barber cannot be less than total time slots possible");
        throw "/data/reservations: Reservations per barber cannot be less than total time slots possible";
    }

    const user_array = [];
    for (const i in users) {
        const user = users[i];
        if (user.role === constants.CUSTOMER) {
            user_array.push({ user_name: user.first_name + " " + user.last_name, user_id: Number(i) + 1 });
        }
    }

    for (const i in stores) {
        const store_id = Number(i) + 1;
        const store_name = stores[i].name;

        for (const j in barbers) {
            const barber_id = Number(j) + 1;
            const barber_name = barbers[j].name;
            let temp_from = from_array.slice();
            let count = 0;
            if (barbers[j].store_ids.includes(store_id)) {
                while (count < RESERVATIONS_PER_BARBER) {
                    const user_i = Math.floor(Math.random() * Math.floor(user_array.length));
                    const user_id = user_array[user_i].user_id;
                    const user_name = user_array[user_i].user_name;
                    const k = Math.floor(Math.random() * Math.floor(barbers[j].services.length));
                    const service = barbers[j].services[k].service;
                    const duration = barbers[j].services[k].duration;
                    const l = Math.floor(Math.random() * Math.floor(temp_from.length));
                    const from = new Date(temp_from[l]);
                    const to = new Date(from);
                    to.setMinutes(to.getMinutes() + duration);

                    ret.push({
                        user_id,
                        user_name,
                        barber_id,
                        barber_name,
                        store_id,
                        store_name,
                        service,
                        from,
                        to,
                    });

                    temp_from.splice(l, 1);
                    count++;
                }
            }
        }
    }
    reservations = ret;
    return ret;
}

module.exports = {
    makeReservations,
};
