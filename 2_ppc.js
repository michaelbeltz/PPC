$(document).ready(function()
{
	//data
	employees = [
	"Phyllis",
	"Angela",
	"Dwight",
	"Oscar",
	"Creed",
	"Pam",
	"Jim",
	"Stanley",
	"Michael",
	"Kevin",
	"Kelly"
	]

	ppc = []

	//make names and ppc
	function make_names(){
		$(".name").remove()
		$.each(employees, function(index, val){
			var name = $("<div id='" + index + "' class='name'>" + (index + 1) + ": " + val + "</div>")
			$("#off").append(name)
		})
	}

	function make_ppc(){
		$(".name_ppc").remove()
		$.each(ppc, function(index, val){
			var name = $("<div id='" + index + "' class='name_ppc'>" + (index + 1) + ": " + val + "</div>")
			$("#on").append(name)
		})
	}

	make_names()
	make_ppc()
	make_drag()

	//make names draggable
	function make_drag(){
		$(".name").draggable({
			start: function(){
				$("#on_header").removeClass("dontdrop")
				$("#on_header").addClass("dropit")
			},
			stop: function(){
				$("#on_header").removeClass("dropit")
				$("#on_header").addClass("dontdrop")
			},
			cursor: 'move',
			stack: ".name",
			revert : true,
		});

		$(".name_ppc").draggable({
			start: function(){
				$("#off_header").removeClass("dontdrop")
				$("#off_header").addClass("dropit")
			},
			stop: function(){
				$("#off_header").removeClass("dropit")
				$("#off_header").addClass("dontdrop")
			},
			cursor: 'move',
			stack: ".name_ppc",
			revert : true,
		});
	}

	//make boxes droppable
	$("#on_header").droppable({
		classes: {
        "ui-droppable-hover": "dropnow"
      	},
		accept: '.name:not(.outside)',
		drop: function(event, ui){

			var draggable = ui.draggable;

			ppc.push(employees[draggable.attr('id')])
			employees.splice(draggable.attr('id'),1)

			make_names()
			make_ppc()
			make_drag()
		}
	});

	$("#off_header").droppable({
		classes: {
        "ui-droppable-hover": "dropnow"
      	},
		accept: '.name_ppc:not(.outside)',
		drop: function(event, ui){

			var draggable = ui.draggable;

			employees.push(ppc[draggable.attr('id')])
			ppc.splice(draggable.attr('id'),1)

			make_names()
			make_ppc()
			make_drag()
		}
	});




});