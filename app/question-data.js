var mongodb = require("mongodb").MongoClient;


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
qcmResaveData = [];
var qcmGlobalData = [];
var qcmIndex = {};
function tranformeData(data,calback){
	newObj = {}
	//type string number object
	
	//Object.prototype.toString.call(...)
	//[object Array] [object Date]
	
	try{
		if(typeof(data.ip) != "string"){
			calback(new Error("The ip is not String"),undefined);
			return;
		}else if(Object.prototype.toString.call(data.datetime)!='[object Date]'){
			calback(new Error("The datetime is not Date"),undefined);
			return;
		}else if(typeof(data.title)!='string'){
			calback(new Error("The title is not string"),undefined);
			return;
		}else if(typeof(data.attempt)!='number'){
			calback(new Error("The attempt is not number"),undefined);
			return;
		}else if(Object.prototype.toString.call(data.question)!='[object Array]'){
			calback(new Error("The question is not Array"),undefined);
			return;
		}else{
			newObj.ip = data.ip;
			newObj.datetime = data.datetime;
			newObj.title = data.title;
			newObj.question = [];
			newObj.attempt = data.attempt;
			for (var i = 0; i < data.question.length; i++) {
				if(typeof(data.question[i]) != "object"){
					calback(new Error("The "+i+" eme question is not Object"),undefined);
					return;
				}else if(typeof(data.question[i].text)!='string'){
					calback(new Error("The text of "+i+" eme question is not string"),undefined);
					return;
				}else if(typeof(data.question[i].rep)!='string'){
					calback(new Error("The rep of "+i+" eme question is not string"),undefined);
					return;
				}else{
					newObj.question.push({
						text:data.question[i].text,
						rep:data.question[i].rep,
					})
				}
			}
			calback(undefined,newObj);
		}
		
	}catch (e) {
		calback(e,undefined);
	}
}
function updateQcmGlobalData(){
	for (var i = 0; i < qcmResaveData.length; i++) {
		var data = qcmResaveData[i];
		var gIndex = qcmIndex[data.title];
		if(typeof gIndex === "undefined"){
			gIndex = qcmGlobalData.length;
			qcmIndex[data.title] = gIndex;
			qcmGlobalData[gIndex] = {title:data.title,question : []};
		}
		var gQuestion = qcmGlobalData[gIndex];
		for(var qi = 0 ; qi < data.question.length ; qi++){
			var txt = data.question[qi].text;
			var qig = 0;
			for(qig = 0 ;qig < gQuestion.question.length && txt>gQuestion.question[qig].text; qig++ );
			var newdate = {'text':data.question[qi].text,'rep':data.question[qi].rep};
			if(qig == gQuestion.question.length){
				gQuestion.question.push({'text':data.question[qi].text,'rep':data.question[qi].rep});
			}else if(gQuestion.question[qig].text != txt){
				//console.log(gQuestion.question[qig].text+" != "+txt)
				for(var qig2 = gQuestion.question.length;qig2>qig;qig2--){
					gQuestion.question[qig2] = gQuestion.question[qig2-1];
				}
				gQuestion.question[qig]={'text':data.question[qi].text,'rep':data.question[qi].rep};
			}
			//console.log(i,qi,qig,gQuestion.question);
		}	
			
	}
}
updateQcmGlobalData();

var service = {};
service.new_data=function(data){
	qcmResaveData.push(data);
	updateQcmGlobalData();
}
service.get_data=function(){
	return qcmGlobalData;
}
service.transforme=tranformeData;
mongodb.connect("mongodb://localhost:27017", function(err, db) {
  if(!err) {
    console.log("We are connected");
    var c = db.collection('qcm');
    if(qcmResaveData == []){//TODO
    	console.error("TO SPEED!")
    }
    c.find().toArray(function(err, items) {
    	if(err){
    		console.error(err);
    	}else{
    		console.log("Geting "+items.length+" items");
    		qcmResaveData = items;
    		updateQcmGlobalData();
    	}
    });
    
    service.new_data=function(data){
    	c.find({attempt:data.attempt}).count(function(err,res){
	    	if(res>0){
	    		console.log("attempt "+data.attempt+" alrdy exist");
	    		return;
	    	}
			console.log("Adding item : ");
			console.log(data);
	    	qcmResaveData.push(data);
	    	updateQcmGlobalData();
	    	c.insert(data);
    	});
    }
    
    
  }else{
	  console.error("MONGO DB WAS NOT START!");
	  process.exit(1);
  }
});

module.exports = service;