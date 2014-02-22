var targetView = Backbone.View.extend({
// View for the buttons that display and link to LAN resources.

    tagName: 'li',
    className: 'button',
    template: _.template($('#buttontemplate').html()),

    initialize: function(){
        this.model.bind('change', this.render, this);
    },
    
    render: function(){
        console.log('rendering '+this.model.get('buttonLabel')+' down: '+this.model.get('down'));
        var theButton = this.model;
        if(this.model.get('down')){
            var isDown = 'down';
        }else{
            var isDown = 'up';
        }
        this.$el.removeClass('up down').addClass(isDown).html(this.template(this.model.toJSON()));
        return this;
    },

    events: {
        'click' : 'openLink'
    },

    openLink: function(){
        var url = "http://"+this.model.get('address');
        window.open(url);
    }

});
