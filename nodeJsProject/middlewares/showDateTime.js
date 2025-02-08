import chalk from "chalk";

export const showDateTime = (req, res, next) => {
    console.log(
        chalk.cyanBright(
            `${req.method} ${req.url} ${new Date().toLocaleDateString()} ${res.statusCode}`
        )
    );
    next();
}