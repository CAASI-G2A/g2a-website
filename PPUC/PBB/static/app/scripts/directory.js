$(document).ready(function(){
	$("#search").on("keyup", function() {
		var value = $(this).val().toLowerCase();
		$("#directory tr").filter(function() {
		  $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
		});
	});

	$('#dirTable').DataTable( {
		"searching": false,
		"paging": false,
		"bInfo": false
	});
	$('.dataTables_length').addClass('bs-select');
});

// function sortTable(n) {
// 	var table, rows, switching, x, y, shouldSwitch, dir, switchcount = 0;
// 	table = document.getElementById("dirTable");
// 	switching = true;
// 	dir = "asc";
// 	while (switching) {
// 		switching = false;
// 		rows = table.rows;
// 		for (var i = 1; i < (rows.length - 1); i++) {
// 		  shouldSwitch = false;
// 		  x = rows[i].getElementsByTagName("TD")[n];
// 		  y = rows[i + 1].getElementsByTagName("TD")[n];
// 		  if (dir == "asc") {
// 		    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
// 		      shouldSwitch = true;
// 		      break;
// 		    }
// 		  } else if (dir == "desc") {
// 		    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
// 		      shouldSwitch = true;
// 		      break;
// 		    }
// 		  }
// 		}
// 		if (shouldSwitch) {
// 		  rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
// 		  switching = true;
// 		  switchcount ++;
// 		} 
// 		else {
// 		  if (switchcount == 0 && dir == "asc") {
// 		    dir = "desc";
// 		    switching = true;
// 		  }
// 		}
// 	}
// }