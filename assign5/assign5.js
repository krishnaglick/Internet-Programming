$(function() {
	$.ajax({
		type: "POST",
		dataType: "json",
		url: "index.php",
		data: {
				'action' : 'test',
				'thing2' : 'asdf'
		},
		success: function(data) {
			console.log(JSON.parse(data));
			console.log('s');
		},
		failure: function(data) {
			console.log(data);
			console.log('f');
		},
		complete: function() {
			console.log('done');
		}
	});
})