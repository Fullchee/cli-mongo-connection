# cli-mongo-connection
[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)


![NSP Status](https://nodesecurity.io/orgs/fullchee/projects/a23818ce-83db-4f78-a130-6f4ca4ffca27/badge)


Get the Mongo information for command line programs.

## Code Usage
```js
const cliMongoConnection = require('cli-mongo-connection');

async function main() {
    const db = await cliMongoConnection();
    // do something with the connection to the database
}
```

## Program Usage
```bash
# use the same command line arguments as mongodump and mongorestore to connect to mongo
$ programName -h <host> [--port <port> -u <username> -p <password>]
```