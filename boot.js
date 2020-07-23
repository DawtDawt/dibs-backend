const images = require("./photosBase64");
const constant = require("./constants");
const schema = require("./schemas");
const bcrypt = require("bcrypt");
require("dotenv").config();

async function initUsers() {
  for (let i = 0; i < constant.FAKE_DATA_ENTRIES; i++) {
    const roles = [constant.OWNER, constant.CUSTOMER];
    const role = roles[i % roles.length];
    const entry = new schema.User({
      password: bcrypt.hashSync("password", 10),
      role: role,
      first_name: "Michael",
      last_name: "Scott",
      email: "michaelscottpapercompany@me.com",
      phone_number: "7781234567"
    });
    entry.save(function (error) {
      if (error) return console.log(error.message);
    });
  }
}

async function initStores() {
  for (let i = 0; i < constant.FAKE_DATA_ENTRIES; i++) {
    const id = String(i);
    const price = (i%2) + 1;
    let hours = [];
    for (let j = 0; j < constant.DAYSINAWEEK; j++) {
      hours[j] = { isOpen: true, from: "0800", to: "1700" };
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
      lon: "-123.2460",
      website: "www.website.com",
      phone_number: "7781234567",
      pictures: [images.barberTitleBase64, images.barberChairsBase64, images.barberCutBase64, images.barberScissorsBase64],
      rating: price,
      services: "Haircut",
      hours: hours,
      barber_ids: [id]
    });
    entry.save(function (error) {
      if (error) return console.log(error.message);
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
      picture: images.barberPicBase64,
      store_ids: [id],
      services: [{ service: "Haircut", duration: 5 }],
      schedule: [{from: date, to: date}]
    });
    entry.save(function (error) {
      if (error) return console.log(error.message);
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
      name: "Michael Scott",
      date: new Date(),
      rating: 4,
      review: "This is a review"
    });
    entry.save(function (error) {
      if (error) return console.log(error.message);
    });
  }
}

async function initReservations() {
  for (let i = 0; i < constant.FAKE_DATA_ENTRIES; i++) {
    const id = String(i);
    const service = constant.SERVICES[i % constant.SERVICES.length];
    const from = new Date();
    const to = new Date();
    to.setDate(to.getHours() + 1);
    const entry = new schema.Reservation({
      user_id: id,
      barber_id: id,
      store_id: id,
      service: service,
      from: from,
      to: to
    });
    entry.save(function (error) {
      if (error) return console.log(error.message);
    });
  }
}

function addMinutes(date, minutes) {
  return new Date(date.getTime() + minutes*60000);
}

async function initDefaultShops(){
  // user
  const user = new schema.User({
    password: bcrypt.hashSync("password", 10),
    role: constant.OWNER,
    first_name: "Larry",
    last_name: "David",
    email: "larrydavid@gmail.com",
    phone_number: "7781234567"
  });
  user.save(function (error) {
    if (error) return console.log(error.message);
  });
  let hours = [];
  for (let j = 0; j < constant.DAYSINAWEEK; j++) {
    hours[j] = { isOpen: true, from: "0700", to: "1900" };
  }
  // shops
  const store = new schema.Store({
    owner_id: 11,
    name: "Larry's Excellent Barbershop",
    address: "#4 Privet Drive",
    city: "Vancouver",
    province: "BC",
    description: "If you’re looking for somewhere to get your hair cut in central downtown Vancouver, head to Junior’s Barbershop. Their friendly and professional barbers specialize in everything from edgy to traditional styles. From the friendly and professional staff, to the signed posters from celebrity patrons (like Idris Elba) adorning the walls, this may be the perfect place to laugh, relax, and get a fresh fade.",
    price: 3,
    lat: "49.2606",
    lon: "-123.2460",
    website: "www.excellentbarbershop.com",
    phone_number: "7781234567",
    pictures: [images.larrylogo, images.barberChairsBase64, images.barberCutBase64, images.barberScissorsBase64],
    rating: 3,
    services: ["Haircut", "Shaving", "Hair color","Eyebrows"],
    hours: hours,
    barber_ids: []
  });
  store.save(function (error) {
    if (error) return console.log(error.message);
  });
  const store2 = new schema.Store({
    owner_id: 11,
    name: "Jerry's Excellent Barbershop",
    address: "12 Grimmauld Place",
    city: "Vancouver",
    province: "BC",
    description: "Jerry’s is a gathering place not only to get a haircut, but also to engage in friendly banter, have a laugh, trade gossip and maybe make new friends. A relaxed and friendly environment comes with a great cut every visit, a vintage place for those who care about their hair.",
    price: 2,
    lat: "49.2606",
    lon: "-123.2460",
    website: "www.excellentbarbershop.com",
    phone_number: "7781234567",
    pictures: [images.jerrylogo, images.barberChairsBase64, images.barberCutBase64, images.barberScissorsBase64],
    rating: 3,
    services: ["Haircut", "Shaving", "Hair color","Eyebrows"],
    hours: hours,
    barber_ids: []
  });
  store2.save(function (error) {
    if (error) return console.log(error.message);
  });
  // barbers
  const date = new Date();
  const barber = new schema.Barber({
    name: "Larry David",
    description: "Lawrence Gene David is an American comedian, writer, actor, director, and television producer. He and Jerry Seinfeld created the television series Seinfeld, of which David was the head writer and executive producer for the first seven seasons. David gained further recognition for the HBO series Curb Your Enthusiasm, which he created and stars in as a semi-fictionalized version of himself. David has written or co-written every episode of Curb Your Enthusiasm since its pilot episode in 1999.",
    picture: images.larrydavid,
    store_ids: [11],
    services: [{ service: "Haircut", duration: 45 }],
    schedule: [{from: date, to: date}]
  });
  barber.save(function (error) {
    if (error) return console.log(error.message);
  });
  const barber2 = new schema.Barber({
    name: "Jerry Seinfeld",
    description: "Jerome Allen Seinfeld is an American comedian, actor, writer, producer, and director. He is known for playing a semi-fictionalized version of himself in the sitcom Seinfeld, which he created and wrote with Larry David. The show aired on NBC from 1989 until 1998, becoming one of the most acclaimed and popular sitcoms of all-time.",
    picture: images.jerryseinfeld,
    store_ids: [11],
    services: [{ service: "Haircut", duration: 30 }, { service: "Shaving", duration: 30 }],
    schedule: [{from: date, to: date}]
  });
  barber2.save(function (error) {
    if (error) return console.log(error.message);
  });
  const barber3 = new schema.Barber({
    name: "J.B. Smoove",
    description: "Jerry Angelo Brooks, known as J. B. Smoove, is an American actor, writer, comedian, and voice actor. After beginning his career in 1995 on Def Comedy Jam, he was a writer and performer on NBC's Saturday Night Live (2003–05), and is best known for his recurring roles on HBO's Curb Your Enthusiasm (2007–present) and the CBS sitcom The Millers (2013–15).",
    picture: images.jbsmoove,
    store_ids: [11],
    services: [{ service: "Nails", duration: 60 }, { service: "Eyebrows", duration: 30 }],
    schedule: [{from: date, to: date}]
  });
  barber3.save(function (error) {
    if (error) return console.log(error.message);
  });
  const barber4 = new schema.Barber({
    name: "Jason Alexander",
    description: "Jay Scott Greenspan, known by his stage name Jason Alexander, is an American actor, comedian, singer, and director. Alexander is best known for his role as George Costanza in the television series Seinfeld (1989–1998), for which he was nominated for seven consecutive Primetime Emmy Awards and four Golden Globe Awards.",
    picture: images.jasonalexander,
    store_ids: [12],
    services: [{ service: "Hair color", duration: 120 }, { service: "Haircut", duration: 30 }],
    schedule: [{from: date, to: date}]
  });
  barber4.save(function (error) {
    if (error) return console.log(error.message);
  });
  const barber5 = new schema.Barber({
    name: "Michael Richards",
    description:"Michael Anthony Richards is an American actor, writer, television producer and retired comedian. He began his career as a stand-up comedian, first entering the national spotlight when he was featured on Billy Crystal's first cable TV special.",
    picture: images.michaelrichards,
    store_ids: [12],
    services: [{ service: "Shaving", duration: 15 }, { service: "Haircut", duration: 30 }],
    schedule: [{from: date, to: date}]
  });
  barber5.save(function (error) {
    if (error) return console.log(error.message);
  });
  // Reviews
  const names = ["Frank Costanza", "Elaine Benes", "David Puddy", "Uncle Leo", "Newman", "J. Peterman", "Leon Black", "Lloyd Braun", "Susan Ross", "Morty Seinfeld"]
  const reviews = [
    "This shop doesn't celebrate FESTIVUS! SERENITY NOW!",
    "Got a haircut, yada yada yada...",
    "Cool haircut place",
    "My son is a better barber than these fools! Absolutely terrible service.",
    "Special service for postal workers, absolutely fantastic! Will be coming back. Just remember, when you control the mail, you control… information",
    "The toll road of denial is a long and dangerous one. The price, your soul. Oh, by the way, you have until five to clear out your desk. You’re fired.",
    "Everything I ate tasted like peaches! Good haircut anyways.",
    "Serenity now. Insanity later.",
    "We’ve got five hundred shows to choose from. Why should we give two guys, who have no idea, and no experience, more money?",
    "Look, I got a few good years left. If I want a Chip Ahoy, I’m having it.",
  ]
  for (let i = 0; i < 10; i++) {
    let id = 11;
    if (i >= 5) {
      id = 12;
    }
    const entry = new schema.Review({
      store_id: id,
      barber_id: id,
      user_id: id,
      name: names[i],
      date: new Date(),
      rating: Math.ceil(Math.random() * Math.floor(4)),
      review: reviews[i]
    });
    entry.save(function (error) {
      if (error) return console.log(error.message);
    });
  }
  // init reservations
  // init the array of times
  const today = new Date();
  const month = today.getMonth();
  const day = today.getDate();
  const year = today.getFullYear();
  const from = [
    new Date(year,month,day,10,0,0,0),
    new Date(year,month,day+1,10,0,0,0),
    new Date(year,month,day+2,12,30,0,0),
    new Date(year,month,day-1,15,30,0,0),
    new Date(year,month,day-2,16,0,0,0),
    new Date(year,month,day,9,0,0,0),
    new Date(year,month,day+1,11,0,0,0),
    new Date(year,month,day+2,13,0,0,0),
    new Date(year,month,day-1,14,30,0,0),
    new Date(year,month,day-2,15,0,0,0),
    new Date(year,month,day,12,0,0,0),
    new Date(year,month,day+1,10,0,0,0),
    new Date(year,month,day+2,10,0,0,0),
    new Date(year,month,day-1,10,30,0,0),
    new Date(year,month,day-2,10,0,0,0),
    new Date(year,month,day,14,0,0,0),
    new Date(year,month,day+1,16,0,0,0),
    new Date(year,month,day+2,9,30,0,0),
    new Date(year,month,day-1,11,0,0,0),
    new Date(year,month,day-2,12,30,0,0),
  ];
  const to = [];
  // add the times to reservations for the barbers
  for(let i = 0; i < from.length; i++) {
    let toAdd = 30;
    if(i % 5 === 0) {
      toAdd = 45
    }
    if(i % 3 === 0) {
      toAdd = 60;
    }
    if(i === 19 || i === 11) {
      toAdd = 120;
    }
    to[i] = addMinutes(from[i], toAdd);
  }
  for (let i =  0; i < from.length; i++) {
    let b = 0;
    if(i % 3 === 0) {
      b = 11;
    } else if(i % 3 === 1) {
      b = 12;
    } else if(i % 3 === 2) {
      b = 13;
    }
    const service = constant.SERVICES[i % constant.SERVICES.length];
    const entry = new schema.Reservation({
      user_id: 10,
      barber_id: b,
      store_id: 11,
      service: service,
      from: from[i],
      to: to[i]
    });
    entry.save(function (error) {
      if (error) return console.log(error.message);
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
  await initDefaultShops();
}

module.exports = {
  init
};