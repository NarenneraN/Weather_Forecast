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
        const temp = weather.main.temp;
        const country = weather.sys.country;
        const desc = weather.weather[0].description;
        res.write("<h1>Temprature in "+query+" -> "+temp +" Celcius");
        res.write("<h1>Country :-"+country+"</h1>");
        res.write("<h1>Condition :-"+desc);
        // res.send();
    })
  })
    // res.send("<h1>First Run -> Naren<h1>");
})
app.listen(3000,function()
{
  console.log("Server Started! On Port 3000");
})
