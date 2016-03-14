
(function(){

	// Main app object
	var App = {};
	window.App = App;	
	
	// Set the main app configs
	$.ajax({
		async : false,
		type: "GET",
		url : 'data/config.json'
	}).success(function(data) { 
		App.config = data;
	});

	// Get country codes
	$.ajax({
		async : false,
		type: "GET",
		url : 'data/country-codes.json'
	}).success(function(data) { 
		App.countryCodes = data;
	});

	// Geocoder init function
	App.initGeocoder = function() {
		App.geocoder = new google.maps.Geocoder();
		App.localLatLng = new google.maps.LatLng(App.config.geocoder.local.lat, App.config.geocoder.local.lng);
		
		console.log("Init geocoder", App.localLatLng.lat(), App.localLatLng.lng());
	}
				
	// Main application boot
	App.boot = function() {
		// Initiate Gmaps API
    	$("body").append('<script src="https://maps.googleapis.com/maps/api/js?key='+App.config.geocoder.api.key+'&signed_in=true&libraries=geometry&callback=App.initGeocoder" async defer></script>')

		// Modal popup controller
		App.popup = new App.PopupView("modalPopup", {
			"backdrop" : 'static',
			"keyboard" : false
	    });

		// Start the main router
		App.router = new App.Router({container : App.config.container});
		Backbone.history.start();
	}
	
})();

// On HTML loaded start the boot
$(document).ready(function() {
	App.running = true;
	App.boot();
});