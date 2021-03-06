templates.renameListview = "app/views/list/RenameListView.html";

window.RenameListView = Backbone.View.extend({

    title: "Rename list",
    backLabel:" ",
    changed: false,

    initialize: function(options) {

        this.model = options.model;
        this.render();
        this.view = this.$el;

        var self = this;


        /*this.shouldChangeView = function() {

            return !self.changed;
        }  */
    },

    animationComplete: function() {

        var self = this;
        defer(function(){
            //force selection at the end of text
            console.log("focusing");
            var input = self.$el.find("#name");
            input.focus();
        });
    },

    events:{
        "keypress input":"onInputKeyPress",
        //"blur input":"renameNewList",
    },

    render:function (eventName) {
        var template = templates.renameListview;
        this.$el.html(template(this.model));

    },

    onInputKeyPress: function(event) {
        //if "enter" key
        if ( event.keyCode == "13" ) {
            $(event.target).blur();
            this.renameNewList(event);

            event.stopPropagation();
            event.preventDefault();
            return false;

        }  else {
            this.changed = true;
        }

    },

    renameNewList: function(event) {
        var self = this;
        var listName = _.escape( $(event.target).val() );
        this.model.NAME = listName;

        window.DatabaseManager.instance.saveList( this.model, function(result){
            self.changed = false;
            window.viewNavigator.popView();
        } );
    }
});