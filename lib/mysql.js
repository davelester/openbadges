var mysql = require('mysql');
var habitat = require('habitat');
var env = new habitat('openbadges');
var client = mysql.createClient(env.get('db'));
var testDb = "`test_" + env.get('db_database') + "`";

var dbEncoding = 'utf8';

var schemas = [
  "CREATE TABLE IF NOT EXISTS `user` ("
    + "id               BIGINT AUTO_INCREMENT PRIMARY KEY,"
    + "email            VARCHAR(255) UNIQUE NOT NULL,"
    + "last_login       INT(13) NULL,"
    + "active           BOOLEAN DEFAULT 1,"
    + "passwd           VARCHAR(255),"
    + "salt             TINYBLOB"
  + ") ENGINE=InnoDB;",

  "CREATE TABLE IF NOT EXISTS `badge` ("
    + "id            BIGINT AUTO_INCREMENT PRIMARY KEY,"
    + "user_id       BIGINT,"
    + "type          ENUM('hosted', 'signed') NOT NULL,"
    + "endpoint      TINYTEXT,"
    + "public_key    TEXT,"
    + "jwt           TEXT,"
    + "image_path    VARCHAR(255) NOT NULL,"
    + "rejected      BOOLEAN DEFAULT 0,"
    + "body          MEDIUMBLOB NOT NULL,"
    + "body_hash     VARCHAR(255) UNIQUE NOT NULL,"
    + "validated_on  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,"
    + "FOREIGN KEY user_fkey (user_id) REFERENCES `user`(id)"
  + ") ENGINE=InnoDB;",

  "CREATE TABLE IF NOT EXISTS `group` ("
    + "id               BIGINT AUTO_INCREMENT PRIMARY KEY,"
    + "user_id          BIGINT NOT NULL,"
    + "name             VARCHAR(255),"
    + "url              VARCHAR(255) UNIQUE,"
    + "public           BOOLEAN DEFAULT 0,"
    + "badges           MEDIUMBLOB NOT NULL,"
    + "FOREIGN KEY user_fkey (user_id) REFERENCES `user`(id)"
  + ") ENGINE=InnoDB;",

  "CREATE TABLE IF NOT EXISTS `portfolio` ("
    + "`id`               bigint AUTO_INCREMENT PRIMARY KEY,"
    + "`group_id`         bigint NOT NULL,"
    + "`url`              varchar(255) UNIQUE,"
    + "`title`            varchar(128),"
    + "`subtitle`         varchar(128),"
    + "`preamble`         text,"
    + "`stories`          mediumblob,"
    + "FOREIGN KEY `group_fkey` (`group_id`) REFERENCES `group`(`id`)"
  + ") ENGINE=InnoDB;"
];

exports.schemas = schemas;

exports.createTables = function () {
  schemas.forEach(function (schema) {
    client.query(schema);
  });
};

exports.useTestDatabase = function () {
  client.query("CREATE DATABASE IF NOT EXISTS " + testDb + " CHARACTER SET '" + dbEncoding + "'");
  client.query("USE " + testDb);
};

exports.dropTestDatabase = function () {
  client.query("DROP DATABASE IF EXISTS " + testDb);
};

exports.prepareTesting = function () {
  exports.dropTestDatabase();
  exports.useTestDatabase();
  exports.createTables();
};

exports.client = client;

client._insert = function (table, fields, callback) {
  var keys = Object.keys(fields);
  var values = keys.map(function (k) { return fields[k] });
  var placeholders = keys.map(function () { return '?' });
  var querystring
    = 'INSERT INTO `' + table + '` '
    + '(' + keys.join(', ') + ') '
    + 'VALUES '
    + '(' + placeholders.join(', ') + ')';

  client.query(querystring, values, callback);
};

client._upsert = function (table, fields, callback) {
  if (!fields['id']) return client._insert(table, fields, callback);
  var keys = Object.keys(fields);
  var values = keys.map(function (k) { return fields[k] });
  var querystring
    = 'UPDATE `' + table + '` SET '
    + keys.map(function (k) { return k + ' = ?'}).join(', ')
    + ' WHERE id = ?';

  values.push(fields['id']);
  client.query(querystring, values, callback);
};

exports.createTables();
