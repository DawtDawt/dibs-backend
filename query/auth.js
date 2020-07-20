const schema = require("../schemas");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET || "TOP_SECRET";

async function signIn(req, res) {
    try {
        // Find user in db
        const user = await schema.User.findOne({
            email: req.body.email,
        });
        const inputPassword = req.body.password;

        // Check user exists and password hashes match
        if (user === null || !(await bcrypt.compare(inputPassword, user.password))) {
            return res.status(401).send({ msg: "Incorrect username or password" });
        }

        // Create JWT
        const token = jwt.sign(
            {
                email: user.email,
                role: user.role,
                exp: Math.floor(Date.now() / 1000) + 60 * 60, // expires in 1hr
            },
            JWT_SECRET
        );

        // Set JWT as httpOnly cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
        });

        res.status(200).json({ email: user.email, role: user.role });
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
}

function signOut(req, res) {
    try {
        res.clearCookie("token");
        res.sendStatus(200);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

async function signUp(req, res) {
    try {
        // Check if any fields are missing
        const fields = ["password", "role", "first_name", "last_name", "email", "phone_number"];
        for (const elem of fields) {
            if (typeof req.body[elem] === "undefined") {
                return res.status(400).send({ msg: `Missing ${elem}` });
            }
        }

        // Check if username already exists
        if (await schema.User.exists({ email: String(req.body.email) })) {
            return res.status(409).send({ msg: "Username already exists" });
        }

        // Create User object to be stored in db
        const doc = {
            password: await bcrypt.hash(String(req.body.password), 10),
            role: String(req.body.role),
            first_name: String(req.body.first_name),
            last_name: String(req.body.last_name),
            email: String(req.body.email),
            phone_number: String(req.body.phone_number),
        };

        // Save new user
        const user = new schema.User(doc);
        await user.save();
        return res.sendStatus(201);
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
}

function verifyJWT(req, res, next) {
    console.log(req.cookies);
    const token = req.cookies.token;

    jwt.verify(token, JWT_SECRET, (err, payload) => {
        if (err) {
            console.log(err);
            return res.status(403).send({ msg: "Invalid credentials" });
        }
        req.payload = payload;
        next();
    });
}

module.exports = {
    signIn,
    signOut,
    signUp,
    verifyJWT,
};
