const { makeReservations } = require("./reservations");
const schemas = require("../schemas");

/* Local constant */
const REVIEWS_PER_BARBER = 3;

/* Local data*/
let reviews = [];

async function makeReviews() {
    let ret = [];
    const reservations = makeReservations();
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
        "For the greater good",
        "The man who passes the sentence should swing the sword",
        "The things I do for love",
        "It's the family name that lives on. It's all that lives on",
        "When you play the game of thrones  you win or you die",
        "I learned how to die a long time ago",
        "When dead men and worse come hunting… you think it matters who sits on the iron throne",
        "Turn us away and we will burn you first",
        "Your joy will turn to ashes in your mouth and you'll know the debt is paid",
        "I prayed to the gods. Take him away make him die",
        "A dragon is not a slave",
        "Burn them all. Burn them in their homes. Burn them in their beds",
        "Nothing isn't better or worse than anything. Nothing is just nothing",
        "Hate's as good a thing as any to keep a person going. Better than most",
        "Money buys a man's silence for a time. A bolt in the heart buys it forever",
        "It's not easy being drunk all the time. If it were easy  everyone would do it",
        "There is a beast in every man and it stirs when you put a sword in his hand",
        "All men must die but we are not men",
        "Power resides where men believe it resides",
        "A lion doesn’t concern himself with the opinions of a sheep",
        "The night is dark and full of terrors",
        "Winter is Coming",
    ];

    try {
        if (reviews.length !== 0) {
            return reviews;
        }

        for (let reservation of reservations) {
            ret.push({
                store_id: reservation.store_id,
                store_name: reservation.store_name,
                barber_id: reservation.barber_id,
                barber_name: reservation.barber_name,
                user_id: reservation.user_id,
                user_name: reservation.user_name,
                date: reservation.from,
                rating: Math.ceil(Math.random() * Math.floor(5)),
                service: reservation.service,
                review: sample_reviews[Math.floor(Math.random() * Math.floor(sample_reviews.length))],
                reservation_id: reservation.reservation_id,
            });
        }
        reviews = ret;

        return ret;
    } catch (error) {
        console.log("/data/reviews: no errors should've been thrown");
    }
}

module.exports = {
    makeReviews,
};
