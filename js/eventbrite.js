definePackage("xebia.eventbrite", function(pkg) {

    pkg.TechEvent = Backbone.Model.extend({

        defaults : {
            id: 0,
            background_color: "FFFFFF",
            box_background_color: "FFFFFF",
            box_border_color: "D5D5D3",
            box_header_background_color: "EFEFEF",
            box_header_text_color: "005580",
            box_text_color: "000000",
            capacity: 30,
            category: "seminars,conferences",
            created: "",
            description: "",
            end_date: "",
            link_color: "",
            logo: "",
            logo_ssl: "",
            modified: "",
            num_attendee_rows: 0,
            organizer: null,
            privacy: "Public",
            repeats: "no",
            start_date: "",
            status: "Live",
            tags: "",
            text_color: "005580",
            tickets: null,
            timezone: "Europe/Paris",
            timezone_offset: "GMT+0200",
            title: "",
            title_text_color: "",
            url: ""
        },

        parse : function(response) {
            // need to parse dates using moment ?
            return response;
        }

    });

    pkg.TechEventCollection = Backbone.Collection.extend({

        fetch:function(){
            var collection = this
            Eventbrite({'app_key': "5HM4H3GBHO5WB2DRMW"}, function(eb){
                eb.organizer_list_events( {'id': 1627902102}, function( response ){
                    var incomingEvents = _.pluck(_.filter(response.events, function (event){
                        return event.event.status == "Live";
                    }), 'event');
                    collection.reset(incomingEvents);
                    collection.trigger('sync');
                });
            });
        },

        parse : function(response) {
            debugger;
            return response.posts;
        }

    });

    pkg.TechEventView = Backbone.View.extend({

        className : "event",

        render : function() {
            this.$el.empty();
            this.ui = {};
            this.ui.img = $("<img>").attr("src", this.model.get("logo")).appendTo(this.$el);
            this.ui.title = $("<h3>").html(this.model.get("title")).appendTo(this.$el);
            var desc = $(this.model.get('description')).text().trim();
            this.ui.description = $("<p>").addClass("description").html(desc).appendTo(this.$el);
        }

    });

    pkg.TechEventCollectionView = Backbone.View.extend({

        className : "events clearfix",

        initialize : function() {
            this.listenTo(this.collection, "sync", this.render, this);
        },

        render : function() {
            this.$el.empty();
            var firsts = this.collection.first(5);
            _.each(firsts, function(event, i) {
                var view = new pkg.TechEventView({model : event, last : i==firsts.length-1});
                view.$el.appendTo(this.$el);
                view.render();
            }, this);
        }
    });
});
