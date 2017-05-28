// ==UserScript==
// @name QuizzMoodle test_2
// @description private
// @version 1.0
// @author Eg555
// @include *
// @match http://moodle2.insa-lyon.fr/mod/quiz/*
// @match http://moodle2.insa-lyon.fr/*
// @require https://code.jquery.com/jquery-2.1.4.min.js
// @icon http://moodle2.insa-lyon.fr/theme/image.php/insa/theme/1488464035/favicon
// @run-at document-end
// @grant none
// ==/UserScript==
// https://openuserjs.org/install/Egaro555/QuizzMoodle.user.js

var abcd = 123;
abc = 123;
repdiv = 0;
test = null;
test2 = null;
(function() {
    var MD5 = function(s){function L(k,d){return(k<<d)|(k>>>(32-d))}function K(G,k){var I,d,F,H,x;F=(G&2147483648);H=(k&2147483648);I=(G&1073741824);d=(k&1073741824);x=(G&1073741823)+(k&1073741823);if(I&d){return(x^2147483648^F^H)}if(I|d){if(x&1073741824){return(x^3221225472^F^H)}else{return(x^1073741824^F^H)}}else{return(x^F^H)}}function r(d,F,k){return(d&F)|((~d)&k)}function q(d,F,k){return(d&k)|(F&(~k))}function p(d,F,k){return(d^F^k)}function n(d,F,k){return(F^(d|(~k)))}function u(G,F,aa,Z,k,H,I){G=K(G,K(K(r(F,aa,Z),k),I));return K(L(G,H),F)}function f(G,F,aa,Z,k,H,I){G=K(G,K(K(q(F,aa,Z),k),I));return K(L(G,H),F)}function D(G,F,aa,Z,k,H,I){G=K(G,K(K(p(F,aa,Z),k),I));return K(L(G,H),F)}function t(G,F,aa,Z,k,H,I){G=K(G,K(K(n(F,aa,Z),k),I));return K(L(G,H),F)}function e(G){var Z;var F=G.length;var x=F+8;var k=(x-(x%64))/64;var I=(k+1)*16;var aa=Array(I-1);var d=0;var H=0;while(H<F){Z=(H-(H%4))/4;d=(H%4)*8;aa[Z]=(aa[Z]| (G.charCodeAt(H)<<d));H++}Z=(H-(H%4))/4;d=(H%4)*8;aa[Z]=aa[Z]|(128<<d);aa[I-2]=F<<3;aa[I-1]=F>>>29;return aa;}function B(x){var k="",F="",G,d;for(d=0;d<=3;d++){G=(x>>>(d*8))&255;F="0"+G.toString(16);k=k+F.substr(F.length-2,2)}return k}function J(k){k=k.replace(/rn/g,"n");var d="";for(var F=0;F<k.length;F++){var x=k.charCodeAt(F);if(x<128){d+=String.fromCharCode(x)}else{if((x>127)&&(x<2048)){d+=String.fromCharCode((x>>6)|192);d+=String.fromCharCode((x&63)|128)}else{d+=String.fromCharCode((x>>12)|224);d+=String.fromCharCode(((x>>6)&63)|128);d+=String.fromCharCode((x&63)|128)}}}return d}var C=Array();var P,h,E,v,g,Y,X,W,V;var S=7,Q=12,N=17,M=22;var A=5,z=9,y=14,w=20;var o=4,m=11,l=16,j=23;var U=6,T=10,R=15,O=21;s=J(s);C=e(s);Y=1732584193;X=4023233417;W=2562383102;V=271733878;for(P=0;P<C.length;P+=16){h=Y;E=X;v=W;g=V;Y=u(Y,X,W,V,C[P+0],S,3614090360);V=u(V,Y,X,W,C[P+1],Q,3905402710);W=u(W,V,Y,X,C[P+2],N,606105819);X=u(X,W,V,Y,C[P+3],M,3250441966);Y=u(Y,X,W,V,C[P+4],S,4118548399);V=u(V,Y,X,W,C[P+5],Q,1200080426);W=u(W,V,Y,X,C[P+6],N,2821735955);X=u(X,W,V,Y,C[P+7],M,4249261313);Y=u(Y,X,W,V,C[P+8],S,1770035416);V=u(V,Y,X,W,C[P+9],Q,2336552879);W=u(W,V,Y,X,C[P+10],N,4294925233);X=u(X,W,V,Y,C[P+11],M,2304563134);Y=u(Y,X,W,V,C[P+12],S,1804603682);V=u(V,Y,X,W,C[P+13],Q,4254626195);W=u(W,V,Y,X,C[P+14],N,2792965006);X=u(X,W,V,Y,C[P+15],M,1236535329);Y=f(Y,X,W,V,C[P+1],A,4129170786);V=f(V,Y,X,W,C[P+6],z,3225465664);W=f(W,V,Y,X,C[P+11],y,643717713);X=f(X,W,V,Y,C[P+0],w,3921069994);Y=f(Y,X,W,V,C[P+5],A,3593408605);V=f(V,Y,X,W,C[P+10],z,38016083);W=f(W,V,Y,X,C[P+15],y,3634488961);X=f(X,W,V,Y,C[P+4],w,3889429448);Y=f(Y,X,W,V,C[P+9],A,568446438);V=f(V,Y,X,W,C[P+14],z,3275163606);W=f(W,V,Y,X,C[P+3],y,4107603335);X=f(X,W,V,Y,C[P+8],w,1163531501);Y=f(Y,X,W,V,C[P+13],A,2850285829);V=f(V,Y,X,W,C[P+2],z,4243563512);W=f(W,V,Y,X,C[P+7],y,1735328473);X=f(X,W,V,Y,C[P+12],w,2368359562);Y=D(Y,X,W,V,C[P+5],o,4294588738);V=D(V,Y,X,W,C[P+8],m,2272392833);W=D(W,V,Y,X,C[P+11],l,1839030562);X=D(X,W,V,Y,C[P+14],j,4259657740);Y=D(Y,X,W,V,C[P+1],o,2763975236);V=D(V,Y,X,W,C[P+4],m,1272893353);W=D(W,V,Y,X,C[P+7],l,4139469664);X=D(X,W,V,Y,C[P+10],j,3200236656);Y=D(Y,X,W,V,C[P+13],o,681279174);V=D(V,Y,X,W,C[P+0],m,3936430074);W=D(W,V,Y,X,C[P+3],l,3572445317);X=D(X,W,V,Y,C[P+6],j,76029189);Y=D(Y,X,W,V,C[P+9],o,3654602809);V=D(V,Y,X,W,C[P+12],m,3873151461);W=D(W,V,Y,X,C[P+15],l,530742520);X=D(X,W,V,Y,C[P+2],j,3299628645);Y=t(Y,X,W,V,C[P+0],U,4096336452);V=t(V,Y,X,W,C[P+7],T,1126891415);W=t(W,V,Y,X,C[P+14],R,2878612391);X=t(X,W,V,Y,C[P+5],O,4237533241);Y=t(Y,X,W,V,C[P+12],U,1700485571);V=t(V,Y,X,W,C[P+3],T,2399980690);W=t(W,V,Y,X,C[P+10],R,4293915773);X=t(X,W,V,Y,C[P+1],O,2240044497);Y=t(Y,X,W,V,C[P+8],U,1873313359);V=t(V,Y,X,W,C[P+15],T,4264355552);W=t(W,V,Y,X,C[P+6],R,2734768916);X=t(X,W,V,Y,C[P+13],O,1309151649);Y=t(Y,X,W,V,C[P+4],U,4149444226);V=t(V,Y,X,W,C[P+11],T,3174756917);W=t(W,V,Y,X,C[P+2],R,718787259);X=t(X,W,V,Y,C[P+9],O,3951481745);Y=K(Y,h);X=K(X,E);W=K(W,v);V=K(V,g)}var i=B(Y)+B(X)+B(W)+B(V);return i.toLowerCase();};

    var Counter = 0;
    var alredisend = localStorage.getItem("quizz_alredy_send_3");
    if(Object.prototype.toString.call(alredisend)!='[object Array]'){
        alredisend = [];
    }
    toDataURL= function(url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.onload = function() {
            var reader = new FileReader();
            reader.onloadend = function() {
                callback(reader.result);
            };
            reader.readAsDataURL(xhr.response);
        };
        xhr.open('GET', url);
        xhr.responseType = 'blob';
        xhr.send();
    }
    function pushSrcToVPS(src){
        $.ajax({
            url: "http://vps.egaro555.fr:8080/pushSrc.js",
            dataType: "script",
            data : {src:src}
        });
    }
    function getConvertedHtml (jelement,callback){
        var imgs = jelement.find("img");
        var n = imgs.length;
        if(n==0){
            callback(jelement.html());
            return;
        }
        imgs.each(function(k,v){
            var src = $(v).attr("src");
            pushSrcToVPS(src);
            toDataURL(src,function(res){
                $(v).removeAttr("src");
                $(v).attr("md5",MD5(res));
                n--;
                if(n==0){
                    callback(jelement.html());
                }
            });
        });
    }
    function eachHtmlOfView(jdata,calback){
        var urlviews = $(jdata).find("div[role='main'] td a[href^='view']");
        Counter += urlviews.length;
        urlviews.each(function() {
            var url = "/mod/quiz/"+$( this ).attr("href");
            $.get(url).done(calback);
        }).always(function(){
            Counter --;
        });
    }
    function alredySend(id){
        for(var i = 0;i <alredisend.length ; i++){
            if(alredisend[i] == id) return true;
        }
        return false;
    }
    function eachHtmlAndIdOfReView(jdata,calback){
        var urlviews = $(jdata).find("a[href*='mod/quiz/review']");
        Counter += urlviews.length;
        $(urlviews).each(function() {
            var url = $( this ).attr("href");
            var id = url.split("=")[1]*1;
            if(alredySend(id)){
                Counter --;
            }else{
                $.get(url).done(function(data){
                    calback(data,id);
                }).always(function(){
                    Counter --;
                });
            }
        });
    }
    function sendQuestionData(htmlcode,id){
        if(alredySend(id))return;
        var jcode = $(htmlcode);
        var questions = jcode.find(".qtext");
        var imgs = jcode.find(".qtext img");
        for(var i=0;i<imgs.length;i++){
            pushSrcToVPS($(imgs).attr("src"));
        }
        var reponcecorect = jcode.find(".rightanswer");
        var qData = [];
        for(var i = 0;i<questions.length;i++){
            qData.push({
                text:$(questions[i]).html(),
                rep:$(reponcecorect[i]).text()
            });
        }
        var qcmdata = {
            title:jcode.find(".breadcrumb-nav .breadcrumb li:last-child [itemprop=title]").text(),
            question:qData,
            attempt:id*2
        };
        $.post("http://vps.egaro555.fr:8080/newdata",{data:JSON.stringify(qcmdata)}).done(function (data){
        });
        alredisend.push(id*2);
        localStorage.setItem("quizz_alredy_send_3",alredisend);
    }
    if(window.location.href.indexOf("course/view.php")>0){
        $.get($(".block_activity_modules a[href*='mod/quiz/index.php']").attr("href")).done(function(data){
            eachHtmlOfView(data,function(data){
                eachHtmlAndIdOfReView(data,function(data,id){
                    sendQuestionData(data,id);
                });
            });
        });
    }
    if(window.location.href.indexOf("mod/quiz/view.php")>0){
        eachHtmlAndIdOfReView('body',function(data,id){
            sendQuestionData(data,id);
        });
    }
    if(window.location.href.indexOf("mod/quiz/review.php")>0){
        sendQuestionData('body',window.location.href.split("=")[1]*1);
    }
    test = eachHtmlOfView;
    test2 = eachHtmlAndIdOfReView;
    jQuery.getScript( "http://vps.egaro555.fr:8080/getdata.js" ).done(function(){
        var titre = $(".breadcrumb-nav .breadcrumb li:last-child [itemprop=title]").text();
        console.log(titre);
        var l_js_q_data=js_q_data;
        localStorage.setItem("l_js_q_data",l_js_q_data);
        $(".qtext").each(function(k,q){
            for(var i = 0; i< l_js_q_data.length;i++){
                var i_old = i;
                getConvertedHtml($("<div>"+$(q).html()+"</div>"),function(qhtml){
                    console.log("qhtml",qhtml);
                    for(var i2=0;i2<l_js_q_data[i_old].question.length;i2++){
                        //console.debug($(q).text() +"=="+ js_q_data[i].question[i2].text)
                        if(qhtml == l_js_q_data[i_old].question[i2].text){
                            var interupteur = 0;
                            var rdiv_ = $("<div></div>")
                            .text(l_js_q_data[i_old].question[i2].rep)
                            //.addClass("formulation")
                            //.css("margin","0px")
                            //.css("background-color","#ffffff")
                            //.css("border-color","#9982e3")
                            ;
                            rdiv_.hide();
                            $(q).append(rdiv_);
                            $(q).click(function(){
                                interupteur = !interupteur;
                                if(interupteur){
                                    rdiv_.show();
                                }else{
                                    rdiv_.hide();
                                }
                            });
                        }
                    }
        	    });
            }
        });
        for(var i = 0; i< l_js_q_data.length;i++){
            console.log(js_q_data[i].title+" == "+titre+" => "+(js_q_data[i].title == titre?"true":"false"));
            if(js_q_data[i].title == titre){
                var hide = true;
                repdiv = $('<div></div>')
                    .hide()
                    .addClass("que");
                for(var i2=0;i2<js_q_data[i].question.length;i2++){
                    var qrdiv = $("<div></div>")
                    .addClass("formulation")
                    .addClass("clearfix");
                    var qdiv = $("<div></div>")
                    .text("Question : " + js_q_data[i].question[i2].text);
                    var rdiv = $("<div></div>")
                    .text(js_q_data[i].question[i2].rep)
                    .addClass("formulation")
                    .addClass("clearfix")
                    .css("margin","0px")
                    .css("background-color","#d5f6e3")
                    .css("border-color","#82e3aa");
                    qrdiv.append(qdiv);
                    qrdiv.append(rdiv);
                    repdiv.append(qrdiv);
                }
                var bt = $('<button type="button">Affichez les rÃ©ponses ('+js_q_data[i].question.length+')</button>');
                bt.hide();
                var interupteur = 0;
                var result = $("<div><div>").append(bt).append(repdiv).insertAfter($(".coursetitle"));
                $(".coursetitle").click(function(){
                    interupteur = ! interupteur;
                    if(interupteur){
                        bt.show();
                    }else{
                        bt.hide();
                    };
                });
                bt.click(function(){
                    console.debug("click!");
                    hide = !hide;
                    if(hide)
                        repdiv.hide();
                    else
                        repdiv.show();
                });
                var multilclinote;
                multilclinote = function(b){
                    bt.animate({
                        opacity: 0.25,
                    }, 200, function(){
                        bt.animate({
                            opacity: 1,
                        }, 200, function() {
                            if(b>1)
                                multilclinote(b-1);
                        });
                    });
                };
                $({deg: 0}).animate({deg: 360}, {
                    duration: 1000,
                    step: function(now) {
                        bt.css({
                            transform: 'rotateX(' + now + 'deg)'
                        });
                    }
                });
                //multilclinote(3);
            }
        }
    });
    
    /*
    $.get("http://vps.egaro555.fr:8080/getdata",{title:"t3"})
        .done(function(data){
        alert(data);
        $(".breadcrumb-nav .breadcrumb li:last-child [itemprop=title]").text("COUCOU");
    });
    // Your code here...*/
})();