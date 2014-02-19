var targetView = Backbone.View.extend({
// View for the buttons that display and link to LAN resources.

    tagName: 'li',
    className: 'button',
    template: _.template($('#buttontemplate').html()),

    render: function(){
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },

    events: {
        'click' : 'openLink'
    },

    openLink: function(){
        alert(this.model.get('address'));
    }

});
