const { createLogger, format, transports} = require("winston");
const { combine, timestamp, printf, json} = format;

//logger
const myFormat = printf(({level, message, timestamp}) => {
    return `${timestamp} ${level}: ${message}`;
})

const logger = createLogger({
    format: combine(
        timestamp(),
        myFormat
    ),
    transports: [
        new transports.Console(),
        new transports.File({
            filename: 'logs/app-log.log',
            format: combine(
                timestamp(),
                json()
            )
        })
    ]
});

module.exports = logger;