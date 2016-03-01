function loadDetail(soc)
{
	// contenuto statico e fisso della nuova pagina
	var pageCode = '<div class="page" data-page="list">'
					+'<div class="navbar">'
					+ '<div class="navbar-inner">'
					+  '<div class="left">'
					+   '<a href="#" class="link icon-only">'
					+    '<i class="icon icon-back"></i>'
					+   '</a>'
					+  '</div>'
					+  '<div class="center">sportAparma</div>'
					+  '<div class="right">'
					+   '<a href="#" class="link listLink">'
					+    '<i class="icon icon-bars"></i>'
					+    '<span>&nbsp</span>'
					+   '</a>'
					+  '</div>'
					+ '</div>'
					+'</div>'
					+'<div class="page-content">'
					+'<div class="content-block-title">num: '+soc+'</div>'
					+'<div class="list-block">'
					  +'<ul>'
						+'<li>'
						  +'<div class="item-content">'
							+'<div class="item-inner">'
							  +'<div class="item-title label">Indirizzo</div>'
							  +'<div class="item-after">"Via Moletolo 61/A - 43122 Parma"</div>'
							+'</div>'
						  +'</div>'
						+'</li>'
						+'<li>'
						  +'<div class="item-content">'
							+'<div class="item-inner">'
							  +'<div class="item-title label">Tel.</div>'
							  +'<div class="item-after">0521-614455, 0521-614455</div>'
							+'</div>'
						  +'</div>'
						+'</li>'
/*
						+'<li>'
						  +'<div class="item-content">'
							+'<div class="item-inner">'
							  +'<div class="item-title label">Fax</div>'
							  +'<div class="item-after">0521-614455'
							  +'</div>'
							+'</div>'
						  +'</div>'
						+'</li>'
*/
						+'<li>'
						  +'<div class="item-content">'
							+'<div class="item-inner">'
							  +'<div class="item-title label">Mail</div>'
							  +'<div class="item-after">@</div>'
							+'</div>'
						  +'</div>'
						+'</li>'
						+'<li>'
						  +'<div class="item-content">'
							+'<div class="item-inner">'
							  +'<div class="item-title label">Giorni apertura</div>'
							  +'<div class="item-after">giorni ??</div>'
							+'</div>'
						  +'</div>'
						+'</li>'
						+'<li>'
						  +'<div class="item-content">'
							+'<div class="item-inner">'
							  +'<div class="item-title label">Orari apertura</div>'
							  +'<div class="item-after">orari: ...</div>'
							+'</div>'
						  +'</div>'
						+'</li>'
						+'<li>'
						  +'<div class="item-content">'
							+'<div class="item-inner">'
							  +'<div class="item-title label">Sito</div>'
							  +'<div class="item-after">www: www.sitodiprova.nn</div>'
							+'</div>'
						  +'</div>'
						+'</li>'
					   +'</ul>'
					  +'</div>'

				    + '<div id="detailMap" style="height:300px">'
					+ '</div>' 
					
					+'</div>';
					

	// con questo comando si carica il contenuto appena creato
	mainView.router.load(
	{
	  content: pageCode,
	  animatePages: true
	});
	
	// qui dico al bottone in alto a sx di tornare indietro se schiacciato
	$$('.left').on('click', function() 
	{
		mainView.router.back(
		{
			animatePages: true
		});
	});					
			
	// carica la mappa
	initDetailMap("Via Moletolo 61/A - 43122 Parma");
}

var detailMap, detailGeocoder;

function initDetailMap(indirizzo) 
{
	// identifica l'indirizzo sulla mappa
    detailGeocoder = new google.maps.Geocoder();
    detailGeocoder.geocode(
	{
        'address': indirizzo
    }, function(results, status) 
	{
        if (status == google.maps.GeocoderStatus.OK) 
		{
			// definisci le caratteristiche della mappa
            var mapOptions = 
			{
                zoom: 14,
                center: results[0].geometry.location,
				// rimuovi alcuni controlli
				zoomControl: true,
				mapTypeControl: false,
				scaleControl: false,
				streetViewControl: false,
				rotateControl: false,
				fullscreenControl: false
            }
			// carica la mappa
            detailMap = new google.maps.Map(document.getElementById("detailMap"), mapOptions);
			// metti un marker sulla mappa
            var marker = new google.maps.Marker(
			{
                map: detailMap,
                position: results[0].geometry.location
            });
        }
    });
}