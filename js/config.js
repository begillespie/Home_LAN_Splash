var config = {

// These variables define the content, layout and behavior of the page.
  networkResources : [
    {buttonClass: 'xbmc', buttonId: 'xbmc_living_room', address: '192.168.1.101:8080', buttonLabel: 'Living Room', column: 'left'},
    {buttonClass: 'routers', buttonId: 'router1', address: '192.168.1.1', buttonLabel: 'Router', column: 'right'},
    {buttonClass: 'routers', buttonId: 'router2', address: '192.168.1.2', buttonLabel: 'Downstairs Router', column: 'right'},
//    {buttonClass: '', buttonId: '', address: '', buttonLabel: '', column: ''}
    
    // Don't forget to put a comma after each entry except the last.
  ],

// List all the resources and addresses for the splash screen.
//   buttonClass:  Corresponds to the CSS class. You can use it to style different services. DATA TYPE: string
//   buttonId:  A unique identifier for each button. DATA TYPE: string
//   address:  The address or IP address of the resource on the network. Use the form 'address[:port][/path]' without the 'http://' eg. '192.168.1.100:8080/gui'. DATA TYPE: string
//   buttonLabel:  Defines the text on the button. Can be any string, but more than about 20 characters may overflow the button. DATA TYPE: string
//   column: Which column to place the button in. Must be either 'left' or 'right'. Anything else, and it won't render. DATA TYPE: string
    calendarPath: '<iframe src="https://www.google.com/calendar/embed?showTitle=0&amp;height=600&amp;wkst=1&amp;bgcolor=%23FFFFFF&amp;src=en.usa%23holiday%40group.v.calendar.google.com&amp;color=%23AB8B00&amp;ctz=America%2FNew_York" style=" border-width:0 " width="800" height="600" frameborder="0" scrolling="no"></iframe>',
// Embed code for your web calendar. DATA TYPE: string

    databaseRoute: 'http://mediaserver.home.lan/couchdb/chalkboard/',
// Route to the CouchDB database. You will need to create the chalkboard database and document that this app will use.

    databaseDocId: 'chalkboardcontents'
}
