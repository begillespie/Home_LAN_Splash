var Target = Backbone.Model.extend({
// Model for the network location. It holds enough data to render and build a link.
    defaults: {
        buttonId : "", //unique ID
        buttonLabel : "placeholder", //Label text
        address : "", //URL
        buttonClass : "", //used to define background picure
        column : "left", //left or right
        down : true // Will change to up if we get a 2XX or 3XX http response
    },


    // Initialize function to check the HTTP staus of the target and determin if it is up or down.
    initialize: function(){
        var t = this; // Scope of 'this' changes inside of the ajax call
        var checkURL = t.get('address');
        $.ajax({
            url : ('scripts/gethttpstatus.php'),
            dataType: 'json',
            data: {url: checkURL},
            success: function(data){ // Script returns an integer status code
                var codeType = Math.floor(data/100); // Take 2xx or 3xx = up
                if (codeType == 2 || codeType == 3) {
                    t.set({down:false}); // Models default to down. Change listener in targetView rerenders.
                };
            }
        });
        
    }
});
