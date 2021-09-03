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
    pcNav();

    //mobile navigation
    if (window.matchMedia("screen and (max-width: 1375.98px)").matches) {
        var hdMoNav = $(".hd-nav");
        // var hdMoNavMenu = $(".hd-nav-menu"); 0226 zoe 삭제
    
        hdMoNav.hide();
    
        $(".full-nav-tgl-btn").removeClass("active");
    }

    sclTopBtn();
});;

$(document).ready(function(){
    scrlHd(); //0226 zoe 추가
    pcNav();
    footerMenuTgl();
    sclTopBtn();
    modal();
    formEv();
});

//media query matches value
var mqWeb = window.matchMedia("screen and (min-width: 1200px)");
var mqPad = window.matchMedia("screen and (max-width: 991.98px)");
var mqMobile = window.matchMedia("screen and (max-width: 576.98px)");

//header (0226 zoe 추가)
function scrlHd() {
    $(window).scroll(function(){
        var windowST = $(this).scrollTop();
        if(windowST > 0) {
            $("header").addClass('scrl-active');
        }
        if(windowST == 0 || windowST < 0) {
            $("header").removeClass('scrl-active');
        }
    });
}
//pc navigation
function pcNav() {
    if (mqWeb.matches) {
        var hd = $("header");
        var hdNav = $(".hd-nav");
        var hdNavMenu = $(".hd-nav-menu");

        hdNav.show();

        hdNavMenu.on("mouseenter", function(){
            $(".hd-nav").addClass("active");
            $(".hd-nav-submenu-wrap").show();
        });
        hd.on("mouseleave", function(){
            $(".hd-nav").removeClass("active");
            $(".hd-nav-submenu-wrap").hide();
        });

        hd.keydown(function (e) {
            var code = e.keyCode || e.which;
    
            if (code === 9) {
                hdNavMenu.focus(function () {
                    $(".hd-nav").addClass("active");
                    $(".hd-nav-submenu-wrap").show();
                });
                $(".hd-nav-submenu__last").blur(function(){
                    $(".hd-nav").removeClass("active");
                    $(".hd-nav-submenu-wrap").hide();
                });
            }
        });
    }
}

//mobile navigation
if (window.matchMedia("screen and (max-width: 1375.98px)").matches) {

    var hdMoNav = $(".hd-nav");
    var hdMoNavMenu = $(".hd-nav-menu");

    hdMoNav.hide();

    $(".full-nav-tgl-btn").removeClass("active");

    $(document).on('click', '.full-nav-tgl-btn', 'clicked', function(e) { //fix iOS click issue
        e.preventDefault();

        $("html").toggleClass("full");
        
        $(this).toggleClass("active");
        hdMoNav.toggle();
        $(".hd-nav-submenu-wrap").hide();
    });

    hdMoNavMenu.on('click', function(e){
        e.preventDefault();
        
        $(".hd-nav-submenu-wrap").not($(this).next(".hd-nav-submenu-wrap")).hide();
        $(this).next(".hd-nav-submenu-wrap").stop().slideToggle(250);
    });
}

//footer menu toggle evnet
function footerMenuTgl() {
    $('.ft-menu__tit').on('click', function(){
        $(this).toggleClass("active");

        $('.ft-menu__tit').next("ul").not($(this).next("ul")).slideUp(250);
        $(this).next("ul").slideToggle(250);
    });
}

//scroll top button
function sclTopBtn() {
    if (mqWeb.matches) {
        $("#sclTopBtn").hide();
    
        $(window).scroll(function() {
            var windowTop = $(this).scrollTop();
    
            if(windowTop > 0) {
                $("#sclTopBtn").fadeIn(350).addClass("scrl-active");
            } else {
                $("#sclTopBtn").fadeOut(350).removeClass("scrl-active");
            }

            if(windowTop + $(window).height() == $(document).height()) {
                $("#sclTopBtn").removeClass("scrl-active");
            }
        });
    
        $("#sclTopBtn").on('click', function(){
            $("html, body").animate({
                scrollTop: 0
            }, 850);
        });
    }
}

//common modal
function modal() {
    var modalArea = $(".modal-area");
    var modalWrap = $("[class^=modal-wrap__]");
    var showModal = $('.show-modal-btn');
    var closeModal = $(".close-modal-btn");

    if(modalArea.is(':visible')) {
        $("html").addClass('full');
    } else {
        $("html").removeClass('full');
    }

    showModal.on('keypress', function (e) {
        e.preventDefault();
        $('html').addClass('full');
        modalArea.fadeIn(250);
    });
    showModal.on('click', function (e) {
        e.preventDefault();
        $('html').addClass('full');
        modalArea.fadeIn(250);
    });

    closeModal.on('keypress', function (e) {
        e.preventDefault();
        $('html').removeClass('full');
        modalArea.fadeOut(250);

        $(".contact-modal-btn").focus(); //ABOUT - Contact tab key web accessibility
    });
    closeModal.on('click', function (e) {
        e.preventDefault();
        $("html").removeClass('full');
        modalArea.fadeOut(250);
    });

    modalArea.on('click', function(e){
        if (!$(e.target).closest(modalWrap).length) {
            $("html").removeClass('full');
            $(this).fadeOut(150);
        }
    });
}

//onclick modal
function clickModal(odj) {
    $("html").addClass("full");

    var thisModalData = $(odj).data("modal");
    var thisModal = $('#' + thisModalData)

    thisModal.fadeIn(250);

    $('.close-modal-btn').attr('tabindex', '1').focus();
    
}

//form
function formEv() {
    $("input:checkbox").on("keypress", function (e) {
        e.preventDefault(); //prevent scroll to top

        if (e.which === 13) {
            $(this).prop("checked", !$(this).prop("checked"));
        }
    }); 
}