$(function() {
	window.job_application_view_model = new JobApplicationViewModel();

	ko.applyBindings(job_application_view_model, $('.assignmentSpace')[0]);

	$('.ui.checkbox').checkbox();
	$('.ui.dropdown:not(".item")').dropdown();

	$('div.ui.slider.checkbox').click(function() {
		job_application_view_model.gender($(this).hasClass('checked'));
	});
})

function showFlowChart() {
	$('.flowchart').slideToggle();
}