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
    peopleAnchor();
});

$(document).ready(function(){
    subCmnSclAni();

    aboutLoadAni();
    psyCtgSort();
    peopleAnchor();

    eduLoadAni();

    researchLoadAni();

    faqTglList();
});

//media query matches value
var mqWeb = window.matchMedia("screen and (min-width: 1200px)");
var mqPad = window.matchMedia("screen and (max-width: 991.98px)");
var mqMobile = window.matchMedia("screen and (max-width: 576.98px)");

//sub common scroll animation
function subCmnSclAni() {
    var subCmnAniEl = $("[class*=ani-]").not(".ani-seq");
    var subCmnAniSeqEl = $(".ani-seq");

    $(window).scroll(function(){
        var windowST = $(this).scrollTop();

        $(".scrl-anchor").each(function(){
            var sclAnchorOT = $(this).offset().top;
            var sclAnchorTop = sclAnchorOT - 500;
        
            if(windowST > sclAnchorTop) {
                $(this).addClass("scrl-active");
                $(this).find(subCmnAniEl).addClass("scrl-active");

                $(this).find(subCmnAniSeqEl).each(function(i) {
                    var $this = $(this);
                    setTimeout(function() {
                        $this.addClass("scrl-active");
                    }, i*100);
                });
            }
        });
    });
}

//ABOUT - load animaion
function aboutLoadAni() {
    //심리학 소개
    $(".psy-story-wrap").find(".ani-img").addClass("scrl-active");
    $(".psy-interview").addClass("scrl-active");

    //고려대학교 심리학부
    $(".psy-univ-story").addClass("scrl-active");
    $(".psy-univ-story").find("[class*=ani-]").addClass("scrl-active");

    //People
    $("[class*=people-hd__]").addClass('scrl-active');
    setTimeout(function(){
        $("[class^=people-cont-wrap__]").addClass('scrl-active');
    }, 350);
    setTimeout(function(){
        $(".people-cont").addClass('scrl-active');
    }, 750);
}

//ABOUT - psychology category sorting
function psyCtgSort() {
    $(".psy-ctg-tab").on("click", function(){
        var thisPsyCtgData = $(this).attr("data-psyctg");
        var thisPsyCtgTag = $('.' + thisPsyCtgData);

        var thisPsyCtgColor = $(this).attr("data-psycolor");

        $(".psy-ctg-tab").not($(this)).removeClass("active");
        $(this).addClass("active");

        $(".psy-ctg-tag").hide();
        $(".psy-ctg-tag-wrap").find(thisPsyCtgTag).fadeIn(250);
        $(".psy-ctg-tag-wrap").find(thisPsyCtgTag).css('background-color', thisPsyCtgColor);

        if(thisPsyCtgData == "psy-ctg__all" ) {
            $(".psy-ctg-tag").fadeIn(250);
            $(".psy-ctg-tag").css('background-color', thisPsyCtgColor);
        }
    });
}

//PEOPLE - scroll anchor
function peopleAnchor() {
    var peopleAnchorMenu = $(".people-anchor-menu");
    var peopleAnchorBtn = $(".people-anchor-btn");
    var peopleAnchor = $(".people-anchor");

    peopleAnchorBtn.on("click", function(){
        var thisAnchorData = $(this).attr("data-anchor");
        var thisAnchorEl = $("#" + thisAnchorData);
        var thisAnchorTop = thisAnchorEl.offset().top;

        if (mqMobile.matches) {
            $("html, body").animate({
                scrollTop: thisAnchorTop - $("header").innerHeight() - peopleAnchorMenu.innerHeight() - 30
            }, 850);
        } else {
            $("html, body").animate({
                scrollTop: thisAnchorTop - $("header").innerHeight()
            }, 850);
        }
    });

    $(window).scroll(function() {
        var windowTop = $(this).scrollTop();

        peopleAnchor.each(function(){
            var peopleAnchorTop = $(this).offset().top - $("header").innerHeight();

            if(windowTop > peopleAnchorTop - 200) {
                var peopleAnchorData = $(this).attr("id");
                var thisPeopeAnchorBtn = $("[data-anchor='" + peopleAnchorData + "']");

                peopleAnchorBtn.not(thisPeopeAnchorBtn).stop().removeClass("active");
                thisPeopeAnchorBtn.stop().addClass("active");
            }
        });

        if($(".people-cont").length > 0 ) {
            var peopleContTop = $(".people-cont").offset().top;
            
            if(windowTop > peopleContTop - 50 ) {
                peopleAnchorMenu.addClass("scrl-active");
            } else {
                peopleAnchorMenu.removeClass("scrl-active");
            }
        }
    });
}

//RESEARCH - load animation
function researchLoadAni() {
    //연구주제
    var researchAniEl = $("[class*=ani-]").not(".ani-seq");
    var researchAniSeqEl = $(".ani-seq");

    $("#researchSubt").find(researchAniEl).addClass("scrl-active");
    setTimeout(function(){
        $(".subt-list-wrap").find(researchAniSeqEl).each(function(i) {
            var $this = $(this);
            setTimeout(function() {
                $this.addClass("scrl-active");
            }, i*100);
        });
    }, 1000);
    $("#labKirbs").find(researchAniEl).addClass("scrl-active");
}

//Education - load animaion
function eduLoadAni() {
    var eduAniEl = $("[class*=ani-]").not(".ani-seq");

    $(".goal-hd, .career-hd").find(eduAniEl).addClass("scrl-active"); //0810 zoe 수정
}

//NEW&EVENT - faq toggle list
function faqTglList() {
    var faqTit = $(".faq-list-tit");
    var faqTxt = $(".faq-list-txt");

    faqTit.on("click", function() {
        faqTit.not($(this)).removeClass("active");
        faqTxt.not($(this).next(faqTxt)).slideUp(350);

        $(this).toggleClass("active");
        $(this).next(faqTxt).slideToggle(350);
    });
}