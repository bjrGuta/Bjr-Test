
var templates = [
	'langs',
	'legal',
	'intro',
	'friends',
	'cam',
	'review',
	'crm',
	'header',
	'footer',
	'popup'
];

$.each(templates, function(key, val) {
	$.ajax({
		async : false,
		type: "GET",
		url : 'inc/templates/'+val+'.html'
	}).success(function(html) {
		var id = $(html).data('template-id')+'-template';
		var script = '<script type="text/x-mustache-template" id="'+id+'">'+html+'</script>';
		$(script).appendTo("head");
	});
});