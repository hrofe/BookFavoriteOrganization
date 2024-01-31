/*=========================================
 * animatedModal.js: Version 1.0
 * author: JoÃ£o Pereira
 * website: http://www.joaopereira.pt
 * email: joaopereirawd@gmail.com
 * Licensed MIT 
=========================================*/

(function ($) {

    $.fn.animatedModal = function (options) {
        var modal = $(this);

        //Defaults
        var settings = $.extend({
            modalTarget: "animatedModal",
            position: "fixed",
            width: "100%",
            height: "100%",
            top: "135px",
            left: "0px",
            zIndexIn: "9999",
            zIndexOut: "-9999",
            color: "#ffffff",
            opacityIn: "1",
            opacityOut: "0",
            animatedIn: "zoomIn",
            animatedOut: "bounceOut",
            animationDuration: ".6s",
            overflow: "hidden",
            transform: "none",
            marginTop: "0px",
            marginLeft: "0px",
            border: "0px",
            borderTop: "0px",
            borderRadius:"0px",
            boxShadow: "0",
            // Callbacks
            beforeOpen: function () { },
            afterOpen: function () { },
            beforeClose: function () { },
            afterClose: function () { },
            updateSettings: function () { },

        }, options);
        var closeBt = $(".close-" + settings.modalTarget);

        //console.log(closeBt)

        

        var href = $(modal).attr("href"),
            id = $("body").find("#" + settings.modalTarget),
            idConc = "#" + id.attr("id");

        var initStyles = {
            'position': settings.position,
            'width': settings.width,
            'height': settings.height,
            'top': settings.top,
            'left': settings.left,
            'background-color': settings.color,
            'overflow-y': settings.overflow,
            'z-index': settings.zIndexOut,
            'opacity': settings.opacityOut,
            'transform': settings.transform,
            'marginTop': settings.marginTop,
            'marginLeft': settings.marginLeft,
            '-webkit-animation-duration': settings.animationDuration,
            'border': settings.border,
            'border-top': settings.borderTop,
            'border-radius': settings.borderRadius,
            'box-shadow': settings.boxShadow
        };
        //Apply stles
        id.css(initStyles);
        var spmenuVerticalWidth = window.innerWidth * parseInt(settings.width) / 100;
        var bodyLeft = parseInt($("body").css("left"));
        var siteOverlay = $(".site-overlay");
        var animationWithoutLeft = ["zoomIn", "bounceIn", "slideInDown", "slideInRight", "slideInLeft",
            "fadeInRight","fadeInLeft","fadeInDown", "fadeOutUp", "fadeIn", "fadeOut"];
        var animationWithoverlay = ["fadeInUp"];
        // var siteOvelay = $(".site-overlay > div");
        // siteOvelay.addClass("closebt-" + settings.modalTarget);
        var siteOverlayExit = $(".site-overlay .closebt");

       
            // Default Classes
            //id.addClass("animated");
            $(this).addClass("animatedModal");
            id.addClass(settings.modalTarget + "-off");

            modal.unbind('click').click(function (event) {
                event.preventDefault();
                if (event.handled !== true) {
                    bodyLeft = parseInt($("body").css("left"));
                    bodyLeft = bodyLeft ? bodyLeft : 0;
                    if (!_.contains(animationWithoutLeft, settings.animatedIn)
                        && !_.contains(animationWithoverlay, settings.animatedIn)) {
                        $("body, html").css({ 'overflow': "hidden" });
                        $("body").css("left", bodyLeft - spmenuVerticalWidth);
                    }

                    if (!event.isPropagationStopped()) {
                        if (href === idConc) {
                            if (id.hasClass(settings.modalTarget + "-off")) {
                                id.removeClass();
                                id.removeClass(settings.modalTarget + "-off");
                                id.addClass("animated");
                                id.addClass(settings.modalTarget + "-on");
                            }

                            if (id.hasClass(settings.modalTarget + "-on")) {
                                settings.beforeOpen();
                                id.css({
                                    'opacity': settings.opacityIn,
                                    'z-index': settings.zIndexIn,
                                    'top':settings.top,
                                    'right': settings.right,
                                    'left': settings.left,
                                    'transform': settings.transform,
                                    'margin-top': settings.marginTop,
                                    'margin-left': settings.marginLeft,
                                    'border': settings.border,
                                    'border-top': settings.borderTop,
                                    'box-shadow': settings.boxShadow,
                                    'border-radius': settings.borderRadius,
                                    'position': settings.position,
                                    'height': settings.height,
                                    'background-color': settings.color,
                                    'width':settings.width
                                });
                                id.one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", afterOpen);
                                id.addClass(settings.animatedIn);
                            }
                            //siteOverlay.addClass("close-" + settings.modalTarget);
                            //closeBt = $(".close-" + settings.modalTarget);
                            if (!_.contains(animationWithoutLeft, settings.animatedIn)) {
                                siteOverlay.css("opacity", 1);
                                siteOverlay.css("visibility", "visible");
                                // settings.afterOpen();
                            }
                            if (!_.contains(animationWithoverlay, settings.animatedIn)) {
                                siteOverlay.css("opacity", 1);
                                siteOverlay.css("visibility", "visible");
                                siteOverlay.css("background-color", "rgba(49, 51, 55, 0.3)");
                                // settings.afterOpen();
                            }
                        }
                        event.stopPropagation();
                        event.handled = true;
                    }
                }

            });
            closeBt.unbind('click').click(function (event) {
                event.preventDefault();
                if (event.handled !== true) {
                    if (!event.isPropagationStopped()) {

                        $("html").css({ 'overflow': "hidden" });
                        bodyLeft = bodyLeft ? bodyLeft : 0;
                        $("body").css("left", 0);
                        settings.beforeClose(); //beforeClose
                        if (id.hasClass(settings.modalTarget + "-on")) {
                            id.removeClass(settings.modalTarget + "-on");
                            id.addClass(settings.modalTarget + "-off");
                        }

                        if (id.hasClass(settings.modalTarget + "-off")) {
                            id.one("mozAnimationEnd MSAnimationEnd oanimationend animationend", settings.afterClose);
                            id.removeClass(settings.animatedIn);
                            id.addClass(settings.animatedOut);
                        }
                        siteOverlay.css("opacity", 0);
                        siteOverlay.css("visibility", "hidden");
                    }
                    event.stopPropagation();
                }
                event.handled = true;

            });

            siteOverlayExit.click(function (event) {
                event.preventDefault();
                var openedModal = $("div[class*='-on']")[0];
                if (openedModal !== undefined && openedModal.id === settings.modalTarget) {
                    if (!event.isPropagationStopped()) {
                        id = $(openedModal);
                        $("html").css({ 'overflow': "hidden" });
                        bodyLeft = (bodyLeft ? bodyLeft : 0);
                        $("body").css("left", 0);
                        settings.beforeClose(); //beforeClose
                        if (id.hasClass(openedModal.id + "-on")) {
                            id.removeClass(openedModal.id + "-on");
                            id.addClass(openedModal.id + "-off");
                        }

                        if (id.hasClass(openedModal.id + "-off")) {
                            id.one("mozAnimationEnd MSAnimationEnd oanimationend animationend", settings.afterClose);
                            id.removeClass(settings.animatedIn);
                            id.addClass(settings.animatedOut);
                        }
                        siteOverlay.css("opacity", 0);
                        siteOverlay.css("visibility", "hidden");


                    }

                    event.stopPropagation();
                }

            });
       // }

        
        


        function afterOpen() {
            settings.afterOpen(); //afterOpen
        }

    }; // End animatedModal.js

    

}(jQuery));



