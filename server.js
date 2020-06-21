const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const owner = require("./query/owner");
const customer = require("./query/customer");
require('dotenv').config();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || `mongodb://localhost:27017/dibs`);

global.mongoose = mongoose;

const app = express();

const allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Headers', "*");
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  next();
};
app.use(allowCrossDomain);
app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());

/* Endpoints */

app.get('/', (request, response) => {
  response.status(200).send('ok');
});

/* Owner */

app.get('/api/owner/store/:store_id', owner.getStoreById);

app.get('/api/owner/barber/:store_id/:barber_id', owner.getBarberReservations);

app.post('/api/owner/store', owner.registerStore);

/* Customer */

app.get('/api/customer/store/:store_id', customer.getStoreById);

app.get('/api/customer/barber/:store_id/:barber_id', customer.getBarberReservations);

app.get('/api/customer/store/search/:count', customer.searchStore);

app.get('/api/customer/reviews/:user_id', customer.getReviews);

app.post('/api/customer/reviews', customer.setReview)

app.get('/api/customer/reservations/:user_id', customer.getReservations);

app.post('/api/customer/reservations', customer.setReservation);

app.delete('/api/customer/reservations/:reservation_id', customer.removeReservation);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`)
});