$(function(){

    //collect the left and right column items
    var sortCols = _.groupBy(config.networkResources, function(item){
        return item.column
    });

    var leftCol = new targetListView({
        el: '#left',
        collection: new targetCollection(sortCols.left)
    });

    var rightCol = new targetListView({
        el: '#right',
        collection: new targetCollection(sortCols.right)
    });

    leftCol.render();
    rightCol.render();

    $('#calendar').html(config.calendarPath);

    var board = new chalkboard();
    board.fetch({
        success: function(){
            console.log(board);
            new chalkboardView(
                {model:board}
            );
        }
    });
});

