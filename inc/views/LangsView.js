App.LangsView = Backbone.View.extend({

	initialize : function(){
		this.id = "langs";
		this.name = "Langs";
		this.model = App.helpers.getModel("mainModel", App.MainModel);
		_.bindAll(this, 'langSelect');
	},

	events : {
		'click #btn-langs>button' : 'langSelect'
	},
	
	template : {
		header : App.helpers.template("header"),
		main : App.helpers.template("langs"),
		footer : App.helpers.template("footer"),
		title : App.config.title,
		page : function() { return this.name; },
		langs : function() {
			var self = this;
			var langsList = new Array();
			$.each(App.config.langs, function(index, lang) {
				var data = {
					code : function() {
						return lang.code;
					},
					index : function() {
						return index;
					},
					name : function() {
						return lang.name;
					}
				};
				langsList.push(data);
			});
			return langsList;
		}
	},

	beforeRender : function(){
	},

	afterRender : function(){
		var langIndex = App.config.localize.index;
		this.txtRotator = setInterval(function(){
			if (langIndex < App.config.langs.length - 1) {
				langIndex++;
			} else {
				langIndex = 0;
			}
			App.config.localize.language = App.config.langs[langIndex].code;
			$("[data-localize]").localize("vc-arrows", App.config.localize);
		}, 2000);
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

    langSelect : function(e){
    	e.preventDefault();
    	clearInterval(this.txtRotator);
    	this.model.set("lang", $(e.currentTarget).data("lang"));  
    	App.config.localize.index =  $(e.currentTarget).data("index");
    	App.config.localize.language = this.model.get("lang"); 	
		App.router.navigate("!/legal", { trigger:true });
    }

});