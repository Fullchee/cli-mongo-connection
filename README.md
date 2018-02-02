# cli-mongo-connection
Get the Mongo information from the 

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
$ fileName -h <host> [--port <port> -u <username> -p <password>]
```