/**
 * Created by Sunyongjian on 2016/5/13.
 */
~(function () {
    // 实现搜索框 以及 搜商品   的隐藏出现
    (function searchInput() {
        var oInput = document.getElementById("search_book");
        var oSearch = document.getElementById("top_search_div");
        oInput.onfocus = function (e) {
            e = e || window.event;
            e.target = e.target || e.srcElement;
            this.value = "";
            window.setTimeout(function () {
                oSearch.style.display = "block";
            }, 300);
            document.body.onclick = function (e) {
                e = e || window.event;
                e.target = e.target || e.srcElement;
                if (e.target != oInput) {
                    oSearch.style.display = "none";
                }
            }
        };
        var selectBox = document.getElementById("selectBox");
        var selectOl = utils.children(selectBox, "ol")[0];
        selectBox.onmouseenter = function () {
            selectOl.style.display = "block";
        };
        selectBox.onmouseleave = function () {
            selectOl.style.display = "none";
        }

    })();


    //实现左侧导航的选项卡
    (function navLeft() {
        var primaryNav = document.getElementById("primary_nav");
        var lis = utils.getElementsByClass("primary_nav_li", primaryNav);
        var divs = utils.getElementsByClass("nav_more", primaryNav);
        var navRight = utils.getElementsByClass("nav_line_right", primaryNav);
        for (var i = 0; i < lis.length; i++) {
            utils.css(divs[i], "top", -i * 39);
            (function (i) {
                lis[i].onmouseenter = function () {
                    divs[i].style.display = "block";
                    utils.css(navRight[i], "display", "block");
                };
                lis[i].onmouseleave = function () {
                    divs[i].style.display = "none";
                    utils.css(navRight[i], "display", "none");
                }
            })(i)
        }
    })();

    //Ajax 请求数据
    var jsonDate = null;
    ~function () {
        var xhr = new XMLHttpRequest();
        xhr.open('get', 'jsonDate.txt', false);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && /^2\d{2}$/.test(xhr.status)) {
                jsonDate = utils.jsonParse(xhr.responseText);
            }
        };
        xhr.send(null);
    }();

    //数据绑定

    ~function () {
        var inner_content_box = document.getElementById("inner_content_box");
        var str = "";
        for (var i = 0; i < jsonDate.length; i++) {
            str += "<a href=''><img src='' trueSrc='" + jsonDate[i].img + "'></a>";
        }
        inner_content_box.innerHTML = str;

        //延迟加载

        var innerImgList = inner_content_box.getElementsByTagName("img");
        console.log(innerImgList);
        (function lazyImg() {
            for (var i = 0, len = innerImgList.length; i < len; i++) {
                (function (i) {
                    var curInnerImg = innerImgList[i];
                    if (curInnerImg.isLoad)return;
                    var tempImg = new Image;
                    tempImg.src = curInnerImg.getAttribute("trueSrc");
                    tempImg.onload = function () {
                        curInnerImg.src = this.src;
                        tempImg = null;
                        curInnerImg.isLoad = true;
                    }
                })(i)
            }
        })();


        var step = 0;
        var imgBoxList = inner_content_box.getElementsByTagName("a");
        imgBoxList[0].style.opacity = 1;

        function imgMove() {
            if (step == 6) {
                step = 0;
            }
            move();
            step++;
        }

        setInterval(imgMove, 5000);
        function move() {
            utils.css(imgBoxList[step], {zIndex: 1, opacity: 1});
            if (step == 5) {
                utils.css(imgBoxList[0], {opacity: 0, zIndex: 2, left: 178});
                animate(imgBoxList[0], {opacity: 1, left: 0}, 1000, 3, function () {
                    this.style.zIndex = 1;
                    var sibilings = utils.siblings(this);
                    for (var i = 0; i < sibilings.length; i++){
                        utils.css(sibilings[i], {zIndex: 0})
                    }
                })
            } else {
                utils.css(imgBoxList[step + 1], {opacity: 0, zIndex: 2, left: 178});
                animate(imgBoxList[step + 1], {opacity: 1, left: 0}, 1000, 3, function () {
                    this.style.zIndex = 1;
                    var sibilings = utils.siblings(this);
                    for (var i = 0; i < sibilings.length; i++) {
                        utils.css(sibilings[i], {zIndex: 0})
                    }
                })
            }
            animate(imgBoxList[step], {opacity: 0, left: -178}, 800);
        }

        var primary_main_tips = document.getElementById("primary_main_tips");
        var tipLis = primary_main_tips.getElementsByTagName("a");
       /* for (var j = 0; j < tipLis.length; j++) {
            (function (j) {
                tipLis[j].onclick = function (e) {
                    clearInterval(timer);
                    e.preventDefault();
                    utils.css(imgBoxList[step], {zIndex: 1, opacity: 1});
                    utils.css(imgBoxList[j], {opacity: 0, zIndex: 2, left: 178});
                    animate(imgBoxList[j], {opacity: 1, left: 0}, 1000, 3, function () {
                        this.style.zIndex = 1;
                        var sibilings = utils.siblings(this);
                        for (var i = 0; i < sibilings.length; i++) {
                            utils.css(sibilings[i], {zIndex: 0})
                        }
                    })

                    animate(imgBoxList[step], {opacity: 0, left: -178}, 800);
                }
            })(j)
        }*/
    }()



    function daojishi(){
        var timerDate=document.getElementById("timerDate");
        var timerH=utils.getElementsByClass("timer_hours",timerDate)[0];
        var timerM=utils.getElementsByClass("timer_min",timerDate)[0];
        var timerS=utils.getElementsByClass("timer_second",timerDate)[0];
        var targetTime = new Date('2016/05/17 17:30:00');
        var curTime = new Date();
        var targetTime1970 = targetTime.getTime();
        var curTime1970 = curTime.getTime();

        var durationTime = targetTime1970 - curTime1970;
        var hours = Math.floor(durationTime / (1000 * 3600));

        var min = Math.floor((durationTime - hours * 3600 * 1000) / (1000 * 60));

        var second = Math.floor((durationTime - hours * 3600 * 1000 - min * 60 * 1000) / 1000);

        var str1 = addZero(hours) ;
        var str2=addZero(min);
        var str3=addZero(second);
        timerH.innerHTML=str1;
        timerM.innerHTML=str2;
        timerS.innerHTML=str3;
    }
    function addZero(num) {
        return num >= 10 ? num : '0' + num;
    }
    setInterval(function (){
        daojishi();
    },1000)
})();