# Banopoly (WIP)

Play MONOPOLY using the Banano cryptocurrency.

## Installation
1. Create a Spotify application and [get a refresh token](https://benwiz.com/blog/create-spotify-refresh-token/)
2. Install MongoDB [locally](https://docs.mongodb.com/manual/administration/install-community/) or set up a remote instance
3. Install other dependencies using ```npm install```
4. Start MongoDB (e.g. ```sudo service mongod start```)
5. Copy ```.env.local.example``` to ```.env.local``` and edit it if necessary
6. Copy ```public/funFacs.js.example``` to ```public/funFacs.js``` and add fun facts as you wish

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

## To do
Feel free to submit a pull request.

- [ ] fix animation on balance change
- [ ] do not add already joined players on reload
- [ ] replace BananoJS with another API that supports binding to balance change
- [ ] add other UI languages (currently German only)
- [ ] add instructions on securing the MongoDB database
- [ ] add an authorization dialog for Spotify
- [ ] clear database records at end of game
- [ ] use long polling for names on the invite page
- [ ] add an option to remove joined players
