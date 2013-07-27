definePackage("xebia.blog", function(pkg) {

    pkg.BlogArticle = Backbone.Model.extend({

        defaults : {
            "id": 1,
            "type": "post",
            "slug": "hello-world",
            "url": "http:\/\/localhost\/wordpress\/?p=1",
            "title": "Hello world!",
            "title_plain": "Hello world!",
            "content": "<p>Welcome to WordPress. This is your first post. Edit or delete it, then start blogging!<\/p>\n",
            "excerpt": "Welcome to WordPress. This is your first post. Edit or delete it, then start blogging!\n",
            "date": "2009-11-11 12:50:19",
            "modified": "2009-11-11 12:50:19",
            "categories": [],
            "tags": [],
            "author": {
                "id": 1,
                "slug": "admin",
                "name": "admin",
                "first_name": "",
                "last_name": "",
                "nickname": "",
                "url": "",
                "description": ""
            },
            "comments": [
                {
                    "id": 1,
                    "name": "Mr WordPress",
                    "url": "http:\/\/wordpress.org\/",
                    "date": "2009-11-11 12:50:19",
                    "content": "<p>Hi, this is a comment.",
                    "parent": 0
                }
            ],
            "comment_count": 1,
            "comment_status": "open"
        },

        parse : function(response) {
            // need to parse dates using moment ?
            return response;
        }

    });

    pkg.BlockArticleCollection = Backbone.Collection.extend({

        url : "http://blog.xebia.fr/wp-json-api/get_category_posts/?slug=nosql",

        sync: function(method, model, options) {
            options.dataType = "jsonp";
            return Backbone.sync.apply(this, arguments);
        },

        parse : function(response) {
            return response.posts;
        }

    });

    pkg.BlogArticleView = Backbone.View.extend({

        className : "blog-article",

        render : function() {
            this.$el.empty();
            this.ui = {};
            this.ui.link = $("<a>").attr("href", this.model.get("url")).appendTo(this.$el);
            this.ui.title = $("<h3>").html(this.model.get("title")).appendTo(this.ui.link);
            this.ui.excerpt = $("<p>").addClass("excerpt").html(this.model.get("excerpt")).appendTo(this.ui.link);
            if(!this.options.last) {
                this.ui.separator = $("<div>").addClass("separator").appendTo(this.$el);
            }
        }

    });

    pkg.BlogArticleCollectionView = Backbone.View.extend({

        className : "blog-articles clearfix",

        initialize : function() {
            this.listenTo(this.collection, "sync", this.render, this);
        },

        render : function() {
            this.$el.empty();
            var firsts = this.collection.first(5);
            _.each(firsts, function(video, i) {
                var view = new pkg.BlogArticleView({model : video, last : i==firsts.length-1});
                view.$el.appendTo(this.$el);
                view.render();
            }, this);
        }

    });


});