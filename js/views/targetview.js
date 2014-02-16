var targetView = Backbone.View.extend({

    tagName: 'li',
    className: 'button',
    template: _.template($('#buttontemplate').html()),

    render: function(){
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },

//*
    events: {
        'click' : 'openLink'
    },

    openLink: function(){
        alert(this.model.get('address'));
    }
//*/

});
