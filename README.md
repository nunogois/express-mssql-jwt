# express-mssql-jwt

A minimalist Node JS API showcasing an example with Express + MSSQL (SQL Server) + Passport + JWT that among other things includes:

* [Express](http://expressjs.com/)
* [mssql](https://www.npmjs.com/package/mssql)
* [Passport](http://www.passportjs.org/)
* [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)

## Setting up

There are 3 main files.
* **server.js** - The starting point and main file of the API. This is where you can add your routes, for example.
* **sql.js** - Handles MS SQL connectivity. You'll need to set *sql_config* to your SQL credentials.
* **session.js** - Handles authentication using Passport and JWT. You should properly secure *server_secret*. I've added a simple SQL check as a LocalStrategy (Passport) that you'll probably want to change.

### Quick Start
1. Run `npm install` on the project folder to install pre-requisites
2. Run `npm start` to start the server
3. Browse to [localhost:3000](http://localhost:3000)

I suggest using [Postman](https://www.getpostman.com/) to test it.
After correctly setting up:
* GET http://localhost:3000/me |
Should return 401 Unauthorized since it is a protected route.
* POST http://localhost:3000/login | { username: 'your_username', password: 'your_password' } | Should return your user object and token.
* GET http://localhost:3000/me | Authorization Bearer Token with the previously returned token | Should return your user object.

If you intend to use this project as a basis for your next API, make sure to follow the recommended security standards, like properly securing your secrets, hashing passwords, etc.

Contact me for more info.
