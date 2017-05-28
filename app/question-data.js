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
var urlmd5 = {};
var qcmGlobalData = [];
var qcmGlobalDataMD5 = [];
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
function updateQcmGlobalDataMD5(){
	qcmGlobalDataMD5 = [];
	for(var i=0;i<qcmGlobalData.length;i++){
		qcmGlobalDataMD5[i] = {title:qcmGlobalData[i].title,question : []};
		for(var j =0;j<qcmGlobalData[i].question.length;j++){
			(function(){
				var i_ = i;
				var j_ = j;
				var d = qcmGlobalData[i].question[j];
				function convertURL(match, offset, string) {
					if(urlmd5[match]){
						return urlmd5[match];
					}
			        return match;
				}
				qcmGlobalDataMD5[i].question[j] = {
					text : d.text.replace(/(src)=\"([^\"]*)\"/g, convertURL),
					rep : d.rep
				}
			})();
		}
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
			var rep = data.question[qi].rep;
			var qig = 0;
			for(qig = 0 ;qig < gQuestion.question.length && txt>gQuestion.question[qig].text; qig++ );
			var newdate = {'text':data.question[qi].text,'rep':data.question[qi].rep};
			if(qig == gQuestion.question.length){
				gQuestion.question.push({'text':data.question[qi].text,'rep':data.question[qi].rep});
			}else if(gQuestion.question[qig].text != txt || gQuestion.question[qig].rep != rep){
				//console.log(gQuestion.question[qig].text+" != "+txt)
				for(var qig2 = gQuestion.question.length;qig2>qig;qig2--){
					gQuestion.question[qig2] = gQuestion.question[qig2-1];
				}
				gQuestion.question[qig]={'text':data.question[qi].text,'rep':data.question[qi].rep};
			}
			//console.log(i,qi,qig,gQuestion.question);
		}	
			
	}
	updateQcmGlobalDataMD5();
};

updateQcmGlobalData();

var service = {};
service.new_data=function(data){
	qcmResaveData.push(data);
	updateQcmGlobalData();
}
service.get_data=function(){
	return qcmGlobalData;
}
service.get_data_md5=function(){
	return qcmGlobalDataMD5;
}
service.transforme=tranformeData;
mongodb.connect("mongodb://localhost:27017", function(err, db) {
  if(!err) {
    console.log("We are connected");
    var c = db.collection('qcm');
    var ci = db.collection('qcm_img');
    var MD5 = function(s){function L(k,d){return(k<<d)|(k>>>(32-d))}function K(G,k){var I,d,F,H,x;F=(G&2147483648);H=(k&2147483648);I=(G&1073741824);d=(k&1073741824);x=(G&1073741823)+(k&1073741823);if(I&d){return(x^2147483648^F^H)}if(I|d){if(x&1073741824){return(x^3221225472^F^H)}else{return(x^1073741824^F^H)}}else{return(x^F^H)}}function r(d,F,k){return(d&F)|((~d)&k)}function q(d,F,k){return(d&k)|(F&(~k))}function p(d,F,k){return(d^F^k)}function n(d,F,k){return(F^(d|(~k)))}function u(G,F,aa,Z,k,H,I){G=K(G,K(K(r(F,aa,Z),k),I));return K(L(G,H),F)}function f(G,F,aa,Z,k,H,I){G=K(G,K(K(q(F,aa,Z),k),I));return K(L(G,H),F)}function D(G,F,aa,Z,k,H,I){G=K(G,K(K(p(F,aa,Z),k),I));return K(L(G,H),F)}function t(G,F,aa,Z,k,H,I){G=K(G,K(K(n(F,aa,Z),k),I));return K(L(G,H),F)}function e(G){var Z;var F=G.length;var x=F+8;var k=(x-(x%64))/64;var I=(k+1)*16;var aa=Array(I-1);var d=0;var H=0;while(H<F){Z=(H-(H%4))/4;d=(H%4)*8;aa[Z]=(aa[Z]| (G.charCodeAt(H)<<d));H++}Z=(H-(H%4))/4;d=(H%4)*8;aa[Z]=aa[Z]|(128<<d);aa[I-2]=F<<3;aa[I-1]=F>>>29;return aa;}function B(x){var k="",F="",G,d;for(d=0;d<=3;d++){G=(x>>>(d*8))&255;F="0"+G.toString(16);k=k+F.substr(F.length-2,2)}return k}function J(k){k=k.replace(/rn/g,"n");var d="";for(var F=0;F<k.length;F++){var x=k.charCodeAt(F);if(x<128){d+=String.fromCharCode(x)}else{if((x>127)&&(x<2048)){d+=String.fromCharCode((x>>6)|192);d+=String.fromCharCode((x&63)|128)}else{d+=String.fromCharCode((x>>12)|224);d+=String.fromCharCode(((x>>6)&63)|128);d+=String.fromCharCode((x&63)|128)}}}return d}var C=Array();var P,h,E,v,g,Y,X,W,V;var S=7,Q=12,N=17,M=22;var A=5,z=9,y=14,w=20;var o=4,m=11,l=16,j=23;var U=6,T=10,R=15,O=21;s=J(s);C=e(s);Y=1732584193;X=4023233417;W=2562383102;V=271733878;for(P=0;P<C.length;P+=16){h=Y;E=X;v=W;g=V;Y=u(Y,X,W,V,C[P+0],S,3614090360);V=u(V,Y,X,W,C[P+1],Q,3905402710);W=u(W,V,Y,X,C[P+2],N,606105819);X=u(X,W,V,Y,C[P+3],M,3250441966);Y=u(Y,X,W,V,C[P+4],S,4118548399);V=u(V,Y,X,W,C[P+5],Q,1200080426);W=u(W,V,Y,X,C[P+6],N,2821735955);X=u(X,W,V,Y,C[P+7],M,4249261313);Y=u(Y,X,W,V,C[P+8],S,1770035416);V=u(V,Y,X,W,C[P+9],Q,2336552879);W=u(W,V,Y,X,C[P+10],N,4294925233);X=u(X,W,V,Y,C[P+11],M,2304563134);Y=u(Y,X,W,V,C[P+12],S,1804603682);V=u(V,Y,X,W,C[P+13],Q,4254626195);W=u(W,V,Y,X,C[P+14],N,2792965006);X=u(X,W,V,Y,C[P+15],M,1236535329);Y=f(Y,X,W,V,C[P+1],A,4129170786);V=f(V,Y,X,W,C[P+6],z,3225465664);W=f(W,V,Y,X,C[P+11],y,643717713);X=f(X,W,V,Y,C[P+0],w,3921069994);Y=f(Y,X,W,V,C[P+5],A,3593408605);V=f(V,Y,X,W,C[P+10],z,38016083);W=f(W,V,Y,X,C[P+15],y,3634488961);X=f(X,W,V,Y,C[P+4],w,3889429448);Y=f(Y,X,W,V,C[P+9],A,568446438);V=f(V,Y,X,W,C[P+14],z,3275163606);W=f(W,V,Y,X,C[P+3],y,4107603335);X=f(X,W,V,Y,C[P+8],w,1163531501);Y=f(Y,X,W,V,C[P+13],A,2850285829);V=f(V,Y,X,W,C[P+2],z,4243563512);W=f(W,V,Y,X,C[P+7],y,1735328473);X=f(X,W,V,Y,C[P+12],w,2368359562);Y=D(Y,X,W,V,C[P+5],o,4294588738);V=D(V,Y,X,W,C[P+8],m,2272392833);W=D(W,V,Y,X,C[P+11],l,1839030562);X=D(X,W,V,Y,C[P+14],j,4259657740);Y=D(Y,X,W,V,C[P+1],o,2763975236);V=D(V,Y,X,W,C[P+4],m,1272893353);W=D(W,V,Y,X,C[P+7],l,4139469664);X=D(X,W,V,Y,C[P+10],j,3200236656);Y=D(Y,X,W,V,C[P+13],o,681279174);V=D(V,Y,X,W,C[P+0],m,3936430074);W=D(W,V,Y,X,C[P+3],l,3572445317);X=D(X,W,V,Y,C[P+6],j,76029189);Y=D(Y,X,W,V,C[P+9],o,3654602809);V=D(V,Y,X,W,C[P+12],m,3873151461);W=D(W,V,Y,X,C[P+15],l,530742520);X=D(X,W,V,Y,C[P+2],j,3299628645);Y=t(Y,X,W,V,C[P+0],U,4096336452);V=t(V,Y,X,W,C[P+7],T,1126891415);W=t(W,V,Y,X,C[P+14],R,2878612391);X=t(X,W,V,Y,C[P+5],O,4237533241);Y=t(Y,X,W,V,C[P+12],U,1700485571);V=t(V,Y,X,W,C[P+3],T,2399980690);W=t(W,V,Y,X,C[P+10],R,4293915773);X=t(X,W,V,Y,C[P+1],O,2240044497);Y=t(Y,X,W,V,C[P+8],U,1873313359);V=t(V,Y,X,W,C[P+15],T,4264355552);W=t(W,V,Y,X,C[P+6],R,2734768916);X=t(X,W,V,Y,C[P+13],O,1309151649);Y=t(Y,X,W,V,C[P+4],U,4149444226);V=t(V,Y,X,W,C[P+11],T,3174756917);W=t(W,V,Y,X,C[P+2],R,718787259);X=t(X,W,V,Y,C[P+9],O,3951481745);Y=K(Y,h);X=K(X,E);W=K(W,v);V=K(V,g)}var i=B(Y)+B(X)+B(W)+B(V);return i.toLowerCase();};

    if(qcmResaveData == []){//TODO
    	console.error("TO SPEED!")
    }
    var load = 2;
    c.find().toArray(function(err, items) {
    	if(err){
    		console.error(err);
    	}else{
    		console.log("Geting "+items.length+" items");
    		qcmResaveData = items;
    	}
		load--;
		if(!load)
			updateQcmGlobalData();
    });
    ci.find({}, { src: 1, md5: 1 }).toArray(function(err, items) {
    	if(err){
    		console.error(err);
    	}else{
    		for(var i = 0;i<items.length;i++){
    			urlmd5["src=\""+items[i].src+"\""] = "md5=\""+items[i].md5+"\"";
    		}
    	}
		load--;
		if(!load)
			updateQcmGlobalData();
    });
    service.new_img = function(src , base64){
    	var md = MD5(base64);
    	urlmd5["src=\""+src+"\""] = "md5=\""+md+"\"";
    	ci.insert({src:src,md5:md,base64:base64});
    	updateQcmGlobalDataMD5();
    }
    service.get_img = function(src,callback){
    	ci.findOne({src: src}, function(err, document) {
    		if(err){
    			callback(false);
    			return;
    		}
    		callback(document);
    	});
    }
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