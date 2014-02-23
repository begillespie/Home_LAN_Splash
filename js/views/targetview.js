var targetView = Backbone.View.extend({
// View for the buttons that display and link to LAN resources.

    tagName: 'li',
    className: 'button',
    template: _.template($('#buttontemplate').html()),

    initialize: function(){
// Change listener. Specifically, there are asynchronous AJAX calls out to check for connectivity
// of the services. When the calls return, this will help display the appropriate up/down indicator.
        this.model.bind('change', this.render, this);
    },
    
    render: function(){
// Check the staus and apply the proper CSS class.
        if(this.model.get('down')){
            var isDown = 'down';
        }else{
            var isDown = 'up';
        }
        this.$el.removeClass('up down').addClass(isDown).html(this.template(this.model.toJSON()));
        return this;
    },
// Click event make the entire <div> clickable. Links open in a new tab.
    events: {
        'click' : 'openLink'
    },

    openLink: function(){
        var url = "http://"+this.model.get('address');
        window.open(url);
    }

});
