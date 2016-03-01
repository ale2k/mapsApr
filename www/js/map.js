// funzione da chiamare quando un utente vuole vedere la mappa
function loadMap(socLocations, pic)
{
	// contenuto statico e fisso della nuova pagina
	var pageCode = '<div class="page" data-page="list">'
					+'<div class="navbar">'
					+ '<div class="navbar-inner">'
					+  '<div class="center">mapsPr</div>'
					+  '<div class="right">'
					+   '<a href="#" class="link listLink">'
					+    '<i class="icon icon-bars"></i>'
					+    '<span>Lista</span>'
					+   '</a>'
					+  '</div>'
					+'</div>'
					+'</div>'
					+  '<div class="page-content">'
					+	'<div id="map" style="height:100%">'
					+  '</div>' 
					+ '</div>';

	
	// con questo comando si carica il contenuto appena creato
	mainView.router.load(
	{
	  content: pageCode,
	  animatePages: true
	});

	// cosa succede se si vuole andare alla mappa
	$$('.listLink').on('click', function() 
	{
		mainView.router.back(
		{
			animatePages: true
		});
	});

	// carica la mappa
	initMap(socLocations, pic);
}

var map, geocoder;

function initMap(socLocations, pic) 
{
	var mapOptions = 
	{
		zoom: 12,
		// centra la mappa sull'indirizzo
		center: {lat:44.802088, lng:10.327020},
		// rimuovi alcuni controlli
		zoomControl: true,
		mapTypeControl: false,
		scaleControl: false,
		streetViewControl: false,
		rotateControl: false,
		fullscreenControl: false
	}
	map = new google.maps.Map(document.getElementById('map'), mapOptions);

	if (socLocations)
	{
		for (var i=0; i < socLocations.length; i++)
		{
			var icon = 
			{
				url : pic,
				scaledSize: new google.maps.Size(50, 50)
			}
			var marker = new google.maps.Marker(
			{
				position: socLocations[i],
				title:"test",
				map: map,
				animation: google.maps.Animation.DROP,
				icon: icon
			});
		}
	}
}