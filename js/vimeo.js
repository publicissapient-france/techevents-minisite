definePackage("xebia.vimeo", function(pkg) {

    pkg.VimeoVideo = Backbone.Model.extend({

        defaults : {
            "title" : "",                       // Video title
            "url" : "",                         //	URL to the Video Page
            "id" : "",	                        // Video ID
            "description" : "",	                // The description of the video
            "thumbnail_small" : "",             //	URL to a small version of the thumbnail
            "thumbnail_medium" : "",            //	URL to a medium version of the thumbnail
            "thumbnail_large" : "",             //	URL to a large version of the thumbnail
            "user_name" : "",                   //	The user name of the video�s uploader
            "user_url" : "",                    //	The URL to the user profile
            "upload_date" : "",                 //	The date/time the video was uploaded on
            "user_portrait_small" : "",         //	Small user portrait (30px)
            "user_portrait_medium" : "",        //	Medium user portrait (100px)
            "user_portrait_large" : "",         //	Large user portrait (300px)
            "stats_number_of_likes" : "",       //	# of likes
            "stats_number_of_views" : "",       //	# of views
            "stats_number_of_comments" : "",    //	# of comments
            "duration" : "",                    //	Duration of the video in seconds
            "width" : "",                       //	Standard definition width of the video
            "height" : "",                      //	Standard definition height of the video
            "tags" : ""                         //	Comma separated list of tags
        }

    });

    pkg.VimeoVideoCollection = Backbone.Collection.extend({

        url : "http://vimeo.com/api/v2/channel/"+ xebia.constants.VIMEO_CHANNEL_ID +"/videos.json",

        sync: function(method, model, options) {
            options.dataType = "jsonp";
            return Backbone.sync.apply(this, arguments);
        }

    });

    pkg.VimeoVideoView = Backbone.View.extend({

        className : "vimeo-video",

        render : function() {
            this.$el.empty();
            this.ui = {};
            var playerUrl = "http://player.vimeo.com/video/" + this.model.get("id");
            this.ui.iframe = $("<iframe>") // webkitAllowFullScreen mozallowfullscreen allowFullScreen
                .attr({
                    src     : playerUrl,
                    width   : 400,
                    height  : 300,
                    frameborder : "0"
                })
                .appendTo(this.$el);
        }
    });

    pkg.VimeoVideoCollectionView = Backbone.View.extend({

        className : "vimeo-videos clearfix",

        initialize : function() {
            this.listenTo(this.collection, "sync", this.render, this);
        },

        render : function() {
            this.$el.empty();
            _.each(this.collection.first(4), function(video) {
                var view = new pkg.VimeoVideoView({model : video});
                view.$el.appendTo(this.$el);
                view.render();
            }, this);
        }

    });

});