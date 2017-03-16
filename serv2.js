var express = require('express');
var app = express();
const requestIp = require('request-ip');

app.enable('trust proxy');

var web = require('./app/rooters/web-site');
var questionData = require('./app/question-data');
var bodyParser = require('body-parser')

app.use(requestIp.mw())

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.post("/newdata",function(req,res,next){
	console.log("get new data");
	var bodydata = JSON.parse(req.body.data);
	bodydata.datetime = new Date();
	bodydata.ip = req.clientIp;
	//console.log(bodydata);
	questionData.transforme(bodydata,function(err,resultat){
		if(err){
			console.error(err);
			res.status(500).end(err);
		}else{
			questionData.new_data(resultat);
			res.redirect('/');
		}
	})
});
app.get("/getdata.js",function(req,res,next){
	var data = questionData.get_data();
	console.log("send data");
	res.send("js_q_data = "+JSON.stringify(data));
	res.end();
});
app.get("/getdata",function(req,res,next){
	var data = questionData.get_data();
	if(req.param("title")){
		for (var i = 0; i < data.length; i++) {
			if(data[i].title == req.param("title")){
				data = data[i];
				console.log("send data of "+data.title);
				res.end(JSON.stringify(data));
				return;
			}
		}
		res.status(404).end("No data");
		return;
	}
	console.log("send data");
	res.end(JSON.stringify(data));
});

app.use("/",web);

app.use(function(err, req, res, next) {
	console.error(err.stack);
	res.status(500).sendFile(req.params[0] ? req.params[0] : 'err500.html', {root: "./www"});
});

app.listen(8080);
