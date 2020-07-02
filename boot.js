const constant = require("./constants");
const general = require("./schemas/user");
const owner = require("./schemas");
require('dotenv').config();

/* Set to true if fake data is needed */
var populate = true;

async function initUsers() {
  const User = mongoose.model('User', general.userSchema);
  if (populate) {
    for (var i = 0; i < constant.FAKE_DATA_ENTRIES; i++) {
      const id = String(i);
      const roles = [constant.OWNER, constant.CUSTOMER];
      const role = roles[i%roles.length];
      const entry = new User({ 
        id: id, 
        password: "password", 
        role: role, 
        firstName: "Michael", 
        lastName: "Scott", 
        email: "michaelscottpapercompany@me.com", 
        phoneNumber: "7781234567"
      });
      entry.save(function (error) {
        if (error) return console.log(error.errmsg);
      });
    }
  }
}

async function initStores() {
  const Store = mongoose.model('Store', owner.storeSchema);
  if (populate) {
    for (var i = 0; i < constant.FAKE_DATA_ENTRIES; i++) {
      const id = String(i);
      var hours = [];
      for (var j = 0; j < constant.DAYSINAWEEK; j++) {
        hours[j] = {isOpen: true, from: "0000", to: "2400"};
      }
      const entry = new Store({ 
        id: id, 
        name: "StoreName", 
        address: "1234 Store Road", 
        city: "Vancouver", 
        province: "BC", 
        description: "This is a description",
        price: 1, 
        lat: "49.2606", 
        lon: "123.2460", 
        website: "www.website.com",
        phoneNumber: "7781234567",
        pictures: ["examplepictureurlforgridfs20200101"],
        hours: hours,
        barberIDs: [id]
      });
      entry.save(function (error) {
        if (error) return console.log(error.errmsg);
      });
    }
  }
}

async function initBarbers() {
  const Barber = mongoose.model('Barber', owner.barberSchema);
  if (populate) {
    for (var i = 0; i < constant.FAKE_DATA_ENTRIES; i++) {
      const id = String(i);
      const date = new Date();
      const entry = new Barber({
        id: id, 
        name: "BarberName",
        description: "This is a description",
        picture: "examplepictureurlforgridfs20200101",
        storeIDs: [id],
        services: [{service: "Haircut", duration: 5}],
        schedule: [date]
      });
      entry.save(function (error) {
        if (error) return console.log(error.errmsg);
      });
    }
  }
}

async function initReviews() {
  // [TW] unique compound index not working, need to debug
  owner.reviewSchema.index({barberID: 1, customerID: 1}, {unique: true});
  const Review = mongoose.model('Review', owner.reviewSchema);
  /*
  if (populate) {
    for (var i = 0; i < constant.FAKE_DATA_ENTRIES; i++) {
      const id = String(i);
      const entry = new Review({
        storeID: id,
        barberID: id,
        customerID: id,
        rating: 4,
        review: "This is a review"
      });
      entry.save(function (error) {
        if (error) return console.log(error.errmsg);
      });
    }
  }
  */
}

async function initReservations() {
  const Reservation = mongoose.model('Reservation', owner.reservationSchema);
  if (populate) {
    for (var i = 0; i < constant.FAKE_DATA_ENTRIES; i++) {
      const id = String(i);
      const service = constant.SERVICES[i%constant.SERVICES.length];
      const from = new Date();
      const to = new Date();
      to.setDate(to.getDate() + 1);
      const entry = new Reservation({
        id: id,
        customerID: id,
        barberID: id,
        storeID: id,
        service: service,
        from: from,
        to: to
      });
      entry.save(function (error) {
        if (error) return console.log(error.errmsg);
      });
    }
  }
}

async function init() {
  console.log("/boot.init: placeholder init");
  await initUsers();
  await initStores();
  await initBarbers();
  await initReviews();
  await initReservations();
}

module.exports = {
  init
};