const constant = require("./constants");
const schema = require("./schemas");
require("dotenv").config();

async function initUsers() {
  for (let i = 0; i < constant.FAKE_DATA_ENTRIES; i++) {
    const roles = [constant.OWNER, constant.CUSTOMER];
    const role = roles[i % roles.length];
    const entry = new schema.User({
      password: "password",
      role: role,
      first_name: "Michael",
      last_name: "Scott",
      email: "michaelscottpapercompany@me.com",
      phone_number: "7781234567"
    });
    entry.save(function (error) {
      if (error) return console.log(error.errmsg);
    });
  }
}

async function initStores() {
  for (let i = 0; i < constant.FAKE_DATA_ENTRIES; i++) {
    const id = String(i);
    const price = (i%3) + 1;
    let hours = [];
    for (let j = 0; j < constant.DAYSINAWEEK; j++) {
      hours[j] = { isOpen: true, from: "0000", to: "2400" };
    }
    const entry = new schema.Store({
      owner_id: id,
      name: "StoreName",
      address: "1234 Store Road",
      city: "Vancouver",
      province: "BC",
      description: "This is a description",
      price: price,
      lat: "49.2606",
      lon: "123.2460",
      website: "www.website.com",
      phone_number: "7781234567",
      pictures: ["examplepictureurlforgridfs20200101"],
      rating: price,
      services: "Haircut",
      hours: hours,
      barber_ids: [id]
    });
    entry.save(function (error) {
      if (error) return console.log(error.errmsg);
    });
  }
}

async function initBarbers() {
  for (let i = 0; i < constant.FAKE_DATA_ENTRIES; i++) {
    const id = String(i);
    const date = new Date();
    const entry = new schema.Barber({
      name: "BarberName",
      description: "This is a description",
      picture: "examplepictureurlforgridfs20200101",
      store_ids: [id],
      services: [{ service: "Haircut", duration: 5 }],
      schedule: [{from: date, to: date}]
    });
    entry.save(function (error) {
      if (error) return console.log(error.errmsg);
    });
  }
}

async function initReviews() {
  // [TW] unique compound index not working, need to debug
  for (let i = 0; i < constant.FAKE_DATA_ENTRIES; i++) {
    const id = String(i);
    const entry = new schema.Review({
      store_id: id,
      barber_id: id,
      user_id: id,
      rating: 4,
      review: "This is a review"
    });
    entry.save(function (error) {
      if (error) return console.log(error.errmsg);
    });
  }
}

async function initReservations() {
  for (let i = 0; i < constant.FAKE_DATA_ENTRIES; i++) {
    const id = String(i);
    const service = constant.SERVICES[i % constant.SERVICES.length];
    const from = new Date();
    const to = new Date();
    to.setDate(to.getDate() + 1);
    const entry = new schema.Reservation({
      user_id: id,
      barber_id: id,
      store_id: id,
      service: service,
      from: from,
      to: to
    });
    entry.save(function (error) {
      if (error) return console.log(error.errmsg);
    });
  }
}

async function init() {
  console.log("/boot/init: placeholder init");
  await initUsers();
  await initStores();
  await initBarbers();
  await initReviews();
  await initReservations();
}

module.exports = {
  init
};