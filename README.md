# Banopoly (WIP)

Play MONOPOLY using the Banano cryptocurrency.

## Installation
1. Create a Spotify application and [get a refresh token](https://benwiz.com/blog/create-spotify-refresh-token/)
2. Install MongoDB [locally](https://docs.mongodb.com/manual/administration/install-community/) or set up a remote instance like [MongoDB Atlas](https://www.mongodb.com/de-de/pricing)

### Self-Hosting (e.g. on a VPS)
3. Clone this repository and move to its directory (e.g. ```git clone https://github.com/jschoedl/banopoly.git && cd banopoly```)
4. Install other dependencies using ```npm install```
5. Copy ```.env.local.example``` to ```.env.local``` and edit it if necessary
6. Add fun facts to ```public/funFacs.js``` as you wish

### Managed Hosting with Vercel
3. Start a [new project with this repository](https://vercel.com/new/clone?s=https%3A%2F%2Fgithub.com%2Fjschoedl%2Fbanopoly)
4. Add all environment variables from ```.env.local.example``` and set their values as needed

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

- [ ] fix contact download before game start
- [x] do not add already joined players on reload
- [ ] add a menu for editing fun facts
- [ ] fix animation on balance change
- [ ] replace BananoJS with another API that supports binding to balance change
- [ ] add other UI languages (currently German only)
- [ ] add instructions on securing the MongoDB database
- [ ] add an authorization dialog for Spotify
- [ ] clear database records at end of game
- [ ] use long polling for names on the invite page
- [ ] add an option to remove joined players
