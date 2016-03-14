App.FriendsView = Backbone.View.extend({

	initialize : function(){
		this.id = "friends";
		this.name = "Friends";
		this.model = App.helpers.getModel("mainModel", App.MainModel);
	},

	events : {
		'click div.friend-form button' : 'friendSubmit'
	},
	
	template : {
		header : App.helpers.template("header"),
		main : App.helpers.template("friends"),
		footer : App.helpers.template("footer"),
		title : App.config.title,
		page : function() { return this.name; },
		friends : function() {
			var self = this;
			var friendsList = new Array();
			for(i=0; i<3; i++) {
				var data = {
					id : i,
					countries : function() {
						var self = this;
						var countriesList = new Array();
						$.each(App.countryCodes, function(index, code) {
							var data = {
								code : function() {
									return code;
								}
							};
							countriesList.push(data);
						});
						return countriesList;
					},
					disabled : function() {
						if (this.id > 0) {
							return "disabled";
						} else {
							return "";
						}
					}
				}

				friendsList.push(data);
			}
			return friendsList;
		}
	},

	beforeRender : function(){
	},

	afterRender : function(){
		$("[data-localize]").localize("country", App.config.localize);

		for(i=0; i<3; i++) {
			App.helpers.sortAlphabetically($('#friend-'+i+' option.country'));
		}

		var self = this;
		var $els = $("input[type='text'], input[type='textarea']");
		this.placeholders = {};
		$.each($els, function(key, el) {
			self.placeholders[$(el).attr("name")] = $(el).val();
		});	

		App.helpers.simPlaceholder($els, this.placeholders);
	},

	render : function(){
		var page = [
			{ html : $(this.template.header(this)) },
			{ html : $(this.template.main(this)) },
			{ html : $(this.template.footer(this))}
		];
		
		$(this.el).html(App.helpers.buildHTML(page));
		
		return this;
    },

    friendSubmit : function(e) {
    	e.preventDefault();

    	var $parent = $(e.currentTarget).parent();
    	var id = $parent.parent().parent().attr("id");    	
    	var map = {};

    	var nameAttr = id+"-name";
    	var nameVal = $parent.find(".friend-name").val();    	
 		map[nameAttr] = nameVal;

    	var countryAttr = id+"-country";
    	var countryVal = $parent.find(".friend-country").val();    	
 		map[countryAttr] = countryVal;

    	var cityAttr = id+"-city";
    	var cityVal = $parent.find(".friend-city").val();    	
 		map[cityAttr] = cityVal;

 		var opts = {};
 		opts.validate = true;
 		opts.placeholders = this.placeholders;
 		
    	this.model.set(map, opts);

    	if (this.model.validationError != null) {
    		App.popup.show();
    	} else {
    		var address = cityVal+", "+countryVal;
    		this.calculateDistance(id, address);
    	}
    },

    calculateDistance : function(id, address) {
    	var self = this;
	    App.geocoder.geocode({'address': address}, function(results, status) {
	    	var resp = {};
		    if (status === google.maps.GeocoderStatus.OK) {
		    	var location = results[0].geometry.location;

		    	var distance = google.maps.geometry.spherical.computeDistanceBetween(App.localLatLng, location);
		    	distance = Math.round(distance/1000);

		    	resp = { "success" : { "distance" : distance } };
		    } else {
		    	resp = { "error" : { "code" : status } };
		    }

		    self.processGeocoderResponse(resp);
	  	});
    },

    processGeocoderResponse : function(id, resp) {
    	console.log(resp);
 		if (_.has(resp, "success")) {
	    	this.model.set(id+"-distance", success.distance);
		}   	
    }

});