var chalkboard = Backbone.Model.extend({
    defaults: {
// We're only manipulating one record, so here is its ID hardcoded into the app.
        id: config.databaseDocId,
//        _rev: '',
        text: 'backbone default text'
    },
// URL = urlRoot + id. Backbone expects a relative URL. I'm using the webserver to
// proxy requests to CouchDB, so this function returns the absolute URL.
    urlRoot: function(){
        return config.databaseRoute;
    }
});
