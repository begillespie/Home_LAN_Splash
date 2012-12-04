var config = {

// These five variables define the content, layout and behavior of the page.

  networkResources : [
    {typeClass: 'xbmc', buttonId: 'xbmc_living_room', address: '192.168.1.101:8080', label: 'Living Room'},
    {typeClass: 'xbmc', buttonId: 'xbmc_upstairs', address: '192.168.1.104:8080', label: 'Upstairs'},
    {typeClass: 'xbmc', buttonId: 'xbmc_bedroom', address: '192.168.1.111:8080', label: 'Bedroom'},
    {typeClass: 'services', buttonId: 'utorrent', address: '192.168.1.100:8080', label: '&micro;Torrent'},
    {typeClass: 'routers', buttonId: 'router1', address: '192.168.1.1', label: 'Router'} // Don't forget to put a comma after each entry except the last.
  ],
// List all the resources and addresses for the splash screen.
//   typeClass:  Use to make groups of resources. The names and number of 'typeClass' is arbitrary, but each one must be assigned to a column in the 'typeClassList' array below. DATA TYPE: string
//   buttonId:  A unique identifier for each button. DATA TYPE: string
//   address:  The address or IP address of the resource on the network. Use the form 'address[:port][/path]' without the 'http://' eg. '192.168.1.100:8080/gui'. DATA TYPE: string
//   label:  Defines the text on the button. Can be any string, but more than about 20 characters may overflow the button. DATA TYPE: string

  typeClassList : [
    {typeClass: 'xbmc', column: 'left'},
    {typeClass: 'services', column: 'right'},
    {typeClass: 'routers', column: 'right'} // Don't forget to put a comma after each entry except the last.
  ],
// Define the layout for the resources. Each 'typeClass' is displayed in a separate box in the specified column. 
//   typeClass:  Must correlate to 'typeClass' in the networkResources array. DATA TYPE: string
//   column:  Specify "left" or "right". DATA TYPE: string

  openInNewTab : true,
// Do you want to open links in a new tab or not? DATA TYPE: boolean (true/false)

  ajaxTimeout : 6,
// Specify the timeout in seconds. Longer timeout will give other systems more time to respond when we check them, but slow page load time. DATA TYPE: integer

  calendarPath : '<iframe src="https://www.google.com/calendar/embed?height=600&amp;wkst=1&amp;bgcolor=%23FFFFFF&amp;src=en.usa%23holiday%40group.v.calendar.google.com&amp;color=%23AB8B00&amp;ctz=America%2FNew_York" style=" border-width:0 " width="800" height="600" frameborder="0" scrolling="no"></iframe>'
// Embed code for your web calendar. DATA TYPE: string

}

