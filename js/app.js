$(function(){

    //collect the left and right column items
    var sortCols = _.groupBy(config.networkResources, function(item){
        return item.column
    });

    // Create the view objects for each column
    var leftCol = new targetListView({
        el: '#left',
        collection: new targetCollection(sortCols.left)
    });

    var rightCol = new targetListView({
        el: '#right',
        collection: new targetCollection(sortCols.right)
    });

    // Render the views
    leftCol.render();
    rightCol.render();

    // Grab the embed code for the calendar and insert it into the DOM
    $('#calendar').html(config.calendarPath);

    // Create the chalkboard object
    var board = new chalkboard();
    // Fetch chalkboard data from the server, then render it.
    board.fetch({
        success: function(){
            new chalkboardView({model:board});
        }
    });
});

