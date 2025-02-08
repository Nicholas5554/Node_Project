import express from "express";
import router from "./router/router.js";
import { badRequest } from "./middlewares/badRequest.js";
import { conn } from "./services/db.service.js";
import User from "./users/models/user.schema.js";
import Card from "./cards/models/cards.schema.js";
import usersSeed from "./users/initialData/initialusers.json" with {type: "json"};
import cardSeed from "./cards/initialData/initialCards.json" with {type: "json"};
import chalk from "chalk";
import { hashPassword } from "./users/services/password.service.js";
import dotenv from "dotenv";
import { morganFileLogger } from "./middlewares/logger.js";
import cors from "cors";

dotenv.config();
const { PORT } = process.env;

const app = express();


// adds a file with all the requast details and history
app.use(morganFileLogger);

app.use(cors());

// limiting the amout of the body size requast
app.use(express.json({ limit: "5mb" }));

// adds a static file folder
app.use(express.static("public"));

// running the router
app.use(router);

// handaling bad request with an error message
app.use(badRequest);

app.use((err, req, res, next) => {
    console.error(err.message);
    res.status(500).send("oh oh somthing broke")
});

app.listen(PORT, async () => {
    console.log(chalk.green(`the server is running on port : ${PORT}`));
    await conn();
    const usersFromDb = await User.find();

    // create deafult users if they dont exist
    try {
        usersSeed.forEach(async (user) => {
            if (usersFromDb.find((dbUser) => dbUser.email === user.email)) {
                return;
            };
            const newUser = new User(user);
            newUser.password = await hashPassword(newUser.password);
            await newUser.save();
        });
        // create deafult cards if the dont exist
        cardSeed.forEach(async (card) => {
            const cardsLength = await Card.find().countDocuments();

            if (cardsLength > 3) {
                return;
            };

            const newCard = new Card(card);
            await newCard.save();
        })
    } catch (err) {
        console.log(err);
    }
});