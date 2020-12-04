example of looping through multiple values in a form may use this to clean up my code after i have the functionalities

<!-- <form action="/clubreq" method="post">
    <% for (var i in clubreq){%>
        Club Name: <input type="text" name="clubname[]" value="<%= clubreq[i].clubname %>" /><br><br>
        Club Type: <input type="text" name="clubtype[]" value="<%= clubreq[i].type %>" /><br><br>
        <input type="submit" value="accept"/><br><br><hr>
    <%} %>
</form> -->

models.weather.belongsToMany(models.user,  {through: 'userWeather'})
    
    userId integer
    weatherId integer


    models.weather.belongsTo(models.user)
     weather.init({
    userId: DataTypes.INTEGER,
    city: DataTypes.STRING,
    country: DataTypes.STRING,
    description: DataTypes.STRING,
    temperature: DataTypes.FLOAT,
    feels_like: DataTypes.FLOAT,
    min_temp: DataTypes.FLOAT,
    max_temp: DataTypes.FLOAT,
    humidity: DataTypes.INTEGER

    <div class="profile">


    <h2><%= myWeather.name %> , <%= myWeather.sys.country %> </h2>
    <h2><%= myWeather.weather[0].descripton %> </h2>
    <!-- <h3><%= myWeather.weather[0].main %> </h3> -->

    <!-- <img src="http://openweathermap.org/img/wn/<%= myWeather.weather[0].icon %>@2x.png" width="50px" height="50px" alt=""> -->
<!--     
        <p><b> temperature </b> <%= myWeather.main.temp  %> </p>
        
        <p><b>what it feels like</b> </b> <%= myWeather.main.feels_like  %> </p>
        
        <p><b>minimum temp</b> <%= myWeather.main.temp_min %> </p>
        
        <p><b>max temp</b> <%=myWeather.main.temp_max  %> </p>
        
        <p><b>humidity</b> <%= myWeather.main.humidity %> </p> -->
   
 
        <form action="/profile/<%= myWeather.name %>?_method=DELETE" method="POST">
            <input type="submit" value="Remove from Favorites">
            <button class="btn btn-primary">Delete from profile</button>
        </form>

</div>