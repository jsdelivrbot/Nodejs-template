var path = require("path");
var express = require("express")
var router = express.Router();
var request = require('request');
var config = require('../predix-config');
var Partner = require("../models/partner.js")





router.get(['/v1/partner-proxy/partner'], function(req, res) {

	//Example to connect to external API
	getRequest("/pokemon/1", function(responseBody){
	        console.log(responseBody);
	        var partnerResponse = responseBody
	        res.send(partnerResponse);
	    });  
});

router.get(['/v1/partner-proxy/partner/:partner_id'], function(req, res) {

	//Example to get partner data store in db	
	Partner.findById(req.params.partner_id, function (err, partner) {
	  console.log("Partner find:"+partner.get('value'));
	});

});

router.post(['/v1/partner-proxy/partner'], function(req, res) {
	

});



var getRequest = function (path, callback) {

	var options = {
		method: 'GET',
		url: config.partnerURL + path
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
