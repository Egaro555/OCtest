var express = require('express');
var rout = express.Router();

rout.get("/*",function(req,res,next){
	console.log("Send file : "+req.params[0]);
	res.sendFile(req.params[0] ? req.params[0] : 'index.html', {root: "./www"},function(d){
		if(d){
			if(d.status = 404){
				console.log("/!\\ File not found : "+d.path);
				res.sendFile( 'err404.html', {root: "./www"});
			}else{
				console.error(d);
				res.sendFile( 'err500.html', {root: "./www"});
			}
		}
	});
})

module.exports=rout;