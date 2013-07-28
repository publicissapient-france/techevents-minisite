
definePackage("xebia", function(pkg) {

    pkg.constants = {
        VIMEO_CHANNEL_ID : "544319",
        EVENTBRITE_USER_APIKEY : "133119264928907654573",
        EVENTBRITE_APP_APIKEY : "5HM4H3GBHO5WB2DRMW"
    };

    pkg.Application = fwk.Class.extend({

        start : function() {
            console.log("application started");

            var videos = new pkg.vimeo.VimeoVideoCollection();
            videos.fetch();

            var videosView = new pkg.vimeo.VimeoVideoCollectionView({collection : videos});
            videosView.$el.appendTo($("#our-videos .videos-container"));

            var navView = new pkg.nav.NavView();

            var events = new pkg.eventbrite.TechEventCollection();
            events.fetch();

            var techeventView = new pkg.eventbrite.TechEventCollectionView({collection : events});
            techeventView.$el.appendTo($("#incoming .events-container"));

            /*$('.our-formations .flexslider').flexslider({
                animation: "slide",
                animationLoop: true,
                directionNav: false,
                itemWidth: 700,
                slideshowSpeed: 5000,
                itemMargin: 0,
                minItems: 1,
                maxItems: 1
            });*/

        }

    });

});