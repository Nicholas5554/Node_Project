import chalk from "chalk";
import morgan from "morgan";
import path from "path";
import fs from "fs";

export const requastLogger = morgan((tokens, req, res) => {
    const color = res.statusCode >= 400 ? chalk.red : chalk.green;
    return [
        chalk.cyanBright(new Date().toLocaleDateString()),
        chalk.cyanBright(new Date().toLocaleTimeString()),
        color(tokens.method(req, res)),
        color(tokens.url(req, res)),
        color(tokens.status(req, res)),
    ].join(' | ');
});


const fileFormat = (tokens, req, res) => {
    const showLog = tokens.status(req, res)
    if (showLog < 400) {
        return;

    } else {
        return [
            new Date().toLocaleDateString(),
            new Date().toLocaleTimeString(),
            tokens.method(req, res),
            tokens.url(req, res),
            showLog,
            tokens['response-time'](req, res) + 'ms',
        ].join(' | ');
    }

};

const logDir = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
};

const formattedDate = () => {
    const date = new Date();
    return date.toLocaleDateString("he-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    }).replace(/\./g, '-');
};

const accessLogStream = fs.createWriteStream(path.join(logDir, `${formattedDate()}.txt`), { flags: 'a' });

const fileLogger = morgan(fileFormat, {
    stream: accessLogStream
});

export const morganFileLogger = (req, res, next) => {
    requastLogger(req, res, (err) => {
        if (err) return next(err);
        fileLogger(req, res, next);
    });
}; 