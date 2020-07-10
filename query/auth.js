const schema = require("../schemas");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET || "TOP_SECRET";

async function signIn(req, res) {
    try {
        // Find user in db
        const user = await schema.User.findOne({
            id: req.body.id,
        });
        const inputPassword = req.body.password;

        // Check user exists and password hashes match
        if (user === null || !(await bcrypt.compare(inputPassword, user.password))) {
            return res.status(401).send({ msg: "Incorrect username or password" });
        }

        // Create JWT
        const token = jwt.sign(
            {
                id: user.id,
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
        res.sendStatus(200);
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
        const doc = {
            id: String(req.body.id),
            password: await bcrypt.hash(String(req.body.password), 10),
            role: String(req.body.role),
            firstName: String(req.body.firstName),
            lastName: String(req.body.lastName),
            email: String(req.body.email),
            phoneNumber: String(req.body.phoneNumber),
        };

        // Check if any fields are missing
        for (const key in doc) {
            if (typeof doc[key] === "undefined") {
                return res.status(400).send({ msg: `Missing ${key}` });
            }
        }

        // Check if username already exists
        if (await schema.User.exists({ id: doc.id })) {
            return res.status(400).send({ msg: "Username already exists" });
        }

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
            return res.sendStatus(403);
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
