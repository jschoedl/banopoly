# Banopoly

Play MONOPOLY using the BANANO cryptocurrency.

## Installation
1. Install MongoDB [locally](https://docs.mongodb.com/manual/administration/install-community/) or set up a remote instance
2. Install other dependencies using ```npm install```
3. Start MongoDB (e.g. ```sudo service mongod start```)
4. Copy ```.env.local.example``` to ```.env.local``` and edit it if necessary
5. Copy ```public/funFacs.js.example``` to ```public/funFacs.js``` and add fun facts as you wish

### Development
```shell
npm dev
```

### Production Build
```shell
npm build
npm start
```

## Troubleshooting

### No Connection to MongoDB
* check ```sudo service mongod status```
  * is inactive:
  ```shell
    sudo service mongod start
  ```
  * fails with status 14: 
  ```shell
    sudo chown -R mongodb:mongodb /var/lib/mongodb
    sudo chown mongodb:mongodb /tmp/mongodb-27017.sock
    sudo service mongod restart
  ```