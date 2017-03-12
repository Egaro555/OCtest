var http = require('http');
var prettyjson = require('prettyjson');
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
http.createServer(function handler(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World\n');
    
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');
