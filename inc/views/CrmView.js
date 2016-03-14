App.CrmView = Backbone.View.extend({

	initialize : function(){
		this.id = "crm";
		this.name = "CRM";
		this.model = App.helpers.getModel("mainModel", App.MainModel);
	},

	events : {
		'click #crm-submit-btn' : 'submit'
	},
	
	template : {
		header : App.helpers.template("header"),
		main : App.helpers.template("crm"),
		footer : App.helpers.template("footer"),
		title : App.config.title,
		page : function() { return this.name; },
		fname : function() { return this.model.get("fname"); },
		lname : function() { return this.model.get("lname"); },
		email : function() { return this.model.get("email"); },
		countries : function() {
			var self = this;
			var countriesList = new Array();
			$.each(App.countries, function(key, val) {
				var data = {
					code : function() {
						return key;
					},
					name : function() {
						return val;
					}
				};
				countriesList.push(data);
			});
			return countriesList;
		},
	},

	beforeRender : function(){
	},

	afterRender : function(){
		$('form input#user-newsletter').attr('checked', this.model.get("newsletter"));
		$('form input#user-public').attr('checked', this.model.get("public"));
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

    submit : function(e) {
    	e.preventDefault();
    	this.model.save({
    		"fname" : $('form input#user-fname').val(),
    		"lname" : $('form input#user-lname').val(),
    		"country" : $('form select#user-country').val(),
    		"email" : $('form input#user-email').val(),
    		"newsletter" : $('form input#user-newsletter').is(':checked'),
    		"public" : $('form input#user-public').is(':checked'),
    	}, {"validate" : false});

      	var self = this;
      	App.popup.onShown(function(e) {
      		self.model.unset("id");
    		$.when(self.model.save(self.model.attributes, { ajaxSync: true })).done(function(resp) {
    			if (_.has(resp, 'success') && self.model.validationError == null) {
					App.popup.render({
						header : {
							show : true,
							text : "Success"
						},
						body : {
							show : true,
							text : "The user data has been successfully saved, you can now proceed to the next user."
						},
			    		footer : {
			    			show : true,
							buttons : [
								{
									id : "confirm",
									style : "primary",
									close : true,
									text : "Ok"
								}
							]
			    		}
					});

					App.popup.onHidden(function(){
						App.router.navigate("!/gender", { trigger:true, replace:true });
					});
		      	} 
    		});
    	});		

		App.popup.render({
    		header : {
    			show : true,
    			text : "Sending user data"
    		},
    		body : {
    			show : true,
    			text : "All the user data is being sent to the server, please wait for the success confirmation."
    		},
    		footer : {
    			show : false
    		}
    	});
	    App.popup.show();   	
    }

});