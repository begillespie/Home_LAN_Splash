var chalkboard = Backbone.Model.extend({
    defaults: {
        id: 'ef704f73134837601744efcd11000fed',
//        _rev: '',
        text: 'backbone default text'
    },
    urlRoot: function(){
        return 'http://raspberrypi.home.lan/couchdb/chalkboard/';
    }
});
