var db = {

    
    get: function () {
    const connectionString = config.databaseURL;
    const client = new pg.Client(connectionString);
    client.connect();
    const query = client.query(
    'Select TABLE partner(id SERIAL PRIMARY KEY, key VARCHAR(40) not null, value VARCHAR(40) not null)');
    query.on('end', () => { client.end(); });
    //this.data = this.sanitize(data);
    console.log("End init");



        return this;
    }, 
    update: function(data) { 
        this.returnData = data; 
        return this;
    }, 
    run: function(callback) {
        callback(null, this.returnData || {})
    },

    save: function(data) {
    }
};

module.exports = db;