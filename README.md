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
## Weather-APP

This is my second project done with general assembly a 12 week 40 hour coding bootcamp. I decided to make a weather app beause I was always curious about how it works on my iphone. This app incorparates sequelize, express as well as a weather api that send current weather date.

If you would like to access/contribute you can fork this project at `https://github.com/fmuwanguzi/weather-app`.

You can also click on this link to use my app. Don't forget to signup.`https://my-weather-app.herokuapp.com`

If you are following along with code you will need to `npm install` in your terminal to install all dependencies.

### Weather API and weather routes

Started by adding a `weather.js` file to my routes folder. This can be done in the terminal with `touch wether.js` or directly through vscode.

I then allowed my app to access the routes in that file by adding and I activited my view in enngine

```js 
app.set('view engine', 'ejs');

app.use('/weather', require('./routes/weather'));
```

I skipped ahead before that I set up my requirements at the top of `server.js`

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

I set up a weather page with a default location using the weather api. For my default city I picked Los Angeles, CA. 

```js

//set opening page in weather to Los Angeles 
let city = 'los angeles'
let API_KEY = process.env.API_KEY;

//added units=imperial to get the right units for United states 
let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${API_KEY}`

router.get('/', (req, res) => {
    console.log('---weatherGetRoute---');
    axios.get(url)
    .then((response) => {
        const myWeather = response.data
        res.render('weather', {myWeather})
    })
    .catch(error => {
        console.log(error);
        res.send(error = "refresh your screen");
    });
});

```
Also using some styling in my views for weather.
I added a search bar at the top and at the bottom a button to add weather to saved places.

```js

<center>
<form action="/weather" method="POST" class="search">
    <label style="color: lightskyblue" for="city">City</label>
    <input type="text" name="city" id="city" placeholder="type city here"> 
    <button type="submit" class="btn btn-outline-success my-2 my-sm-0" data-toggle="popover" style="color: lightskyblue" >Search</button>
</form>
</center>

<br>

<div class="card" style="width: 18rem;">
    
    <div class="card-body">
    <h2 class="card-title"> <%= myWeather.name %> , <%= myWeather.sys.country %> </h2>
    <h2 class="card-text"><%= myWeather.weather[0].description %> </h2>
    <!-- <h3 class="card-text"><%= myWeather.weather[0].main %> </h3> -->
    <p class="card-text"><b> temperature </b> <%= myWeather.main.temp  %> </p>
    <p class="card-text"><b>what it feels like</b>  <%= myWeather.main.feels_like  %> </p>
    <p class="card-text"><b>minimum temp</b> <%= myWeather.main.temp_min %> </p>
     <p class="card-text"><b>max temp</b> <%=myWeather.main.temp_max  %> </p>
     <p class="card-text"><b>humidity</b> <%= myWeather.main.humidity %> </p>

        <!-- button set up-->
        <form action="/weather/save" method="POST">
            <!-- <input hidden type="image" name="icon" id="icon" value="http://openweathermap.org/img/wn/<%= myWeather.weather[0].icon %>@2x.png"> -->
            <input hidden type="text" name="city" id="city" value="<%=myWeather.name%>">
            <input hidden type="text" name="country" id="country" value="<%=myWeather.sys.country%>">
            <input hidden type="text" name="description" id="description" value="<%=myWeather.weather[0].description%>">
            <!-- <input hidden type="text" name="main" id="main" value="<%=myWeather.weather[0].main%>"> -->
            <input hidden type="number" name="temperature" id="temperature" value="<%=myWeather.main.temp%>">
            <input hidden type="number" name="feels_like" id="feels_like" value="<%=myWeather.main.feels_like%>">
            <input hidden type="number" name="min_temp" id="min_temp" value="<%=myWeather.main.temp_min%>">
            <input hidden type="number" name="max_temp" id="max_temp" value="<%=myWeather.main.temp_max%>">
            <input hidden type="number" name="humidity" id="humidity" value="<%=myWeather.main.humidity%>">
            
            <button class="btn btn-dark" style="color: lightskyblue" data-toggle="popover">add weather to saved places</button>
        </form>
    </div>

```
## Here's a little preview of what that looks like.


![images](./images/default.png)


## This app also uses authentication

Here is a quick run down