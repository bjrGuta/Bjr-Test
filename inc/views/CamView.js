App.CamView = Backbone.View.extend({

	initialize : function(){
		this.id = "cam";
		this.name = "Cam";
		this.model = App.helpers.getModel("mainModel", App.MainModel);
	},

	events : {
		'click button.gender-select' : 'genderSelect'
	},
	
	template : {
		header : App.helpers.template("header"),
		main : App.helpers.template("cam"),
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
    }

});