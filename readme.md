
# Quick Guide: How to start?

required: nodejs v18

* step-1: unzip the `DoGevElectricGuitars.zip`.

* step-2: open terminal or cmd inside your project folder... & type this command `npm i` or `npm install` both will do the same job. it will install all the packages & dependencies. wait until it finish...

* step-3: if you are using windows operating system then run this command `npm run dev` or `npm start` but if you run the server using `npm run dev` it will continuously restart the server whenever you make any changes in the code. but sometimes `npm run dev` doesn't work on several operating system.
In this case you have to install the `nodemon` package globally on your system by using this command below...
windows : `npm i -g nodemon`
linux or mac : `sudo npm i -g nodemon`
Then start your server `nodemon server.js`
then open your browser and visit at this url: `http://localhost:8080` (it's a default url)


### Database -
SQLite is the primary database. Its a in-directory database system that stored inside application folder `database.db`. NodeJS and Sequelize will automatically create tables and relations by itself.

### You can download `DB Browser for SQLite` and change the database as you please, add, update and remove data.


## Conclusions
`npm run dev` will continuously look to your files for detect any changes in code then it will restart the server by itself but if you just wanna use `npm start` or `node server.js` it will works fine but if you make any changes in the code then you have to restart the server using `ctrl+c` press multiple times... if it ask any `y/n` then type `y` and press enter. then start the server again with `npm start` or `node server.js`.
And for the database, no need any configuration... just run the server
