//control window resize trigger
$(window).resize(function() {
    if(this.resizeTO) {
        clearTimeout(this.resizeTO);
    }
    this.resizeTO = setTimeout(function() {
        $(this).trigger('resizeEnd');
    }, 0);
});

$(window).on('resizeEnd', function() {
    mainHd();
    scrlMainAni();
});

$(document).ready(function(){
    mainHd();
    mainNtcBnr(); //0226 zoe 추가
    scrlMainAni();
    tabIdxMov();
});

//media query matches value
var mqWeb = window.matchMedia("screen and (min-width: 1200px)");
var mqPad = window.matchMedia("screen and (max-width: 991.98px)");
var mqMobile = window.matchMedia("screen and (max-width: 576.98px)");

//main header
function mainHd() {
    if (mqWeb.matches) {
        var mainHd = $("#mainHd");
        var mainFocusEl = $(".hd-logo a, .hd-nav-menu");

        mainHd.keydown(function (e) {
            var code = e.keyCode || e.which;
    
            if (code === 9) {
                mainFocusEl.focus(function () {
                    mainHd.addClass("scrl-active");
                });
                $(".hd-nav-submenu__last").blur(function(){
                    mainHd.removeClass("scrl-active");
                });
            }
        });
    }

    // $(window).scroll(function(){
    //     var windowST = $(this).scrollTop();
    //     if(windowST > 0) {
    //         $("#mainHd").addClass('scrl-active');
    //     }
    //     if(windowST == 0 || windowST < 0) {
    //         $("#mainHd").removeClass('scrl-active');
    //     }
    // }); 0226 zoe 삭제
}

//mobile navigation (0226 zoe 추가)
if (window.matchMedia("screen and (max-width: 1375.98px)").matches) {

    $(document).on('click', '.full-nav-tgl-btn', 'clicked', function(e) { //fix iOS click issue
        e.preventDefault();

        $("#mainHd").toggleClass("fixed");
    });
}

//main notice banner (0226 zoe 추가)
function mainNtcBnr() {
    var closeMainNtcBtn = $(".main-notice-bnr").find(".close-modal-btn");

    closeMainNtcBtn.on("click touchstart", function(){
        $(this).parents(".main-notice-bnr").slideUp(300);
    });
}

//main scroll animation
function scrlMainAni() {
    var mainFadeInEl = $(".ani-fadein, .ani-txt");
    var mainFadeInSeqEl = $(".ani-fadein__up");

    $(window).scroll(function(){
        var windowST = $(this).scrollTop();

        $(".main-sect").each(function(){
            var mainSectOT = $(this).offset().top;
            var mainSectHT = $(this).innerHeight();

            if (matchMedia("screen and (max-width: 991.98px)").matches) {
                var mainSectTop = mainSectOT - 300;
            } else {
                var mainSectTop = mainSectOT - mainSectHT;
            }
        
            if(windowST > mainSectTop) {
                $(this).find(mainFadeInEl).addClass("scrl-active");

                $(this).find(mainFadeInSeqEl).each(function(i) {
                    var $this = $(this);
                    setTimeout(function() {
                        $this.addClass("scrl-active");
                    }, i*100);
                });
            }
        });
    });
}

//main visual player
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var mainVisualPlayer;
var mainPromoPlayer;

function onYouTubePlayerAPIReady() {
    mainVisualPlayer = new YT.Player('mainVslYtb', {
        videoId: 'FxeYT20-6iE', //0226 zoe 수정
        playerVars: {
            rel: 0, //동영상 종료 후 관련 동영상 표시하지 않기
            controls: 0,
            modestbranding: 1, //플레어어 내 유튜브 로고 삭제
            fs: 0, //전체 화면 버튼 삭제
            autohide: 0,
            mute: 1,
            autoplay: 1,
            loop: 1, //동영상 무한 반복
            playlist: 'FxeYT20-6iE' //반복시킬 동영상 주소 (0226 zoe 수정)
        },
        events: {
            'onReady': onPlayerReady
        }
    });
    mainPromoPlayer = new YT.Player('mainPromoYtb', {
        videoId: 'LV7UhA8mpfk',
        playerVars: {
            rel: 0, //동영상 종료 후 관련 동영상 표시하지 않기
            modestbranding: 1, //플레어어 내 유튜브 로고 삭제
            fs: 0, //전체 화면 버튼 삭제
            autohide: 0,
            autoplay: 0
        },
        events: {
            'onReady': onPlayerReady
        }
    });
}
function onPlayerReady(event) {
    if (mqWeb.matches) {
        event.target.playVideo();
    }

    mainPromoPlayer.stopVideo();
    $("#mainPromoYtbThumb").on('click', function(e) {
        e.preventDefault();

        $(this).hide();
        mainPromoPlayer.playVideo();
    });
}

//tabindex of youtube
function tabIdxMov() {
    $("#mainVslYtb").attr('tabindex', -1);
}