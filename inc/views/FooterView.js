App.FooterView = Backbone.View.extend({

	initialize : function(){
		this.id = "footer";
		this.model = App.helpers.getModel("mainModel", App.MainModel);
	}

});