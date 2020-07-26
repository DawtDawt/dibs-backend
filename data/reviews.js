const { stores } = require("./stores");
const { users } = require("./users");
const { barbers } = require("./barbers");

/* Local constant */
const REVIEWS_PER_BARBER = 2;

function makeReviews() {
    let ret = [];
    const sample_reviews = [
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
        "Didn't allow explosives. Not happy about it. Me mam's a witch!",
        "Good haircut, watched quidditch on the tele",
        "I killed Sirius Black!!!!",
        "I solemnly swear that I am up to no good",
        "We'll send you a Hogwarts toilet seat",
        "My gram told me to get a haircut, she's a bit scary you know.",
        "You catch it, before the other team's seeker. You catch this, the game's over. You catch this, Potter, and we win.",
        "I beg your pardon? Our common room? I'm a Ravenclaw.",
        "Werewolf friendly. Much better than the cuts the Marauders gave me in the Shrieking Shack",
        "For the greater good"
    ];
    for (const i in stores) {
        const store_id = Number(i) + 1;
        const store_name = stores[i].name;

        for (const j in barbers) {
            const barber_id = Number(j) + 1;
            const barber_name = barbers[j].name;

            if (barbers[j].store_ids.includes(store_id)) {
                for (let k = 0; k < REVIEWS_PER_BARBER; k++) {
                    const review = sample_reviews[Math.floor(Math.random() * Math.floor(sample_reviews.length))];
                    const service = barbers[j].services[Math.floor(Math.random() * Math.floor(barbers[j].services.length))].service;
                    const user_id = Math.floor(Math.random() * Math.floor(users.length));
                    const user_name = users[user_id].first_name + " " + users[user_id].last_name;

                    ret.push({
                        store_id,
                        store_name,
                        barber_id,
                        barber_name,
                        user_id,
                        user_name,
                        date: new Date(),
                        rating: Math.ceil(Math.random() * Math.floor(4)),
                        service,
                        review,
                    });
                }
            }
        }
    }
    return ret;
}

module.exports = {
    makeReviews,
};
