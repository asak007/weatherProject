const express=require("express");
const https= require("https");
const bodyParser=require("body-parser");


const app=express();
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/",function(req,res) {
   res.sendFile(__dirname+"/index.html")    
})

app.post("/", function(req,res) {
   
const query=req.body.cityInput;
const apiKey="d5a6944060f7bbb57bdfb45a2addb9a2"
const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&units=metric&appid="+apiKey;
https.get(url,function(response) {
    console.log(response.statusCode);
    response.on("data",function(data) {
        const weatherData=JSON.parse(data);
        const weatherImage=weatherData.weather[0].icon
        console.log(weatherData)
        console.log(weatherData.weather[0].description)
        res.write("<p><img "+"src='http://openweathermap.org/img/wn/"+weatherImage+"@2x.png'></p>");
        res.write("<p> The weather is currently "+weatherData.weather[0].description+"</p>")
        res.write('<h1>The temperature in '+query+' is currently '+weatherData.main.temp+'C. The high for today is '+weatherData.main.temp_max+'C while the low is '+weatherData.main.temp_min+'C.</h1>')
        res.send()
    })
    
})
})




app.listen(3000,function() {
    console.log("Server listening on port 3000!!!")
})