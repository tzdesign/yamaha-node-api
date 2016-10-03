var YamahaAPI = require("yamaha-nodejs");
var yamaha = new YamahaAPI("10.0.0.60");

var express = require('express');
var app = express();

var minVolume = -805;
var maxVolume = -205;


function percentageToVolume(percentage){
    return minVolume + ((maxVolume - minVolume) * percentage / 100)
}


app.get('/volume/:volume',function(req,res){
  yamaha.setVolume(percentageToVolume(req.params.volume));
  res.send('Volume set to: ' + percentageToVolume(req.params.volume));

});


app.get('/on',function(req,res){
  yamaha.powerOn();
  res.send('1');
});


app.get('/off',function(req,res){
  yamaha.powerOff();
  res.send('0');
});


app.get('/status',function(req,res){
  res.send(String(yamaha.isOn()));
});

app.get('/volume',function(req,res){
  yamaha.getBasicInfo().done(function(basicInfo){
    res.send('Volume:' + basicInfo.getVolume());
  });
});


  app.listen(3000, function () {
    console.log('Your yamaha is now listening on port 30000!');
  });
