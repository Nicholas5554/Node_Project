import chalk from "chalk";
import { connect } from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const { MONGO_ATLAS, MONGO_LOCAL } = process.env;

const db = process.env.ENVIRONMENT === "development" ? MONGO_LOCAL : MONGO_ATLAS;
const name = db === MONGO_LOCAL ? "local" : "atlas";

export const conn = async () => {
    try {
        await connect(db);
        console.log(chalk.magenta(`Connected to ${chalk.cyan(name)} Mongo Database`));
    } catch (err) {
        console.log(chalk.red(err));
    }
};