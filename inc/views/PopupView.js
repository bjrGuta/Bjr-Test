App.PopupView = Backbone.View.extend({

	initialize : function(_id, _params){
		this.id = _id;
		this.$id = "#"+this.id;
		this.name = "Popup";
		this.el = 'body';
		this.params = _params;
		this.params.show = false;
	    $(this.$id).modal(this.params);
	},

	events : {
		//'click button.gender-select' : 'genderSelect'
	},
	
	template : {
		popup : App.helpers.template("popup"),
		id : function() {
			return this.id;
		},
		header : {
			show : true,
			close : true,
			text : "Header null"
		},
		body : {
			show : true,
			text : "Body null"
		},
		footer : {
			show : true,
			buttons : [
				{
					id : "confirm",
					style : "default",
					close : false,
					text : "Confirm",
					callback : function(){ return; }
				},
				{
					id : "cancel",
					style : "primary",
					close : true,
					text : "Cancel",
					callback : function(){ return; }
				}
			]
		}
	},

	beforeRender : function(){
	},

	afterRender : function(){
	},

	render : function(tpl) {
		if (_.isObject(tpl)) {
    		_.extend(this.template, tpl);			
		}

		if (!$(this.$id).length) {
			$(this.el).append( $(this.template.popup(this)) );
		} else {
			$(this.$id).html( $(this.template.popup(this)).html() );
		}

		if (_.has(this.template.footer, 'buttons')) {
    		this.setButtonEvents();
    	}

		return this;
    },

    setButtonEvents : function() {
		$.each(this.template.footer.buttons, function(index, button) {
	    	if (_.has(button, 'callback')) {
			    $("button#modal-btn-"+button.id).off("click");
			    $("button#modal-btn-"+button.id).one("click", button.callback);
			}
		});
    },

    show : function(callback) {
    	if (_.isFunction(callback)) {
			this.onShown(callback);
		}
    	$(this.$id).modal('show');
    },

    onShown : function(callback) {
		$(this.$id).one("shown.bs.modal", callback);
    },

    hide : function(callback) {
    	if (_.isFunction(callback)) {
			this.onHidden(callback);
		}
    	$(this.$id).modal('hide');
    },

    onHidden : function(callback) {
		$(this.$id).one("hidden.bs.modal", callback);
    }


});