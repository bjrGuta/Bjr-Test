App.helpers = {
	
	// Mustache template system
	template : function(name) {
		return Mustache.compile($("#"+name+"-template").html());
	},
	
	// Méthode d'assemblage des différentes parties du template	
	buildHTML : function(templates) {
		// Temp container
		var $html = $('<div></div>');
		
		// Loop between all template parts
		$(templates).each( function(i, el) {
			// Append the new part
			$html.append(el.html);
		});
	
		// Only return the temp container content
		return $html.html();
	},

	getModel : function(model, Class) {
		if(typeof App[model] === 'undefined') {
			// Init model
			App[model] = new Class();
		}
		return App[model];
	},
	
	checkEmail : function(email) {
		var regex = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/i;
		return regex.test(email);
	},

	sortAlphabetically : function(obj){
		var arr = obj.map(function(_, o) { return { t: $(o).text(), v: o.value }; }).get();
		arr.sort(function(o1, o2) { return o1.t > o2.t ? 1 : o1.t < o2.t ? -1 : 0; });
		obj.each(function(i, o) {
		  o.value = arr[i].v;
		  $(o).text(arr[i].t);
		});	
	},

	simPlaceholder : function($els, placeholders) {
		$.each($els, function(index, el) {
			$(el).on("focus", function(e) {
				var placeholder = placeholders[$(this).attr("name")];
				if ($(this).val() == "" || $(this).val() == placeholder) {
					$(this).val("");
					$(this).removeClass("sim-placeholder");
				}

				$(this).one("blur", function(e) {
					if ($(this).val() == "") {
						$(this).addClass("sim-placeholder");
						$(this).val(placeholder);
					}
				});
			});

		});
	}

}