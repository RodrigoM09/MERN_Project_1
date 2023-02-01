const { format } = require('date-fns');
const{ v4: uuid } = require('uuid');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

// logEvents is used to log events to a file. It takes a message and a log file name as parameters.
// The message is the message to be logged. The log file name is the name of the file to log to.
const logEvents = async (message, logFileName) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`

    try{
        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, 'logs'));
        }
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logFileName), logItem);
    } catch (error) {
        console.log(error);
    }
}

// logger is used to log requests to the console and to a file.
// It takes a request, response, and next as parameters.
//
const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'reqLog.log')
    console.log(`${req.method} ${req.path}`)
    next();
}

// module.exports allows this file to be used in other files.
module.exports = {logEvents, logger}
