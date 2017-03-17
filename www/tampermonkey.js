// ==UserScript==
// @name         QuizzMoodle
// @description  private
// @version      1.0
// @author       Eg555
// @include *
// @match        http://moodle2.insa-lyon.fr/mod/quiz/*
// @match        http://moodle2.insa-lyon.fr/*
// @require      https://code.jquery.com/jquery-2.1.4.min.js
// @run-at document-end
// @grant        none
// ==/UserScript==

var abcd = 123;
abc = 123;
repdiv = 0;
test = null;
test2 = null;
(function() {
    var Counter = 0;
    var alredisend = localStorage.getItem("quizz_alredy_send");
    if(Object.prototype.toString.call(alredisend)!='[object Array]'){
        alredisend = [];
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
        var reponcecorect = jcode.find(".rightanswer");
        var qData = [];
        for(var i = 0;i<questions.length;i++){
            qData.push({
                text:$(questions[i]).text(),
                rep:$(reponcecorect[i]).text()
            });
        }
        var qcmdata = {
            title:jcode.find(".breadcrumb-nav .breadcrumb li:last-child [itemprop=title]").text(),
            question:qData,
            attempt:id
        };
        $.post("http://vps.egaro555.fr:8080/newdata",{data:JSON.stringify(qcmdata)}).done(function (data){
        });
        alredisend.push(id);
        localStorage.setItem("quizz_alredy_send",alredisend);
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
        for(var i = 0; i< js_q_data.length;i++){
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
                var bt = $('<button type="button">Affichez les reponce ('+js_q_data[i].question.length+')</button>');
                var result = $("<div><div>").append(bt).append(repdiv).insertAfter($(".coursetitle"));

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