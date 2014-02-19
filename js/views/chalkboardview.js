var chalkboardView = Backbone.View.extend({
// View for the persistent chalkboard. It uses CouchDB to store the data.
    
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

// Save updated contents of the textarea on blur
    saveText: function(){
// Keep a reference to the model; the scope of 'this.' changes.
        var savedModel = this.model;
        var revision = savedModel.get('_rev');
        var updatedText = $('#chalkboard').val();

// CouchDB expects the revision number with a PUT request.
        savedModel.save({
            "_rev": revision,
            "text": updatedText
        },
// Success callback to get the new revision number back from the server.
            {success: function(){
                savedModel.fetch()
                }
            })
    }
});
