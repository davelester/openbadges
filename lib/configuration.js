var path = require('path');

// Various files related to cookie management and other things are saved here.
var var_path = path.join(__dirname, '../var');

// Where to cache badge images from the issued badges
var badge_path = path.join(__dirname, '../static/_badges');

exports.var_path = var_path;
exports.badge_path = badge_path;