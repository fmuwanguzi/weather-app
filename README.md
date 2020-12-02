# Express Authentication

Express authentication template using Passport + flash messages + custom middleware

## What it includes

* Sequelize user model / migration
* Settings for PostgreSQL
* Passport and passport-local for authentication
* Sessions to keep user logged in between pages
* Flash messages for errors and successes
* Passwords that are hashed with BCrypt
* EJS Templating and EJS Layouts

### User Model

| Column Name | Data Type | Notes |
| --------------- | ------------- | ------------------------------ |
| id | Integer | Serial Primary Key, Auto-generated |
| name | String | Must be provided |
| email | String | Must be unique / used for login |
| password | String | Stored as a hash |
| createdAt | Date | Auto-generated |
| updatedAt | Date | Auto-generated |

### Default Routes

| Method | Path | Location | Purpose |
| ------ | ---------------- | -------------- | ------------------- |
| GET | / | server.js | Home page |
| GET | /auth/login | auth.js | Login form |
| GET | /auth/signup | auth.js | Signup form |
| POST | /auth/login | auth.js | Login user |
| POST | /auth/signup | auth.js | Creates User |
| GET | /auth/logout | auth.js | Removes session info |
| GET | /profile | server.js | Regular User Profile |

## Steps To Use

#### 1. Create a new repo on Github and use your 'express-authentication' as the template

When we are finished with this boilerplate, we are going to make it a template on Github that will allow us to create a new repo on Github with all this code already loaded in.
* Go to `github.com` and create a new repository. In the template dropdown, choose this template.
* Clone your new repo to your local machine
* Get Codin'!

#### 2. Delete any .keep files

The `.keep` files are there to maintain the file structure of the auth. If there is a folder that has nothing in it, git won't add it. The dev work around is to add a file to it that has nothing in it, just forces git to keep the folder so we can use it later.

#### 3. Install node modules from the package.json

```
npm install
```

(Or just `npm i` for short)

#### 4. Customize with new project name

Remove defaulty type stuff. Some areas to consider are:

* Title in `layout.ejs`
* Description/Repo Link in `package.json`
* Remove boilerplate's README content and replace with new project's readme

#### 5. Create a new database for the new project

Using the sequelize command line interface, you can create a new database from the terminal.

```
createdb <new_db_name>
```

#### 6. Update `config.json`

* Change the database name
* Other settings are likely okay, but check username, password, and dialect

#### 7. Check the models and migrations for relevance to your project's needs

For example, if your project requires a birthdate field, then don't add that in there. 

> When changing your models, update both the model and the migration.

#### 8. Run the migrations

```
sequelize db:migrate
```

#### 9. Add a `.env` file with the following fields:

* SESSION_SECRET: Can be any random string; usually a hash in production
* PORT: Usually 3000 or 8000

#### 10. Run server; make sure it works

```
nodemon
```

or

```
node server.js
```
## ------- each line above this will be subject to change before the project is turned in --------

This is my second project done with general assembly a 12 week 40 hour coding bootcamp. I decided to make a weather app beause I was allways curious about how it works on phone. This app incorparates sequelize, express as well as a weather api that send current weather date.

If you would like to access/contribute you can fork this project at `https://github.com/fmuwanguzi/weather-app`.

### Weather API and weather routes

Started by adding a `weather.js` file to my routes folder. This can be done in the terminal with `touch wether.js` or directly through vscode.

I then allowed my app to use the routes in that file by adding

```js 
app.use('/weather', require('./routes/weather'));
```

With that complete I added some of the

```js
const express = require('express');
const router = express.Router();
const db = require('../models');
const axios = require('axios');
require('dotenv').config()

const app = express();
app.use(express.urlencoded({ extended: false }));
```

To begin working with the weather api I was interested I will need `axios`(to fetch the url) and `dotenv` to hide my API key.

If you would like to read more about the openweather api here is a link `https://openweathermap.org/api` I used the `current weather data api` but as a stretch goal or if time permits I would like to switch to the `one call api` which I learned about a few days into my project.

## Accessing the api key

First step you need to do is to register with openweathermap its free 🤝 , then you can get free api key. 

I then used `postman` which is a api client to look at some of the information I would get back using the api.

Here some information I got back.
![images](./images/postan.png)