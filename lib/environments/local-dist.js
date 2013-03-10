var path = require('path');
exports.config = {
  // either http or https
  protocol: 'http',

  // hostname is important for authentication,
  // if it doesn't match the URL you're serving from,
  // backpack won't work.
  hostname: 'localhost',

  // When starting the application with `node app.js`, this is the port
  // that the application will try to bind to. When remote_port is *not*
  // set, this will also be used to construct fully qualified urls to
  // application resources
  port: 8888,

  // If you are running the application behind a proxy or load
  // balancer, this should be set the externally accessible port.
  // You can use the string 'default' to use the default port for
  // your specified protocol. This is primarily used when constructing
  // fully qualified urls to resources served by the application.
  // remote_port: 'default',

  // Various files related to cookie management and other things are saved here.
  var_path: path.join(__dirname, '../../var'),

  // Where to cache badge images from the issued badges
  badge_path: path.join(__dirname, '../../static/_badges'),

  // Administrators, users with these accounts can access certain pages
  admins: ['example@example.com'],

  // Database configuration
  // Make sure to create a user that has full privileges to the database
  database: {
    driver: 'mysql',
    host: '127.0.0.1',
    user: 'badgemaker',
    password: 'secret',
    database: 'openbadges'
  },

  // BrowserID verifier location.
  // You almost certainly shouldn't need to change this.
  identity: {
    protocol: 'https',
    server: 'verifier.login.persona.org',
    path: '/verify'
  },

  // Include New Relic? If this is set to true, your server will not
  // start unless you configure the New Relic agent, https://npmjs.org/package/newrelic
  new_relic: false,

  // Facebook application info. Create a new application at https://developers.facebook.com/
  // In addition to setting activated to true in this config file and declaring app ID and secret
  // configure FB's opengraph settings to declare an object called badge, and action called Award
  facebook: {
    activated: false,
    app_id: 12345,
    app_secret: 'abcdefg'
  }
}
