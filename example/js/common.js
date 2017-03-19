$(document).ready(function(){

	$('.list').SwappingWall({
		'time': 2000,
		'itemsInRow': 8,
		'duration': 400,
		'responsive': [
			{
				'breakpoint': 991,
				'itemsInRow': 3,
			},
			{
				'breakpoint': 768,
				'itemsInRow': 2,
			}
		]
	})
})