var http = require('http');
var prettyjson = require('prettyjson');
var url = require('url');
var fs = require('fs');
var path = require('path');




var webdir = path.join(__dirname, "\\www");
var qcmResaveData = [
	{
		ip:"10.0.0.1",
		datetime:0,
		title:"t1",
		question:[
			{text:"q1",rep:"r1"},
			{text:"q5",rep:"r5"},
			{text:"q7",rep:"r7"},
			{text:"q9",rep:"r9"},
		]
	},
	{
		ip:"10.0.0.1",
		datetime:0,
		title:"t2",
		question:[
			{text:"q2",rep:"r2"},
			{text:"q3",rep:"r3"},
			{text:"q4",rep:"r4"},
			{text:"q9",rep:"r9"},
		]
	},
	{
		ip:"10.0.0.1",
		datetime:0,
		title:"t1",
		question:[
			{text:"q2",rep:"r2"},
			{text:"q3",rep:"r3"},
			{text:"q5",rep:"r5"},
			{text:"q8",rep:"r8"},
		]
	},
	{
		ip:"10.0.0.1",
		datetime:0,
		title:"t3",
		question:[
			{text:"q1",rep:"r1"},
			{text:"q3",rep:"r3"},
			{text:"q5",rep:"r5"},
			{text:"q7",rep:"r7"},
			{text:"q8",rep:"r8"},
		]
	},
	
];
var qcmGlobalData = [];
var qcmIndex = {};
function failsendfile(rep,fileName,err){
	console.error("ERROR : fail to sand ("+fileName+")");
	throw err;
}
function sendfile(rep,fileName,calback){
	console.log(fileName);
	var filePath = fileName;
	var readStream = fs.createReadStream(filePath);
    readStream.pipe(rep);
    calback(false);
}
function updateQcmGlobalData(){
	for (var i = 0; i < qcmResaveData.length; i++) {
		var data = qcmResaveData[i];
		var gIndex = qcmIndex[data.title];
		if(typeof gIndex === "undefined"){
			gIndex = qcmGlobalData.length;
			qcmIndex[data.title] = gIndex;
			qcmGlobalData[gIndex] = {title:data.title,question : data.question};
		}else{
			var gQuestion = qcmGlobalData[gIndex];
			for(var qi = 0 ; qi < data.question.length ; qi++){
				var txt = data.question[qi].text;
				for(var qig = 0 ;qig < gQuestion.question.length && gQuestion.question[qig].text != txt; qig++ );
				if(qig == gQuestion.question.length){
					gQuestion.question.push({'text':data.question[qi].text,'rep':data.question[qi].rep});
				}
			}	
			
		}
	}
}
updateQcmGlobalData();
console.log(prettyjson.render(qcmGlobalData));
function handlerHome(urlparsed,req, res) {
    console.log("---- Home ----");
    var page = urlparsed.pathname;
    var localFile = path.join(webdir,page);
    if(page == "/") page = "/index.html";
    fs.exists(localFile,function(existe){
	    if(existe){//TODO
		    /*magic.detectFile(webdir+page, function(err, content_type) {
		    	if (err){
		    		res.writeHead(500, {'Content-Type': 'text/html'});
		    		sendfile(res,webdir+"/err500.html");
		    		console.error(err);
		    		throw err;
		    	}else{
		    	//*/var content_type = "text/html";
		    		res.writeHead(200, {'Content-Type': content_type});
		    		sendfile(res,localFile,function(err){});
		    	/*}
		    });*/
	    }else{
	    	res.writeHead(200, {'Content-Type': "text/html"});
	    	sendfile(res,path.join(webdir,"/err404.html"),function(err){});
	    }
    });
    
}
function handlerResaveData(urlparsed,req, res) {
    console.log("---- ResaveData ----");
    var buf = req.read();
    buf.length;
    res.writeHead(200, {'Content-Type': 'text/html'});
    console.log(req.headers);
    console.log(buf.toString());
    res.end('Hello World\n');
}
function handlerSendData(urlparsed,req, res) {
    console.log("---- SendData ----");
    res.writeHead(200, {'Content-Type': 'text/json'});
    res.end(JSON.stringify(qcmGlobalDatas));
}
function repartiteur(req,res){
	var urlparsed = url.parse(req.url);
	var page = urlparsed.pathname;
	console.log("\n\nNEW CLIENT : "+page);
	switch (page) {
	case "/getData":
		handlerSendData(urlparsed,req, res);
		break;
	case "/newData":
		handlerResaveData(urlparsed,req, res);
		break;
	default:
		handlerHome(urlparsed,req,res);
		break;
	}
}

http.createServer(repartiteur).listen(8080, '127.0.0.1');
console.log('Server repartiteur running at http://127.0.0.1:8080/');
/*
http.createServer(handlerHome).listen(8080, '127.0.0.1');
http.createServer(handlerResaveData).listen(8081, '127.0.0.1');
http.createServer(handlerSendData).listen(8082, '127.0.0.1');
console.log('Server home running at http://127.0.0.1:8080/');
console.log('Server resave running at http://127.0.0.1:8081/');
console.log('Server send running at http://127.0.0.1:8082/');
*/
