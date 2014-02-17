var chalkboardView = Backbone.View.extend({
    el: '#chalkboard-container',
    template: _.template($('#chalkboardtemplate').html()),

    initialize: function(){
//        this.model.bind('change', this.render);
        this.render();
    },

    render: function(){
        this.$el.html(this.template(this.model.toJSON()));
    },

    events:{
        focusout: 'saveText'
    },

    saveText: function(){
        console.log('saving update...');
        var revision = this.model.get('_rev');
        var updatedText = $('#chalkboard').val();
        console.log(revision);
        console.log(updatedText);
/*        this.model.save({
            "_rev": revision,
            "text": updatedText
        });
//*/
    }
});
