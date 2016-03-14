App.HeaderView = Backbone.View.extend({

	initialize : function(){
		this.id = "header";
		this.model = App.helpers.getModel("mainModel", App.MainModel);
	},

	events : function() {
		var self = this;
		
		$(".homeLink").off("click");
		$(".homeLink").on("click", function(e) {
    		console.log("home link");
			e.preventDefault();
			self.home();
		});

	},

    home : function() {                     
        App.popup.render({
            header : {
                show : true,
                text : "Reset the tablet",
                close : true
            },
            body : {
                show : true,
                text : "Do you really want to reset the tablet ? All data will be permanently lost. The experience on the screen won't be affected."
            },
            footer : {
                show : true,
                buttons : [
                    {
                        id : "confirm",
                        style : "default",
                        close : false,
                        text : "Confirm",
                        callback : function(e) {
							e.preventDefault();
							App.popup.hide(function(){
								App.router.navigate("!/gender", { trigger:true, replace:true });
							});
                        }
                    },
                    {
                        id : "cancel",
                        style : "primary",
                        close : true,
                        text : "Cancel"
                    }
                ]
            }
        });
        App.popup.show();
    }

});