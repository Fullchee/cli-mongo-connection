'use strict'
/**
 * Encapsulate the mongo node driver connection
 */
const MongoClient = require('mongodb').MongoClient
const querystring = require('querystring')
const argv = require('minimist')(process.argv.slice(2))

/**
 *
 * @param {string} mongoURI - URI to the mongo database
 * @returns {Promise.<Object>} - connection to the provided mongo database
 */

async function getMongoConnection () {
  try {
    const client = await MongoClient.connect(createMongoURI(argv))
    return client
  } catch (err) {
    throw new Error('Could not connect to the Mongo Database: ' + argv)
  }
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
function createMongoURI (mongoInfo) {
  setMongoDefaults(mongoInfo)
  let mongoURL = 'mongodb://'

  const isMongoProtected = mongoInfo.username || mongoInfo.password

  if (isMongoProtected) {
    mongoURL += mongoInfo.username + ':' + mongoInfo.password + '@'
  }

  mongoURL += mongoInfo.host

    // Host has a port, don't use the mongoInfo.port
  if (mongoInfo.host && mongoInfo.host.indexOf(':') === -1) {
    mongoURL += ':' + mongoInfo.port
  }

  if (mongoInfo.databaseName) {
    mongoURL += '/' + mongoInfo.databaseName
  }

  const optionsString = querystring.stringify(mongoInfo.options)

  if (optionsString) {
    mongoURL += '?' + optionsString
  }
  return mongoURL
}

function setMongoDefaults (mongoInfo) {
  if (!mongoInfo) {
    mongoInfo = {}
  }
  mongoInfo.host = mongoInfo.host || 'localhost'
  mongoInfo.port = mongoInfo.port || '27017'
  mongoInfo.username = mongoInfo.username || ''
  mongoInfo.password = mongoInfo.password || ''
}

module.exports = getMongoConnection
