import chalk from "chalk";

export const badRequest = (req, res) => {
    console.log(chalk.red(`404 - not found`));
    res.status(404).sendFile("public/404.html", { root: process.cwd() });
};