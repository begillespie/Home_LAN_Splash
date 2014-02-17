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
        var savedModel = this.model;
        console.log(savedModel);
        var revision = savedModel.get('_rev');
        console.log('saving update...rev '+revision);
        var updatedText = $('#chalkboard').val();

        savedModel.save({
            "_rev": revision,
            "text": updatedText
        },
            {success: function(){
                savedModel.fetch()
                }
            })
    }
});
