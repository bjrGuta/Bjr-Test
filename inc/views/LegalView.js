App.LegalView = Backbone.View.extend({

	initialize : function(){
		this.id = "legal";
		this.name = "Legal";
		this.model = App.helpers.getModel("mainModel", App.MainModel);
		_.bindAll(this, 'legalSelect');
	},

	events : {
		'click #btn-legal>button' : 'legalSelect'
	},
	
	template : {
		header : App.helpers.template("header"),
		main : App.helpers.template("legal"),
		footer : App.helpers.template("footer"),
		title : App.config.title,
		page : function() { return this.name; }
	},

	beforeRender : function(){
	},

	afterRender : function(){
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

    legalSelect : function(e){
    	e.preventDefault();
    	if ($(e.currentTarget).data("legal")) {
			App.router.navigate("!/intro", { trigger:true });
    	} else {
			App.router.navigate("!/langs", { trigger:true });
    	}
    }

});