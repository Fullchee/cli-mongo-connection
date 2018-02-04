'use strict'

const assert = require('assert')
const rewire = require('rewire') // access private functions to test
const path = require('path')
const cliMongoConnection = rewire(path.resolve(__dirname, '..', 'cli-mongo-connection.js'))

describe('cli-mongo-connection', function () {
  it('createMongoURI should generate a correct URI according to the mongo connection string', function () {
    const createMongoURI = cliMongoConnection.__get__('createMongoURI')
    const info1 = {
      host: 'localhost',
      port: '27017'
    }

    assert.equal(createMongoURI(info1), 'mongodb://localhost:27017')

    const info2 = {
      host: 'db.example.net',
      port: '28001',
      options: {
        replicaSet: 'test',
        ssl: true,
        connectionTimeoutMS: '100000',
        socketTimeoutMS: '10000',
        maxPoolSize: 100,
        minPoolSize: 0,
        w: 1
      }
    }

    assert.equal(createMongoURI(info2), 'mongodb://db.example.net:28001?replicaSet=test&ssl=true&connectionTimeoutMS=100000&socketTimeoutMS=10000&maxPoolSize=100&minPoolSize=0&w=1')

    assert.equal(createMongoURI({}), 'mongodb://localhost:27017')
  })

  it('functional tests', function () {

  })
})
