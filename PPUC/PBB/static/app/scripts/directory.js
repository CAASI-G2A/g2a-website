$(document).ready(function(){
	$("#search").on("keyup", function() {
		var value = $(this).val().toLowerCase();
		$("#directory tr").filter(function() {
		  $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
		});
	});

	var dir = $('#dirTable').DataTable( {
		"searching": false,
		"paging": false,
		"bInfo": false,
		"scrollY": "500px",
		columnDefs: [{
			orderable: false,
			targets: 1
		}]
	});
	$('.dataTables_length').addClass('bs-select');
	dir.columns.adjust().draw();
});

function filter() {
	$("#filterBox" > input)
}