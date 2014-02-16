var Target = Backbone.Model.extend({
    defaults: {
        buttonId : "", //unique ID
        buttonLabel : "placeholder", //Label text
        address : "", //URL
        buttonClass : "", //used to define background picure
        column : "left", //left or right
        down : true
    }
});
