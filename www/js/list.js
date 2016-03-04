// funzione da chiamare quando un utente clicca su uno sport
// per caricare la lista relativa
function loadSportList(text)
{
	// contenuto statico e fisso della nuova pagina
	var pageOpening = '<div class="page" data-page="list">'
					+'<div class="navbar">'
					+ '<div class="navbar-inner">'
					+  '<div class="left">'
					+   '<a href="#" class="link icon-only">'
					+    '<i class="icon icon-back"></i>'
					+   '</a>'
					+  '</div>'
					+  '<div class="center">'+text+'</div>'
					+  '<div class="right">'
					+   '<a href="#" class="link mapLink">'
					+    '<i class="icon icon-map"></i>'
					+    '<span>Map</span>'
					+   '</a>'
					+  '</div>'
					+'</div>'
					
					+'</div>'
					+  '<div class="page-content contacts-content">'
					+	'<div class="content-block-title">Titolo d prova</div>'
					+	'<div class="list-block media-list">'
					+	 '<ul>'

	var pageClosing = 	 '</ul>' 
					+ 	'</div>' 
					+  '</div>' 
					+ '</div>';

	var dynList = '';

	for (var i = 0; i < 2; i++)
	{
		dynList += '<li>'
				+  '<a href="#" class="item-link item-content soc-link" id="soc-'+i+'">'
				+	'<div class="item-media"><img src="img/wiki.png" width="80"></div>'
				+	'<div class="item-inner">'
				+	  '<div class="item-title-row">'
				+		'<div class="item-title">An entry</div>'
				+	  '</div>'
				+	  '<div class="item-subtitle">..a detail</div>'
				+	  '<div class="item-text">..another detail</div>'
				+	'</div>'
				+ '</a>'
				+'</li>';
	}
	
	// con questo comando si carica il contenuto appena creato
	mainView.router.load(
	{
	  content: pageOpening + dynList + pageClosing,
	  animatePages: true
	});
	
	// qui dico al bottone in alto a sx di tornare indietro se schiacciato
	$$('.left').on('click', function() 
	{
		loadIndex();
	});
	
	// cosa succede se si vuole andare alla mappa
	$$('.mapLink').on('click', function() 
	{
		loadMap(locations, "img/wiki.png", text);
	});
	
	// cosa succede se si clicca su una societa'
	$$('.soc-link').on('click', function() 
	{
		var id = $$(this).attr("id");
		// estrai il numero dall'id
		var socNumber = new Number(id.substring(id.indexOf("-")+1));
		
		// chiama la funzione per caricare il dettaglio della societa' e
		// passa alla funzione l'oggetto-societa' 
		loadDetail(socNumber);
	});
	
	// quasi quasi adesso..mentre la gente guarda la lista,
	// noi estraiamo le coordinate dagli indirizzi per poi costruire i markers
	clubs = ["Via Sidoli Giuditta 24 - 43123 Parma (PR)", "Via Moletolo 61/A - 43122 Parma"];
	locations = [];	
	locationCounter = 0;
	geocoder = new google.maps.Geocoder();
	geoCode()
}

var clubs = ["Via Sidoli Giuditta 24 - 43123 Parma (PR)", "Via Moletolo 61/A - 43122 Parma"];
var locations = [];	
var locationCounter = 0;
var geocoder;

function geoCode()
{
	geocoder.geocode(
	{
		'address': clubs[locationCounter]
	}, function(results, status) 
	{
		if (status == google.maps.GeocoderStatus.OK) 
		{
			// aggiungi la posizione all'array
			locations.push(results[0].geometry.location);
		}
		
		locationCounter++;
		if (locationCounter < clubs.length)
		{
			geoCode()
		}
		else // finito di estrarre gli indirizzi
		{
			// do nothing
			// myApp.alert("total addresses: "+locations.length);
		}
	});
}