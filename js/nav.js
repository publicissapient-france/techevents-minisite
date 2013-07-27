definePackage("xebia.nav", function(pkg) {

    pkg.NavView = Backbone.View.extend({

        el : "#nav",

        events : {
            "click a" : "onNavElementClick"
        },

        initialize : function() {
            this.onWindowScroll = _.debounce(_.bind(this.onWindowScroll, this), 100);
            $(window).scroll(this.onWindowScroll);
            this.pointer = this.$(".pointer");
            this.onWindowScroll();
        },

        onWindowScroll : function() {
            var anchors = this.$("a").get().reverse();
            var scrollTop = $(window).scrollTop();
            for(var i=0; i<anchors.length; i++) {
                var navLink = $(anchors[i]);
                var target = $(navLink.attr("href"));
                var offsetTop = target.offset().top - 200;
                if(scrollTop>offsetTop) {
                    var navCenter = navLink.position().left + (navLink.width() / 2) + (this.pointer.width() / 2) + 1;
                    this.pointer.animate({left: navCenter + "px"}, 300);
                    break;
                }
            }
        },

        onNavElementClick : function(event) {
            event.preventDefault();
            var target = $($(event.currentTarget).attr("href"));
            $('html,body').animate({scrollTop:target.offset().top-25}, 400);
        }

    });

});