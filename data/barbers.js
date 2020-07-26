const images = require("./photosBase64");

const barbers = [
    // Jeremy
    {
        name: "Larry David",
        description:
            "Lawrence Gene David is an American comedian, writer, actor, director, and television producer. He and Jerry Seinfeld created the television series Seinfeld, of which David was the head writer and executive producer for the first seven seasons. David gained further recognition for the HBO series Curb Your Enthusiasm, which he created and stars in as a semi-fictionalized version of himself. David has written or co-written every episode of Curb Your Enthusiasm since its pilot episode in 1999.",
        picture: images.larrydavid,
        store_ids: [1],
        services: [{ service: "Haircut", duration: 45 }],
        schedule: [
            { isOpen: true, from: "0800", to: "1700" },
            { isOpen: true, from: "0800", to: "1700" },
            { isOpen: true, from: "0800", to: "1700" },
            { isOpen: true, from: "0800", to: "1700" },
            { isOpen: true, from: "0800", to: "1700" },
            { isOpen: true, from: "0800", to: "1700" },
            { isOpen: true, from: "0800", to: "1700" },
        ],
    },
    {
        name: "Jerry Seinfeld",
        description:
            "Jerome Allen Seinfeld is an American comedian, actor, writer, producer, and director. He is known for playing a semi-fictionalized version of himself in the sitcom Seinfeld, which he created and wrote with Larry David. The show aired on NBC from 1989 until 1998, becoming one of the most acclaimed and popular sitcoms of all-time.",
        picture: images.jerryseinfeld,
        store_ids: [1],
        services: [
            { service: "Haircut", duration: 30 },
            { service: "Shaving", duration: 30 },
        ],
        schedule: [
            { isOpen: true, from: "0800", to: "1700" },
            { isOpen: true, from: "0800", to: "1700" },
            { isOpen: true, from: "0800", to: "1700" },
            { isOpen: true, from: "0800", to: "1700" },
            { isOpen: true, from: "0800", to: "1700" },
            { isOpen: true, from: "0800", to: "1700" },
            { isOpen: true, from: "0800", to: "1700" },
        ],
    },
    {
        name: "J.B. Smoove",
        description:
            "Jerry Angelo Brooks, known as J. B. Smoove, is an American actor, writer, comedian, and voice actor. After beginning his career in 1995 on Def Comedy Jam, he was a writer and performer on NBC's Saturday Night Live (2003–05), and is best known for his recurring roles on HBO's Curb Your Enthusiasm (2007–present) and the CBS sitcom The Millers (2013–15).",
        picture: images.jbsmoove,
        store_ids: [1],
        services: [
            { service: "Nails", duration: 60 },
            { service: "Eyebrows", duration: 30 },
        ],
        schedule: [
            { isOpen: true, from: "0800", to: "1700" },
            { isOpen: true, from: "0800", to: "1700" },
            { isOpen: true, from: "0800", to: "1700" },
            { isOpen: true, from: "0800", to: "1700" },
            { isOpen: true, from: "0800", to: "1700" },
            { isOpen: true, from: "0800", to: "1700" },
            { isOpen: true, from: "0800", to: "1700" },
        ],
    },
    {
        name: "Jason Alexander",
        description:
            "Jay Scott Greenspan, known by his stage name Jason Alexander, is an American actor, comedian, singer, and director. Alexander is best known for his role as George Costanza in the television series Seinfeld (1989–1998), for which he was nominated for seven consecutive Primetime Emmy Awards and four Golden Globe Awards.",
        picture: images.jasonalexander,
        store_ids: [2],
        services: [
            { service: "Hair color", duration: 120 },
            { service: "Haircut", duration: 30 },
        ],
        schedule: [
            { isOpen: true, from: "0800", to: "1700" },
            { isOpen: true, from: "0800", to: "1700" },
            { isOpen: true, from: "0800", to: "1700" },
            { isOpen: true, from: "0800", to: "1700" },
            { isOpen: true, from: "0800", to: "1700" },
            { isOpen: true, from: "0800", to: "1700" },
            { isOpen: true, from: "0800", to: "1700" },
        ],
    },
    {
        name: "Michael Richards",
        description:
            "Michael Anthony Richards is an American actor, writer, television producer and retired comedian. He began his career as a stand-up comedian, first entering the national spotlight when he was featured on Billy Crystal's first cable TV special.",
        picture: images.michaelrichards,
        store_ids: [2],
        services: [
            { service: "Shaving", duration: 15 },
            { service: "Haircut", duration: 30 },
        ],
        schedule: [
            { isOpen: true, from: "0800", to: "1700" },
            { isOpen: true, from: "0800", to: "1700" },
            { isOpen: true, from: "0800", to: "1700" },
            { isOpen: true, from: "0800", to: "1700" },
            { isOpen: true, from: "0800", to: "1700" },
            { isOpen: true, from: "0800", to: "1700" },
            { isOpen: true, from: "0800", to: "1700" },
        ],
    },
    // TJ
    {
        name: "Joey Tribbiani",
        description:
            "Matthew Steven LeBlanc is an American actor, comedian and director. He is best known for his portrayal of Joey Tribbiani in the NBC sitcom Friends and in its spin-off series Joey. For his work on Friends, LeBlanc received three Emmy Award nominations.",
        picture: images.joeytribbiani,
        store_ids: [3],
        services: [
            { service: "Shaving", duration: 60 },
            { service: "Haircut", duration: 90 },
        ],
        schedule: [
            { isOpen: true, from: "0800", to: "1700" },
            { isOpen: true, from: "0800", to: "1700" },
            { isOpen: true, from: "0800", to: "1700" },
            { isOpen: true, from: "0800", to: "1700" },
            { isOpen: true, from: "0800", to: "1700" },
            { isOpen: true, from: "0800", to: "1700" },
            { isOpen: true, from: "0800", to: "1700" },
        ],
    },
    {
        name: "Chandler Bing",
        description:
            "Matthew Langford Perry is an American-Canadian actor, comedian, executive producer, screenwriter, and playwright who gained worldwide recognition for his role as Chandler Bing on the NBC television sitcom Friends, which ran from 1994 to 2004.",
        picture: images.chandlerbing,
        store_ids: [3],
        services: [
            { service: "Shaving", duration: 30 },
            { service: "Eyebrows", duration: 15 },
        ],
        schedule: [
            { isOpen: true, from: "0800", to: "1700" },
            { isOpen: true, from: "0800", to: "1700" },
            { isOpen: true, from: "0800", to: "1700" },
            { isOpen: true, from: "0800", to: "1700" },
            { isOpen: true, from: "0800", to: "1700" },
            { isOpen: true, from: "0800", to: "1700" },
            { isOpen: true, from: "0800", to: "1700" },
        ],
    },
    {
        name: "Ross Geller",
        description:
            "David Lawrence Schwimmer is an American actor, director and producer. Schwimmer began his acting career performing in school plays at Beverly Hills High School. In 1988, he graduated from Northwestern University with a Bachelor of Arts in theater and speech.",
        picture: images.rossgeller,
        store_ids: [3],
        services: [{ service: "Shaving", duration: 75 }],
        schedule: [
            { isOpen: true, from: "0800", to: "1700" },
            { isOpen: true, from: "0800", to: "1700" },
            { isOpen: true, from: "0800", to: "1700" },
            { isOpen: true, from: "0800", to: "1700" },
            { isOpen: true, from: "0800", to: "1700" },
            { isOpen: true, from: "0800", to: "1700" },
            { isOpen: true, from: "0800", to: "1700" },
        ],
    },
    {
        name: "Monica Geller",
        description:
            "Courteney Bass Cox is an American actress, producer, and director. She gained worldwide recognition for her starring role as Monica Geller on the NBC sitcom Friends and as Gale Weathers in the horror film series Scream.",
        picture: images.monicageller,
        store_ids: [4],
        services: [
            { service: "Haircut", duration: 30 },
            { service: "Hair color", duration: 60 },
            { service: "Eyebrows", duration: 15 },
            { service: "Nails", duration: 15 },
            { service: "Waxing", duration: 90 },
        ],
        schedule: [
            { isOpen: true, from: "0800", to: "1700" },
            { isOpen: true, from: "0800", to: "1700" },
            { isOpen: true, from: "0800", to: "1700" },
            { isOpen: true, from: "0800", to: "1700" },
            { isOpen: true, from: "0800", to: "1700" },
            { isOpen: true, from: "0800", to: "1700" },
            { isOpen: true, from: "0800", to: "1700" },
        ],
    },
    {
        name: "Rachel Green",
        description:
            "Jennifer Joanna Aniston is an American actress, film producer, and businesswoman. The daughter of actors John Aniston and Nancy Dow, she began working as an actress at an early age with an uncredited role in the 1987 film Mac and Me. Her first major film role came in the 1993 horror comedy Leprechaun",
        picture: images.rachelgreen,
        store_ids: [4],
        services: [{ service: "Nails", duration: 60 }],
        schedule: [
            { isOpen: true, from: "0800", to: "1700" },
            { isOpen: true, from: "0800", to: "1700" },
            { isOpen: true, from: "0800", to: "1700" },
            { isOpen: true, from: "0800", to: "1700" },
            { isOpen: true, from: "0800", to: "1700" },
            { isOpen: true, from: "0800", to: "1700" },
            { isOpen: true, from: "0800", to: "1700" },
        ],
    },
    {
      name: "Phoebe Buffay",
      description:
          "Lisa Valerie Kudrow is an American actress, comedian, writer, singer, and producer. After making guest appearances in several television sitcoms, including Cheers, she came to prominence with her main role of Phoebe Buffay in Friends, receiving a Screen Actors Guild Award nomination.",
      picture: images.phoebebuffay,
      store_ids: [4],
      services: [
          { service: "Haircut", duration: 15 },
      ],
      schedule: [
          { isOpen: true, from: "0800", to: "1700" },
          { isOpen: true, from: "0800", to: "1700" },
          { isOpen: true, from: "0800", to: "1700" },
          { isOpen: true, from: "0800", to: "1700" },
          { isOpen: true, from: "0800", to: "1700" },
          { isOpen: true, from: "0800", to: "1700" },
          { isOpen: true, from: "0800", to: "1700" },
      ],
  },
];

module.exports = {
    barbers,
};
