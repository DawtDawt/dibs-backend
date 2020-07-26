const images = require("./photosBase64");
const constant = require("./constants");
const schema = require("./schemas");
const bcrypt = require("bcrypt");
require("dotenv").config();

async function deleteDb() {
    try {
        schema.User.remove({});
        schema.Store.remove({});
        schema.Barber.remove({});
        schema.Reservation.remove({});
        schema.Review.remove({});
    } catch (error) {
        console.log(error);
    }
}

function addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes * 60000);
}

const userNames = [
    "Michael Scott",
    "Dwight Schrute",
    "Jim Halpert",
    "Pam Beesly",
    "Andy Bernard",
    "Larry David"
];

const barberNames = [
    "Larry David",
    "Jerry Seinfeld",
    "J.B. Smoove",
    "Jason Alexander",
    "Michael Richards",
    "Ron Weasley",
    "Hermione Granger",
    "Harry Potter",
    "Tom Riddle",
    "Draco Malfoy"
];

const storeNames = [
    "Larry's Excellent Barbershop",
    "Little Jerry's Barbershop",
    "Dumbledore Cuts",
    "Death Eat Fades"
];

async function initUsers() {
    // user id 1
    try {
        const role = constant.CUSTOMER;
        const entry = new schema.User({
            password: bcrypt.hashSync("password", 10),
            role: role,
            first_name: "Michael",
            last_name: "Scott",
            email: "michaelscott@gmail.com",
            phone_number: "7781234567",
        });
        await entry.save();
    } catch (error) {
        console.log(error);
    }
    // user id 2
    try {
        const role = constant.CUSTOMER;
        const entry = new schema.User({
            password: bcrypt.hashSync("password", 10),
            role: role,
            first_name: "Dwight",
            last_name: "Schrute",
            email: "dwightschrute@gmail.com",
            phone_number: "7781234567",
        });
        await entry.save();
    } catch (error) {
        console.log(error);
    }
    // user id 3
    try {
        const role = constant.CUSTOMER;
        const entry = new schema.User({
            password: bcrypt.hashSync("password", 10),
            role: role,
            first_name: "Jim",
            last_name: "Halpert",
            email: "jimhalpert@gmail.com",
            phone_number: "7781234567",
        });
        await entry.save();
    } catch (error) {
        console.log(error);
    }
    // user id 4
    try {
        const role = constant.CUSTOMER;
        const entry = new schema.User({
            password: bcrypt.hashSync("password", 10),
            role: role,
            first_name: "Pam",
            last_name: "Beesly",
            email: "pambeesly@gmail.com",
            phone_number: "7781234567",
        });
        await entry.save();
    } catch (error) {
        console.log(error);
    }
    // user id 5
    try {
        const role = constant.CUSTOMER;
        const entry = new schema.User({
            password: bcrypt.hashSync("password", 10),
            role: role,
            first_name: "Andy",
            last_name: "Bernard",
            email: "andrewbernard@gmail.com",
            phone_number: "7781234567",
        });
        await entry.save();
    } catch (error) {
        console.log(error);
    }
    // user id 6
    try {
        const role = constant.OWNER;
        const entry = new schema.User({
            password: bcrypt.hashSync("password", 10),
            role: role,
            first_name: "Larry",
            last_name: "David",
            email: "larrydavid@gmail.com",
            phone_number: "7781234567",
        });
        await entry.save();
    } catch (error) {
        console.log(error);
    }
    // user id 7
    try {
        const role = constant.OWNER;
        const entry = new schema.User({
            password: bcrypt.hashSync("password", 10),
            role: role,
            first_name: "Harry",
            last_name: "Potter",
            email: "harrypotter@gmail.com",
            phone_number: "7781234567",
        });
        await entry.save();
    } catch (error) {
        console.log(error);
    }
}

async function initDefaultShops() {
    try {
        let hours = [];
        for (let j = 0; j < constant.DAYSINAWEEK; j++) {
            hours[j] = { isOpen: true, from: "0700", to: "1900" };
        }
        // shops - will have shop ID 1
        const store = new schema.Store({
            owner_id: 6,
            name: "Larry's Excellent Barbershop",
            address: "#4 Privet Drive",
            city: "Vancouver",
            province: "BC",
            description:
                "If you’re looking for somewhere to get your hair cut in central downtown Vancouver, head to Larry’s Barbershop. Their friendly and professional barbers specialize in everything from edgy to traditional styles. From the friendly and professional staff, to the signed posters from celebrity patrons (like Idris Elba) adorning the walls, this may be the perfect place to laugh, relax, and get a fresh fade.",
            price: 3,
            lat: "49.2606",
            lon: "-123.2460",
            website: "www.excellentbarbershop.com",
            neighbourhood: "Kitslano",
            phone_number: "7781234567",
            pictures: [
                images.larrylogo,
                images.barberChairsBase64,
                images.barberCutBase64,
                images.barberScissorsBase64,
            ],
            rating: 3,
            services: ["Haircut", "Shaving", "Hair color", "Eyebrows"],
            hours: hours,
            barber_ids: [1,2,3],
        });
        await store.save();
        // will have store ID 2
        const store2 = new schema.Store({
            owner_id: 6,
            name: "Little Jerry's Barbershop",
            address: "12 Grimmauld Place",
            city: "Vancouver",
            province: "BC",
            description:
                "Jerry’s is a gathering place not only to get a haircut, but also to engage in friendly banter, have a laugh, trade gossip and maybe make new friends. A relaxed and friendly environment comes with a great cut every visit, a vintage place for those who care about their hair.",
            price: 2,
            lat: "49.2606",
            lon: "-123.2460",
            website: "www.excellentbarbershop.com",
            neighbourhood: "Kitslano",
            phone_number: "7781234567",
            pictures: [
                images.jerrylogo,
                images.barberChairsBase64,
                images.barberCutBase64,
                images.barberScissorsBase64,
            ],
            rating: 3,
            services: ["Haircut", "Shaving", "Hair color", "Eyebrows"],
            hours: hours,
            barber_ids: [4,5],
        });
        await store2.save();
        // barbers
        const date = new Date();
        // id 1
        const barber = new schema.Barber({
            name: "Larry David",
            description:
                "Lawrence Gene David is an American comedian, writer, actor, director, and television producer. He and Jerry Seinfeld created the television series Seinfeld, of which David was the head writer and executive producer for the first seven seasons. David gained further recognition for the HBO series Curb Your Enthusiasm, which he created and stars in as a semi-fictionalized version of himself. David has written or co-written every episode of Curb Your Enthusiasm since its pilot episode in 1999.",
            picture: images.larrydavid,
            instagram: "https://instagram.com/curbyourlarrydavid",
            store_ids: [1],
            services: [{ service: "Haircut", duration: 45 }],
            schedule: [{ from: date, to: date }],
        });
        await barber.save(function (error) {
            if (error) return console.log(error.message);
        });
        // id 2
        const barber2 = new schema.Barber({
            name: "Jerry Seinfeld",
            description:
                "Jerome Allen Seinfeld is an American comedian, actor, writer, producer, and director. He is known for playing a semi-fictionalized version of himself in the sitcom Seinfeld, which he created and wrote with Larry David. The show aired on NBC from 1989 until 1998, becoming one of the most acclaimed and popular sitcoms of all-time.",
            picture: images.jerryseinfeld,
            instagram: "https://instagram.com/jerryseinfeld",
            store_ids: [1],
            services: [
                { service: "Haircut", duration: 30 },
                { service: "Shaving", duration: 30 },
            ],
            schedule: [{ from: date, to: date }],
        });
        await barber2.save();
        // id 3
        const barber3 = new schema.Barber({
            name: "J.B. Smoove",
            description:
                "Jerry Angelo Brooks, known as J. B. Smoove, is an American actor, writer, comedian, and voice actor. After beginning his career in 1995 on Def Comedy Jam, he was a writer and performer on NBC's Saturday Night Live (2003–05), and is best known for his recurring roles on HBO's Curb Your Enthusiasm (2007–present) and the CBS sitcom The Millers (2013–15).",
            picture: images.jbsmoove,
            instagram: "https://instagram.com/ohsnapjbsmoove",
            store_ids: [1],
            services: [
                { service: "Nails", duration: 60 },
                { service: "Eyebrows", duration: 30 },
            ],
            schedule: [{ from: date, to: date }],
        });
        await barber3.save();
        // id 4
        const barber4 = new schema.Barber({
            name: "Jason Alexander",
            description:
                "Jay Scott Greenspan, known by his stage name Jason Alexander, is an American actor, comedian, singer, and director. Alexander is best known for his role as George Costanza in the television series Seinfeld (1989–1998), for which he was nominated for seven consecutive Primetime Emmy Awards and four Golden Globe Awards.",
            picture: images.jasonalexander,
            instagram: "https://instagram.com/g_costanza",
            store_ids: [2],
            services: [
                { service: "Hair color", duration: 120 },
                { service: "Haircut", duration: 30 },
            ],
            schedule: [{ from: date, to: date }],
        });
        await barber4.save();
        // id 5
        const barber5 = new schema.Barber({
            name: "Michael Richards",
            description:
                "Michael Anthony Richards is an American actor, writer, television producer and retired comedian. He began his career as a stand-up comedian, first entering the national spotlight when he was featured on Billy Crystal's first cable TV special.",
            picture: images.michaelrichards,
            instagram: "https://instagram.com/michael.richards",
            store_ids: [2],
            services: [
                { service: "Shaving", duration: 15 },
                { service: "Haircut", duration: 30 },
            ],
            schedule: [{ from: date, to: date }],
        });
        await barber5.save();
        // Reviews
        const names = [
            "Frank Costanza",
            "Elaine Benes",
            "David Puddy",
            "Uncle Leo",
            "Newman",
            "J. Peterman",
            "Leon Black",
            "Lloyd Braun",
            "Susan Ross",
            "Morty Seinfeld",
        ];
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
        ];
        for (let i = 0; i < 10; i++) {
            // store id 1
            let id = 1;
            if (i >= 5) {
                // store id 2
                id = 2;
            }
            // user ID and barber ID
            const userID = (i % 5) + 1;
            const barberID = (i % 5) + 1;
            const entry = new schema.Review({
                store_id: id,
                barber_id: barberID,
                user_id: userID,
                user_name: names[i],
                barber_name: "Larry David",
                store_name: "Larry's Excellent Barbershop",
                date: new Date(),
                rating: Math.ceil(Math.random() * Math.floor(4)),
                review: reviews[i],
                service: constant.SERVICES[0],
            });
            await entry.save();
        }
        // init reservations
        // init the array of times
        const today = new Date();
        const month = today.getMonth();
        const day = today.getDate();
        const year = today.getFullYear();
        const from = [
            new Date(year, month, day, 10, 0, 0, 0),
            new Date(year, month, day + 1, 10, 0, 0, 0),
            new Date(year, month, day + 2, 12, 30, 0, 0),
            new Date(year, month, day - 1, 15, 30, 0, 0),
            new Date(year, month, day - 2, 16, 0, 0, 0),
            new Date(year, month, day, 9, 0, 0, 0),
            new Date(year, month, day + 1, 11, 0, 0, 0),
            new Date(year, month, day + 2, 13, 0, 0, 0),
            new Date(year, month, day - 1, 14, 30, 0, 0),
            new Date(year, month, day - 2, 15, 0, 0, 0),
            new Date(year, month, day, 12, 0, 0, 0),
            new Date(year, month, day + 1, 10, 0, 0, 0),
            new Date(year, month, day + 2, 10, 0, 0, 0),
            new Date(year, month, day - 1, 10, 30, 0, 0),
            new Date(year, month, day - 2, 10, 0, 0, 0),
            new Date(year, month, day, 14, 0, 0, 0),
            new Date(year, month, day + 1, 16, 0, 0, 0),
            new Date(year, month, day + 2, 9, 30, 0, 0),
            new Date(year, month, day - 1, 11, 0, 0, 0),
            new Date(year, month, day - 2, 12, 30, 0, 0),
        ];
        const to = [];
        // add the times to reservations for the barbers
        for (let i = 0; i < from.length; i++) {
            let toAdd = 30;
            if (i % 5 === 0) {
                toAdd = 45;
            }
            if (i % 3 === 0) {
                toAdd = 60;
            }
            if (i === 19 || i === 11) {
                toAdd = 120;
            }
            to[i] = addMinutes(from[i], toAdd);
        }
        // for store 1
        for (let i = 0; i < from.length; i++) {
            let b = 0;
            // the barber ID the reservation belongs to
            if (i % 3 === 0) {
                b = 1;
            } else if (i % 3 === 1) {
                b = 2;
            } else if (i % 3 === 2) {
                b = 3;
            }
            const userID = (i % 5) + 1;
            const service = constant.SERVICES[i % constant.SERVICES.length];
            const entry = new schema.Reservation({
                user_id: userID,
                user_name: userNames[userID-1],
                barber_id: b,
                barber_name: barberNames[b-1],
                store_id: 1,
                store_name: storeNames[0],
                service: service,
                from: from[i],
                to: to[i],
            });
            await entry.save();
        }
        // for store 2
        for (let i = 0; i < from.length; i++) {
            let b = 0;
            // the barber ID the reservation belongs to
            if (i % 2 === 0) {
                b = 4;
            } else if (i % 2 === 1) {
                b = 5;
            }
            const userID = (i % 5) + 1;
            const service = constant.SERVICES[i % constant.SERVICES.length];
            const entry = new schema.Reservation({
                user_id: userID,
                user_name: userNames[userID-1],
                barber_id: b,
                barber_name: barberNames[b-1],
                store_id: 2,
                store_name: storeNames[1],
                service: service,
                from: from[i],
                to: to[i],
            });
            await entry.save();
        }
    } catch (error) {
        console.log(error);
    }
}

async function initDefaultShops_owner7() {
    try {
        let hours = [];
        for (let j = 0; j < constant.DAYSINAWEEK; j++) {
            hours[j] = { isOpen: true, from: "0800", to: "1900" };
        }
        // shops - will have shop ID 3
        const store = new schema.Store({
            owner_id: 7,
            name: "Dumbledore Cuts",
            address: "#4 Privet Drive",
            city: "Vancouver",
            province: "BC",
            description: "Named after the greatest wizard of all time, Dumbledore cuts is the place to get a fresh chop in the wizarding world. No Death Eaters welcome.",
            price: 3,
            lat: "49.2606",
            lon: "-123.2460",
            website: "www.excellentbarbershop.com",
            neighbourhood: "Gastown",
            phone_number: "7781234567",
            pictures: [
                images.dumbledorelogo,
                images.barberChairsBase64,
                images.barberCutBase64,
                images.barberScissorsBase64,
            ],
            rating: 3,
            services: ["Haircut", "Shaving", "Hair color", "Eyebrows"],
            hours: hours,
            barber_ids: [6,7,8],
        });
        await store.save();
        // will have store ID 2
        const store2 = new schema.Store({
            owner_id: 7,
            name: "Death Eater Fades",
            address: "12 Grimmauld Place",
            city: "Vancouver",
            province: "BC",
            description:
                "Get the dark mark on your head! Unforgivable curses are welcome in our barbershop. Meet the Dark Lord himself, and he'll give you a fade!",
            price: 2,
            lat: "49.2606",
            lon: "-123.2460",
            website: "www.excellentbarbershop.com",
            neighbourhood: "Kitslano",
            phone_number: "7781234567",
            pictures: [
                images.darkmarklogo,
                images.barberChairsBase64,
                images.barberCutBase64,
                images.barberScissorsBase64,
            ],
            rating: 3,
            services: ["Haircut", "Shaving", "Hair color", "Eyebrows"],
            hours: hours,
            barber_ids: [9,10],
        });
        await store2.save();
        // barbers
        const date = new Date();
        // id 6
        const barber = new schema.Barber({
            name: "Ron Weasley",
            description:"Ronald Billius Weasley began attending Hogwarts School of Witchcraft and Wizardry in 1991 and was Sorted into Gryffindor House. He soon became close friends with fellow student Harry Potter and later Hermione Granger. Together, they made the Golden trio, they faced many challenges during their adolescence, including keeping the Philosopher's Stone from Professor Quirinus Quirrell, rescuing Ginny from the Basilisk of the Chamber of Secrets, saving Harry's godfather Sirius Black from the Dementors of Azkaban, guiding Harry through the Triwizard Tournament, forming Dumbledore's Army and fighting in numerous battles of the Second Wizarding War.",
            picture: images.ronweasley,
            instagram: "https://instagram.com/ronweasley",
            store_ids: [3],
            services: [{ service: "Haircut", duration: 45 }],
            schedule: [{ from: date, to: date }],
        });
        await barber.save(function (error) {
            if (error) return console.log(error.message);
        });
        // id 7
        const barber2 = new schema.Barber({
            name: "Hermione Granger",
            description:"Hermione Jean Granger (b. 19 September, 1979) was an English Muggle-born witch born to Mr and Mrs Granger. At the age of eleven, she learned about her magical nature and was accepted into Hogwarts School of Witchcraft and Wizardry. Hermione began attending Hogwarts in 1991 and was Sorted into Gryffindor House. She possessed a brilliant academic mind and proved to be a gifted student in almost every subject that she studied.",
            picture: images.hermionegranger,
            instagram: "https://instagram.com/hermionejgranger16",
            store_ids: [3],
            services: [
                { service: "Haircut", duration: 30 },
                { service: "Shaving", duration: 30 },
            ],
            schedule: [{ from: date, to: date }],
        });
        await barber2.save();
        // id 8
        const barber3 = new schema.Barber({
            name: "Harry Potter",
            description: "Harry James Potter was an English half-blood wizard, and one of the most famous wizards of modern times. Voldemort made his first vain attempt to circumvent the prophecy when Harry was a year and three months old. During this attempt, he murdered Harry's parents as they tried to protect him, but this unsuccessful attempt to kill Harry led to Voldemort's first downfall. This downfall marked the end of the First Wizarding War, and to Harry henceforth being known as the \"Boy Who Lived\", as he was the only known survivor of the Killing Curse.",
            picture: images.harrypotter,
            instagram: "https://instagram.com/harrypotter",
            store_ids: [3],
            services: [
                { service: "Nails", duration: 60 },
                { service: "Eyebrows", duration: 30 },
            ],
            schedule: [{ from: date, to: date }],
        });
        await barber3.save();
        // id 9
        const barber4 = new schema.Barber({
            name: "Tom Riddle",
            description:"Tom Marvolo Riddle (b. 31 December 1926), later known as Lord Voldemort or, alternatively as You-Know-Who, He-Who-Must-Not-Be-Named, or the Dark Lord, was an English half-blood wizard considered to have been the most powerful and dangerous Dark Wizard of all time. He was amongst the greatest wizards to have ever lived, often considered to be the second most powerful wizard in history, his only superior being Albus Dumbledore.",
            picture: images.tomriddle,
            instagram: "https://instagram.com/____fiennes____",
            store_ids: [4],
            services: [
                { service: "Hair color", duration: 120 },
                { service: "Haircut", duration: 30 },
            ],
            schedule: [{ from: date, to: date }],
        });
        await barber4.save();
        // id 10
        const barber5 = new schema.Barber({
            name: "Draco Malfoy",
            description:"Draco Lucius Malfoy (b. 5 June 1980) was a British pure-blood wizard. The son of a Death Eater, Draco was raised to strongly believe in the importance of blood purity. He attended Hogwarts School of Witchcraft and Wizardry from 1991-1998 and was sorted into Slytherin House. During his years at Hogwarts, he became friends with Vincent Crabbe, Gregory Goyle, Pansy Parkinson, and other fellow Slytherins, but he quickly developed a rivalry with Harry Potter.",
            picture: images.dracomalfoy,
            instagram: "https://instagram.com/dracomalfoygram",
            store_ids: [4],
            services: [
                { service: "Shaving", duration: 15 },
                { service: "Haircut", duration: 30 },
            ],
            schedule: [{ from: date, to: date }],
        });
        await barber5.save();
        // Reviews
        const names = [
            "Seamus Finnegan",
            "Dean Thomas",
            "Bellatrix Lestrange",
            "Fred Weasely",
            "George Weasley",
            "Neville Longbottom",
            "Oliver Wood",
            "Penelope Clearwater",
            "Remus Lupin",
            "Gellert Grindenwald",
        ];
        const reviews = [
            "Didn't allow explosives. Not happy about it. Me mam's a witch!",
            "Good haircut, watched quidditch on the tele",
            "I killed Sirius Black!!!!",
            "I solemnly swear that I am up to no good",
            "We'll send you a Hogwarts toilet seat",
            "My gram told me to get a haircut, she's a bit scary you know.",
            "You catch it, before the other team's seeker. You catch this, the game's over. You catch this, Potter, and we win.",
            "I beg your pardon? Our common room? I'm a Ravenclaw.",
            "Werewolf friendly. Much better than the cuts the Marauders gave me in the Shrieking Shack",
            "For the greater good",
        ];
        for (let i = 0; i < 10; i++) {
            // store id 3
            let id = 3;
            if (i >= 5) {
                // store id 4
                id = 4;
            }
            // user ID and barber ID
            const userID = (i % 5) + 1;
            const barberID = (i % 5) + 6;
            const entry = new schema.Review({
                store_id: id,
                barber_id: barberID,
                user_id: userID,
                user_name: names[i],
                barber_name: "Harry Potter",
                date: new Date(),
                store_name: "Dumbledore Cuts",
                rating: Math.ceil(Math.random() * Math.floor(4)),
                review: reviews[i],
                service: constant.SERVICES[0],
            });
            await entry.save();
        }
        // init reservations
        // init the array of times
        const today = new Date();
        const month = today.getMonth();
        const day = today.getDate();
        const year = today.getFullYear();
        const from = [
            new Date(year, month, day, 10, 0, 0, 0),
            new Date(year, month, day + 1, 10, 0, 0, 0),
            new Date(year, month, day + 2, 12, 30, 0, 0),
            new Date(year, month, day - 1, 15, 30, 0, 0),
            new Date(year, month, day - 2, 16, 0, 0, 0),
            new Date(year, month, day, 9, 0, 0, 0),
            new Date(year, month, day + 1, 11, 0, 0, 0),
            new Date(year, month, day + 2, 13, 0, 0, 0),
            new Date(year, month, day - 1, 14, 30, 0, 0),
            new Date(year, month, day - 2, 15, 0, 0, 0),
            new Date(year, month, day, 12, 0, 0, 0),
            new Date(year, month, day + 1, 10, 0, 0, 0),
            new Date(year, month, day + 2, 10, 0, 0, 0),
            new Date(year, month, day - 1, 10, 30, 0, 0),
            new Date(year, month, day - 2, 10, 0, 0, 0),
            new Date(year, month, day, 14, 0, 0, 0),
            new Date(year, month, day + 1, 16, 0, 0, 0),
            new Date(year, month, day + 2, 9, 30, 0, 0),
            new Date(year, month, day - 1, 11, 0, 0, 0),
            new Date(year, month, day - 2, 12, 30, 0, 0),
        ];
        const to = [];
        // add the times to reservations for the barbers
        for (let i = 0; i < from.length; i++) {
            let toAdd = 30;
            if (i % 5 === 0) {
                toAdd = 45;
            }
            if (i % 3 === 0) {
                toAdd = 60;
            }
            if (i === 19 || i === 11) {
                toAdd = 120;
            }
            to[i] = addMinutes(from[i], toAdd);
        }
        // for store 1
        for (let i = 0; i < from.length; i++) {
            let b = 0;
            // the barber ID the reservation belongs to
            if (i % 3 === 0) {
                b = 6;
            } else if (i % 3 === 1) {
                b = 7;
            } else if (i % 3 === 2) {
                b = 8;
            }
            const userID = (i % 5) + 1;
            const service = constant.SERVICES[i % constant.SERVICES.length];
            const entry = new schema.Reservation({
                user_id: userID,
                user_name: userNames[userID-1],
                barber_id: b,
                barber_name: barberNames[b-1],
                store_id: 3,
                store_name: storeNames[2],
                service: service,
                from: from[i],
                to: to[i],
            });
            await entry.save();
        }
        // for store 2
        for (let i = 0; i < from.length; i++) {
            let b = 0;
            // the barber ID the reservation belongs to
            if (i % 2 === 0) {
                b = 9;
            } else if (i % 2 === 1) {
                b = 10;
            }
            const userID = (i % 5) + 1;
            const service = constant.SERVICES[i % constant.SERVICES.length];
            const entry = new schema.Reservation({
                user_id: userID,
                user_name: userNames[userID-1],
                barber_id: b,
                barber_name: barberNames[b-1],
                store_id: 4,
                store_name: storeNames[3],
                service: service,
                from: from[i],
                to: to[i],
            });
            await entry.save();
        }
    } catch (error) {
        console.log(error);
    }
}

async function init() {
    console.log("/boot/init: placeholder init");
    await deleteDb();
    await initUsers();
    await initDefaultShops();
    await initDefaultShops_owner7();
}

module.exports = {
    init,
};