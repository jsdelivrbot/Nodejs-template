var path = require("path");
var express = require("express")
var router = express.Router();
var request = require('request');
var config = require('../predix-config');
var Partner = require("../models/partner.js")




//Partner.init();

router.get(['/v1/partner-proxy/partner'], function(req, res) {
	getRequest("/pokemon/1", function(responseBody){
	        console.log(responseBody);
	        var partnerResponse = responseBody
	        res.send(partnerResponse);
	    });  
});

router.get(['/v1/partner-proxy/partner/:partner_id'], function(req, res) {
		console.log('ENTRA get by id: '+req.params.partner_id);
		/*Partner.findById(req.params.partner_id, function (err, partner) {
		  console.log("Partner find:"+partner.get('value'));
		});*/
		getRequest("/pokemon/1", function(responseBody){
	        console.log(responseBody);
	        var partnerResponse = responseBody
	        res.send(partnerResponse);
	    });  
});

router.post(['/v1/partner-proxy/partner'], function(req, res) {
		console.log('ENTRA post save: ');
		var data = new Partner({key: "Temperature", value:"120C"});
		console.log("partner data is: ", data);
		data.save(function(err, savedData) {
		    console.log("Saved data partner: ", savedData);
		});
});




var getRequest = function (path, callback) {

	var options = {
		method: 'GET',
		url: config.partnerURL + path,
	};

	request(options, function (err, response, body) {
		if (!err) {
			var responseBody = JSON.parse(body);
			callback(responseBody);
		} else {
			console.error('ERROR in request: ' + err);
		}
	});
};


module.exports = router;
