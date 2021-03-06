const images = require("./photosBase64");

const barbers = [
    // Jeremy
    {
        description:
            "Lawrence Gene David is an American comedian, writer, actor, director, and television producer. He and Jerry Seinfeld created the television series Seinfeld, of which David was the head writer and executive producer for the first seven seasons. David gained further recognition for the HBO series Curb Your Enthusiasm, which he created and stars in as a semi-fictionalized version of himself. David has written or co-written every episode of Curb Your Enthusiasm.",
        name: "Larry David",
        picture: images.larrydavid,
        instagram: "https://instagram.com/curbyourlarrydavid",
        store_ids: [1],
        services: [{ service: "Haircut", duration: 45 }, { service: "Hair color", duration: 45 }, ],
        schedule: [
            { isOpen: false, from: "0800", to: "1700" },
            { isOpen: true, from: "0800", to: "1700" },
            { isOpen: true, from: "0800", to: "1700" },
            { isOpen: true, from: "0800", to: "1700" },
            { isOpen: true, from: "0800", to: "2200" },
            { isOpen: true, from: "0800", to: "2200" },
            { isOpen: true, from: "0800", to: "2200" },
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
            { isOpen: true, from: "0800", to: "2200" },
            { isOpen: true, from: "0800", to: "2200" },
            { isOpen: false, from: "0800", to: "2200" },
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
            { isOpen: false, from: "0800", to: "1700" },
            { isOpen: true, from: "0800", to: "1700" },
            { isOpen: true, from: "0800", to: "2200" },
            { isOpen: true, from: "0800", to: "2200" },
            { isOpen: true, from: "0800", to: "2200" },
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
            { isOpen: true, from: "0800", to: "2200" },
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
            { isOpen: true, from: "0800", to: "2200" },
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
        services: [{ service: "Shaving", duration: 60 }],
        schedule: [
            { isOpen: true, from: "0800", to: "1700" },
            { isOpen: true, from: "0800", to: "1700" },
            { isOpen: true, from: "0800", to: "1700" },
            { isOpen: true, from: "0800", to: "1700" },
            { isOpen: true, from: "0800", to: "1700" },
            { isOpen: true, from: "0800", to: "1700" },
            { isOpen: true, from: "0800", to: "2200" },
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
        description:"Ronald Billius Weasley began attending Hogwarts School of Witchcraft and Wizardry in 1991 and was Sorted into Gryffindor House. He soon became close friends with fellow student Harry Potter and later Hermione Granger. Together, they made the Golden trio, they faced many challenges during their adolescence, including keeping the Philosopher's Stone from Professor Quirinus Quirrell, and rescuing Ginny from the Basilisk of the Chamber of Secrets.",
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
            { service: "Waxing", duration: 30 },
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
        description: "Harry James Potter was an English half-blood wizard, and one of the most famous wizards of modern times. Voldemort made his first vain attempt to circumvent the prophecy when Harry was a year and three months old. During this attempt, he murdered Harry's parents as they tried to protect him, but this unsuccessful attempt to kill Harry led to Voldemort's first downfall. Harry was henceforth known as the \"Boy Who Lived\".",
        picture: images.harrypotter,
        instagram: "https://instagram.com/harrypotter",
        store_ids: [5],
        services: [
            { service: "Hair color", duration: 60 },
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
            { isOpen: true, from: "0800", to: "2200" },
            { isOpen: true, from: "0800", to: "2200" },
            { isOpen: true, from: "0800", to: "2200" },
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
            { isOpen: true, from: "0800", to: "2200" },
            { isOpen: true, from: "0800", to: "1700" },
            { isOpen: true, from: "0800", to: "1700" },
        ],
    },
    {
        name: "Jon Snow",
        description:"Jon Snow, born Aegon Targaryen, is the son of Lyanna Stark and Rhaegar Targaryen, the late Prince of Dragonstone. From infancy, Jon is presented as the bastard son of Lord Eddard Stark, Lyanna's brother, and raised alongside his lawful children at Winterfell, the seat of House Stark. However, his true parentage is kept secret from everyone, including Jon himself, in order to protect him from those that sought the complete annihilation of House Targaryen.",
        picture: images.jonsnow,
        instagram: "https://instagram.com/kitharingtonn",
        store_ids: [7],
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
        name: "Arya Stark",
        description:"Princess Arya Stark is the third child and second daughter of Lord Eddard Stark and his wife, Lady Catelyn Stark. She is the sister of the incumbent Westerosi monarchs, Sansa, Queen in the North, and Brandon, King of the Andals and the First Men. After narrowly escaping the persecution of House Stark by House Lannister, Arya is trained as a Faceless Man at the House of Black and White in Braavos, using her abilities to avenge her family. ",
        picture: images.arya,
        instagram: "https://instagram.com/maisie_williams",
        store_ids: [7],
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
        name: "Bran Stark",
        description: "King Bran I the Broken, born Brandon Stark and commonly known simply as Bran, is the fourth child and second son of Eddard and Catelyn Stark. Bran is a warg and a greenseer serving as the new Three-Eyed Raven. Eventually, he was crowned as the twenty-second ruler of the Six Kingdoms, styled as Bran the Broken, the First of His Name, King of the Andals and the First Men, Lord of the Six Kingdoms, and Protector of the Realm.",
        picture: images.bran,
        instagram: "https://instagram.com/isaachwright",
        store_ids: [7],
        services: [
            { service: "Nails", duration: 60 },
            { service: "Waxing", duration: 30 },
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
        name: "Jaime Lannister",
        description:"Ser Jaime Lannister was the elder son of Lord Tywin Lannister, younger twin brother of Queen Cersei Lannister, and older brother of Tyrion Lannister. During Robert's Rebellion, Jaime killed Aerys Targaryen, earning the derogatory nickname 'Kingslayer'.",
        picture: images.jaime,
        instagram: "https://instagram.com/nikolajwilliamcw",
        store_ids: [8],
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
        name: "Cersei Lannister",
        description:"Queen Cersei I Lannister was the twentieth ruler of the Seven Kingdoms and the widow of King Robert Baratheon.",
        picture: images.cersei,
        instagram: "https://instagram.com/iamlenaheadey",
        store_ids: [8],
        services: [
            { service: "Shaving", duration: 15 },
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
        name: "Tyrion Lannister",
        description:"Lord Tyrion Lannister is the youngest child of Lord Tywin Lannister and younger brother of Cersei and Jaime Lannister.",
        picture: images.tyrion,
        instagram: "https://instagram.com/peterdinklage",
        store_ids: [8],
        services: [
            { service: "Nails", duration: 120 },
            { service: "Waxing", duration: 30 },
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
        name: "Podrick Payne",
        description:"Ser Podrick Payne, often called Pod, is a knight of House Payne and a member of King Bran the Broken's Kingsguard.",
        picture: images.podrick,
        instagram: "https://instagram.com/danportman",
        store_ids: [9],
        services: [
            { service: "Shaving", duration: 15 },
            { service: "Haircut", duration: 30 },
        ],
        schedule: [
            { isOpen: true, from: "0800", to: "1700" },
            { isOpen: true, from: "0800", to: "1700" },
            { isOpen: true, from: "0800", to: "1700" },
            { isOpen: true, from: "0800", to: "1700" },
            { isOpen: true, from: "0800", to: "2200" },
            { isOpen: true, from: "0800", to: "1700" },
            { isOpen: true, from: "0800", to: "2200" },
        ],
    },
    {
        name: "Brienne of Tarth",
        description:"Ser Brienne of Tarth is a knight of House Tarth and the only daughter of Lord Selwyn Tarth. Prior to the Battle of Winterfell, Brienne was knighted by Ser Jaime Lannister, making her the first woman of the Seven Kingdoms to become a knight.",
        picture: images.brienne,
        instagram: "https://instagram.com/gwendolineuniverse",
        store_ids: [9],
        services: [
            { service: "Hair color", duration: 120 },
            { service: "Haircut", duration: 30 },
        ],
        schedule: [
            { isOpen: true, from: "0800", to: "1700" },
            { isOpen: true, from: "0800", to: "1700" },
            { isOpen: true, from: "0800", to: "1700" },
            { isOpen: true, from: "0800", to: "1700" },
            { isOpen: true, from: "0800", to: "2200" },
            { isOpen: true, from: "0800", to: "2200" },
            { isOpen: true, from: "0800", to: "1700" },
        ],
    },
    {
        name: "Hodor",
        description:"Hodor is only capable of saying one word, 'hodor', though he can apparently understand complex instructions other people give him. Hodor is a seemingly nonsense word, though in the process it became the name everyone calls him.",
        picture: images.hodor,
        instagram: "https://instagram.com/kristiannairn",
        store_ids: [9],
        services: [
            { service: "Shaving", duration: 15 },
            { service: "Eyebrows", duration: 30 },
        ],
        schedule: [
            { isOpen: true, from: "0800", to: "1700" },
            { isOpen: true, from: "0800", to: "1700" },
            { isOpen: true, from: "0800", to: "1700" },
            { isOpen: true, from: "0800", to: "1700" },
            { isOpen: true, from: "0800", to: "1700" },
            { isOpen: true, from: "0800", to: "2200" },
            { isOpen: true, from: "0800", to: "1700" },
        ],
    },
    {
        name: "The Night King",
        description: "The Night King was a First Man who was captured by a tribe of the Children of the Forest. Leaf, who was among the group, pressed a dragonglass dagger into his chest, causing his eyes to turn blue and turning him into the first of the White Walkers.",
        picture: images.nightking,
        instagram: "https://instagram.com/vladimirfurdikofficial",
        store_ids: [10],
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
    {
        name: "Gregor Clegane",
        description: "Ser Gregor Clegane was a knight of House Clegane, the older brother of Sandor Clegane, and a notoriously fearsome, extremely lethal and much-feared warrior, with a tendency toward extreme and excessive violence. Due to his incredibly massive size, he is called 'The Mountain That Rides' or more often simply 'The Mountain.'",
        picture: images.gregor,
        instagram: "https://instagram.com/thorbjornsson",
        store_ids: [10],
        services: [
            { service: "Shaving", duration: 45 },
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
        name: "Gregor Kiczales",
        description:"Gregor Kiczales is an American computer scientist. He is currently a full time professor of computer science at the University of British Columbia. He is best known for developing the concept of aspect-oriented programming, and the AspectJ extension to the Java programming language, both of which he designed while working at Xerox PARC. He is also one of the co-authors of the specification for the Common Lisp Object System, and is the author of the book The Art of the Metaobject Protocol, along with Jim Des Rivières and Daniel G. Bobrow.",
        picture: images.gregork,
        instagram: "https://twitter.com/gregork",
        store_ids: [11],
        services: [
            { service: "Nails", duration: 60 },
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
        name: "Steve Wolfman",
        description:"In fact, for five years, I volunteered each weekend at the Seattle Animal Control Animal Shelter. Kathleen Kelly and I together run the 'Sundays in the Park Program'. Have you ever been at Greenlake in Seattle Sunday morning and seen a gaggle of dogs in blue 'I'm available for adoption' banners? That's us. I also assisted with the dog and dog handler training, sometimes walked the dogs at the shelter on Saturdays, and helped out with occasional special events (notably our fabulous summer Adopt-a-thons at Greenlake). You should visit your local shelter, and get yourself a dog, cat, rabbit, or other beastie.",
        picture: images.wolfman,
        instagram: "https://www.cs.ubc.ca/~wolf/",
        store_ids: [11],
        services: [
            { service: "Nails", duration: 60 },
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
        name: "Patrice Belleville",
        description:"As an instructor, part of my responsibilities include curriculum development. I am thus interested in improving the manner in which we communicate knowledge to our students, as well as in selecting the information we provide, and in organizing it to better prepare the student for work in industry or further education.",
        picture: images.patrice,
        instagram: "https://www.cs.ubc.ca/people/patrice-belleville",
        store_ids: [11],
        services: [
            { service: "Hair color", duration: 60 },
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
        name: "Yoda",
        description:"Yoda, a Force-sensitive male being belonging to a mysterious species, was a legendary Jedi Master who witnessed the rise and fall of the Galactic Republic, followed by the rise of the Galactic Empire. Small in stature but revered for his wisdom and power, Yoda trained generations of Jedi.",
        picture: images.yoda,
        instagram: "https://starwars.fandom.com/wiki/Yoda",
        store_ids: [12],
        services: [
            { service: "Nails", duration: 60 },
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
        name: "Ben Kenobi",
        description:"Obi-Wan Kenobi was a Force-sensitive human male, legendary Jedi Master, and member of the Jedi High Council during the Fall of the Republic. During the Age of the Empire, he went by the alias of Ben Kenobi in order to hide from the regime that drove the Jedi to near extinction in the aftermath of the Clone Wars.",
        picture: images.obiwan,
        instagram: "https://starwars.fandom.com/wiki/Obi-Wan_Kenobi",
        store_ids: [12],
        services: [
            { service: "Hair color", duration: 90 },
            { service: "Shaving", duration: 120 },
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
        name: "Mace Windu",
        description:"Mace Windu, a Force-sensitive human male, was a revered Jedi Master and member of the Jedi High Council during the last years of the Galactic Republic. During his time in the Jedi Order, he once served as elected leader of the Jedi and, during the Clone Wars, as a Jedi General in the Grand Army of the Republic. He was the greatest champion of the Jedi Order and promoted its ancient traditions.",
        picture: images.macewindu,
        instagram: "https://www.instagram.com/samuelljackson/",
        store_ids: [12],
        services: [
            { service: "Eyebrows", duration: 60 },
            { service: "Waxing", duration: 120 },
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
