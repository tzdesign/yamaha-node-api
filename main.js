var YamahaAPI = require("yamaha-nodejs");
var yamaha = new YamahaAPI("10.0.0.60");
var port = 3000

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
  yamaha.powerOn().then(function(){
      yamaha.setVolume(percentageToVolume(80));
  });
  res.send('1');
});


app.get('/off',function(req,res){
  yamaha.powerOff();
  res.send('0');
});


app.get('/status',function(req,res){
  res.send(yamaha.isOn()?"1":"0");
});

app.get('/volume',function(req,res){
  yamaha.getBasicInfo().done(function(basicInfo){
    res.send(""+basicInfo.getVolume()+"");
  });
});
app.get('/is/:mode',function(req,res){
  yamaha.getBasicInfo().done(function(basicInfo){
    res.send('Volume:' + basicInfo.getVolume());
  });
});


  app.listen(port, function () {
    console.log('Your yamaha is now listening on port '+port+'!');
  });
