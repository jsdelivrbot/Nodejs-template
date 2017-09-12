var db = require("../db.js");
var schemas = require("../schemas.js");
var _ = require("lodash");
var pg = require('pg');
var config = require('../predix-config');


var Partner = function (data) {
    this.data = this.sanitize(data);
}

Partner.prototype.data = {}

Partner.prototype.get = function (key) {
    return this.data[key];
}

Partner.prototype.set = function (key, key_value) {
    this.data[key] = key_value;
}

Partner.prototype.sanitize = function (data) {
    data = data || {};
    schema = schemas.partner;
    return _.pick(_.defaults(data, schema), _.keys(schema)); 
}

Partner.prototype.save = function (callback) {
        var self = this;
        this.data = this.sanitize(this.data);
        const results = [];
        const connectionString = config.databaseURL;
        pg.connect(connectionString, (err, client, done) => {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({success: false, data: err});
        }
        // SQL Query > Insert Data
        client.query('INSERT INTO partner(key, value) values($1, $2)',
        [this.data.key, this.data.value]);
        // SQL Query > Select Data
        const query = client.query('SELECT * FROM partner ORDER BY id ASC');
        // Stream results back one row at a time
        query.on('row', (row) => {
          results.push(row);
        });
        // After all data is returned, close connection and return results
        query.on('end', () => {
          done();
          return res.json(results);
        });
    });
}

Partner.findById = function (id, callback) {
    db.get('partners', {id: id}).run(function (err, data) {
        if (err) return callback(err);
        callback(null, new Partner());
    });
}

Partner.init = function(){
    console.log("Start init");
    const connectionString = config.databaseURL;
    const client = new pg.Client(connectionString);
    client.connect();
    const query = client.query(
    'CREATE TABLE partner(id SERIAL PRIMARY KEY, key VARCHAR(40) not null, value VARCHAR(40) not null)');
    query.on('end', () => { client.end(); });
    //this.data = this.sanitize(data);
    console.log("End init");
}

module.exports = Partner;