var targetListView = Backbone.View.extend({
    initialize: function(){
//        _.bindAll(this, 'renderItem');
    },

    renderItem: function(item){
        var itemview = new targetView({
            model: item,
            id : item.get('buttonId')
        });
        this.$el.append(itemview.render().el);
    },

    render: function(){
        this.collection.each(function(target){
            this.renderItem(target);
        },this);
    },

/* 
    events : {
        'click .button' : 'openLink'
    },

    openLink : function(e) {
        console.log(e);
        e.preventDefault();
        console.log(this);
        console.log(this.model.get('address'));
    }
//*/

});
