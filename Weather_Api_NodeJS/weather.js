//Weather.js
const express = require('express');
const app = express();
const https = require('https');
const bodyParser = require('body-parser');
require('dotenv').config();
//To parse data from html forms
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('public'));
//Response port
app.get('/',function(req,res)
{

res.sendFile(__dirname+"/index.html");
// express.static(__dirname + '/public')
})
//Post work -> that is after submitting form
app.post("/",function(req,res)
{
  // console.log(req.body.city);
  var query="Ariyalur";
  query=req.body.city;
  const apiKey=process.env.API_KEY;
  console.log(apiKey);
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+apiKey+"&units=metric";
//Fetching data from api(open weather map)
console.log(url);
  https.get(url,function(response)
  {
    //Parsing JSSON format object data
    response.on("data",function(data){
        const weather = JSON.parse(data);

        console.log(weather);
        const icon = weather.weather[0].icon;
         const iconPath = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
        var forecast = {
          temp:weather.main.temp,
          country:weather.sys.country,
          desc:weather.weather[0].description,
          img_path:iconPath,
          humidity:weather.main.humidity,
          wind:weather.wind.speed
        }
        // res.write("<h1>Temprature in "+query+" -> "+forecast.temp +" Celcius");
        // res.write("<h1>Country :-"+forecast.country+"</h1>");
        // res.write("<h1>Condition :-"+forecast.desc);
        // res.sendFile(__dirname+"/result.html");
        res.write(`
          <!DOCTYPE html>
          <html lang="en" dir="ltr">
            <head>
              <meta charset="utf-8">
              <title></title>
              <link rel="stylesheet" href="/CSS/index.css">
            </head>
            <body class="result">
              <div class="full">
                <div class="page_cont">
                  <div class="header_weather">
                      <p>Weather Forecast Report</p>
                  </div>
                  <div class="city_header">
                      <p>${query}</p>
                  </div>
                  <div class="main_weather">


                    <div class="image_degree">
                       <img class="wea_img" src="${forecast.img_path}" alt="">
                       <p>${forecast.temp}<sup>°C</sup></p>
                    </div>
                    <div class="wea_desc">
                    <p>${forecast.desc}</p>
                    </div>

                    <div class="bottom">
                      <div class="hum_bot">
                          <p>HUMIDITY</p>
                          <p>${forecast.humidity}%</p>
                      </div>
                      <div class="wns_bot">
                          <p>WIND SPEED</p>
                          <p>${forecast.wind} m/s</p>
                      </div>
                    </div>

                  </div>
                  <p class="credit">😎 Devloped by Naren 😎</p>
                  <p class="credit-2">Using OpenWeatherMap API</p>
                </div>
              </div>


            </body>
          </html>


        `)
    })
  })
    // res.send("<h1>First Run -> Naren<h1>");
})
app.listen(3000,function()
{
  console.log("Server Started! On Port 3000");
})
