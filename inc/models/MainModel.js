App.MainModel = Backbone.Model.extend({

	initialize : function() {
		this.on("sync", this.success);
		this.on("error", this.error);
		this.on("change", function(){ console.log(this.attributes); });
	},
	
	urlRoot :  "http://bjrguta/RogerDubuis/AppDataKont/index.php/content/add",

	//localStorage : new Backbone.LocalStorage("last-user-info"),
	
	defaults : {
	},

	parse : function(resp, xhr) {
    },
	
	validate : function(attrs, opts) {
		// Error handler
		var error = "";

		// We check if all attributes are filled
		$.each(attrs, function(key, val) {
			var attrName = key.slice(9);
			if (val === "" || val == opts.placeholders[attrName]) {
				error = "All fields must be filled.";
			}
		});

		// Validation response
		if (error != "") {
			App.popup.render({
	    		header : {
	    			show : true,
	    			text : "Form completion error",
	    			close : true
	    		},
	    		body : {
	    			show : true,
	    			text : error
	    		},
	    		footer : {
	    			show : true,
					buttons : [
						{
							id : "confirm",
							style : "primary",
							close : true,
							text : "Retry"
						}
					]
	    		}
	    	});

			return error;
		}
	},
		
	success :  function(model, resp, opts) {
		console.log("success", resp);
	},

	error :  function(model, resp, opts) {
		console.log("error", resp);
	}
	
});