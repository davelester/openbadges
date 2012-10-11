var path = require('path');
var habitat = require('habitat');
var env = new habitat('openbadges');

// Various files related to cookie management and other things are saved here.
var var_path = path.join(__dirname, '../../var');

// Where to cache badge images from the issued badges
var badge_path = path.join(__dirname, '../../static/_badges');

exports.get = function (key) {
  return env.get(key);
};