var targetListView = Backbone.View.extend({
// View for a collection of targets.
//
// This view is used twice to render two columns of buttons. 
// el: is passed into the view when it is created.

    initialize: function(){
//        _.bindAll(this, 'renderItem');
    },

// Create an item view and append it to $el.
    renderItem: function(item){
        var itemview = new targetView({
            model: item,
            id : item.get('buttonId')
        });
        this.$el.append(itemview.render().el);
    },

// Loop over the collection and render each item.
    render: function(){
        this.collection.each(function(target){
            this.renderItem(target);
        },this);
    },
});
