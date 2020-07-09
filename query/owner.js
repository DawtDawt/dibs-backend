const schema = require("../schemas");

function getStore(request, response) {
  let ret = [];

  const storeQuery = schema.Store.find(request.body).exec();

  storeQuery
    .then(res => {
      let promises = [];

      if (res === []) {
        return Promise.reject("/query/owner/getStore: No stores found with given params");
      }
      for (let store of res) {
        ret.push({ store_id: store.store_id, store: store, reviews: [], reservations: [] });
        promises.push(schema.Review.find({ store_id: store.store_id }).exec());
      }

      return Promise.all(promises);
    })
    .then(res => {
      let promises = [];

      for (let reviews of res) {
        if (reviews === []) {
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
    .then(res => {
      for (let reservations of res) {
        if (reservations === []) {
          break;
        }

        for (let entry of ret) {
          if (entry.store_id === reservations[0].store_id) {
            entry.reservations = reservations;
            break;
          }
        }
      }

      return response.status(200).send(ret);
    })
    .catch(error => {
      console.log(error);
      return response.status(404).send(error);
    });
}

function registerStore(request, response) {
  // TODO hook up external API to populate lat and lon
  request.body.lat = 0;
  request.body.lon = 0;
  request.body.rating = 0;
  request.body.barber_ids = [];

  const doc = new schema.Store(request.body);

  doc.save()
    .then(() => {
      return response.status(200).send({ store_id: doc.store_id });
    })
    .catch(error => {
      console.log(error);
      return response.status(500).send(error);
    });
}

function getBarber(request, response) {
  let ret = [];

  if (request.body.hasOwnProperty("store_id")) {
    request.body.store_ids = { $in: [request.body.store_id] };
    delete request.body.store_id;
  }

  const barberQuery = schema.Barber.find(request.body).exec();

  barberQuery
    .then(res => {
      let promises = [];

      if (res === []) {
        return Promise.reject("/query/owner/getBarber: No barbers found with given params");
      }
      for (let barber of res) {
        ret.push({ barber_id: barber.barber_id, barber: barber, reviews: [], reservations: [] });
        promises.push(schema.Review.find({ barber_id: barber.barber_id }).exec());
      }

      return Promise.all(promises);
    })
    .then(res => {
      let promises = [];

      for (let reviews of res) {
        if (reviews === []) {
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
    .then(res => {
      for (let reservations of res) {
        if (reservations === []) {
          break;
        }

        for (let entry of ret) {
          if (entry.barber_id === reservations[0].barber_id) {
            entry.reservations = reservations;
            break;
          }
        }
      }

      return response.status(200).send(ret);
    })
    .catch(error => {
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

      const storeQuery = schema.Store.updateMany({ $or: body }, { $push: { barber_ids: doc.barber_id }}).exec();
      return storeQuery;
    })
    .then(() => {
      return response.status(200).send({ barber_id: doc.barber_id });
    }).catch(error => {
      console.log(error);
      return response.status(500).send(error);
    });
}

module.exports = {
  getStore,
  getBarber,
  registerBarber,
  registerStore,
}