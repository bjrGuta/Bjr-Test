App.Router = Backbone.Router.extend({

	initialize : function(params) {
		this.container = params.container;
		this.firstPage = true;
		this.transitionDelay = 500;
		this.model = App.helpers.getModel("mainModel", App.MainModel);
	},

	routes : {
		"" : "langs",
		"!/langs" : "langs",
		"!/legal" : "legal",
		"!/intro" : "intro",
		"!/friends" : "friends",
		"!/cam" : "cam",
		"!/review" : "review",
		"!/crm" : "crm"
	},

	before: function( route, params ) {
		// Hide popup fallback
		App.popup.hide();

		// Always go to homepage on reload
		/*
		if (this.model.isNew() && Backbone.history.getFragment() !== "") {
			Backbone.history.navigate("", { trigger:true, replace:true });
		}
		*/
	},

	after : function() {
	},

	langs : function() {
		this.changePage(new App.LangsView());
	},

	legal : function() {
		this.changePage(new App.LegalView());
	},

	intro : function() {
		this.changePage(new App.IntroView());
	},

	friends : function() {
		this.changePage(new App.FriendsView());
	},

	cam : function() {
		this.changePage(new App.CamView());
	},

	review : function() {
		this.changePage(new App.ReviewView());
	},

	crm : function() {
		this.changePage(new App.CrmView());
	},
		
	changePage : function(page) {

		// Add page role and id to our new page
		$(page.el).attr({
			'id' : page.id,
			'data-role' : 'page',
			'class' : 'page'
		});

		if (typeof page.beforeRender === 'function') {
        	page.beforeRender();
		}
		
		// Render the page view
        page.render();
		
		// Append the new page just rendered
		var self= this;
        $.when($(this.container).append($(page.el))).done(function() {

			// Localize the new generated content
			$("#"+page.id+" [data-localize]").localize("vc-arrows", App.config.localize);

			// Execute afterRendre method if exists
			if (typeof page.afterRender === 'function') {
	        	page.afterRender();
			}

			//page.header = new App.HeaderView();
			//page.footer = new App.FooterView();

			if (!self.firstPage) {
				// Transition
				// $(self.container).children().first().fadeOut(this.transitionDelay, function(){
					$(self.container).children().first().remove();
				// });
			}
			// $(page.el).fadeIn(this.transitionDelay);

			self.firstPage = false;
        });
	}

});