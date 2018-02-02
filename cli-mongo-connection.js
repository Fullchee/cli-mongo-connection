
"use strict";
/**
 * Encapsulate the mongo node driver connection
 */

const program = require('commander');
const MongoClient = require('mongodb').MongoClient;


function getCLIInfo() {
    program
        .usage('[options`] <file ...>')
        .option('-h --host <host>', "<hostname><:port> [localhost:27017]", "localhost:27017")
        .option('--port <port>', "<port> [27017]", "27017")
        .option('-u --username <username>', "<username>")
        .option('-p --password <password>', "<password>")
        .option('-d --database <database>', "<database name> [pvelocity-com]", "pvelocity-com")
        .parse(process.argv);

    return createMongoURL(program);
}

/**
 * Return a string representation of a provided object.
 *
 * By default, converts the objects into a string of URL options
 * @param {Object} object - the object to be transformed into a string
 * @param {string} separator - the string to be placed in between the key and value
 * @param {string} delimiter - the string to define the border between key-value pairs
 */
function objectToString(object, separator, delimiter) {
    if (!separator) {
        separator = '=';
    }
    if (!delimiter) {
        delimiter = '&';
    }
    var objectStr = '';

    var arr = [];

    for (var key in object) {
        if (object.hasOwnProperty(key)) {
            arr.push(key + separator + object[key]);
        }
    }
    objectStr = arr.join(delimiter);

    return objectStr;
}

/**
 *
 * Self contained function to generate the mongoURL without the need for PV.js or pvserver
 *
 * @param {Object} mongoInfo - mongo object with the following properties
 * @param {string} [mongoInfo.host='localhost'] - Host name of IP address of the machine that Hosts the mongo service or daemon
 * @param {string} [mongoInfo.port='27017'] - port number of the mongo service or daemon
 * @param {string} [mongoInfo.databaseName]
 * @param {string} [mongoInfo.username]
 * @param {string} [mongoInfo.password]
 * @param {Object} [mongoInfo.options]
 */
function createMongoURL(mongoInfo) {
    if (!mongoInfo) {
        mongoInfo = {};
    }
    mongoInfo.host = mongoInfo.host || 'localhost';
    mongoInfo.port = mongoInfo.port || '27017';
    mongoInfo.username = mongoInfo.username || '';
    mongoInfo.password = mongoInfo.password || '';
    mongoInfo.databaseName = mongoInfo.databaseName;

    let mongoURL = 'mongodb://';

    const isMongoProtected = mongoInfo.username || mongoInfo.password;

    if (isMongoProtected) {
        mongoURL += mongoInfo.username + ':' + mongoInfo.password + '@';
    }

    mongoURL += mongoInfo.host;

    // Host has a port, don't use the mongoInfo.port
    if (mongoInfo.host && mongoInfo.host.indexOf(':') === -1) {
        mongoURL += ':' + mongoInfo.port;
    }

    if (mongoInfo.databaseName) {
        mongoURL += '/' + mongoInfo.databaseName;
    }

    const optionsString = objectToString(mongoInfo.options);

    if (optionsString) {
        mongoURL += '?' + optionsString;
    }
    return mongoURL;
}

/**
 *
 * @param {string} mongoURI - URI to the mongo database
 * @returns {Promise.<Object>} - connection to the provided mongo database
 */
function getMongoConnection() {
    return MongoClient.connect(getCLIInfo());
}

module.exports = getMongoConnection;
