var Target = Backbone.Model.extend({
// Model for the network location. It holds enough data to render and build a link.
    defaults: {
        buttonId : "", //unique ID
        buttonLabel : "placeholder", //Label text
        address : "", //URL
        buttonClass : "", //used to define background picure
        column : "left", //left or right
        down : true
    }
});
