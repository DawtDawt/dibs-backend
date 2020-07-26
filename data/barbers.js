const images = require("./photosBase64");

const barbers = [
    // Jeremy
    {
        name: "Larry David",
        description:
            "Lawrence Gene David is an American comedian, writer, actor, director, and television producer. He and Jerry Seinfeld created the television series Seinfeld, of which David was the head writer and executive producer for the first seven seasons. David gained further recognition for the HBO series Curb Your Enthusiasm, which he created and stars in as a semi-fictionalized version of himself. David has written or co-written every episode of Curb Your Enthusiasm since its pilot episode in 1999.",
        picture: images.larrydavid,
        instagram: "https://instagram.com/curbyourlarrydavid",
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
        instagram: "https://instagram.com/jerryseinfeld",
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
        instagram: "https://instagram.com/ohsnapjbsmoove",
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
        instagram: "https://instagram.com/g_costanza",
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
        instagram: "https://instagram.com/michael.richards",
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
        instagram: "https://www.instagram.com/joey.tribbiani",
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
        instagram: "https://www.instagram.com/chandlerbingunofficia",
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
        instagram: "https://www.instagram.com/rossthedivorceforce9",
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
        instagram: "https://www.instagram.com/monicagellerbings",
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
        instagram: "https://www.instagram.com/jenniferaniston",
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
        instagram: "https://www.instagram.com/lisakudrow",
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
    // Jeremy (more)
    {
    name: "Ron Weasley",
    description:"Ronald Billius Weasley began attending Hogwarts School of Witchcraft and Wizardry in 1991 and was Sorted into Gryffindor House. He soon became close friends with fellow student Harry Potter and later Hermione Granger. Together, they made the Golden trio, they faced many challenges during their adolescence, including keeping the Philosopher's Stone from Professor Quirinus Quirrell, rescuing Ginny from the Basilisk of the Chamber of Secrets, saving Harry's godfather Sirius Black from the Dementors of Azkaban, guiding Harry through the Triwizard Tournament, forming Dumbledore's Army and fighting in numerous battles of the Second Wizarding War.",
    picture: images.ronweasley,
    instagram: "https://instagram.com/ronweasley",
    store_ids: [5],
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
    name: "Hermione Granger",
    description:"Hermione Jean Granger (b. 19 September, 1979) was an English Muggle-born witch born to Mr and Mrs Granger. At the age of eleven, she learned about her magical nature and was accepted into Hogwarts School of Witchcraft and Wizardry. Hermione began attending Hogwarts in 1991 and was Sorted into Gryffindor House. She possessed a brilliant academic mind and proved to be a gifted student in almost every subject that she studied.",
    picture: images.hermionegranger,
    instagram: "https://instagram.com/hermionejgranger16",
    store_ids: [5],
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
    name: "Harry Potter",
    description: "Harry James Potter was an English half-blood wizard, and one of the most famous wizards of modern times. Voldemort made his first vain attempt to circumvent the prophecy when Harry was a year and three months old. During this attempt, he murdered Harry's parents as they tried to protect him, but this unsuccessful attempt to kill Harry led to Voldemort's first downfall. This downfall marked the end of the First Wizarding War, and to Harry henceforth being known as the \"Boy Who Lived\", as he was the only known survivor of the Killing Curse.",
    picture: images.harrypotter,
    instagram: "https://instagram.com/harrypotter",
    store_ids: [5],
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
    name: "Tom Riddle",
    description:"Tom Marvolo Riddle (b. 31 December 1926), later known as Lord Voldemort or, alternatively as You-Know-Who, He-Who-Must-Not-Be-Named, or the Dark Lord, was an English half-blood wizard considered to have been the most powerful and dangerous Dark Wizard of all time. He was amongst the greatest wizards to have ever lived, often considered to be the second most powerful wizard in history, his only superior being Albus Dumbledore.",
    picture: images.tomriddle,
    instagram: "https://instagram.com/____fiennes____",
    store_ids: [6],
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
    name: "Draco Malfoy",
    description:"Draco Lucius Malfoy (b. 5 June 1980) was a British pure-blood wizard. The son of a Death Eater, Draco was raised to strongly believe in the importance of blood purity. He attended Hogwarts School of Witchcraft and Wizardry from 1991-1998 and was sorted into Slytherin House. During his years at Hogwarts, he became friends with Vincent Crabbe, Gregory Goyle, Pansy Parkinson, and other fellow Slytherins, but he quickly developed a rivalry with Harry Potter.",
    picture: images.dracomalfoy,
    instagram: "https://instagram.com/dracomalfoygram",
    store_ids: [6],
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
}
];

module.exports = {
    barbers,
};
