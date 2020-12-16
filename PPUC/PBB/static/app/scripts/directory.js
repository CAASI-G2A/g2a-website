document.getElementById("barCheck").addEventListener("change", filterDir, false);
document.getElementById("beautyCheck").addEventListener("click", filterDir, false);
document.getElementById("educationCheck").addEventListener("click", filterDir, false);
document.getElementById("eventsCheck").addEventListener("click", filterDir, false);
document.getElementById("foodCheck").addEventListener("click", filterDir, false);
document.getElementById("generalCheck").addEventListener("click", filterDir, false);
document.getElementById("gymCheck").addEventListener("click", filterDir, false);
document.getElementById("hairCheck").addEventListener("click", filterDir, false);
document.getElementById("healthCheck").addEventListener("click", filterDir, false);
document.getElementById("nonCheck").addEventListener("click", filterDir, false);
document.getElementById("profCheck").addEventListener("click", filterDir, false);
document.getElementById("shoppingCheck").addEventListener("click", filterDir, false);

var checks = [];

function filterDir() {
	var none = true;
	checks = [];
	$(':checkbox').each(function() {
	    if (this.checked) {
	    	none = false;
	    }
	    else {
	    	var category = $("label[for='"+$(this).attr("id")+"']").text();
	    	checks.push(category);
	    }
	});

	var value = '';
	$("#directory tr").filter(function() {
		$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
	});

	if(!none) {
		for (var i = 0; i < checks.length; i++) {
			var value = checks[i].toLowerCase();
			$("#directory tr").filter(function() {
				if (checks.includes($(this).find('td').eq(3).text())) {
					$(this).toggle(false);
				}
			});
		}
	}
	else {
		checks = [];
	}
}

$(document).ready(function(){
	$("#search").on("keyup", function() {
		var value = $(this).val().toLowerCase();
		$("#directory tr").filter(function() {
			if (!checks.includes($(this).find('td').eq(3).text())) {
				$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
			}
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